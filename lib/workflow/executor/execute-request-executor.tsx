import { symmetricDecrypt } from '@/lib/encryption';
import prisma from '@/lib/prisma';
import { ExecutionEnvironment } from '@/types/executor';
import { ExecuteRequestTask } from '../task/execute-request';

export async function ExecuteRequestExecutor(
  environment: ExecutionEnvironment<typeof ExecuteRequestTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput('Target URL');

    if (!targetUrl) {
      environment.log.error('Target URL value is not defined');
      return false;
    }

    const requestMethod = environment.getInput('Method');

    if (!requestMethod) {
      environment.log.error('Method value is not defined');
      return false;
    }

    const body = environment.getInput('Body');

    if (
      (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'PATCH') &&
      !body
    ) {
      environment.log.error('Body is required but not defined');
      return false;
    }

    const bearerTokenId = environment.getInput('Bearer Token');
    let plainBearerToken: string | null = null;

    if (bearerTokenId) {
      const bearerToken = await prisma.credential.findUnique({
        where: { id: bearerTokenId },
      });

      if (!bearerToken) {
        environment.log.error('Bearer token not found');
        return false;
      }

      plainBearerToken = symmetricDecrypt(bearerToken.value);
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (plainBearerToken) {
      headers['Authorization'] = `Bearer ${plainBearerToken}`;
    }

    const response = await fetch(targetUrl, {
      method: requestMethod,
      headers: headers,
      body: body && JSON.stringify(body),
    });

    if (!response.ok) {
      environment.log.error(`Request failed with status code: ${response.status}`);
      return false;
    }

    if (response.ok) {
      const contentType = response.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        const responseBody = await response.json();
        environment.log.info(`Response Body: ${JSON.stringify(responseBody, null, 4)}`);
        environment.setOutput('Response', JSON.stringify(responseBody, null, 4));
      } else if (contentType.includes('text/plain') || contentType.includes('text/html')) {
        const responseBody = await response.text();
        environment.log.info(`Response Body (Text): ${responseBody}`);
        environment.setOutput('Response', responseBody);
      } else {
        environment.log.info('Response is not in JSON or Text format.');
      }
    } else {
      environment.log.error(`Request failed with status code: ${response.status}`);
      return false;
    }

    return true;
  } catch (err: any) {
    environment.log.error(err.message);
    return false;
  }
}

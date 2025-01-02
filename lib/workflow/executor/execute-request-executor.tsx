import { symmetricDecrypt } from '@/lib/encryption';
import prisma from '@/lib/prisma';
import { ExecutionEnvironment } from '@/types/executor';
import { EncryptedValueObject } from '@/types/param';
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

    let stringifiedBody = environment.getInput('Body');
    let body: Record<string, any> | null = null;

    if (stringifiedBody && typeof stringifiedBody === 'string') {
      try {
        body = JSON.parse(stringifiedBody);
      } catch (err) {
        environment.log.error('Failed to parse the Body as JSON');
        return false;
      }
    }

    if (['POST', 'PUT', 'PATCH'].includes(requestMethod) && !body) {
      environment.log.error('Body is required but not defined');
      return false;
    }

    const bearerTokenId = environment.getInput('Bearer Token');
    let plainBearerToken: string | null = null;
    if (bearerTokenId) {
      const bearerToken = await prisma.secret.findUnique({
        where: { id: bearerTokenId },
      });

      if (!bearerToken) {
        environment.log.error('Bearer token not found');
        return false;
      }
      plainBearerToken = symmetricDecrypt(bearerToken.value);
    }

    const encryptedProperties = environment.getInput('Encrypted properties');
    if (encryptedProperties && body) {
      const parsedEncryptedProperties: Record<string, EncryptedValueObject> =
        JSON.parse(encryptedProperties);

      for (const [key, keyValuePair] of Object.entries(parsedEncryptedProperties)) {
        const { selectedSecretId, value } = keyValuePair;

        if (typeof selectedSecretId === 'string' && typeof value === 'string') {
          const secret = await prisma.secret.findUnique({
            where: {
              id: selectedSecretId,
            },
          });

          if (!secret) {
            environment.log.error(`Unable to find secret value for the key ${key}`);
            return false;
          }

          const decryptedValue = symmetricDecrypt(secret.value);
          body[value] = decryptedValue;
        } else {
          console.warn(`Skipping invalid entry for key "${key}":`, keyValuePair);
        }
      }
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
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      environment.log.error(`Request failed with status code: ${response.status}`);
      return false;
    }

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

    return true;
  } catch (err: any) {
    environment.log.error(err.message);
    return false;
  }
}

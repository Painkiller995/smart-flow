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

    const response = await fetch(targetUrl, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
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
      } else if (contentType.includes('text/plain') || contentType.includes('text/html')) {
        const responseBody = await response.text();
        environment.log.info(`Response Body (Text): ${responseBody}`);
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

import { ExecutionEnvironment } from '@/types/executor';
import { DeliverViaWebhookTask } from '../task/deliver-via-webhook';

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput('Target URL');

    if (!targetUrl) {
      environment.log.error('Target URL value is not defined');
    }

    const body = environment.getInput('Body');

    if (!body) {
      environment.log.error('Body value is not defined');
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const statusCode = response.status;

    if (statusCode !== 200) {
      environment.log.error(`Status code: ${statusCode}`);
      return false;
    }

    const responseBody = await response.json();
    environment.log.info(JSON.stringify(responseBody, null, 4));
    return true;
  } catch (err: any) {
    environment.log.error(err.message);
    return false;
  }
}

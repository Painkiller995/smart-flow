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

    return true;
  } catch (err: any) {
    environment.log.error(err.message);
    return false;
  }
}

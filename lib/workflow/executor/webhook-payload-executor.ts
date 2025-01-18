import { ExecutionEnvironment } from '@/types/executor';
import { WebhookPayloadTask } from '../task/webhook-payload';

export async function WebhookPayloadExecutor(environment: ExecutionEnvironment<typeof WebhookPayloadTask>): Promise<boolean> {
    try {

        let payload = environment.getPayload();

        if (!payload) {
            environment.log.info("Payload is missing. Initializing with an empty JSON object.");
            payload = {};
        }

        environment.log.info("Payload retrieved successfully.");
        const formattedPayload = JSON.stringify(payload);
        environment.setOutput("Webhook payload", formattedPayload);

        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
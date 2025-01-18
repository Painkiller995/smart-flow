import { ExecutionEnvironment } from '@/types/executor';
import { WebhookPayloadTask } from '../task/webhook-payload';

export async function WebhookPayloadExecutor(environment: ExecutionEnvironment<typeof WebhookPayloadTask>): Promise<boolean> {
    try {

        const jsonData = '{}'
        const json = JSON.parse(jsonData)
        environment.setOutput("Webhook payload", '')
        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
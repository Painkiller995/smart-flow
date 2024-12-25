import { ExecutionEnvironment } from '@/types/executor';
import { ClickElementTask } from '../task/click-element';

export async function ClickElementExecutor(environment: ExecutionEnvironment<typeof ClickElementTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector")

        if (!selector) {
            environment.log.error("selector value is not defined")
        }

        await environment.getPage()!.click(selector)
        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
import { ExecutionEnvironment } from '@/types/executor';
import { NavigateUrlTask } from '../task/navigate-url';

export async function NavigateUrlExecutor(environment: ExecutionEnvironment<typeof NavigateUrlTask>): Promise<boolean> {
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
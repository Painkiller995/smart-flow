import { ExecutionEnvironment } from '@/types/executor';
import { FillInputTask } from '../task/fill-input';

export async function FillInputExecutor(environment: ExecutionEnvironment<typeof FillInputTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector")

        if (!selector) {
            environment.log.error("selector value is not defined")
        }

        const value = environment.getInput("Value")

        if (!value) {
            environment.log.error("value to fill is not defined")
        }

        await environment.getPage()!.type(selector, value)
        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
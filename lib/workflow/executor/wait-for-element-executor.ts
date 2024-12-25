import { ExecutionEnvironment } from '@/types/executor';
import { WaitForElementTask } from '../task/wait-for-element';

export async function WaitForElementExecutor(environment: ExecutionEnvironment<typeof WaitForElementTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector")

        if (!selector) {
            environment.log.error("selector value is not defined")
        }

        const visibility = environment.getInput("Visibility")

        if (!visibility) {
            environment.log.error("visibility value is not defined")
        }

        await environment.getPage()!.waitForSelector(selector, {
            visible: visibility === "visible",
            hidden: visibility === "hidden"
        })
        environment.log.info(`Element ${selector} became: ${visibility}`)
        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
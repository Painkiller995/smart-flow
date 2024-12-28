import { ExecutionEnvironment } from '@/types/executor';
import { ScrollToElementTask } from '../task/scroll-to-element';

export async function ScrollToElementExecutor(environment: ExecutionEnvironment<typeof ScrollToElementTask>): Promise<boolean> {
    try {

        const selector = environment.getInput("Selector")

        if (!selector) {
            environment.log.error("selector value is not defined")
        }

        await environment.getPage()!.evaluate((selector) => {
            const element = document.querySelector(selector)
            if (!element) {
                throw new Error("Element not found")
            }
            const top = element.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top })
        }, selector)

        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
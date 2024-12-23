import { ExecutionEnvironment } from '@/types/executor';
import { PageToHtmlTask } from '../task/page-to-html';

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
    try {
        const html = await environment.getPage()!.content()
        environment.setOutput("HTML", html)
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}
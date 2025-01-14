import puppeteer from 'puppeteer';

import { ExecutionEnvironment } from '@/types/executor';
import { LaunchBrowserTask } from '../task/launch-browser';

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
    try {

        const websiteUrl = environment.getInput("Website Url")

        const browser = await puppeteer.launch({ headless: true });
        environment.setBrowser(browser)
        environment.log.info("Browser started successfully")

        const page = await browser.newPage();
        await page.goto(websiteUrl);
        environment.setPage(page)
        environment.log.info(`Opened page at: ${websiteUrl}`)

        return true

    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
import { Browser, Page } from 'puppeteer';

import { LogCollector } from './log';
import { WorkflowTask } from './workflow';

export type Environment = {
    payload?: Record<string, any>;
    browser?: Browser
    disabledNodes: string[]
    page?: Page
    phases: Record<string,
        {
            inputs: Record<string, string>;
            outputs: Record<string, string>
        }>
}

export type ExecutionEnvironment<T extends WorkflowTask> = {
    getInput(name: T["inputs"][number]["name"]): string
    setOutput(name: T["outputs"][number]["name"], value: string): void
    getPayload: () => Record<string, any> | undefined
    getBrowser(): Browser | undefined
    setBrowser(browser: Browser): void
    getPage(): Page | undefined
    setPage(page: Page): void
    disableNode(isEdgeConditionMet: boolean): void
    log: LogCollector
}
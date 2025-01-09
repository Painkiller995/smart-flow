import { ExecutionEnvironment } from "@/types/executor";
import { TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { AddPropertyToJsonExecutor } from "./add-property-to-json-executor";
import { ClickElementExecutor } from "./click-element-executor";
import { DeliverViaWebhookExecutor } from "./deliver-via-webhook-executor";
import { EvaluateStringExecutor } from "./evaluate-string-executor";
import { EvaluateTimeExecutor } from "./evaluate-time-executor";
import { ExecuteRequestExecutor } from "./execute-request-executor";
import { ExtractTextFromElementExecutor } from "./extract-text-from-element";
import { FillInputExecutor } from "./fill-input-executor";
import { JsonStorageAreaExecutor } from "./json-storage-area-executor";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { MergeTwoJsonExecutor } from "./merge-two-json-executor";
import { NavigateUrlExecutor } from "./navigate-url-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ProcessDataWithOpenAiExecutor } from "./process-data-with-open-ai-executor";
import { ReadPropertyFromJsonExecutor } from "./read-property-from-json-executor";
import { ScrollToElementExecutor } from "./scroll-to-element-executor";
import { SendEmailExecutor } from "./send-email-executor";
import { StoreDataExecutor } from "./store-data-executor";
import { WaitForElementExecutor } from "./wait-for-element-executor";


type ExecutorFn<T extends WorkflowTask> = (environment: ExecutionEnvironment<T>) => Promise<boolean>

type RegistryType = {
    [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>
};

export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
    FILL_INPUT: FillInputExecutor,
    CLICK_ELEMENT: ClickElementExecutor,
    WAIT_FOR_ELEMENT: WaitForElementExecutor,
    SCROLL_TO_ELEMENT: ScrollToElementExecutor,
    NAVIGATE_URL: NavigateUrlExecutor,
    PROCESS_DATA_WITH_OPEN_AI: ProcessDataWithOpenAiExecutor,
    JSON_STORAGE_AREA: JsonStorageAreaExecutor,
    READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
    ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
    MERGE_TWO_JSON: MergeTwoJsonExecutor,
    EXECUTE_REQUEST: ExecuteRequestExecutor,
    DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
    EVALUATE_STRING: EvaluateStringExecutor,
    EVALUATE_TIME: EvaluateTimeExecutor,
    SEND_EMAIL: SendEmailExecutor,
    STORE_DATA: StoreDataExecutor,
}
import { TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { AddPropertyToJsonTask } from './add-property-to-json';
import { ClickElementTask } from './click-element';
import { DeliverViaWebhookTask } from './deliver-via-webhook';
import { ExecuteRequestTask } from './execute-request';
import { ExtractTextFromElementTask } from './extract-text-from-element';
import { FillInputTask } from './fill-input';
import { LaunchBrowserTask } from './launch-browser';
import { MergeTwoJsonTask } from './merge-two-json';
import { NavigateUrlTask } from './navigate-url';
import { PageToHtmlTask } from './page-to-html';
import { ProcessDataWithOpenAiTask } from './process-data-with-open-ai';
import { ReadPropertyFromJsonTask } from './read-property-from-json';
import { ScrollToElementTask } from './scroll-to-element';
import { WaitForElementTask } from './wait-for-element';

type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};

export const TaskRegistry: Registry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR_ELEMENT: WaitForElementTask,
  SCROLL_TO_ELEMENT: ScrollToElementTask,
  NAVIGATE_URL: NavigateUrlTask,
  PROCESS_DATA_WITH_OPEN_AI: ProcessDataWithOpenAiTask,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonTask,
  ADD_PROPERTY_TO_JSON: AddPropertyToJsonTask,
  MERGE_TWO_JSON: MergeTwoJsonTask,
  EXECUTE_REQUEST: ExecuteRequestTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
};

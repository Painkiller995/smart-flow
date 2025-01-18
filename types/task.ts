export enum TaskType {
    // **Browser-related tasks**
    LAUNCH_BROWSER = "LAUNCH_BROWSER",
    NAVIGATE_URL = "NAVIGATE_URL",
    PAGE_TO_HTML = "PAGE_TO_HTML",
    EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
    FILL_INPUT = "FILL_INPUT",
    CLICK_ELEMENT = "CLICK_ELEMENT",
    WAIT_FOR_ELEMENT = "WAIT_FOR_ELEMENT",
    SCROLL_TO_ELEMENT = "SCROLL_TO_ELEMENT",

    // **Data tasks**
    WEBHOOK_PAYLOAD = "WEBHOOK_PAYLOAD",

    // **JSON manipulation tasks**
    JSON_STORAGE_AREA = "JSON_STORAGE_AREA",
    READ_PROPERTY_FROM_JSON = "READ_PROPERTY_FROM_JSON",
    ADD_PROPERTY_TO_JSON = "ADD_PROPERTY_TO_JSON",
    MERGE_TWO_JSON = "MERGE_TWO_JSON",

    // **Data processing tasks**
    PROCESS_DATA_WITH_OPEN_AI = "PROCESS_DATA_WITH_OPEN_AI",
    EVALUATE_STRING = "EVALUATE_STRING",
    EVALUATE_TIME = "EVALUATE_TIME",

    // **Request and webhook tasks**
    EXECUTE_REQUEST = "EXECUTE_REQUEST",
    DELIVER_VIA_WEBHOOK = "DELIVER_VIA_WEBHOOK",


    // **Miscellaneous tasks**
    SEND_EMAIL = "SEND_EMAIL",
    STORE_DATA = "STORE_DATA",
}

export enum TaskParamType {
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",
    SELECT = "SELECT",
    CREDENTIAL = 'CREDENTIAL',
    PARAMETERS = 'PARAMETERS',
    ENCRYPTED_PROPERTIES = 'ENCRYPTED_PROPERTIES',
    AGENT = 'AGENT',
    BROWSER_INSTANCE = "BROWSER_INSTANCE"
}

export interface TaskParam {
    name: string
    type: TaskParamType
    helperText?: string
    require?: boolean
    hideHandle?: boolean
    [key: string]: any
} 
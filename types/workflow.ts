import { LucideProps } from "lucide-react"
import { AppNode } from "./app-node"
import { TaskParam, TaskType } from "./task"


export enum WorkflowStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED"
}


export type WorkflowTask = {
    label: string
    icon: React.FC<LucideProps>
    type: TaskType
    inputs: TaskParam[]
    outputs: TaskParam[]
    credits: number
}

export type WorkflowExecutionPlanPhase = {
    phase: number
    nodes: AppNode[]
}

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[]

export enum WorkflowExecutionStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export enum WorkflowExecutionTrigger {
    MANUAL = "MANUAL",
    CRON = 'CRON',
    WEBHOOK = "WEBHOOK",
}

export enum ExecutionPhaseStatus {
    CREATED = "CREATED",
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    IGNORED = "IGNORED",
} 
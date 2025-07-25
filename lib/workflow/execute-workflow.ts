import "server-only";

import { ExecutionPhase } from "@prisma/client";
import { Edge } from "@xyflow/react";
import { revalidatePath } from "next/cache";
import { Browser, Page } from 'puppeteer';

import { AppNode } from "@/types/app-node";
import { Conditions } from "@/types/evaluate";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { LogCollector } from "@/types/log";
import { TaskParamType } from "@/types/task";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow";
import { createLogCollector } from "../log";
import prisma from "../prisma";
import { ExecutorRegistry } from "./executor/registry";
import { TaskRegistry } from "./task/registry";

export async function ExecuteWorkflow(executionId: string, nextRunAt?: Date, payload?: Record<string, any>) {

    const execution = await prisma.workflowExecution.findUnique({
        where: { id: executionId },
        include: {
            workflow: true,
            phases: true
        }
    })

    if (!execution) {
        throw new Error("execution not found")
    }

    const edges = JSON.parse(execution.definition).edges as Edge[]

    const environment: Environment = {
        payload: payload,
        phases: {},
        disabledNodes: []
    }

    await initializeWorkflowExecution(executionId, execution.workflowId, nextRunAt)
    await initializePhaseStatuses(execution)



    let creditsConsumed = 0
    let executionFailed = false
    for (const phase of execution.phases) {
        const phaseExecution = await executeWorkflowPhase(execution.userId, phase, edges, environment)
        creditsConsumed += phaseExecution.creditsConsumed
        if (!phaseExecution.success) {
            executionFailed = true
            break
        }
    }

    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed)

    await cleanupEnvironment(environment)

    revalidatePath("/workflow/runs")
}

async function initializeWorkflowExecution(executionId: string, workflowId: string, nextRunAt?: Date) {

    await prisma.workflowExecution.update({
        where: {
            id: executionId
        },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING
        }
    })

    await prisma.workflow.update({
        where: {
            id: workflowId
        },
        data: {
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId,
            ...(nextRunAt && { nextRunAt })
        }
    })

}

async function initializePhaseStatuses(execution: any) {
    await prisma.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase: any) => phase.id)
            }
        },
        data: {
            status: ExecutionPhaseStatus.PENDING
        }
    })
}



async function finalizeWorkflowExecution(
    executionId: string,
    workflowId: string,
    executionFailed: boolean,
    creditsConsumed: number
) {

    const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED

    await prisma.workflowExecution.update({
        where: {
            id: executionId
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            creditsConsumed
        }
    })

    await prisma.workflow.update({
        where: {
            id: workflowId,
            lastRunId: executionId
        },
        data: {
            lastRunStatus: finalStatus
        }
    }).catch((err) => {
        //ignore
        // triggered other runs for this workflow while an execution is still running
    })

}

async function executeWorkflowPhase(userId: string, phase: ExecutionPhase, edges: Edge[], environment: Environment) {


    const logCollector = createLogCollector()

    const startedAt = new Date()
    const node = JSON.parse(phase.node) as AppNode

    if (node.data.inputs.Disabled === 'true') {
        environment.disabledNodes.push(node.id)
    }

    if (environment.disabledNodes.includes(node.id)) {
        const connectedEdges = edges.filter((edge) => edge.source === node.id)
        connectedEdges.map((edge) => { environment.disabledNodes.push(edge.target) })

        await prisma.executionPhase.update(
            {
                where: {
                    id: phase.id
                },
                data: {
                    status: ExecutionPhaseStatus.IGNORED,
                }
            }
        )
        return { success: true, creditsConsumed: 0 }
    }

    setupEnvironmentForPhase(node, edges, environment)

    //Update status
    await prisma.executionPhase.update(
        {
            where: {
                id: phase.id
            },
            data: {
                status: ExecutionPhaseStatus.RUNNING,
                startedAt,
                inputs: JSON.stringify(environment.phases[node.id].inputs)
            }
        }
    )

    const creditsRequired = TaskRegistry[node.data.type].credits
    let success = await decrementCredits(userId, creditsRequired, logCollector)

    const creditsConsumed = success ? creditsRequired : 0

    if (success) {
        // Execute the phase if the credits sufficient
        success = await executePhase(phase, node, edges, environment, logCollector)
    }

    const outputs = environment.phases[node.id].outputs
    await finalizePhase(phase.id, success, outputs, creditsConsumed, logCollector)

    return { success, creditsConsumed }

}

async function finalizePhase(phaseId: string, success: boolean, outputs: any, creditsConsumed: number, logCollector: LogCollector) {

    const finalStatus = success
        ? ExecutionPhaseStatus.COMPLETED
        : ExecutionPhaseStatus.FAILED

    await prisma.executionPhase.update({
        where: {
            id: phaseId
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            outputs: JSON.stringify(outputs),
            creditsConsumed,
            logs: {
                createMany: {
                    data: logCollector.getAll().map((log) => ({
                        message: log.message,
                        timestamp: log.timestamp,
                        logLevel: log.level
                    }))
                }
            }
        }
    })

}

async function executePhase(
    phase: ExecutionPhase,
    node: AppNode,
    edges: Edge[],
    environment: Environment,
    logCollector: LogCollector
): Promise<boolean> {

    const runFn = ExecutorRegistry[node.data.type]

    if (!runFn) {
        logCollector.error(`No executor found for the ${node.data.type}`)
        return false
    }

    const executionEnvironment: ExecutionEnvironment<any> = createExecutionEnvironment(phase, node, edges, environment, logCollector)

    return await runFn(executionEnvironment)
}

function setupEnvironmentForPhase(node: AppNode, edges: Edge[], environment: Environment) {
    environment.phases[node.id] = { inputs: {}, outputs: {} }
    const inputs = TaskRegistry[node.data.type].inputs
    for (const input of inputs) {

        if (input.type === TaskParamType.BROWSER_INSTANCE) continue

        const inputValue = node.data.inputs[input.name]
        if (inputValue) {
            environment.phases[node.id].inputs[input.name] = inputValue
            continue
        }

        const connectedEdge = edges.find((edge) => edge.target === node.id && edge.targetHandle === input.name)
        if (!connectedEdge) {
            console.error("Missing edge for input", input.name, "Node id:", node.id)
            continue
        }

        const outputValue = environment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!]
        environment.phases[node.id].inputs[input.name] = outputValue
    }
}

function createExecutionEnvironment(phase: ExecutionPhase, node: AppNode, edges: Edge[], environment: Environment, logCollector: LogCollector) {
    return {
        getInput: (name: string) => environment.phases[node.id]?.inputs[name],
        setOutput: (name: string, value: string) => { environment.phases[node.id].outputs[name] = value },
        getPayload: () => environment.payload,
        getBrowser: () => environment.browser,
        setBrowser: (browser: Browser) => (environment.browser = browser),
        getPage: () => environment.page,
        setPage: (page: Page) => (environment.page = page),
        disableNode: (isConditionMet: boolean) => {
            const connectedEdges = edges.filter(
                (edge) =>
                    edge.source === node.id &&
                    (isConditionMet
                        ? edge.sourceHandle === Conditions.ConditionNotMet
                        : edge.sourceHandle === Conditions.ConditionMet)
            );
            connectedEdges.map((edge) => { environment.disabledNodes.push(edge.target) })
        },
        log: logCollector
    }
}

async function cleanupEnvironment(environment: Environment) {
    environment.disabledNodes = []
    if (environment.browser) {
        await environment.browser
            .close()
            .catch(err => console.error("cannot close browser, reason:", err))
    }
}

async function decrementCredits(userId: string, amount: number, logCollector: LogCollector) {
    if (process.env.DISABLE_CREDIT_CONSUMPTION === 'true') {
        return true;
    }
    try {
        await prisma.userBalance.update({
            where: { userId, credits: { gte: amount } },
            data: {
                credits: { decrement: amount }
            }
        })
        return true
    } catch (err) {
        logCollector.error("Insufficient balance")
        return false
    }
}
"use server"

import prisma from "@/lib/prisma"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { WorkflowExecutionPlan } from "@/types/workflow"
import { auth } from "@clerk/nextjs/server"

export async function RunWorkflow(form: { workflowId: string, flowDefinition?: string }) {

    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const { workflowId, flowDefinition } = form

    if (!workflowId) {
        throw new Error("workflow ID is required")
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            userId,
            id: workflowId
        }
    })

    if (!workflow) {
        throw new Error("Workflow not found")
    }

    let executionPlan: WorkflowExecutionPlan

    if (!flowDefinition) {
        throw new Error("Flow definition is not defined")
    }

    const flow = JSON.parse(flowDefinition)

    const result = FlowToExecutionPlan(flow.nodes, flow.edges)


    if (result.error) {
        throw new Error("Flow definition not valid")
    }

    if (!result.executionPlan) {
        throw new Error("No execution plan generated")
    }

    executionPlan = result.executionPlan
    console.log("Execution Plan", executionPlan)
}
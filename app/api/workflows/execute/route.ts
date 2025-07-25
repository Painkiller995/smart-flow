import parser from "cron-parser"
import { headers } from "next/headers"

import prisma from "@/lib/prisma"
import { isValidSecret } from "@/lib/security-utils"
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow"


export const maxDuration = 60 // 1 minute in seconds

export async function GET(request: Request) {

    const headersList = await headers()

    const authHeader = headersList.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ success: false, error: "Unauthorized, unable to find the header" }, { status: 401 })
    }

    const secret = authHeader.split(" ")[1]

    if (!isValidSecret(secret, process.env.API_SECRET!)) {
        return Response.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const workflowId = searchParams.get("workflowId") as string

    if (!workflowId) {
        return Response.json({ success: false, error: "Bad request" }, { status: 400 })
    }

    const workflow = await prisma.workflow.findUnique({ where: { id: workflowId } })

    if (!workflow) {
        return Response.json({ success: false, error: "Bad request" }, { status: 400 })
    }

    const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlan

    if (!executionPlan) {
        return Response.json({ success: false, error: "Bad request" }, { status: 400 })
    }

    try {
        const cron = parser.parseExpression(workflow.cron!, { utc: true })
        const nextRunAt = cron.next().toDate()


        const execution = await prisma.workflowExecution.create({
            data: {
                workflowId,
                userId: workflow.userId,
                definition: workflow.definition,
                status: WorkflowExecutionStatus.PENDING,
                startedAt: new Date(),
                trigger: WorkflowExecutionTrigger.CRON,
                phases: {
                    create: executionPlan.flatMap(phase => {
                        return phase.nodes.flatMap((node) => {
                            return {
                                userId: workflow.userId,
                                status: ExecutionPhaseStatus.CREATED,
                                number: phase.phase,
                                node: JSON.stringify(node),
                                name: TaskRegistry[node.data.type].label,
                            }
                        })
                    })
                }
            }
        })


        await ExecuteWorkflow(execution.id, nextRunAt)
        return Response.json({ success: true }, { status: 200 })

    } catch (error) {
        return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
    }

}

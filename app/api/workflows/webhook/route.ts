
import { symmetricDecrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { isValidSecret } from "@/lib/security-utils"
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow"
import { TaskRegistry } from "@/lib/workflow/task/registry"
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow"

// Using the rate limiter is very important here because the secret is stored in the database
// and every time you call this endpoint, a call to the database is initiated.

export async function GET(request: Request) {

    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const secret = authHeader.split(" ")[1];

    const { searchParams } = new URL(request.url)

    const workflowId = searchParams.get("workflowId") as string

    if (!workflowId) {
        return Response.json({ error: "Bad request" }, { status: 400 })
    }

    const workflow = await prisma.workflow.findUnique({
        where: { id: workflowId },
        include: {
            secret: true,
        },
    });

    if (!workflow || !workflow.secret) {
        return Response.json({ error: "Bad request" }, { status: 400 })
    }

    let plainSecretValue: string;

    try {
        plainSecretValue = symmetricDecrypt(workflow.secret.value!);
    } catch (error) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    if (!isValidSecret(secret, plainSecretValue)) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlan

    if (!executionPlan) {
        return Response.json({ error: "Bad request" }, { status: 400 })
    }

    try {

        const execution = await prisma.workflowExecution.create({
            data: {
                workflowId,
                userId: workflow.userId,
                definition: workflow.definition,
                status: WorkflowExecutionStatus.PENDING,
                startedAt: new Date(),
                trigger: WorkflowExecutionTrigger.WEBHOOK,
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


        await ExecuteWorkflow(execution.id)
        return new Response(null, { status: 200 })

    } catch (error) {
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }

}


import { headers } from "next/headers"

import { getAppUrl } from "@/lib/helper/app-url"
import prisma from "@/lib/prisma"
import { isValidSecret } from "@/lib/security-utils"
import { WorkflowStatus } from "@/types/workflow"

export const maxDuration = 60 // 1 minute in seconds

export async function GET(request: Request) {

    const headersList = await headers()
    const authHeader = headersList.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const secret = authHeader.split(" ")[1]

    if (!isValidSecret(secret, process.env.API_SECRET!)) {
        return Response.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }


    const now = new Date()

    const workflows = await prisma.workflow.findMany({
        select: { id: true },
        where: {
            status: WorkflowStatus.PUBLISHED,
            cron: { not: null },
            nextRunAt: { lte: now }
        }
    })

    for (const workflow of workflows) {
        triggerWorkflow(workflow.id)
    }

    return Response.json({ workflowsToRun: workflows.length }, { status: 200 })
}



function triggerWorkflow(workflowId: string) {

    const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${workflowId}`)

    fetch(triggerApiUrl, {
        headers: {
            Authorization: `Bearer ${process.env.API_SECRET!}`
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(60000) // One minute
    }).catch((err) => {
        console.error(
            "Error triggering workflow with id",
            workflowId,
            ":error->",
            err.message)
    })

} 
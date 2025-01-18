import { headers } from "next/headers"

import prisma from "@/lib/prisma"
import { isValidSecret } from "@/lib/security-utils"

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

    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const workflowExecutions = await prisma.workflowExecution.deleteMany({
        where: {
            createdAt: {
                lt: oneMonthAgo,
            },
        },
    });

    return Response.json({ workflowExecutionDeleted: workflowExecutions.count }, { status: 200 })
}  
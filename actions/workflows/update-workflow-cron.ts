"use server"

import { auth } from "@clerk/nextjs/server"
import parser from "cron-parser"
import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"

export async function UpdateWorkflowCron({ id, cron }: { id: string, cron: string }) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    try {

        const interval = parser.parseExpression(cron, { utc: true })

        await prisma.workflow.update({
            where: {
                id,
                userId
            },
            data: {
                cron,
                nextRunAt: interval.next().toDate()
            }
        })

    } catch (error: any) {
        console.error("Invalid cron:", error.message)
        throw new Error("Invalid cron expression")
    }

    revalidatePath("/workflows")
}
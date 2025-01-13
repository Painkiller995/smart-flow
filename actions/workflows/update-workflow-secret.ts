"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"

export async function UpdateWorkflowSecret({ id, secretId }: { id: string, secretId: string }) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    await prisma.workflow.update({
        where: {
            id,
            userId
        },
        data: {
            secretId
        }
    })

    revalidatePath("/workflows")
}
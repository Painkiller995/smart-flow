"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"


export async function DeleteAgent(name: string) {

    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    await prisma.aiAgent.delete({
        where: {
            userId_name: {
                userId,
                name,
            },
        },
    });

    revalidatePath("/agents")
}
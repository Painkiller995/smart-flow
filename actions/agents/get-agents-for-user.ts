"use server"

import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"

export async function GetAgentsForUser() {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    return await prisma.aiAgent.findMany({
        where: {
            userId
        },
        orderBy: {
            name: "asc"
        }
    })
}  
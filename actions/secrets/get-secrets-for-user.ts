"use server"

import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"

export async function GetSecretsForUser() {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    return await prisma.secret.findMany({
        where: {
            userId
        },
        orderBy: {
            name: "asc"
        }
    })
}
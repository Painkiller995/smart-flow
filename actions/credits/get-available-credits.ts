"use server"

import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"

export async function GetAvailableCredits() {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const balance = await prisma.userBalance.findUnique({
        where: {
            userId
        }
    })

    if (!balance) return -1

    return balance.credits

} 
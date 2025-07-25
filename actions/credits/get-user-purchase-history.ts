"use server"

import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"

export async function GetUserPurchaseHistory() {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const userPurchases = await prisma.userPurchase.findMany({
        where: {
            userId
        },
        orderBy: {
            date: "desc"
        }
    })

    return userPurchases
}
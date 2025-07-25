"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"

export async function SetupUser() {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const balance = await prisma.userBalance.findUnique({
        where: {
            userId
        }
    })

    if (!balance) {
        await prisma.userBalance.create({
            data: {
                userId,
                credits: 100
            }
        })
    }

    redirect("/workflows")
}
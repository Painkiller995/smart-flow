"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"


export async function DeleteSecret(name: string) {

    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    await prisma.secret.delete({
        where: {
            userId_name: {
                userId,
                name,
            }
        }
    })
    revalidatePath("/secrets")
}
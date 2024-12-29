"use server"

import prisma from "@/lib/prisma"
import { createAgentSchema, createAgentSchemaType } from "@/schema/agent"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function CreateAgent(form: createAgentSchemaType) {

    const { success, data } = createAgentSchema.safeParse(form)

    if (!success) {
        throw new Error("invalid form data")
    }

    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }


    const result = await prisma.aiAgent.create({
        data: {
            userId,
            name: data.name,
            description: data.description,
            model: data.model,
            temperature: data.temperature,
        }
    })

    if (!result) {
        throw new Error('Failed to create agent')
    }

    revalidatePath('/agents')

}
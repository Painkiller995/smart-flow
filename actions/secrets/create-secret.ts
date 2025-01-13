"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { symmetricEncrypt } from "@/lib/encryption"
import prisma from "@/lib/prisma"
import { createSecretSchema, createSecretSchemaType } from "@/schema/secret"

export async function CreateSecret(form: createSecretSchemaType) {

    const { success, data } = createSecretSchema.safeParse(form)

    if (!success) {
        throw new Error("invalid form data")
    }

    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const encryptedValue = symmetricEncrypt(data.value)

    const result = await prisma.secret.create({
        data: {
            userId,
            name: data.name,
            value: encryptedValue
        }
    })

    if (!result) {
        throw new Error('Failed to create secret')
    }

    revalidatePath('/secrets')

}
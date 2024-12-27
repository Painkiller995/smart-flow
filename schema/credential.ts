import { z } from "zod"

export const createCredentialSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name must have at least 1 character." })
        .max(50, { message: "Name must not exceed 50 characters." }),
    value: z.string().min(1).max(500)
})

export type createCredentialSchemaType = z.infer<typeof createCredentialSchema>

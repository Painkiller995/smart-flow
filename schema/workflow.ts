import { z } from "zod"

export const createWorkflowSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name must have at least 1 character." })
        .max(50, { message: "Name must not exceed 50 characters." }),
    description: z.string().max(80).optional()
})

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>


export const duplicateWorkflowSchema = createWorkflowSchema.extend(
    {
        workflowId: z.string()
    }
)

export type duplicateWorkflowSchemaType = z.infer<typeof duplicateWorkflowSchema>
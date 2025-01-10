import { z } from "zod";

export const createAgentSchema = z.object({
    id: z.string().cuid().optional(),
    name: z
        .string()
        .min(1, { message: "Name must have at least 1 character." })
        .max(50, { message: "Name must not exceed 50 characters." }),
    description: z
        .string()
        .min(1, { message: "Description must have at least 1 character." })
        .max(500, { message: "Description must not exceed 500 characters." }),
    model: z
        .string()
        .min(1, { message: "Model name must have at least 1 character." })
        .max(50, { message: "Model name must not exceed 50 characters." }),
    temperature: z
        .coerce
        .number()
        .min(1)
        .default(1),
});

export type createAgentSchemaType = z.infer<typeof createAgentSchema>

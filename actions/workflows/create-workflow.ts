"use server"

import { auth } from "@clerk/nextjs/server"
import { Edge } from "@xyflow/react"
import { redirect } from "next/navigation"

import prisma from "@/lib/prisma"
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow"
import { AppNode } from "@/types/app-node"
import { WorkflowStatus } from "@/types/workflow"

export async function CreateWorkflow(form: createWorkflowSchemaType) {

    const { success, data } = createWorkflowSchema.safeParse(form)

    if (!success) {
        throw new Error("invalid form data")
    }

    const { userId } = await auth()

    if (!userId) {
        throw new Error("unauthenticated")
    }

    const initialFlow: { nodes: AppNode[], edges: Edge[] } = {
        nodes: [], edges: []
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...data,

        }
    })

    if (!result) {
        throw new Error("Failed to create workflow")
    }

    redirect(`/workflow/editor/${result.id}`)
} 
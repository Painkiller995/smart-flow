import { Edge } from "@xyflow/react";

import { AppNode, AppNodeMissingInputs } from "@/types/app-node";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { TaskRegistry } from "./task/registry";

export enum FlowToExecutionPlanValidationError {
    "NO_ENTRY_POINT",
    "MULTIPLE_ENTRY_POINTS_NOT_ALLOWED",
    "INVALID_INPUTS"
}

type FlowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlan
    error?: {
        type: FlowToExecutionPlanValidationError,
        invalidElements?: AppNodeMissingInputs[]
    }
}

export function FlowToExecutionPlan(nodes: AppNode[], edges: Edge[]): FlowToExecutionPlanType {

    const entryPoints = nodes.filter((n) => n.data.isEntryPoint);

    if (entryPoints.length > 1) {
        return { error: { type: FlowToExecutionPlanValidationError.MULTIPLE_ENTRY_POINTS_NOT_ALLOWED } };
    }

    if (entryPoints.length === 0) {
        return { error: { type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT } };
    }

    const entryPoint = entryPoints[0];

    const inputsWithErrors: AppNodeMissingInputs[] = []

    const planned = new Set<string>()

    const invalidInputs = getInvalidInputs(entryPoint, edges, planned)
    if (invalidInputs.length > 0) {
        inputsWithErrors.push({
            nodeId: entryPoint.id,
            inputs: invalidInputs
        })
    }

    const executionPlan: WorkflowExecutionPlan = [
        {
            phase: 1,
            nodes: [entryPoint]
        }
    ]

    planned.add(entryPoint.id)

    for (let phase = 2; phase <= nodes.length && planned.size < nodes.length; phase++) {
        const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] }

        for (const currentNode of nodes) {

            if (planned.has(currentNode.id)) {
                // Node already put in the execution plan
                continue
            }

            const invalidInputs = getInvalidInputs(currentNode, edges, planned)

            if (invalidInputs.length > 0) {
                const incomers = getIncomers(currentNode, nodes, edges)
                if (incomers.every((incomer) => planned.has(incomer.id))) {
                    console.error("Invalid input", currentNode.id, invalidInputs)
                    inputsWithErrors.push({
                        nodeId: currentNode.id,
                        inputs: invalidInputs
                    })
                } else { continue }
            }

            nextPhase.nodes.push(currentNode)

        }

        for (const phaseNode of nextPhase.nodes) {
            planned.add(phaseNode.id)
        }

        executionPlan.push(nextPhase)

    }

    if (inputsWithErrors.length > 0) {
        return {
            error: {
                type: FlowToExecutionPlanValidationError.INVALID_INPUTS,
                invalidElements: inputsWithErrors,
            }
        }
    }

    return { executionPlan }

}


function getInvalidInputs(node: AppNode, edges: Edge[], planned: Set<string>) {

    const invalidInputs = []

    const inputs = TaskRegistry[node.data.type].inputs

    for (const input of inputs) {

        const inputValue = node.data.inputs[input.name]
        const inputValueProvided = inputValue?.length > 0

        if (inputValueProvided) {
            continue
        }

        const incomingEdges = edges.filter((edge) => edge.target === node.id)

        const inputLinkedToOutput = incomingEdges.find((edge) => edge.targetHandle === input.name)

        const requiredInputProvidedByVisitedOutput = input.require && inputLinkedToOutput && planned.has(inputLinkedToOutput.source)

        if (requiredInputProvidedByVisitedOutput) {
            continue
        }
        else if (!input.require) {
            if (!inputLinkedToOutput) {
                continue
            }
            if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
                continue
            }
        }

        invalidInputs.push(input.name)

    }
    return invalidInputs
}

function getIncomers(node: AppNode, nodes: AppNode[], edges: Edge[]) {
    if (!node.id) {
        return []
    }
    const incomersIds = new Set()
    edges.forEach(edge => {
        incomersIds.add(edge.source)
    });
    return nodes.filter((n) => incomersIds.has(n.id))
}
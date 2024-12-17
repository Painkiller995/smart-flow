import { TaskType } from "@/types/task";

export function CreateFlowNode(
    nodeType: TaskType,
    position?: { x: number, y: number }
) {
    return {
        id: crypto.randomUUID(),
        type: "AutoFLowNode",
        data: {
            type: nodeType,
            inputs: {}
        },
        position: position ?? { x: 0, y: 0 },
    }
}
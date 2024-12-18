import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React, { ReactNode } from "react";
import NodeParamField from "./node-param-field";

interface NodeInputsProps {
  children: ReactNode;
}
const NodeInputs = ({ children }: NodeInputsProps) => {
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
};

export default NodeInputs;

interface NodeInputProps {
  nodeId: string;
  input: TaskParam;
}
export const NodeInput = ({ nodeId, input }: NodeInputProps) => {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField nodeId={nodeId} param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-1 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
};

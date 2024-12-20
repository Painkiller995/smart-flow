import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/task';
import { Handle, Position, useEdges } from '@xyflow/react';
import { ReactNode } from 'react';
import { colorForHandle } from './common';
import NodeParamField from './node-param-field';

interface NodeInputsProps {
  children: ReactNode;
}
const NodeInputs = ({ children }: NodeInputsProps) => {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
};

export default NodeInputs;

interface NodeInputProps {
  nodeId: string;
  input: TaskParam;
}

export const NodeInput = ({ nodeId, input }: NodeInputProps) => {
  const edges = useEdges();

  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );

  return (
    <div className="relative flex w-full justify-start bg-secondary p-3">
      <NodeParamField nodeId={nodeId} param={input} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            '!-left-1 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground',
            colorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};

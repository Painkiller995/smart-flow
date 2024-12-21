import { TaskRegistry } from '@/lib/workflow/task/registry';
import { AppNodeData } from '@/types/app-node';
import { NodeProps } from '@xyflow/react';

import { Badge } from '@/components/ui/badge';
import { memo } from 'react';
import NodeCard from './node-card';
import NodeHeader from './node-header';
import NodeInputs, { NodeInput } from './node-inputs';
import NodeOutputs, { NodeOutput } from './node-outputs';

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      {DEV_MODE && <Badge>Node ID: {props.id}</Badge>}
      <NodeHeader nodeId={props.id} taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input) => (
          <NodeInput key={input.name} input={input} nodeId={props.id} />
        ))}
      </NodeInputs>
      <NodeOutputs>
        {task.outputs.map((output) => (
          <NodeOutput key={output.name} output={output} nodeId={props.id} />
        ))}
      </NodeOutputs>
    </NodeCard>
  );
});

export default NodeComponent;
NodeComponent.displayName = 'NodeComponent';

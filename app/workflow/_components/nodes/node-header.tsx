'use client';

import TooltipWrapper from '@/components/tooltip-wrapper';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CreateFlowNode } from '@/lib/workflow/create-flow-node';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { AppNode } from '@/types/app-node';
import { TaskType } from '@/types/task';
import { useReactFlow } from '@xyflow/react';
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const NodeHeader = ({ taskType, nodeId }: { taskType: TaskType; nodeId: string }) => {
  const [node, setNode] = useState<AppNode | null>(null);
  const task = TaskRegistry[taskType];
  const { deleteElements, getNode, addNodes, updateNode } = useReactFlow();

  const handleToggleEntryPoint = () => {
    if (!node) return;
    const updatedNode = { ...node };
    updatedNode.data.isEntryPoint = !updatedNode.data.isEntryPoint;
    updateNode(nodeId, updatedNode);
    setNode(updatedNode);
  };

  useEffect(() => {
    const node = getNode(nodeId) as AppNode;
    if (!node) return;
    setNode(node);
  }, [getNode, nodeId]);

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={30} />
      <div className="flex w-full items-center justify-between">
        <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
      </div>
      <div className="flex items-center gap-1">
        {task.isEntryPoint && <Badge>Entry</Badge>}
        <Badge className="flex items-center gap-2 text-xs">
          <CoinsIcon size={16}></CoinsIcon>
          {task.credits}
        </Badge>
        {!task.isEntryPoint && (
          <>
            <TooltipWrapper content="Entry Point">
              <div className="flex items-center space-x-2">
                <Switch
                  id={nodeId}
                  checked={node?.data?.isEntryPoint || false}
                  onClick={handleToggleEntryPoint}
                />
              </div>
            </TooltipWrapper>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const node = getNode(nodeId) as AppNode;
                if (!node) return;
                const newX = node.position.x;
                const newY = node.position.y + node.measured?.height! + 20;
                const newNode = CreateFlowNode(node.data.type, { x: newX, y: newY });
                addNodes([newNode]);
              }}
            >
              <CopyIcon size={12} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                deleteElements({ nodes: [{ id: nodeId }] });
              }}
            >
              <TrashIcon size={12} />
            </Button>
          </>
        )}

        <Button variant="ghost" size="icon" className="drag-handle cursor-grab">
          <GripVerticalIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default NodeHeader;

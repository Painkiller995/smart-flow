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
import { CopyIcon, GemIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

const NodeHeader = ({ taskType, nodeId }: { taskType: TaskType; nodeId: string }) => {
  const hideCreditIcon = process.env.NEXT_PUBLIC_DISABLE_CREDIT_UI_COMPONENTS === 'true';

  const [isEntryPoint, setIsEntryPoint] = useState<boolean>(false);

  const task = TaskRegistry[taskType];

  const { deleteElements, getNode, getNodes, addNodes, updateNodeData } = useReactFlow();

  const fetchNodeData = useCallback(() => {
    const node = getNode(nodeId) as AppNode | undefined;
    return node ? node.data : null;
  }, [getNode, nodeId]);

  const toggleEntryPoint = useCallback(() => {
    const node = getNode(nodeId) as AppNode;
    if (!node) return;

    const nodes = getNodes();
    const existingEntryPoint = nodes.some((n) => n.data.isEntryPoint && n.id !== node.id);

    if (existingEntryPoint && !node.data.isEntryPoint) {
      toast.error(
        'Only one entry point is allowed. Please remove the existing entry point before adding a new one.'
      );
      return;
    }

    setIsEntryPoint((prev) => !prev);
  }, [getNode, getNodes, nodeId]);

  const addNodeBelow = useCallback(() => {
    const node = getNode(nodeId) as AppNode;
    if (!node) return;

    const newNode = CreateFlowNode(node.data.type, {
      x: node.position.x,
      y: node.position.y + (node.measured?.height || 0) + 20,
    });

    addNodes([newNode]);
  }, [addNodes, getNode, nodeId]);

  const removeNode = useCallback(() => {
    deleteElements({ nodes: [{ id: nodeId }] });
  }, [deleteElements, nodeId]);

  useEffect(() => {
    const data = fetchNodeData();
    if (!data) return;
    setIsEntryPoint(data.isEntryPoint || false);
  }, [fetchNodeData]);

  useEffect(() => {
    updateNodeData(nodeId, { isEntryPoint });
  }, [isEntryPoint, nodeId, updateNodeData]);

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={30} />
      <div className="flex w-full items-center justify-between">
        <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
      </div>
      <div className="flex items-center gap-1">
        {!hideCreditIcon && (
          <Badge className="flex items-center gap-2 text-xs">
            <GemIcon size={16}></GemIcon>
            {task.credits}
          </Badge>
        )}
        <TooltipWrapper content="Entry Point">
          <div className="flex items-center space-x-2">
            <Switch id={nodeId} checked={isEntryPoint} onClick={toggleEntryPoint} />
          </div>
        </TooltipWrapper>
        <Button variant="ghost" size="icon" onClick={addNodeBelow}>
          <CopyIcon size={12} />
        </Button>
        <Button variant="ghost" size="icon" onClick={removeNode}>
          <TrashIcon size={12} />
        </Button>
        <Button variant="ghost" size="icon" className="drag-handle cursor-grab">
          <GripVerticalIcon size={20} />
        </Button>
      </div>
    </div>
  );
};

export default NodeHeader;

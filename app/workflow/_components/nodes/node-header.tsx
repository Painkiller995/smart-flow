'use client';

import { useReactFlow } from '@xyflow/react';
import { GemIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';
import { useCallback } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/task';

const NodeHeader = ({ taskType, nodeId }: { taskType: TaskType; nodeId: string }) => {
  const hideCreditIcon = process.env.NEXT_PUBLIC_DISABLE_CREDIT_UI_COMPONENTS === 'true';

  const task = TaskRegistry[taskType];

  const { deleteElements } = useReactFlow();

  const removeNode = useCallback(() => {
    deleteElements({ nodes: [{ id: nodeId }] });
  }, [deleteElements, nodeId]);

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={30} />
      <div className="flex w-full items-center justify-between">
        <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
      </div>
      <div className="flex items-center gap-1">
        {!hideCreditIcon && (
          <Badge
            variant="outline"
            className="flex items-center gap-2 rounded-sm text-xs text-primary"
          >
            <GemIcon size={16}></GemIcon>
            {task.credits}
          </Badge>
        )}
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

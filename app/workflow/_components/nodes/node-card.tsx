'use client';

import useFlowValidation from '@/components/hooks/use-flow-validation';
import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';
import { ReactNode } from 'react';

interface NodeCardProps {
  nodeId: string;
  isSelected: boolean;
  children: ReactNode;
}

const NodeCard = ({ nodeId, isSelected, children }: NodeCardProps) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId);

        if (!node) return;

        const { position, measured } = node;

        if (!position || !measured) return;

        const { width, height } = measured;

        const x = position.x;
        const y = position.y;
        if (x === undefined || y === undefined) return;
        setCenter(x + width! / 2, y + height! / 2, { zoom: 1, duration: 500 });
      }}
      className={cn(
        'flex w-[420px] border-separate cursor-pointer flex-col gap-1 rounded-md border-2 bg-background text-xs',
        isSelected && 'border-primary',
        hasInvalidInputs && 'border-2 border-destructive'
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;

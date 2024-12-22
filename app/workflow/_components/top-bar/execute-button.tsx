'use client';

import { RunWorkflow } from '@/actions/workflows/run-workflow';
import UseExecutionPlan from '@/components/hooks/use-execution-plan';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ExecuteButtonProps {
  workflowId: string;
}
const ExecuteButton = ({ workflowId }: ExecuteButtonProps) => {
  const generate = UseExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success('Execution started', { id: 'flow-execution' });
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'flow-execution' });
    },
  });

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate();
        if (!plan) {
          return;
        }
        mutation.mutate({ workflowId: workflowId, flowDefinition: JSON.stringify(toObject()) });
      }}
    >
      <PlayIcon size={16} className="stroke-orange-400" />
      Execute
    </Button>
  );
};

export default ExecuteButton;

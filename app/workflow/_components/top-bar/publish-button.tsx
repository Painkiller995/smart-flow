'use client';

import { PublishWorkflow } from '@/actions/workflows/publish-workflow';
import UseExecutionPlan from '@/components/hooks/use-execution-plan';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

interface PublishButtonProps {
  workflowId: string;
}
const PublishButton = ({ workflowId }: PublishButtonProps) => {
  const generate = UseExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow published', { id: 'flow-execution' });
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

export default PublishButton;

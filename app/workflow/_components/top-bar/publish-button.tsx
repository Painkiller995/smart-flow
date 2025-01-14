'use client';

import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { UploadIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import UseExecutionPlan from '@/components/hooks/use-execution-plan';
import { PublishWorkflow } from '@/actions/workflows/publish-workflow';

interface PublishButtonProps {
  workflowId: string;
}
const PublishButton = ({ workflowId }: PublishButtonProps) => {
  const generate = UseExecutionPlan();
  const { toObject } = useReactFlow();

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow published', { id: workflowId });
    },
    onError: () => {
      toast.error('Something went wrong', { id: workflowId });
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
        toast.loading('Publishing workflow...', { id: workflowId });
        mutation.mutate({ id: workflowId, flowDefinition: JSON.stringify(toObject()) });
      }}
    >
      <UploadIcon size={16} className="stroke-blue-400" />
      Publish
    </Button>
  );
};

export default PublishButton;

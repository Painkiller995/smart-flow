'use client';

import { RunWorkflow } from '@/actions/workflows/run-workflow';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

interface RunWorkflowButtonProps {
  workflowId: string;
}
const RunWorkflowButton = ({ workflowId }: RunWorkflowButtonProps) => {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.info('Scheduling run...', { id: workflowId });
        mutation.mutate({ workflowId });
      }}
    >
      <PlayIcon size={16} className="stroke-green-400" />
      Run
    </Button>
  );
};

export default RunWorkflowButton;

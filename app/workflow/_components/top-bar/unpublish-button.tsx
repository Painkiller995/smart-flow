'use client';

import { useMutation } from '@tanstack/react-query';
import { DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { UnpublishWorkflow } from '@/actions/workflows/unpublish-workflow';

interface UnpublishButtonProps {
  workflowId: string;
}
const UnpublishButton = ({ workflowId }: UnpublishButtonProps) => {
  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow unpublished', { id: workflowId });
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
        toast.loading('Unpublishing workflow...', { id: workflowId });
        mutation.mutate({ id: workflowId });
      }}
    >
      <DownloadIcon size={16} className="stroke-red-500" />
      Unpublish
    </Button>
  );
};

export default UnpublishButton;

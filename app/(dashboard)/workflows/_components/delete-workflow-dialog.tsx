'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { DeleteWorkflow } from '@/actions/workflows/delete-workflow';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

interface DeleteWorkflowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowId: string;
  workflowName: string;
}

const DeleteWorkflowDialog = ({
  open,
  setOpen,
  workflowId,
  workflowName,
}: DeleteWorkflowDialogProps) => {
  const [confirmText, setConfirmText] = useState('');

  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success('Workflow deleted', { id: workflowId });
    },
    onError: () => {
      toast.error('Failed to delete the workflow', { id: workflowId });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this item is a permanent action and cannot be undone.
            <br />
            To proceed, please type{' '}
            <span className="inline font-bold text-red-500">{workflowName}</span> in the field below
            to confirm.
            <Input
              className="mt-2"
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
              }}
            ></Input>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setConfirmText('');
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={workflowName !== confirmText || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deleting workflow...', { id: workflowId });
              deleteMutation.mutate(workflowId);
              setConfirmText('');
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;

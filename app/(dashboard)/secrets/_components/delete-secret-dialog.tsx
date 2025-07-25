'use client';

import { useMutation } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { DeleteSecret } from '@/actions/secrets/delete-secret';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DeleteSecretDialogProps {
  secretName: string;
}

const DeleteSecretDialog = ({ secretName }: DeleteSecretDialogProps) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const deleteMutation = useMutation({
    mutationFn: DeleteSecret,
    onSuccess: () => {
      toast.success('Secret deleted', { id: secretName });
    },
    onError: () => {
      toast.error('Failed to delete the secret', { id: secretName });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <XIcon size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting this item is a permanent action and cannot be undone.
            <br />
            To proceed, please type{' '}
            <span className="inline font-bold text-red-500">{secretName}</span> in the field below
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
            disabled={secretName !== confirmText || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deleting secret...', { id: secretName });
              deleteMutation.mutate(secretName);
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

export default DeleteSecretDialog;

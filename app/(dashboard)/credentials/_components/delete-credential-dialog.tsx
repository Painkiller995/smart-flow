'use client';

import { DeleteCredential } from '@/actions/credentials/delete-credential';
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
import { useMutation } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteCredentialDialogProps {
  credentialName: string;
}

const DeleteCredentialDialog = ({ credentialName }: DeleteCredentialDialogProps) => {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const deleteMutation = useMutation({
    mutationFn: DeleteCredential,
    onSuccess: () => {
      toast.success('Credential deleted', { id: credentialName });
    },
    onError: () => {
      toast.error('Failed to delete the credential', { id: credentialName });
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
          <AlertDialogDescription className="space-x-1 space-y-1">
            Deleting this item is irreversible.
            <br />
            To confirm, please type <strong>{credentialName}</strong> in the field below.
            <Input
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
            disabled={credentialName !== confirmText || deleteMutation.isPending}
            onClick={() => {
              toast.loading('Deleting credential...', { id: credentialName });
              deleteMutation.mutate(credentialName);
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

export default DeleteCredentialDialog;

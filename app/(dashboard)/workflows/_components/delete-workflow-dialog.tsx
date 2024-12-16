"use client";

import { DeleteWorkflow } from "@/actions/workflows/delete-workflow";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

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
  const [confirmText, setConfirmText] = useState("");

  const deleteMutation = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted", { id: workflowId });
    },
    onError: () => {
      toast.error("Failed to delete the workflow", { id: workflowId });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="space-x-1 space-y-1">
            Deleting this item is irreversible.
            <br />
            To confirm, please type <strong>{workflowName}</strong> in the field
            below.
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
              setConfirmText("");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={workflowName !== confirmText || deleteMutation.isPending}
            onClick={() => {
              toast.loading("Deleting workflow...", { id: workflowId });
              deleteMutation.mutate(workflowId);
              setConfirmText("");
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

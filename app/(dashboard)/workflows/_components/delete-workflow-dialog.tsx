"use client";

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
import React, { useState } from "react";

interface DeleteWorkflowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
}

const DeleteWorkflowDialog = ({
  open,
  setOpen,
  workflowName,
}: DeleteWorkflowDialogProps) => {
  const [confirmText, setConfirmText] = useState("");
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            If you delete this you will not be able to go back
            <div className="flex flex-col py-4 gap-2">
              <p>
                if you are sure enter <b>{workflowName}</b> to confirm
              </p>
            </div>
            <Input
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
              }}
            ></Input>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={workflowName !== confirmText}
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

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layers2Icon } from "lucide-react";
import CustomDialogHeader from "./custom-dialog-header";
import { useForm } from "react-hook-form";
import { createWorkflowSchema } from "@/schema/workflow";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateWorkflowDialogProps {
  triggerText?: string;
}

const CreateWorkflowDialog = ({ triggerText }: CreateWorkflowDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createWorkflowSchema>>({
    resolver: zodResolver(createWorkflowSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Create workflow"
          subTitle="Start building your workflow"
          icon={Layers2Icon}
        />
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;

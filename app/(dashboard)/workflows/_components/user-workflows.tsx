import { GetWorkflowsForUser } from "@/actions/workflows/get-workflows-for-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { waitFor } from "@/lib/helper/wait-for";
import { AlertCircle, InboxIcon } from "lucide-react";
import React from "react";
import CreateWorkflowDialog from "./create-workflow-dialog";

async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow created yet!</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow"></CreateWorkflowDialog>
      </div>
    );
  }

  return <div>Test</div>;
}

export default UserWorkflows;

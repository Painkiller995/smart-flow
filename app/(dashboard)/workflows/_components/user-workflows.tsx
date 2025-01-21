import { AlertCircle, InboxIcon } from 'lucide-react';

import { GetWorkflowsForUser } from '@/actions/workflows/get-workflows-for-user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CreateWorkflowDialog from './create-workflow-drawer';
import WorkflowCard from './workflow-card';

async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Please try again later</AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
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

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow, index) => {
        return <WorkflowCard key={index} workflow={workflow}></WorkflowCard>;
      })}
    </div>
  );
}

export default UserWorkflows;

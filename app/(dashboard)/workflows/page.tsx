import { Suspense } from 'react';

import CreateWorkflowDrawer from './_components/create-workflow-drawer';
import UserWorkflows from './_components/user-workflows';
import UserWorkflowsSkeleton from './_components/user-workflows-skeleton';

const WorkflowsPage = () => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDrawer />
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

export default WorkflowsPage;

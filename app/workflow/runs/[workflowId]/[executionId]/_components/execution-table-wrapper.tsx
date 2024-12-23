import { GetWorkflowExecutions } from '@/actions/workflows/get-workflow-executions';
import { InboxIcon } from 'lucide-react';
import ExecutionsTable from './execution-table';

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);

  if (!executions) {
    return <div className="">No data</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No runs have been triggered yet for this workflow</p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editor page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full py-6">
      <ExecutionsTable initialData={executions} workflowId={workflowId} />
    </div>
  );
}

export default ExecutionsTableWrapper;

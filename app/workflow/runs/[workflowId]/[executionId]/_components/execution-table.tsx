import { GetWorkflowExecutions } from '@/actions/workflows/get-workflow-executions';
import { InboxIcon } from 'lucide-react';

async function ExecutionsTable({ workflowId }: { workflowId: string }) {
  const executions = await GetWorkflowExecutions(workflowId);

  if (!executions) {
    return <div className="">No data</div>;
  }

  if (executions.length == 0) {
    <div className="container w-full py-6">
      <div>
        <div>
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="">
          <p className="font-bold">No runs have been triggered yet for this workflow</p>
          <p className="text-sm text-muted-foreground">
            You can trigger a new run in the editor page
          </p>
        </div>
      </div>
    </div>;
  }

  return <pre className=""> {JSON.stringify(executions, null, 4)}</pre>;
}

export default ExecutionsTable;

import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/get-workflow-execution-with-phases';
import TopBar from '@/app/workflow/_components/top-bar/top-bar';
import { auth } from '@clerk/nextjs/server';

import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';
import ExecutionViewer from './_components/execution-viewer';

interface ExecutionViewerPagePops {
  params: Promise<{ workflowId: string; executionId: string }>;
}

const ExecutionViewerPage = async ({ params }: ExecutionViewerPagePops) => {
  const { workflowId, executionId } = await params;
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <TopBar
        workflowId={workflowId}
        title="Workflow run details"
        subtitle={`Execution ID: ${executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default ExecutionViewerPage;

async function ExecutionViewerWrapper({ executionId }: { executionId: string }) {
  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthenticated</div>;
  }

  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);

  return <ExecutionViewer initialData={workflowExecution} />;
}

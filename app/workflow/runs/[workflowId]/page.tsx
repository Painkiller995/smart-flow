import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';

import TopBar from '../../_components/top-bar/top-bar';
import ExecutionsTableWrapper from './[executionId]/_components/execution-table-wrapper';

interface ExecutionsPageProps {
  params: Promise<{ workflowId: string }>;
}

const ExecutionsPage = async ({ params }: ExecutionsPageProps) => {
  const { workflowId } = await params;
  return (
    <div className="h-full w-full overflow-auto">
      <TopBar
        workflowId={workflowId}
        title="All runs"
        subtitle="List of all your workflow runs"
        hideButtons
      />
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loader2Icon size={30} className="animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={workflowId} />
      </Suspense>
    </div>
  );
};

export default ExecutionsPage;

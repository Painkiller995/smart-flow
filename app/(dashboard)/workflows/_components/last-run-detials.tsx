import ExecutionStatusIndicator from '@/app/workflow/runs/[workflowId]/[executionId]/_components/execution-status-indicator';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

const LastRunDetails = ({ workflow }: { workflow: Workflow }) => {
  const { lastRunId, lastRunStatus, lastRunAt } = workflow;

  const formatStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });

  return (
    <div className="flex items-center justify-between bg-primary/5 px-4 py-1 text-muted-foreground">
      <div className="flex items-center gap-2 text-sm">
        {lastRunAt && (
          <Link
            href={`/workflow/runs/${workflow.id}/${lastRunId}`}
            className="group flex items-center gap-2 text-sm"
          >
            <span>Last run:</span>
            <ExecutionStatusIndicator status={lastRunStatus as WorkflowExecutionStatus} />
            <span>{lastRunStatus}</span>
            <span>{formatStartedAt}</span>
            <ChevronRightIcon
              size={14}
              className="-translate-x-[2px] transition group-hover:translate-x-0"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LastRunDetails;

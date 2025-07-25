import { Workflow } from '@prisma/client';
import { format, formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ChevronRightIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';

import ExecutionStatusIndicator from '@/app/workflow/runs/[workflowId]/[executionId]/_components/execution-status-indicator';
import ExecutionStatusLabel from '@/app/workflow/runs/[workflowId]/[executionId]/_components/execution-status-label';
import { WorkflowExecutionStatus, WorkflowStatus } from '@/types/workflow';

const LastRunDetails = ({ workflow }: { workflow: Workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  const { lastRunId, lastRunStatus, lastRunAt, nextRunAt } = workflow;

  const formatStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });
  const nextSchedule = nextRunAt && format(nextRunAt, 'yyyy-MM-dd HH:mm');
  const nextScheduleUTC = nextRunAt && formatInTimeZone(nextRunAt, 'UTC', 'HH:mm');

  if (isDraft) return null;

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
            <ExecutionStatusLabel status={lastRunStatus as WorkflowExecutionStatus} />
            <span>{formatStartedAt}</span>
            <ChevronRightIcon
              size={14}
              className="-translate-x-[2px] transition group-hover:translate-x-0"
            />
          </Link>
        )}
        {!lastRunAt && <p>No runs yet</p>}
      </div>
      {nextRunAt && (
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon size={16} />
          <span>Next run at:</span>
          <span>{nextSchedule}</span>
          <span className="text-xs">({nextScheduleUTC} UTC)</span>
        </div>
      )}
    </div>
  );
};

export default LastRunDetails;

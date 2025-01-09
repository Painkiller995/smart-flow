'use client';

import { GetWorkflowExecutions } from '@/actions/workflows/get-workflow-executions';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DatesToDurationString } from '@/lib/helper/dates';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { GemIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ExecutionStatusIndicator from './execution-status-indicator';

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>;

function ExecutionsTable({
  workflowId,
  initialData,
}: {
  workflowId: string;
  initialData: InitialDataType;
}) {
  const router = useRouter();

  const query = useQuery({
    queryKey: ['executions', workflowId],
    initialData,
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5000,
  });

  return (
    <div className="overflow-auto rounded-lg border shadow-md">
      <Table className="h-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className="text-right text-xs text-muted-foreground">Started at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data?.map((execution) => {
            const duration = DatesToDurationString(execution.completedAt, execution.startedAt);
            const formatStartedAt =
              execution.startedAt && formatDistanceToNow(execution.startedAt, { addSuffix: true });
            return (
              <TableRow
                key={execution.id}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/workflow/runs/${workflowId}/${execution.id}`);
                }}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{execution.id}</span>
                    <div className="space-x-1 text-xs text-muted-foreground">
                      <span>Triggered via</span>
                      <Badge variant="outline">{execution.trigger}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <ExecutionStatusIndicator
                        status={execution.status as WorkflowExecutionStatus}
                      />
                      <span className="font-semibold capitalize">{execution.status}</span>
                    </div>
                    <div className="mx-5 text-xs text-muted-foreground">{duration}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <GemIcon size={16} className="text-primary" />
                      <span className="font-semibold capitalize">{execution.creditsConsumed}</span>
                    </div>
                    <div className="mx-5 text-xs text-muted-foreground">Credits</div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatStartedAt}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default ExecutionsTable;

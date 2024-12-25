import { cn } from '@/lib/utils';
import { WorkflowExecutionStatus } from '@/types/workflow';

const statusColors: Record<WorkflowExecutionStatus, string> = {
  PENDING: 'text-slate-400',
  RUNNING: 'text-yellow-400',
  FAILED: 'text-red-400',
  COMPLETED: 'text-emerald-600',
};

const ExecutionStatusLabel = ({ status }: { status: WorkflowExecutionStatus }) => {
  return <span className={cn('lowercase', statusColors[status])}>{status}</span>;
};

export default ExecutionStatusLabel;

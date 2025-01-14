import { CircleCheckIcon, CircleDashedIcon, CircleXIcon, Loader2Icon } from 'lucide-react';

import { WorkflowExecutionStatus } from '@/types/workflow';

interface WorkflowStatusBadgeProps {
  status: WorkflowExecutionStatus;
}
const WorkflowStatusBadge = ({ status }: WorkflowStatusBadgeProps) => {
  switch (status) {
    case WorkflowExecutionStatus.PENDING:
      return <CircleDashedIcon size={20} className="stroke-muted-foreground" />;
    case WorkflowExecutionStatus.RUNNING:
      return <Loader2Icon size={20} className="animate-spin stroke-yellow-500" />;
    case WorkflowExecutionStatus.FAILED:
      return <CircleXIcon size={20} className="stroke-destructive" />;
    case WorkflowExecutionStatus.COMPLETED:
      return <CircleCheckIcon size={20} className="stroke-green-500" />;
    default:
      return <div className="rounded-full">{status}</div>;
  }
};
export default WorkflowStatusBadge;

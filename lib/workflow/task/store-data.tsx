import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { BrainIcon, LucideProps } from 'lucide-react';

export const StoreDataTask = {
  type: TaskType.STORE_DATA,
  label: 'Memory',
  icon: (props: LucideProps) => <BrainIcon className="stroke-orange-400" {...props} />,
  credits: 2,
  inputs: [
    {
      name: 'Extend memory',
      type: TaskParamType.STRING,
    },
  ] as const,
  outputs: [
    {
      name: 'Memory content',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

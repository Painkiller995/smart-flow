import { BracesIcon, LucideProps } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const MergeTwoJsonTask = {
  type: TaskType.MERGE_TWO_JSON,
  label: 'Merge two JSON',
  icon: (props: LucideProps) => <BracesIcon className="stroke-amber-400" {...props} />,
  credits: 1,
  inputs: [
    {
      name: 'First JSON',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Second JSON',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Disabled',
      type: TaskParamType.BOOLEAN,
    },
  ] as const,
  outputs: [
    {
      name: 'Merged JSON',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

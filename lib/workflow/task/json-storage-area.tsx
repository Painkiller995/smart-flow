import { BracesIcon, LucideProps } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const JsonStorageAreaTask = {
  type: TaskType.JSON_STORAGE_AREA,
  label: 'JSON area',
  icon: (props: LucideProps) => <BracesIcon className="stroke-amber-400" {...props} />,
  credits: 1,
  inputs: [
    {
      name: 'JSON',
      type: TaskParamType.STRING,
      require: true,
      hideHandle: true,
      variant: 'textarea',
    },
  ] as const,
  outputs: [
    {
      name: 'JSON',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

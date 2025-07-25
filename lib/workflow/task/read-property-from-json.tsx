import { FileJson2Icon, LucideProps } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const ReadPropertyFromJsonTask = {
  type: TaskType.READ_PROPERTY_FROM_JSON,
  label: 'Read property from JSON',
  icon: (props: LucideProps) => <FileJson2Icon className="stroke-rose-400" {...props} />,
  credits: 1,
  inputs: [
    {
      name: 'JSON',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Property name',
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
      name: 'Property value',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

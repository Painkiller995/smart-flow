import { DatabaseIcon, LucideProps } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: 'Add property to JSON',
  icon: (props: LucideProps) => <DatabaseIcon className="stroke-amber-400" {...props} />,
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
      name: 'Property value',
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
      name: 'Updated JSON',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

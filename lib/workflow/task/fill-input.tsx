import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { Edit3Icon, LucideProps } from 'lucide-react';

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: 'Fill input',
  icon: (props: LucideProps) => <Edit3Icon className="stroke-orange-400" {...props} />,
  credits: 1,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      require: true,
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Value',
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
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { EyeIcon, LucideProps } from 'lucide-react';

export const WaitForElementTask = {
  type: TaskType.WAIT_FOR_ELEMENT,
  label: 'Wait for element',
  icon: (props: LucideProps) => <EyeIcon className="stroke-amber-400" {...props} />,
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
      name: 'Visibility',
      type: TaskParamType.SELECT,
      hideHandle: true,
      require: true,
      options: [
        { label: 'Visible', value: 'visible' },
        { label: 'Hidden', value: 'hidden' },
      ],
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

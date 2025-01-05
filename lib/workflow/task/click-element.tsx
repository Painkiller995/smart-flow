import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { LucideProps, MousePointerClick } from 'lucide-react';

export const ClickElementTask = {
  type: TaskType.CLICK_ELEMENT,
  label: 'Click element',
  icon: (props: LucideProps) => <MousePointerClick className="stroke-orange-400" {...props} />,
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

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { Link2Icon, LucideProps } from 'lucide-react';

export const NavigateUrlTask = {
  type: TaskType.NAVIGATE_URL,
  label: 'Navigate to url',
  icon: (props: LucideProps) => <Link2Icon className="stroke-orange-400" {...props} />,
  credits: 2,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      require: true,
    },
    {
      name: 'URL',
      type: TaskParamType.STRING,
      require: true,
    },
  ] as const,
  outputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;

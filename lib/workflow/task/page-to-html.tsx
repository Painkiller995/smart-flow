import { CodeIcon, LucideProps } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get html from page',
  icon: (props: LucideProps) => <CodeIcon className="stroke-rose-400" {...props} />,
  credits: 2,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      require: true,
    },
    {
      name: 'Disabled',
      type: TaskParamType.BOOLEAN,
    },
  ] as const,
  outputs: [
    {
      name: 'HTML',
      type: TaskParamType.STRING,
    },
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;

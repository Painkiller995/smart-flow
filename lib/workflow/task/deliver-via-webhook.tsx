import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { LucideProps, SendIcon } from 'lucide-react';

export const DeliverViaWebhookTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: 'Deliver via webhook',
  icon: (props: LucideProps) => <SendIcon className="stroke-blue-400" {...props} />,
  credits: 2,
  inputs: [
    {
      name: 'Target URL',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Body',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Disabled',
      type: TaskParamType.BOOLEAN,
    },
  ] as const,
  outputs: [] as const,
} satisfies WorkflowTask;

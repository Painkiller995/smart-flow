import { EyeIcon, LucideProps } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const WebhookPayloadTask = {
  type: TaskType.WEBHOOK_PAYLOAD,
  label: 'Webhook payload',
  icon: (props: LucideProps) => <EyeIcon className="stroke-amber-400" {...props} />,
  credits: 1,
  inputs: [] as const,
  outputs: [
    {
      name: 'Webhook payload',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

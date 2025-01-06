import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { LucideProps, MailIcon } from 'lucide-react';

export const SendEmailTask = {
  type: TaskType.SEND_EMAIL,
  label: 'Sent email',
  icon: (props: LucideProps) => <MailIcon className="stroke-orange-400" {...props} />,
  credits: 1,
  inputs: [
    {
      name: 'Recipient Email Address',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Sender Email Address',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Sender Email Password',
      type: TaskParamType.CREDENTIAL,
      require: true,
    },
    {
      name: 'Email Subject',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Email Body Content',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Email HTML Content',
      type: TaskParamType.STRING,
    },
  ] as const,
  outputs: [
    {
      name: 'Result',
      type: TaskParamType.BOOLEAN,
    },
  ] as const,
} satisfies WorkflowTask;

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { DatabaseIcon, LucideProps } from 'lucide-react';

export const ExecuteRequestTask = {
  type: TaskType.EXECUTE_REQUEST,
  label: 'Execute request',
  icon: (props: LucideProps) => <DatabaseIcon className="stroke-rose-400" {...props} />,
  credits: 2,
  inputs: [
    {
      name: 'Target URL',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Method',
      type: TaskParamType.SELECT,
      hideHandle: true,
      require: true,
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'HEAD', value: 'HEAD' },
        { label: 'OPTIONS', value: 'OPTIONS' },
        { label: 'CONNECT', value: 'CONNECT' },
        { label: 'TRACE', value: 'TRACE' },
      ],
    },
    {
      name: 'Body',
      type: TaskParamType.STRING,
    },
  ] as const,
  outputs: [
    {
      name: 'Extracted text',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

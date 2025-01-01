import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { EthernetPortIcon, LucideProps } from 'lucide-react';

export const ExecuteRequestTask = {
  type: TaskType.EXECUTE_REQUEST,
  label: 'Execute request',
  icon: (props: LucideProps) => <EthernetPortIcon className="stroke-rose-400" {...props} />,
  credits: 2,
  inputs: [
    {
      name: 'Target URL',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Bearer Token',
      type: TaskParamType.CREDENTIAL,
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
    {
      name: 'Encrypted keys',
      type: TaskParamType.JSON_ENCRYPTED_PROPERTY,
      hideHandle: true,
    },
  ] as const,
  outputs: [
    {
      name: 'Response',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

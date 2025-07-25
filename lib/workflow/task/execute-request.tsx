import { EthernetPortIcon, LucideProps } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const ExecuteRequestTask = {
  type: TaskType.EXECUTE_REQUEST,
  label: 'Execute request',
  icon: (props: LucideProps) => <EthernetPortIcon className="stroke-rose-400" {...props} />,
  credits: 3,
  inputs: [
    {
      name: 'Target URL',
      type: TaskParamType.STRING,
      require: true,
    },

    {
      name: 'Bearer Token',
      type: TaskParamType.CREDENTIAL,
      hideHandle: true,
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
      ],
    },
    {
      name: 'Search parameters',
      type: TaskParamType.PARAMETERS,
      hideHandle: true,
    },
    {
      name: 'Body',
      type: TaskParamType.STRING,
    },
    {
      name: 'Encrypted body properties',
      type: TaskParamType.ENCRYPTED_PROPERTIES,
      hideHandle: true,
    },
    {
      name: 'Disabled',
      type: TaskParamType.BOOLEAN,
    },
  ] as const,
  outputs: [
    {
      name: 'Response',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { BrainIcon, LucideProps } from 'lucide-react';

export const ProcessDataWithOpenAiTask = {
  type: TaskType.PROCESS_DATA_WITH_OPEN_AI,
  label: 'Process data with open AI',
  icon: (props: LucideProps) => <BrainIcon className="stroke-rose-400" {...props} />,
  isEntryPoint: false,
  credits: 4,
  inputs: [
    {
      name: 'Content',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Credentials',
      type: TaskParamType.CREDENTIAL,
      require: true,
    },
    {
      name: 'Agents',
      type: TaskParamType.AGENT,
      require: true,
    },
    {
      name: 'Prompt',
      type: TaskParamType.STRING,
      require: true,
      variant: 'textarea',
    },
  ] as const,
  outputs: [
    {
      name: 'Extracted data',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

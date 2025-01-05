import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { LucideProps, TextIcon } from 'lucide-react';

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: 'Extract text from element',
  icon: (props: LucideProps) => <TextIcon className="stroke-rose-400" {...props} />,
  credits: 2,
  inputs: [
    {
      name: 'HTML',
      type: TaskParamType.STRING,
      require: true,
      variant: 'textarea',
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
      name: 'Extracted text',
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;

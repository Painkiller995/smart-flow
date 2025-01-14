import { LucideProps, TextCursorIcon } from 'lucide-react';

import { Conditions } from '@/types/evaluate';
import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';

export const EvaluateStringTask = {
  type: TaskType.EVALUATE_STRING,
  label: 'Evaluate string',
  icon: (props: LucideProps) => <TextCursorIcon className="stroke-amber-400" {...props} />,
  credits: 1,
  inputs: [
    {
      name: 'First Input',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Second Input',
      type: TaskParamType.STRING,
      require: true,
    },
    {
      name: 'Condition',
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
      name: Conditions.ConditionMet,
      type: TaskParamType.BOOLEAN,
    },
    {
      name: Conditions.ConditionNotMet,
      type: TaskParamType.BOOLEAN,
    },
  ] as const,
} satisfies WorkflowTask;

import { Conditions } from '@/types/evaluate';
import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { LucideProps, TimerIcon } from 'lucide-react';

export const EvaluateTimeTask = {
  type: TaskType.EVALUATE_TIME,
  label: 'Evaluate time',
  icon: (props: LucideProps) => <TimerIcon className="stroke-amber-400" {...props} />,
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

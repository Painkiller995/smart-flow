import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { LucideProps, SquareCheckIcon } from 'lucide-react';

export enum Conditions {
  ConditionMet = 'Path A | Condition Met',
  ConditionNotMet = 'Path B | Condition Not Met',
}

export const TriggerActionOnConditionTask = {
  type: TaskType.TRIGGER_ACTION_ON_CONDITION,
  label: 'Trigger action on condition',
  icon: (props: LucideProps) => <SquareCheckIcon className="stroke-amber-400" {...props} />,
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

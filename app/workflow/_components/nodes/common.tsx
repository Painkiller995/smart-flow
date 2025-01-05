import { TaskParamType } from '@/types/task';

export const colorForHandle: Record<TaskParamType, string> = {
  BROWSER_INSTANCE: '!bg-sky-400',
  STRING: '!bg-amber-400',
  SELECT: '!bg-rose-400',
  CREDENTIAL: '!bg-teal-400',
  AGENT: '!bg-rose-400',
  PARAMETERS: '!bg-pink-400',
  ENCRYPTED_PROPERTIES: '!bg-rose-400',
  BOOLEAN: '!bg-green-400',
};

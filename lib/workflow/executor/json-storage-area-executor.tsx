import { ExecutionEnvironment } from '@/types/executor';
import { JsonStorageAreaTask } from '../task/json-storage-area';

export async function JsonStorageAreaExecutor(
  environment: ExecutionEnvironment<typeof JsonStorageAreaTask>
): Promise<boolean> {
  try {
    const JsonData = environment.getInput('JSON');

    if (!JsonData) {
      environment.log.error('JSON value is not defined');
      return false;
    }

    environment.setOutput('JSON', JSON.stringify(JsonData));
    return true;
  } catch (err: any) {
    environment.log.error(err.message);
    return false;
  }
}

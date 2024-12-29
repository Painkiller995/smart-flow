import { ExecutionEnvironment } from '@/types/executor';
import { MergeTwoJsonTask } from '../task/merge-two-json';

export async function MergeTwoJsonExecutor(environment: ExecutionEnvironment<typeof MergeTwoJsonTask>): Promise<boolean> {
  try {

    const firstJsonData = environment.getInput("First JSON")

    if (!firstJsonData) {
      environment.log.error("First JSON value is not defined");
      return false;
    }

    const secondJsonData = environment.getInput("First JSON")

    if (!secondJsonData) {
      environment.log.error("Second JSON value is not defined");
      return false;
    }

    const firstJson = JSON.parse(firstJsonData);
    const secondJson = JSON.parse(secondJsonData);

    const mergedJson = { ...firstJson, ...secondJson };



    environment.setOutput('Merged JSON', JSON.stringify(mergedJson))
    return true
  } catch (err: any) {
    environment.log.error(err.message)
    return false
  }
}  
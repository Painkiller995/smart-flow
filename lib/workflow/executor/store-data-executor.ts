import { ExecutionEnvironment } from '@/types/executor';
import { StoreDataTask } from '../task/store-data';

export async function StoreDataExecutor(environment: ExecutionEnvironment<typeof StoreDataTask>): Promise<boolean> {
    try {
        environment.log.error('Storing data not implemented yet.')
        return false
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
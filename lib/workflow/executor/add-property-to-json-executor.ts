import { ExecutionEnvironment } from '@/types/executor';
import { AddPropertyToJsonTask } from '../task/add-property-to-json';

export async function AddPropertyToJsonExecutor(environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>): Promise<boolean> {
  try {

    const jsonData = environment.getInput("JSON")
    if (!jsonData) {
      environment.log.error("JSON value is not defined")
    }

    const propertyName = environment.getInput("Property name")
    if (!propertyName) {
      environment.log.error("Property name is not defined")
    }

    const propertyValue = environment.getInput("Property value")
    if (!propertyValue) {
      environment.log.error("Property value is not defined")
    }

    const json = JSON.parse(jsonData)
    json[propertyName] = propertyValue

    environment.setOutput('Updated JSON', json)
    return true
  } catch (err: any) {
    environment.log.error(err.message)
    return false
  }
}  
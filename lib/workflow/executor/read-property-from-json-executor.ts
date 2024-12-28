import { ExecutionEnvironment } from '@/types/executor';
import { ReadPropertyFromJsonTask } from '../task/read-property-from-json';

export async function ReadPropertyFromJsonExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>): Promise<boolean> {
    try {

        const jsonData = environment.getInput("JSON")

        if (!jsonData) {
            environment.log.error("JSON value is not defined")
        }

        const propertyName = environment.getInput("Property name")

        if (!propertyName) {
            environment.log.error("Property value is not defined")
        }

        const json = JSON.parse(jsonData)

        const propertyValue = json[propertyName]

        if (!propertyValue) {
            environment.log.error("Property not found")
            return false
        }

        environment.setOutput("Property value", propertyValue)
        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
} 
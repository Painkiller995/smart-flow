import { Conditions } from '@/types/evaluate';
import { ExecutionEnvironment } from '@/types/executor';
import { EvaluateTimeTask } from '../task/evaluate-time';

export async function EvaluateTimeExecutor(environment: ExecutionEnvironment<typeof EvaluateTimeTask>): Promise<boolean> {
    try {

        const firstInput = environment.getInput('First Input');
        if (!firstInput || (typeof firstInput !== 'string' && typeof firstInput !== 'number')) {
            environment.log.error("First input must be a non-empty string or number.");
            return false;
        }

        const secondInput = environment.getInput('Second Input');
        if (!secondInput || (typeof secondInput !== 'string' && typeof secondInput !== 'number')) {
            environment.log.error("Second input must be a non-empty string or number.");
            return false;
        }

        const condition = environment.getInput('Condition');

        const allowedConditions = ['>', '<', '>=', '<=', '===', '!==', '==', '!='];
        if (!condition || typeof condition !== 'string' || !allowedConditions.includes(condition)) {
            environment.log.error("Condition must be a valid operator like >, <, ===, etc.");
            return false;
        }

        const parseDateInput = (input: string | number): Date => {
            if (typeof input === 'string') {
                const parsedDate = new Date(input);
                if (isNaN(parsedDate.getTime())) {
                    throw new Error(`Invalid date string: ${input}`);
                }
                return parsedDate;
            }
            if (typeof input === 'number') {
                return new Date(input);
            }
            throw new Error(`Invalid input for date conversion: ${input}`);
        };

        let firstDate: Date;
        let secondDate: Date;

        try {
            firstDate = parseDateInput(firstInput);
            secondDate = parseDateInput(secondInput);
        } catch (err: any) {
            environment.log.error("Error parsing date inputs: " + err.message);
            return false;
        }

        let conditionBoolean: boolean;
        try {
            // Compare dates based on the condition
            switch (condition) {
                case '>':
                    conditionBoolean = firstDate > secondDate;
                    break;
                case '<':
                    conditionBoolean = firstDate < secondDate;
                    break;
                case '>=':
                    conditionBoolean = firstDate >= secondDate;
                    break;
                case '<=':
                    conditionBoolean = firstDate <= secondDate;
                    break;
                case '===':
                    conditionBoolean = firstDate.getTime() === secondDate.getTime();
                    break;
                case '!==':
                    conditionBoolean = firstDate.getTime() !== secondDate.getTime();
                    break;
                case '==':
                    conditionBoolean = firstDate.getTime() == secondDate.getTime();
                    break;
                case '!=':
                    conditionBoolean = firstDate.getTime() != secondDate.getTime();
                    break;
                default:
                    throw new Error("Invalid condition for date comparison.");
            }
        } catch (err: any) {
            environment.log.error("Error evaluating time condition: " + err.message);
            return false;
        }

        // Handle condition results and outputs
        environment.disableNode(conditionBoolean);
        environment.setOutput(Conditions.ConditionMet, conditionBoolean ? 'true' : 'false');
        environment.setOutput(Conditions.ConditionNotMet, !conditionBoolean ? 'true' : 'false');

        environment.log.info(`Condition ${conditionBoolean ? 'met, executing path A' : 'not met, executing path B'}.`);
        return true;
    } catch (err: any) {
        environment.log.error(err.message);
        return false;
    }
}

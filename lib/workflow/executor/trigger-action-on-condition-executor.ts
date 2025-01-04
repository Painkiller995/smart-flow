import { ExecutionEnvironment } from '@/types/executor';
import { TriggerActionOnConditionTask } from '../task/trigger-action-on-condition';

export async function TriggerActionOnConditionExecutor(environment: ExecutionEnvironment<typeof TriggerActionOnConditionTask>): Promise<boolean> {
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

        let conditionBoolean: boolean;
        try {
            const expression = `${JSON.stringify(firstInput)} ${condition} ${JSON.stringify(secondInput)}`;
            conditionBoolean = Boolean(new Function('return ' + expression)());
        } catch (err: any) {
            environment.log.error("Error evaluating condition string: " + err.message);
            return false;
        }

        console.log(conditionBoolean)

        environment.disablePath(conditionBoolean)
        environment.setOutput('Condition Met', conditionBoolean ? 'true' : 'false');
        environment.setOutput('Condition Not Met', !conditionBoolean ? 'true' : 'false');

        return true;
    } catch (err: any) {
        environment.log.error(err.message);
        return false;
    }
}   
import { ExecutionEnvironment } from '@/types/executor';
import { Conditions, TriggerActionOnConditionTask } from '../task/trigger-action-on-condition';

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

        environment.disableNode(conditionBoolean)
        environment.setOutput(Conditions.ConditionMet, conditionBoolean ? 'true' : 'false')
        environment.setOutput(Conditions.ConditionNotMet, !conditionBoolean ? 'true' : 'false')

        environment.log.info(`Condition ${conditionBoolean ? 'met, executing path A' : 'not met, executing path B'}.`);
        return true;
    } catch (err: any) {
        environment.log.error(err.message);
        return false;
    }
}   
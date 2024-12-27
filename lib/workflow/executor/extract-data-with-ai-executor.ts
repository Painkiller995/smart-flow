import { symmetricDecrypt } from '@/lib/encryption';
import prisma from '@/lib/prisma';
import { ExecutionEnvironment } from '@/types/executor';
import { ExtractDataWithAiTask } from '../task/extract-data-with-ai';

export async function ExtractDataWithAiExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>): Promise<boolean> {
    try {

        const credentials = environment.getInput("Credentials")
        if (!credentials) {
            environment.log.error("Credentials value is not defined")
        }

        const prompt = environment.getInput("Prompt")
        if (!prompt) {
            environment.log.error("Prompt value is not defined")
        }

        const content = environment.getInput("Content")
        if (!content) {
            environment.log.error("Content value is not defined")
        }

        const credential = await prisma.credential.findUnique({
            where: { id: credentials }
        })

        if (!credential) {
            environment.log.error("Credentials not found")
            return false
        }

        const plainCredentialValue = symmetricDecrypt(credential.value)

        if (!plainCredentialValue) {
            environment.log.error("Cannot decrypt credential")
            return false
        }

        console.log(plainCredentialValue)

        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
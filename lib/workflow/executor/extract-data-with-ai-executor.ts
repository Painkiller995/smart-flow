import { symmetricDecrypt } from '@/lib/encryption';
import prisma from '@/lib/prisma';
import { ExecutionEnvironment } from '@/types/executor';
import OpenAI from 'openai';
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

        const openai = new OpenAI({
            apiKey: plainCredentialValue
        })

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: 'You are a webScraper helper that extracts data from HTML or text'
                },
                {
                    role: 'user',
                    content: content
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 1,
        })

        environment.log.info(`Prompt tokens: ${response.usage?.prompt_tokens}`)
        environment.log.info(`Completion tokens: ${response.usage?.completion_tokens}`)

        const result = response.choices[0].message.content

        if (!result) {
            environment.log.error("Empty response form AI")
            return false
        }

        environment.setOutput("Extracted data", result)
        return true
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
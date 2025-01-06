import prisma from '@/lib/prisma';
import sendEmail from '@/lib/send-mail';
import { ExecutionEnvironment } from '@/types/executor';
import { SendEmailTask } from '../task/send-email';

export async function SendEmailExecutor(environment: ExecutionEnvironment<typeof SendEmailTask>): Promise<boolean> {
    try {

        const recipientEmail = environment.getInput('Recipient Email Address');
        const senderEmail = environment.getInput('Sender Email Address');
        const senderPasswordID = environment.getInput('Sender Email Password');
        const emailSubject = environment.getInput('Email Subject');
        const emailText = environment.getInput('Email Body Content');
        const emailHtml = environment.getInput('Email HTML Content');

        if (!recipientEmail || !senderEmail || !senderPasswordID || !emailSubject || !emailText) {
            environment.log.error('Please provide all required fields: Recipient Email, Sender Email, Password, Subject, Body Content.');
            return false;
        }

        const senderPassword = await prisma.secret.findUnique({
            where: {
                id: senderPasswordID
            }
        })

        if (!senderPassword) {
            environment.log.error("Sender email password is missing.");
            return false
        }

        const result = await sendEmail({
            email: senderEmail,
            password: senderPassword.value,
            recipient: recipientEmail,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
        });

        result.status ? environment.log.info(result.message) : environment.log.error(result.message)
        return result.status
    } catch (err: any) {
        environment.log.error(err.message)
        return false
    }
}
import nodemailer from 'nodemailer';
import "server-only";

export default async function sendEmail({
    email,
    password,
    recipient,
    subject,
    text,
    html,
}: {
    email: string;
    password: string;
    recipient: string;
    subject: string;
    text: string;
    html?: string;
}) {
    try {

        let provider: 'gmail' | 'outlook';

        if (email.includes('gmail.com')) {
            provider = 'gmail';
        } else if (email.includes('outlook.com') || email.includes('hotmail.com')) {
            provider = 'outlook';
        } else {
            throw new Error('Unsupported email provider');
        }

        let smtpConfig;
        if (provider === 'gmail') {
            smtpConfig = {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // Use TLS
                auth: {
                    user: email,
                    pass: password,
                },
            };
        } else if (provider === 'outlook') {
            smtpConfig = {
                host: 'smtp.office365.com',
                port: 587,
                secure: false, // Use TLS
                auth: {
                    user: email,
                    pass: password,
                },
            };
        } else {
            throw new Error('Unsupported email provider');
        }


        const transporter = nodemailer.createTransport(smtpConfig);


        const mailOptions = {
            from: email,
            to: recipient,
            subject,
            text,
            html,
        };


        await transporter.sendMail(mailOptions);

        return { status: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { status: false, message: 'Failed to send email', error };
    }
}
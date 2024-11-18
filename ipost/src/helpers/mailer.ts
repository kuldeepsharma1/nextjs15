import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

interface SendEmailProps {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
    verificationLink?: string;
}


export const sendEmail = async ({ email, emailType, userId, verificationLink }: SendEmailProps) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }
        const mailHost = process.env.MAIL_HOST!;
        const mailPort = process.env.MAIL_PORT!;
        const mailUsername = process.env.MAIL_USERNAME!;
        const mailPassword = process.env.MAIL_PASSWORD!;

        const transport = nodemailer.createTransport({
            host: mailHost,
            port: mailPort,
            auth: {
                user: mailUsername,
                pass: mailPassword,
            },
            secure: false,
        });

        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS!,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email address' : 'Reset your password',
            html: `<p>Click <a href="${verificationLink}">here</a> to ${emailType === 'VERIFY' ? 'Verify your email address' : 'Reset your password'}<br/>
            ${verificationLink}
            
            </p> `
        }
        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to send Email: ${error.message}`)
        } else {
            throw new Error('An unknown error occured')
        }

    }
}
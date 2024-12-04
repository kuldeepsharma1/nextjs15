import nodemailer from 'nodemailer';
import User from '@/models/User';
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
                verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiry
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
            });
        }

        const mailHost = process.env.MAIL_HOST!;
        const mailPort = parseInt(process.env.MAIL_PORT!); // Ensure it's a number
        const mailUsername = process.env.MAIL_USERNAME!;
        const mailPassword = process.env.MAIL_PASSWORD!;

        const transport = nodemailer.createTransport({
            service: 'smtp', // Explicitly define the service
            host: mailHost,
            port: mailPort,
            auth: {
                user: mailUsername,
                pass: mailPassword,
            },
            secure: mailPort === 465, // Use TLS if port is 465
        });

        const mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS!,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email address' : 'Reset your password',
            html: `<p>Click <a href="${verificationLink}">here</a> to ${
                emailType === 'VERIFY' ? 'verify your email address' : 'reset your password'
            }.<br/>
            If the link doesn't work, copy and paste this URL into your browser:<br/>
            ${verificationLink}</p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to send email: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

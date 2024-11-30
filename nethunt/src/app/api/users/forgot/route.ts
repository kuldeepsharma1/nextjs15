import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({ message: 'Email to de dede chomu' }, { status: 400 })
    }

    try {
        await connect();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Tera Account nhi ha chomu' }, { status: 400 })
        }
        const verificationLink = `${process.env.APP_URL!}/auth/reset?token=${user._id}`;
        await sendEmail({
            email: user.email,
            emailType: 'RESET',
            userId: user._id.toString(),
            verificationLink,
        })

        return NextResponse.json({
            message: "Password reset email sent successfully"  
        })


    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        } else {
            return NextResponse.json({ message: 'Something went wrong at our end baby Not Your fault' }, { status: 500 })
        }

    }
}
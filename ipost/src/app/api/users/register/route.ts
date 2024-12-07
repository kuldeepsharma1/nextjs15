import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import jwt from 'jsonwebtoken';


export async function POST(request: NextRequest) {
    return NextResponse.json({
        message: "User created",
        success: true,
   
    })

    try {
        await connect();
        const reqBody = await request.json()
        const { username, email, password } = reqBody;
        console.log(reqBody);
        // Todo for you do for username
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: 'what the fuck you are already exist' }, { status: 400 })
        }

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username, email, password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        const verificationToken = jwt.sign(
            { userId: savedUser._id },
            process.env.TOKEN_SECRET!,
            { expiresIn: '1d' }
        );

        const verificationLink = `${process.env.APP_URL!}/auth/verifyemail?token=${verificationToken}`;
        await sendEmail({
            email: savedUser.email,
            emailType: 'VERIFY',
            userId: savedUser._id.toString(),
            verificationLink,
        })
        return NextResponse.json({
            message: "User created",
            success: true,
            savedUser
        })

    } catch (err: unknown) {
        // Handle any unexpected errors
        if (err instanceof Error) {

            return NextResponse.json(
                { message: `Server error: ${err.message}`, success: false },
                { status: 500 }
            );
        }

        console.error('Unexpected error occurred:', err);
        return NextResponse.json(
            { message: 'Unexpected error occurred while updating the blog.', success: false },
            { status: 500 }
        );
    }

}
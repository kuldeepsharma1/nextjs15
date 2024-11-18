import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ error: "Token is missing" }, { status: 400 });
        }

        const decode = jwt.verify(token, process.env.TOKEN_SECRET!) as { userId: string }
        const userId = decode.userId

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.isVerified) {
            return NextResponse.json({ message: "Email already verified" }, { status: 200 });
        }


        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

       return NextResponse.json({ message: "Email  verified" ,success:true});

    } catch (error: any) {
        console.error("Error verify email", error.message);
        return NextResponse.json({ error: error.message || "An unknow error" }, { status: 500 })
    }
}
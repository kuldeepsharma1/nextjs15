import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

export async function POST(req:NextRequest) {
    try {
        const reqBody = await req.json();

        const{token, password}= reqBody;
        
        if (!token || !password) {
            return NextResponse.json({error:"Token is missing"}, {status:400})
            
        }
        await connect()

        const user = await User.findOne({
            forgotPasswordTokenExpiry:{$gt:Date.now()}
        });
        if (!user) {
            return NextResponse.json({error:"Token Expired or Invalid"}, {status:400})
        }
        const isMatch = await bcryptjs.compare(token, user.forgotPasswordToken)

        if (!isMatch) {
            return NextResponse.json({error:"Token Expired or Invalid"}, {status:400})
        }

        const hashedPass = await bcryptjs.hash(password,10)
        user.password=hashedPass;
        user.forgotPasswordToken=undefined;
        user.forgotPasswordTokenExpiry=undefined;  

        await user.save();


return NextResponse.json({
    message:'Password reset successfully',
    success:true,
})



    } catch (error:unknown) {
        if (error instanceof Error) {
            return NextResponse.json({message:error.message}, {status:400})
        }else{
            return NextResponse.json({message:"Something went wrong for the user side, Please try again"},{status:500})
        }
    }
    
}

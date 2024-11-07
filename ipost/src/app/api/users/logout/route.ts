import { redirect } from 'next/navigation'
import { NextResponse } from "next/server"


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout finished",
                success: true,
            }
        )
        response.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        });
        
        
        
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: 'what the fuck ' + error.message }, { status: 500 })
    }

}
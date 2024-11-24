
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
    }catch (err: unknown) {
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
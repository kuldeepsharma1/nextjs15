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
    } catch (error: unknown) {
        console.error('An error occurred:', error); // Log the error for debugging
    
        let errorMessage = 'An unexpected error occurred';
        if (error instanceof Error) {
            errorMessage = error.message; // Access the message property safely
        }
    
        return NextResponse.json(
            { error: `Internal Server Error: ${errorMessage}` },
            { status: 500 }
        );
    }

}
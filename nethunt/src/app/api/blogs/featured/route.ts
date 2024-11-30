import { connect } from '@/dbConfig/dbConfig'
import Blog from '@/models/Blog'
import { NextResponse } from 'next/server';


export async function GET() {
    await connect();

    try {
        const posts = await Blog.find().sort({createdAt:-1}).limit(3);
        return NextResponse.json(
            {
                message: "All Blogs",
                posts: posts
            }
        )


    } catch (err: unknown) {
        // Handle any unexpected errors
        if (err instanceof Error) {
            return NextResponse.json(
                { message: `Server error:${err.message}`, success: false },
                { status: 500 }
            )
        }

        console.error("Unexpected error occured:", err);
        return NextResponse.json(
            { message: 'Unexpected error occured while updating the Blogd.', success: true },
            { status: 500 }
        )
    }
}



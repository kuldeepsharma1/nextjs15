import { connect } from '@/dbConfig/dbConfig'
import Blog from '@/models/Blog';
import {  NextResponse } from 'next/server';


export async function GET() {
    await connect();
    try {
        const posts = await Blog.find();
        return NextResponse.json({
            message: "all blogs",
            posts: posts
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

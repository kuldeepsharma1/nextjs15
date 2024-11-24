import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    await connect();

    try {
        const { postId } = await request.json();

        // Use findByIdAndDelete correctly
        const deletedBlog = await Blog.findByIdAndDelete(postId);
        console.log(deletedBlog);
        // Handle case if no blog was found
        if (!deletedBlog) {
            return NextResponse.json(
                { message: "Blog not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Blog deleted",
            success: true,
        });
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

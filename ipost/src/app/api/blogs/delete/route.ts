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
    } catch (error: any) {
        return NextResponse.json(
            { error: `An error occurred: ${error.message}` },
            { status: 500 }
        );
    }
}

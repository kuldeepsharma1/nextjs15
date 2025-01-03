import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    try {
        // Establish database connection
        await connect();

        // Extract postId from the request body
        const { postId } = await request.json();

        // Validate postId
        if (!postId) {
            return NextResponse.json(
                { message: 'Post ID is required', success: false },
                { status: 400 }
            );
        }

        // Extract user ID from token
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized request', success: false },
                { status: 401 }
            );
        }

        // Find the blog post by ID
        const blog = await Blog.findById(postId);

        // Handle case if the blog post is not found
        if (!blog) {
            return NextResponse.json(
                { message: 'Blog not found', success: false },
                { status: 404 }
            );
        }

        // Check ownership: Ensure the blog's author matches the user ID
        if (blog.author.toString() !== userId) {
            return NextResponse.json(
                { message: 'You do not have permission to delete this blog', success: false },
                { status: 403 }
            );
        }

        // Delete the blog post
        await Blog.findByIdAndDelete(postId);

        return NextResponse.json({
            message: 'Blog deleted successfully',
            success: true,
        });
    } catch (err: unknown) {
        // Handle unexpected errors
        if (err instanceof Error) {
            console.error('Server error:', err.message);
            return NextResponse.json(
                { message: `Server error: ${err.message}`, success: false },
                { status: 500 }
            );
        }

        console.error('Unexpected error occurred:', err);
        return NextResponse.json(
            { message: 'Unexpected error occurred while deleting the blog.', success: false },
            { status: 500 }
        );
    }
}

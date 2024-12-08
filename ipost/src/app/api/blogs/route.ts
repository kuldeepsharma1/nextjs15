import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Attempt to establish database connection
        await connect();

        // Fetch all blog posts and populate related fields
        const posts = await Blog.find()
            .populate('author', 'username') // Populate "username" field from "User" model
            .populate('category', 'name')  // Populate "name" field from "Category" model
            .exec();

        // Handle case where no posts are found
        if (!posts || posts.length === 0) {
            return NextResponse.json({
                message: "No blogs found.",
                success: true,
                posts: [],
            });
        }

        // Respond with fetched blog posts
        return NextResponse.json({
            message: "All blogs fetched successfully",
            success: true,
            posts,
        });
    } catch (error: unknown) {
        // Handle errors comprehensively
        if (error instanceof Error) {
            console.error('Error fetching blogs:', error.message);
            return NextResponse.json(
                { message: `Server error: ${error.message}`, success: false },
                { status: 500 }
            );
        }

        // Catch any unexpected error format
        console.error('Unexpected error occurred:', error);
        return NextResponse.json(
            { message: 'Unexpected error occurred while fetching the blogs.', success: false },
            { status: 500 }
        );
    }
}

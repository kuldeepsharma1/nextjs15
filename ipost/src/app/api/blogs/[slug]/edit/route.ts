import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest, { params }: { params: { slug: string } }) {
    // Connect to the database
    await connect();

    try {
        // Get the slug from the URL parameters
        const { slug } = params;

        // Ensure the slug is provided
        if (!slug || slug.trim() === '') {
            return NextResponse.json(
                { message: 'Slug is required and cannot be empty', success: false },
                { status: 400 }
            );
        }

        // Parse the request body
        const { title, content, image,  category } = await request.json();

        // Validate the request body data
        if (!title || !content) {
            return NextResponse.json(
                { message: 'Title and content are required', success: false },
                { status: 400 }
            );
        }

        // Find the blog post by its slug
        const post = await Blog.findOne({ slug });

        // If no blog post is found, return a 404 error
        if (!post) {
            return NextResponse.json(
                { message: 'Blog not found', success: false },
                { status: 404 }
            );
        }

        // Update the blog post
        post.title = title;
        post.content = content;
        if (image) post.image = image;  // Optional field
       
        if (category) post.category = category;  // Optional field

        // Save the updated post to the database
        await post.save();

        // Return the updated blog post
        return NextResponse.json({
            message: 'Blog updated successfully',
            post,
            success: true,
        });

    } catch (err: unknown) {
        // Handle any unexpected errors
        if (err instanceof Error) {
            console.error(`Error updating blog with slug: ${params.slug} - ${err.message}`);
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

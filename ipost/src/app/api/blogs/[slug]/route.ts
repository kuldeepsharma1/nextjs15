import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

// GET Request - Fetch a blog post by slug
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    await connect();

    try {
        const slug  = (await params).slug
        console.log('Received slug for GET request:', slug);

        if (!slug) {
            return NextResponse.json(
                { message: 'Slug is required', success: false },
                { status: 400 }
            );
        }

        const post = await Blog.findOne({ slug });

        if (!post) {
            return NextResponse.json(
                { message: 'Blog not found', success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Blog retrieved successfully',
            post,
            success: true,
        });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error fetching blog: ${err.message}`);
            return NextResponse.json(
                { message: `Server error: ${err.message}`, success: false },
                { status: 500 }
            );
        }

        console.error('Unexpected error:', err);
        return NextResponse.json(
            { message: 'Unexpected error occurred', success: false },
            { status: 500 }
        );
    }
}

// PUT Request - Update a blog post by slug
export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    await connect();

    try {
        const slug = (await params).slug
        console.log('Received slug for PUT request:', slug);

        if (!slug || slug.trim() === '') {
            return NextResponse.json(
                { message: 'Slug is required and cannot be empty', success: false },
                { status: 400 }
            );
        }

        const { title, content, image, category } = await request.json();
        console.log('Received request body for PUT:', { title, content, image, category });

        if (!title || !content) {
            return NextResponse.json(
                { message: 'Title and content are required', success: false },
                { status: 400 }
            );
        }

        const post = await Blog.findOne({ slug });

        if (!post) {
            return NextResponse.json(
                { message: 'Blog not found', success: false },
                { status: 404 }
            );
        }

        post.title = title;
        post.content = content;
        if (image) post.image = image;
        if (category) post.category = category;

        await post.save();

        return NextResponse.json({
            message: 'Blog updated successfully',
            post,
            success: true,
        });

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`Error updating blog: ${err.message}`);
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

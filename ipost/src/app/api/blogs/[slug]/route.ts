import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

// GET Request - Fetch a blog post by slug


export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connect(); // Ensure database connection

  try {
    const slug = (await params).slug 

    console.log('Received slug for GET request:', slug);

    // Validate `slug`
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Valid slug is required', success: false },
        { status: 400 }
      );
    }

    // Query the database
    const post = await Blog.findOne({ slug });

    // Handle missing blog post
    if (!post) {
      return NextResponse.json(
        { message: 'Blog not found', success: false },
        { status: 404 }
      );
    }

    // Respond with the blog data
    return NextResponse.json({
      message: 'Blog retrieved successfully',
      post,
      success: true,
    });
  } catch (err: unknown) {
    console.error('Error fetching blog:', err);
    return NextResponse.json(
      { message: 'Unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}

// PUT Request - Update a blog post by slug
export async function PATCH(request: NextRequest) {
    await connect();

    try {
        const { title, content, image, category, slug } = await request.json();
        console.log('Received slug for PUT request:', slug);

        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return NextResponse.json(
                { message: 'Valid slug is required', success: false },
                { status: 400 }
            );
        }


        console.log('Received request body for PUT:', { title, content, image, category });

        if (!title || typeof title !== 'string' || !content || typeof content !== 'string') {
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
        if (image && typeof image === 'string') post.image = image;
        if (category && typeof category === 'string') post.category = category;

        await post.save();

        return NextResponse.json({
            message: 'Blog updated successfully',
            post,
            success: true,
        });

    } catch (err: unknown) {
        console.error('Error updating blog:', err);
        return NextResponse.json(
            { message: 'Unexpected error occurred', success: false },
            { status: 500 }
        );
    }
}

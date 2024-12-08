import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Generates a placeholder image URL with a background color and text derived from the title.
 */
function generatePlaceholderUrl(title: string): string {
    const truncatedTitle = title.slice(0, 6);
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return `https://via.placeholder.com/400x300.png/${randomColor}/FFFFFF?text=${encodeURIComponent(`${truncatedTitle}...`)}`;
}



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

export async function PATCH(request: NextRequest) {
    try {
        // Connect to the database
        await connect();

        const { title, content, slug  } = await request.json();

        // Validate input parameters
        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return NextResponse.json(
                { message: 'Valid slug is required', success: false },
                { status: 400 }
            );
        }

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return NextResponse.json(
                { message: 'Title is required and must be a valid string', success: false },
                { status: 400 }
            );
        }

        if (!content || typeof content !== 'string' || content.trim() === '') {
            return NextResponse.json(
                { message: 'Content is required and must be a valid string', success: false },
                { status: 400 }
            );
        }

        // Generate a placeholder image based on the title
        const image = generatePlaceholderUrl(title);

        // Find the blog post by slug
        const post = await Blog.findOne({ slug });

        if (!post) {
            return NextResponse.json(
                { message: 'Blog not found', success: false },
                { status: 404 }
            );
        }

        // Update the blog post fields
        post.title = title;
        post.content = content;
        if (image && typeof image === 'string') post.image = image;
       

        // Save the updated blog post
        await post.save();

        return NextResponse.json({
            message: 'Blog updated successfully',
            success: true,
            post,
        });
    } catch (err: unknown) {
        console.error('Error updating blog:', err);
        return NextResponse.json(
            { message: 'Unexpected error occurred', success: false },
            { status: 500 }
        );
    }
}

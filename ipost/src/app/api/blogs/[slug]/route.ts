import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    await connect();

    try {

        const { slug } = params;
        // console.log('Slug:', slug);


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

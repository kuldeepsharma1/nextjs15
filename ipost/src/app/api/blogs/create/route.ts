import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Blog from '@/models/Blog';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(request: NextRequest) {
    await connect()
    try {

        const reqBody = await request.json()
        const { title, image, content, slug, category } = reqBody;
        console.log(reqBody);
        // Todo for you do for username
        const blog = await Blog.findOne({ slug })
        if (blog) {
            return NextResponse.json({ error: 'Blog  already exist' }, { status: 400 })
        }

        const username = await getDataFromToken(request);

        const uname = await User.findOne({ username })
        const author = uname.username;
        const newBlog = new Blog({
            title, image, content, author, slug, category
        })

        const savedBlog = await newBlog.save()
        console.log(savedBlog);


        return NextResponse.json({
            message: "Blog created",
            success: true,
            savedBlog
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
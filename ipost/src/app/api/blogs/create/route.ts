import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Blog from '@/models/Blog';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

function generateSlug(title: string, uniquePart: string | number = ''): string {
    let baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, '');    // Remove leading or trailing hyphens

    if (uniquePart) {
        baseSlug = `${baseSlug}-${uniquePart}`;
    }

    return baseSlug;
}


function generatePlaceholderUrl(title: string): string {
    // Ensure the title is only 6 characters long
    const truncatedTitle = title.slice(0, 6);

    // Generate a random background color in hex format
    const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    // Construct the new URL
    const updatedUrl = `https://via.placeholder.com/400x300.png/${randomColor}/FFFFFF?text=${encodeURIComponent(`${truncatedTitle}...`)}`;

    return updatedUrl;
}

export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { title,  content, category } = reqBody;

        // Initial slug generation
        let slug = generateSlug(title);
        const image = generatePlaceholderUrl(title);
        // Ensure slug is unique
        let existingBlog = await Blog.findOne({ slug });
        let count = 1;
        while (existingBlog) {
            slug = generateSlug(title, `${Date.now()}-${count}`); // Unique timestamp and count
            existingBlog = await Blog.findOne({ slug });
            count++;
        }

        const username = await getDataFromToken(request);

        const uname = await User.findOne({ username });
        if (!uname) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const author = uname.username;

        const newBlog = new Blog({
            title,
            image,
            content,
            author,
            slug,
            category,
        });

        const savedBlog = await newBlog.save();
        console.log(savedBlog);

        return NextResponse.json({
            message: "Blog created",
            success: true,
            savedBlog,
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

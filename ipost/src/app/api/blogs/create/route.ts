
import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Blog from '@/models/Blog';
import User from '@/models/User';
import Category from '@/models/Category';
import { NextRequest, NextResponse } from 'next/server';

function generateSlug(title: string, uniquePart: string | number = ''): string {
  let baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '');    

  if (uniquePart) {
    baseSlug = `${baseSlug}-${uniquePart}`;
  }

  return baseSlug;
}

function generatePlaceholderUrl(title: string): string {
  const truncatedTitle = title.slice(0, 6);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return `https://via.placeholder.com/400x300.png/${randomColor}/FFFFFF?text=${encodeURIComponent(`${truncatedTitle}...`)}`;
}

export async function POST(request: NextRequest) {
  await connect();

  try {
    const reqBody = await request.json();
    const { title, content, category } = reqBody;

    // Generate unique slug for the blog
    let slug = generateSlug(title);
    const image = generatePlaceholderUrl(title);

    let existingBlog = await Blog.findOne({ slug });
    let count = 1;
    while (existingBlog) {
      slug = generateSlug(title, `${Date.now()}-${count}`);
      existingBlog = await Blog.findOne({ slug });
      count++;
    }

    const userId = await getDataFromToken(request);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found or invalid token' }, { status: 404 });
    }

    // Check or create the category
    let categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      categoryDoc = new Category({
        name: category,
        description: `Category for ${category}`,
        author: user._id,
      });
      await categoryDoc.save();
    }

    // Create the new blog post
    const newBlog = new Blog({
      title,
      image,
      content,
      author: user._id, 
      slug,
      category: categoryDoc._id, 
    });

    const savedBlog = await newBlog.save();
    console.log(savedBlog);

    return NextResponse.json({
      message: 'Blog created successfully',
      success: true,
      savedBlog,
    });

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Server error:', err.message);
      return NextResponse.json(
        { message: `Server error: ${err.message}`, success: false },
        { status: 500 }
      );
    }

    console.error('Unexpected error occurred:', err);
    return NextResponse.json(
      { message: 'Unexpected error occurred.', success: false },
      { status: 500 }
    );
  }
}

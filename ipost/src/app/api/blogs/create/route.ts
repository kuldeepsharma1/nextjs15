import {NextRequest, NextResponse } from 'next/server';
import Blog from '@/models/Blog'; // Assuming the model is imported here
import { connect } from '@/dbConfig/dbConfig'; // Assuming a helper function to connect to MongoDB
import { getDataFromToken } from '@/helpers/getDataFromToken';

function generatePlaceholderUrl(title: string): string {
  const truncatedTitle = title.slice(0, 6); // Truncate the title for placeholder text
  const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); // Generate a random color
  return `https://via.placeholder.com/400x300.png/${randomColor}/FFFFFF?text=${encodeURIComponent(`${truncatedTitle}...`)}`; // Return the image URL
}

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request data
    const { title, content, category } = await req.json();

    // Ensure that required fields are provided
    if (!title || !content || !category) {
      return NextResponse.json({ error: 'Title, content are required fields.' }, { status: 400 });
    }
    const image = await generatePlaceholderUrl(title);
    // Connect to MongoDB
    await connect();
    const userId = await getDataFromToken(req);
    // Create the new blog post
    const blog = new Blog({
      title,
      content,
      image,
      category: category || null, // Category is optional
      author: userId,
    });

    // Save the blog post
    await blog.save();

    // Return the created blog post as a response
    return NextResponse.json({ message: 'Blog post created successfully!', blog }, { status: 201 });

  } catch (error) {
    // Log the error
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'An error occurred while creating the post' }, { status: 500 });
  }
}

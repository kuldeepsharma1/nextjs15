import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';  // Importing jwt for token signing



export async function POST(request: NextRequest) {

  try {
    await connect();
    // Parse the incoming JSON request body
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Validate the presence of email and password
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found.' },
        { status: 400 }
      );
    }

    // Validate password with bcryptjs
    const validPass = await bcryptjs.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json(
        { error: 'Invalid password.' },
        { status: 400 }
      );
    }

    // Create token payload
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    // Sign JWT token with a secret (ensure TOKEN_SECRET is set in .env)
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

    // Prepare the response with token in cookies
    const response = NextResponse.json({
      message: 'Login successful',
      success: true
    });

    // Set the JWT token in the response cookies (httpOnly for security)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
      sameSite: 'strict', // Security to prevent CSRF attacks
      path: '/' // Make sure the token is accessible across the site
    });

    return response;
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

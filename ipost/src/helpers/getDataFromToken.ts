import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Define a TypeScript interface for the decoded token
interface DecodedToken {
  id: string;  // User ID
  username: string;
  email: string;
}

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    // Extract token from the cookie
    const token = request.cookies.get('token')?.value || '';

    if (!token) {
      throw new Error('Token is missing');
    }

    // Decode the token and cast to the specific type
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;  // Cast to the DecodedToken type

    return decodedToken.id; // Return the user ID
  } catch (error: unknown) {
    console.error('Error extracting data from token:', error); // Log the error
    throw new Error('Unauthorized: Token is invalid or expired'); // Handle invalid/expired token
  }
};

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define a TypeScript interface for the decoded token
interface DecodedToken {
  id: string; // User ID
  username: string;
  email: string;
}

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    // Extract token from the cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.warn("Token is missing in the request");
      return null; // Return null if no token is present
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

    // Return the username from the decoded token
    return decodedToken.username;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null if token is invalid or expired
  }
};

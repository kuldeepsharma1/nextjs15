import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


interface DecodedToken {
  id: string; // User ID
  username: string;
  email: string;
}

export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.warn("Token is missing in the request");
      return null; 
    }

    const secret = process.env.TOKEN_SECRET;
    if (!secret) {
      console.error("TOKEN_SECRET is missing in the environment variables");
      throw new Error("TOKEN_SECRET is missing");
    }

   
    const decodedToken = jwt.verify(token, secret) as DecodedToken;

    
    return decodedToken.id;
  } catch (error) {
    
    console.error("Error decoding token:", error);
    return null; 
  }
};

import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract user data from the token
    const username = getDataFromToken(req);

    // If no username is returned, user is not logged in
    if (!username) {
      return NextResponse.json(
        { success: false, message: "User is not authenticated" },
        { status: 401 } // Unauthorized
      );
    }

    // Return the username if authenticated
    return NextResponse.json({ success: true, user: username });
  } catch (error) {
    console.error("Error in /api/users/status:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 }
    );
  }
}

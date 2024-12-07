import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract user data from the token
    const id = getDataFromToken(req);

    // If no username is returned, user is not logged in
    if (!id) {
      return NextResponse.json(
        { success: false, message: "User is not authenticated" },
        { status: 401 } // Unauthorized
      );
    }

    // Return the user id if authenticated
    return NextResponse.json({ success: true, user: id });
  } catch (error) {
    console.error("Error in /api/users/status:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 }
    );
  }
}

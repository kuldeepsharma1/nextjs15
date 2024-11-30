import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const username = getDataFromToken(req);
    return NextResponse.json({ success: true, user: username });
}
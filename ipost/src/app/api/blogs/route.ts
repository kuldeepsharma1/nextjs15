import { connect } from '@/dbConfig/dbConfig'
import Blog from '@/models/Blog';
import {  NextResponse } from 'next/server';


export async function GET() {
    await connect();
    try {
        const posts = await Blog.find();
        return NextResponse.json({
            message: "all blogs",
            posts: posts
        })

    } catch (err: any) {
        console.log(err.message);

    }
}

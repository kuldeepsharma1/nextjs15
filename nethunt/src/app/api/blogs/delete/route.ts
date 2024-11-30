import { connect } from '@/dbConfig/dbConfig';
import Blog from '@/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request:NextRequest) {
    await connect()

    try {
          const {postId} = await request.json();


        // Use findByIdAndDelete correctly
          const deleteBlog= await Blog.findByIdAndDelete(postId);
          console.log(deleteBlog);
          
           // Handle case if no blog was found
           if (!deleteBlog) {
            return NextResponse.json({message:"Error Blog not found",success:false},{status:400})
           }
           return NextResponse.json({
            message:"Blog Deleted",
            success:true,
           });
        
    } catch (err:unknown) {
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
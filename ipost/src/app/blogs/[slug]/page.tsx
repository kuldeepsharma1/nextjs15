import Image from "next/image";


interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
  image: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;

}


interface Data {
  message: string;
  post: Post;  
  success: boolean;
}

async function getBlog(slug: string): Promise<Data> {
  const res = await fetch(`${process.env.APP_URL}/api/blogs/${slug}`);  
  if (!res.ok) {
      throw new Error(`Failed to fetch blog with slug: ${slug}`);
  }
 
  
  return res.json();
}

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  let blog;

  try {
    
      blog = await getBlog(slug);
  } catch (error: unknown) {
    
      if (error instanceof Error) {
          console.error("Error fetching blog:", error.message);
         
          return <div>Error fetching blog: {error.message}</div>;
      }
      return <div>Unknown error occurred while fetching the blog.</div>;
  }

 
  if (!blog?.post) {
      return <div>Blog not found.</div>;
  }

  return (
      <>
          <h1>{blog.post.title}</h1>
          <p>{blog.post.content}</p>
          <Image src={blog.post.image} alt={blog.post.title} width={300} height={200} />
      </>
  );
}

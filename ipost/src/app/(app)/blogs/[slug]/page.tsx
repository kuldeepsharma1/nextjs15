import Image from "next/image";
import Link from "next/link";

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

// Fetch blog data by slug
async function getBlog(slug: string): Promise<Data> {
  const res = await fetch(`${process.env.APP_URL}/api/blogs/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch blog with slug: ${slug}`);
  }
  return res.json();
}

// Define the Page component for the dynamic route
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>; // Explicitly typed as a Promise
}) {
  // Await params to resolve it before accessing properties
  const slug = (await params).slug

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

    <div className="p-4 pt-20">
      <Link
        href={`/blogs/${blog.post.slug}/edit`}
        className="py-3 px-6 bg-black dark:bg-white rounded-full text-white dark:text-black"
      >
        Edit
      </Link>
      <h1 className="text-3xl mt-10">{blog.post.title}</h1>
      <p className="mt-4 text-lg">{blog.post.content}</p>
      <Image
        className="rounded-lg mt-6"
        src={blog.post.image}
        alt={blog.post.title}
        width={300}
        height={200}
      />
    </div>
  );
}
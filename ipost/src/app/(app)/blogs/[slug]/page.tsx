import Image from 'next/image';
import { notFound } from 'next/navigation';

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
  post: Post | null;
  success: boolean;
}


async function getBlog(slug: string): Promise<Data> {
  try {
    const res = await fetch(`${process.env.APP_URL}/api/blogs/${slug}`);

    if (!res.ok) {
      return { message: 'Blog not found', success: false, post: null };
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { message: 'Unexpected error occurred', success: false, post: null };
  }
}
export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const blog: Data = await getBlog(slug);
  console.log('This is old');
  console.log(blog);
  console.log('This is new');
  if (!blog.success || !blog.post) {
    notFound();
  }
  return (
    <div className="pt-52">
      <h1>{blog.post.title}</h1>
      <p>{blog.post.content}</p>
      <Image
        src={blog.post.image}
        alt={blog.post.title}
        width={300}
        height={200}
      />
    </div>
  );
}

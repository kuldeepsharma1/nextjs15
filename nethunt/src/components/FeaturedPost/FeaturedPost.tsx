import Image from 'next/image';
import Link from 'next/link';


interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  content: string;
  author: string;
  createdAt: string;
}

export default async function FeaturedPost() {
  const data = await fetch(`${process.env.APP_URL!}/api/blogs/featured`)
  const res = await data.json()
  const  posts:Post[] = res.posts
  console.log(posts);
  




  return (
    <div className="bg-gray-900 text-white py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Posts</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
            <div key={post._id} className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="relative h-48 w-full">
                <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" className="opacity-80" />
                <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                  New
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{post.content}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href='/blogs' className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
            Explore All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}

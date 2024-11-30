'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await axios.get("/api/blogs/", {
        headers: { 'Content-Type': 'application/json' }
      });
      setPosts(res.data.posts);
      console.log(res.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setErrorMessage('Error fetching posts.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete("/api/blogs/delete", {
        data: { postId },
        headers: { 'Content-Type': 'application/json' }
      });

      // Remove the deleted post from the UI
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Error deleting post. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="text-center text-red-500 py-8">{errorMessage}</div>;
  }

  return (
    <div className="mx-auto px-4 py-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="relative flex items-center justify-center mb-6 md:flex md:flex-wrap">
  <h1 className="text-3xl font-bold text-center">All Posts</h1>
  <Link
    href="/blogs/create"
    className="absolute right-6 py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
  >
    Create Blog
  </Link>
</div>



      {posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">No posts available.</p>
      ) : (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group flex flex-col h-full border border-gray-200 shadow-sm rounded-xl bg-white dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 hover:shadow-lg dark:hover:shadow-xl transition-shadow"
              >
                <div className="h-52 flex flex-col justify-center items-center rounded-t-xl overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <span className="block mb-1 text-xs font-semibold uppercase text-blue-500 dark:text-blue-400">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-gray-700 dark:text-gray-400">{post.content}</p>
                </div>
                <div className="mt-auto flex border-t border-gray-200 dark:border-neutral-700">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="w-1/2 py-3 px-4 inline-flex justify-center items-center text-sm font-medium bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
                  >
                    Delete
                  </button>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="w-1/2 py-3 px-4 inline-flex justify-center items-center text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // setIsLoading(true);
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
      // setIsLoading(false);
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

  // if (isLoading) {
  //   return <div className="text-center py-8 min-h-screen">Loading...</div>;
  // }

  if (errorMessage) {
    return <div className="text-center text-red-500 py-8">{errorMessage}</div>;
  }

  return (
    <div className="min-h-screen mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts available.</p>
      ) : (
        <>
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <div className="h-52 flex flex-col justify-center items-center  rounded-t-xl border">
                    <Image src={post.image} alt={post.title} width={400} height={400} className='border rounded-xl grayscale group-hover:grayscale-0 w-full h-52'/>
                  </div>
                  <div className="p-4 md:p-6">
                    <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                     {post.category}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-gray-500 dark:text-neutral-500">
                    {post.content}
                    </p>
                  </div>
                  <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                    <button
                      onClick={() => handleDelete(post._id)} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" >
                      Delete
                    </button>
                    <Link
                      href={`/blogs/${post.slug}`} className="w-full text-blue-600 hover:underline py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white  shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" >
                      View
                    </Link>
                  </div>
                
                </div>
              ))}
            </div>
          </div>
        </>
      )}

    </div>
  );
}





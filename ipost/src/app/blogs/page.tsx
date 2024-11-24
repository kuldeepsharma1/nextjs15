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
      const response = await axios.delete("/api/blogs/delete", {
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
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <Image src={post.image} alt={post.title} width={300} height={200} />
              <p className="text-gray-600 mb-4">{post.content}</p>
              <p className="text-sm text-gray-500">Author: {post.author}</p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(post.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                >
                  Delete
                </button>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded">
                  View
                </Link>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

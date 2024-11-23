'use client';

import { useState, useEffect } from 'react';


interface Post {
  _id: string;
  title: string;
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/posts`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setErrorMessage('Error fetching posts.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete the post');
      }

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
                <button className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

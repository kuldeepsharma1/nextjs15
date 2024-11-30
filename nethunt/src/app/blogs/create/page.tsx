'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CreateBlogForm() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const postData = { title, category, image, content };

    try {
      const response = await axios.post('/api/blogs/create', postData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        setSuccessMessage('Blog created successfully!');
        setTitle('');
        setCategory('');
        setImage('');
        setContent('');
        router.push('/blogs');
      } else {
        setErrorMessage('Failed to create the blog. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
          // Use the error's message if available
          setErrorMessage(error.message || 'An error occurred while creating the blog.');
      } else {
          // Fallback for unknown error types
          setErrorMessage('An unknown error occurred while creating the blog.');
      }
  } finally {
      setIsSubmitting(false); // Reset the submitting state
  }
  
  };

  return (
    <div className='dark:bg-gray-900 p-6'>
      <div className="max-w-xl mx-auto px-6 py-8 rounded-md shadow-md border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-gray-200 shadow-white">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
        Create a Blog Post
      </h2>

      {errorMessage && (
        <p className="text-sm text-red-500 mb-4">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="text-sm text-green-500 mb-4">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter category"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full mt-1 border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-1 border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={5}
            placeholder="Enter blog content"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md shadow-md text-white font-medium ${
            isSubmitting
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {isSubmitting ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
    </div>
  );
}

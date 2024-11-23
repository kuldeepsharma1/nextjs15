'use client';

import React, { useState } from 'react';

export default function CreateBlogForm() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const postData = { title, content, author };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/posts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
         await response.json();
        setSuccessMessage('Post created successfully!');
        // Optionally reset form fields
        setTitle('');
        setContent('');
        setAuthor('');
      } else {
        setErrorMessage('Failed to create the post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>
      {errorMessage && (
        <div className="mb-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 text-sm text-green-600">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the post title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the content of the post"
            rows={6}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the author's name"
            required
          />
        </div>

        <button
          type="submit"
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

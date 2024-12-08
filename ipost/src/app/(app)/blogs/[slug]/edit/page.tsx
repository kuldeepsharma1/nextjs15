'use client';

import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function EditBlogForm() {
  const router = useRouter();
  const { slug } = useParams();

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>(''); 
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch blog data when the component mounts
  useEffect(() => {
    if (slug) {
      axios.get(`/api/blogs/${slug}`)
        .then(response => {
          const post = response.data.post;

          setTitle(post.title);
          setCategory(post.category.name || ''); // Access `name` property of category
          setContent(post.content);
        })
        .catch(error => {
          console.error('Error fetching blog:', error);
          setErrorMessage('Failed to load the blog post.');
        });
    }
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const postData = { title, content, category, slug };

    try {
      const response = await axios.patch(`/api/blogs/${slug}`, postData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Blog updated successfully!", response.data);

      if (response.data.success) {
        setSuccessMessage('Post updated successfully!');
        router.push(`/blogs`); // Redirect to the blogs list
      } else {
        setErrorMessage('Failed to update the post. Please try again.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Blog Post</h2>
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
          <input
            id="slug"
            type="hidden"
            value={slug || ''} // Hidden input for the slug
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            id="category"
            type="text"
            disabled
            value={category}
            className="mt-1 block cursor-not-allowed w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter the category"
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

        <button
          type="submit"
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}

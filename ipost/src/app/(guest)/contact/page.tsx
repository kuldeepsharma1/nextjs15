'use client'

import { useState } from 'react';

export default function Page() { // Fixed the component name to start with an uppercase letter
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate form submission
      setFormStatus('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus(`Error submitting form. Please try again. ${error}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-20 px-6 sm:px-12">
      {/* Header Section */}
      <div className="text-center mb-12 pt-10">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">Contact Us</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          We&apos;re here to help. Reach out to us with any questions or feedback.
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Send Message
          </button>
        </div>
      </form>

      {/* Form Status */}
      {formStatus && (
        <div className="mt-6 text-center">
          <p className="text-lg text-green-600 dark:text-green-400">{formStatus}</p>
        </div>
      )}
    </div>
  );
}

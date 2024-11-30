"use client"
import React, { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", subject:"" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the submit action here
  };

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto  shadow-md shadow-slate-100 rounded-lg p-8 ">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Get in Touch
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Have a question or need help? Fill out the form below, and we’ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block font-medium text-gray-800 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="mt-2 block w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block font-medium text-gray-800 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="mt-2 block w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block font-medium text-gray-800 dark:text-gray-200">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="mt-2 block w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block font-medium text-gray-800 dark:text-gray-200">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={5}
              cols={10}
              className="mt-2 block w-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-md shadow hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

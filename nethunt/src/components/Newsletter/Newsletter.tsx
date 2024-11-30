"use client"
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate the email submission
    setSubmitted(true);
    setEmail(""); // Clear the input
};


  return (
    <section className="bg-gray-800 py-16 px-6 text-center border-b-2 border-dashed">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Stay updated with the latest tech news, challenges, and rewards directly in your inbox!
        </p>

        {/* Newsletter Form */}
        <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 w-72 rounded-lg border-2 border-blue-400 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-orange-400 text-white rounded-lg shadow-lg hover:bg-orange-500 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
          >
            Subscribe
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <p className="mt-4 text-lg text-green-400 animate-pulse">
            Thank you for subscribing! Check your inbox for updates.
          </p>
        )}
      </div>
    </section>
  );
}

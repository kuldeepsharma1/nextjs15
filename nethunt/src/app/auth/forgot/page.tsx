"use client";

import Link from "next/link";
import { useState } from "react";

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch("/api/users/forgot", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message || "Password reset link sent successfully.");

      } else {
        const errorText = await res.text();
        try {
          const errorData = JSON.parse(errorText);
          setError(errorData.message || "An error occurred. Please try again.");

        } catch {
          setError('Unknown error occurred.');
        }

      }

    } catch (err: unknown) {
      console.error("Error in forgot password submission:", err);
  
      // Provide a user-friendly error message
      setError(
          "An error occurred while submitting the forgot password request. Please try again later."
      );
  }
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-200">
      <div className="dark:bg-gray-800 shadow-lg  dark:shadow-sm rounded-lg p-6 w-full max-w-md dark:shadow-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Enter your email address to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {message && (
          <p className="text-green-500 text-sm mb-4 text-center">{message}</p>
        )}
        <p className="text-center text-sm text-gray-400 mt-4">
          Remembered your password?{" "}
          <Link
            href="/auth/login"
            className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Reset() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/users/reset', { token, password });
      setMessage(res.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'Error in password reset');
      } else if (error instanceof Error) {
          setError(error.message || 'An unexpected error occurred');
      } else {
          setError('An unknown error occurred');
      }
  }
  
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    setToken(urlToken);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-200">
      <div className="dark:bg-gray-800 rounded-lg p-6 w-full shadow-xl max-w-md dark:shadow-md dark:shadow-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="dark:text-gray-400 text-sm text-center mb-6">
          Enter and confirm your new password.
        </p>
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              required
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          {message && (
            <p className="text-green-500 text-sm mb-4 text-center">{message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          <Link
            href="/auth/login"
            className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

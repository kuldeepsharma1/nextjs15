'use client'

import Logo from '@/components/Logo';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
  const [token, setToken] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to verify email
  const verifyUserEmail = async () => {
    if (!token) return;

    setLoading(true); 
    try {
      const response = await axios.post('/api/users/verifyemail', { token });
      if (response.data?.success) {
        setVerified(true); 
      }
    } catch (err: unknown) {
      // Handle error based on response from axios
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(err.response.data.message || 'Error occurred during verification.');
      } else {
        setError('Network error or unexpected issue.');
      }
    } finally {
      setLoading(false); // Stop loading after API call finishes
    }
  };

  // Effect to get the token from the URL
  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  // Effect to trigger email verification once the token is set
  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex">
      {/* Left Section with Logo and Image */}
      <div className="hidden lg:block lg:w-[25%]">
        <div className="relative">
          <img
            className="h-screen w-full object-cover bg-opacity-15 opacity-50"
            src="https://cdn.pixabay.com/photo/2024/06/10/15/05/flower-8820894_640.png"
            alt="Logo Background"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Logo className="lg:text-7xl" icon="size-16" />
          </div>
        </div>
      </div>

      {/* Right Section with Verification Form */}
      <div className="w-full h-screen px-5 md:px-0 lg:w-[75%] flex items-center justify-start bg-gradient-to-b from-zinc-100 to-zinc-200 dark:bg-gradient-to-tr dark:from-zinc-900 dark:to-zinc-700">
        <div className="sm:pl-10">
          <h2 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Verify Email
          </h2>
          <p className="text-sm text-gray-200 mb-8">
            We’ve sent you a verification link. Please check your email.
          </p>

          <div className="space-y-4">
            {/* Token Debugging */}
            {/* {token && <p className="text-sm text-gray-500">Token: {token}</p>} */}

            {/* Success Message */}
            {verified && (
              <div className="bg-green-50 p-4 border border-green-200 text-green-800 rounded-md">
                <p>Email successfully verified!</p>
                <Link href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
                  Go to Login
                </Link>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 p-4 border border-red-200 text-red-800 rounded-md">
                <p>Error: {error}</p>
              </div>
            )}

            {/* Loading / Verifying State */}
            {!verified && !error && token && !loading && (
              <div className="text-gray-600 dark:text-zinc-400">
                <p>Verifying your email...</p>
              </div>
            )}

            {/* Loading Spinner */}
            {loading && !verified && (
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0 4v8m0 0v4m-4-4h8" />
                </svg>
                <p className="text-indigo-600 dark:text-indigo-400">Verifying...</p>
              </div>
            )}
          </div>

          {/* Login Redirect */}
          <p className="text-center text-sm mt-4 text-gray-600 dark:text-zinc-400">
            Already verified?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Go back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

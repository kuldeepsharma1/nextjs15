"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout'); // Adjust API endpoint as needed
      router.push('/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.message || err.message || 'Logout failed.');
      } else {
        console.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center h-screen">
      <button
        onClick={logout}
        className="bg-red-500 p-4 rounded-full text-white hover:bg-red-600 transition"
      >
        Logout
      </button>
      <Link href={`/profile/manage`} className='py-3 ml-4 px-6 bg-black  dark:bg-white rounded-full text-white dark:text-black'>Manage Iposts</Link>
    </div>
  );
}

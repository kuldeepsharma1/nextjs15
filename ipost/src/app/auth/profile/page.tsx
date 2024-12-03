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
      router.push('/auth/login');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.message || err.message || 'Logout failed.');
      } else {
        console.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={logout}
        className="btn flex w-fit"
      >
        Logout
      </button>
      <Link className='btn btn-primary ' href="/auth/profile/manage">Manage Your Content</Link>
    </div>
  );
}

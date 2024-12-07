"use client";

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
  const [token, setToken] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifyUserEmail = async () => {
    if (!token) return;

    try {
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (err: unknown) {
      // Handle error as a generic type and narrow it later
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(err.response.data.message || 'Error occurred during verification.');
      } else {
        setError('Network error or unexpected issue.');
      }
    }
  };

  useEffect(() => {
    // Extract token from URL query parameters
    const urlToken = new URLSearchParams(window.location.search).get('token');
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h1>Verify Email</h1>

      {token && <p>Token: {token}</p>}

      {verified && (
        <div>
          <p>Email successfully verified!</p>
          <Link href="/login">Go to Login</Link>
        </div>
      )}

      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}

      {!verified && !error && token && (
        <div>
          <p>Verifying your email...</p>
        </div>
      )}
    </div>
  );
}

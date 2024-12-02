"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";

// Type definitions for the user object
interface User {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  // State types
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });
  const { setIsAuthenticated } = useAuth();
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent default form submission behavior
    try {
      setLoading(true);
      console.log("Attempting to log in...");

      const response = await axios.post("/api/users/login", user, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Login successful:", response.data);
      setIsAuthenticated(true);
      // Redirect after successful login
      router.push('/');

    } catch (error: unknown) {
      // Log full error details
      if (axios.isAxiosError(error)) {
        console.log('Error response:', error.response ? error.response.data : error.message);
      } else {
        console.log('Unexpected error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to manage button disable state based on form input
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-red-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onLogin} className="space-y-6">
          {loading ? <Spinner /> : ''}

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link href="/auth/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <Button className="w-full rounded-full" disabled={buttonDisable} type="submit"  >
              {buttonDisable ? (
                "Login"
              ) : "Login"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation"; // Correct for latest Next.js versions
import React, { useEffect } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

// Define the User type
interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = React.useState<User>({
    email: "",
    password: "",
  });
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter(); // Initialize router for navigation

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.replace('/');
    }
    try {
      setLoading(true);
      console.log("Attempting login...");

      const response = await axios.post("/api/users/login", user, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login successful:", response.data);
      setIsAuthenticated(true);

      // Navigate to the home page
      router.refresh()
      router.replace('/');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Update button state based on input validity
  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-red-800">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onLogin} className="space-y-6">
          {loading && <Spinner />}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="/auth/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Button className="w-full rounded-full" disabled={buttonDisabled} type="submit">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

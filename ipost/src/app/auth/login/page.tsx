"use client";

import React, { useEffect, useState } from "react";
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
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const { setIsAuthenticated } = useAuth();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Attempting login...");

      // Post login credentials to your API
      const response = await axios.post("/api/users/login", user, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login successful:", response.data);

      // Update the global authentication state
      setIsAuthenticated(true);

      // Navigate to the home page
      window.location.href = "/";

    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Enable the login button only if email and password are filled
  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-indigo-900 to-indigo-700 py-12 px-6 lg:px-8 dark:bg-gradient-to-b dark:from-indigo-900 dark:to-indigo-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-3xl font-bold text-white mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-sm text-gray-200 mb-8">
          Login to continue to IPOSt platform
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <form onSubmit={onLogin} className="space-y-6">
          {loading && <Spinner />}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
              Email Address
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
                className="block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/auth/forgot"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
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
                className="block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Button
              className="w-full rounded-full py-2 text-lg font-semibold   "
              disabled={buttonDisabled}
              type="submit"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisable, setButtonDisable] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", user);
      console.log("Register Complete", response.data);
      router.push('/auth/login');
    } catch (error) {
      console.log("Register failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-b from-indigo-900 to-indigo-700 dark:bg-gradient-to-b dark:from-indigo-900 dark:to-indigo-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-16 text-center text-3xl font-bold text-white mb-6">
          Register your account
        </h2>
        <div className="mx-auto text-center mt-6">
          {loading && <Spinner />}
        </div>
      </div>

      <div className=" sm:mx-auto sm:w-full sm:max-w-sm bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <form onSubmit={onRegister} method="POST" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
                autoComplete="username"
                className="block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
              Password
            </label>
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
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-900 dark:text-gray-200">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Button
              className="w-full rounded-full py-2 text-lg font-semibold   "
              disabled={buttonDisable}
              type="submit"
            >
              {loading ? "Register in..." : "Register"}

            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

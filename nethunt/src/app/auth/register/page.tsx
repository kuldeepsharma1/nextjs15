"use client";

import Spinner from "@/components/Spinner";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", user);
      console.log("Register Complete", response.data);
      router.push("/auth/login");
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
    <div className="flex min-h-screen items-center justify-center dark:bg-gray-900 dark:text-gray-200 px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Register your account
        </h2>
        <div className="mx-auto text-center mt-10">
          {loading && <Spinner />}
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg dark:bg-gray-800 dark:shadow-md dark:shadow-white rounded-lg p-6">
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                required
                autoComplete="username"
                className="block w-full rounded-md dark:bg-gray-700 dark:text-gray-200  border-2 py-2 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
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
                className="block w-full rounded-md dark:bg-gray-700 dark:text-gray-200  border-2 py-2 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
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
                className="block w-full rounded-md dark:bg-gray-700 dark:text-gray-200  border-2 py-2 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="cpassword" className="block text-sm font-medium ">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-2 dark:bg-gray-700 dark:text-gray-200  py-2 px-3 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={onRegister}
              disabled={buttonDisable}
              className={`flex w-full justify-center rounded-md px-3 py-2 font-semibold shadow-sm ${
                buttonDisable
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {buttonDisable ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 1 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

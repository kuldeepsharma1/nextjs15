"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeSwitch from "../ThemeSwitch";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {

    try {
      const response = await axios.get('/api/users/logout');
      if (response.status === 200) {
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message); // Safely access error.message
      } else {
        console.log('An unexpected error occurred:', error);
      }
    }
  }
  return (
    <header className="w-full py-5 bg-gray-900  shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between  px-4 md:px-6">

        {/* Brand Name */}
        <div>
          <Link href="/" aria-label="NetHunt" className="text-3xl font-semibold text-lime-400 dark:text-lime-400">
            NetHunt
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden flex items-center focus:outline-none text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Navbar */}
        {!mobileMenuOpen && (
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-white  hover:text-gray-300 ">
              About
            </Link>
            <Link href="/community" className="text-white  hover:text-gray-200">
              Community
            </Link>
            <Link href="/challenges" className="text-white  hover:text-gray-200">
              Challenges
            </Link>
            <Link href="/blogs" className="block py-2 text-white  hover:text-gray-200">
              Blogs
            </Link>
            <Link href="/contact" className="text-white  hover:text-gray-2000">
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/auth/profile" className="flex items-center bg-w text-white  hover:text-gray-200 dark:hover:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 18.121A4 4 0 015 17V7a4 4 0 014-4h6a4 4 0 014 4v10a4 4 0 01-.121 1.121M12 7h.01M16 20H8a2 2 0 110-4h8a2 2 0 110 4z"
                  />
                </svg>
                <span className="ml-2">Profile</span>
              </Link>
              <Link href="/reward" className="text-white  hover:text-gray-2000">
                Reward
              </Link>

              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-white bg-orange-400 px-4 py-2 rounded-xl hover:bg-orange-500 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link href="/auth/register" className='py-2 px-3 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700'>
                      Register
                    </Link>
                    <Link href="/auth/login" className="py-2 px-3 text-sm font-medium rounded-xl bg-lime-400 text-black hover:bg-lime-500 transition">
                      Log in
                    </Link>
                  </>
                )}
              </div>

              <ThemeSwitch />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Navbar */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-5 text-white  hover:text-gray-200 shadow-lg space-y-4">
          <Link href="/about" className="block py-2 text-white  hover:text-gray-200">
            About
          </Link>
          <Link href="/community" className="block py-2text-white  hover:text-gray-200">
            Community
          </Link>
          <Link href="/challenges" className="block py-2 text-white  hover:text-gray-200">
            Challenges
          </Link>
          <Link href="/blogs" className="block py-2 text-white  hover:text-gray-200">
            Blogs
          </Link>
          <Link href="/contact" className="block py-2 text-white  hover:text-gray-200">
            Contact
          </Link>
          <div className="flex flex-col space-y-4">

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-white bg-orange-400 px-4 py-2 rounded-xl hover:bg-orange-500 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/auth/register" className='py-2 px-3 text-sm font-medium rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700'>
                  Register
                </Link>
                <Link href="/auth/login" className="py-2 px-3 text-sm font-medium rounded-xl bg-lime-400 text-black hover:bg-lime-500 transition">
                  Log in
                </Link>
              </>
            )}

          </div>

        </div>
      )}
    </header>
  );
}

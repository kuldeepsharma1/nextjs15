import Link from "next/link";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-zinc-50 text-zinc-800 py-10 dark:bg-zinc-900 dark:text-zinc-300 transition-colors duration-300">
      <div className="px-6 lg:px-12 space-y-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Info */}
          <div className="text-center md:text-left">
           <Logo/>

            <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400 max-w-md">
              A modern platform to share your thoughts, stories, and experiences.
              Join us and connect with like-minded individuals worldwide.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            <Link
              href="/about"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="/policies/privacy-policy"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies/terms-of-service"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/faq"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              FAQ
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-zinc-300 dark:border-zinc-700 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} iPost. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
            <Link
              href="/blogs"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              Blogs
            </Link>
            <Link
              href="/categories"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              Categories
            </Link>
            <Link
              href="/blogs/write"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              Write a Blog
            </Link>
            <Link
              href="/community"
              className="hover:text-zinc-900 dark:hover:text-white transition-all duration-200"
            >
              Community
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

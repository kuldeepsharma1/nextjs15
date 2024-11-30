"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Support() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Main Content */}
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              Need Help? We&rsquo;re Here for You!
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our FAQs, contact support, or check out our resources to get the assistance you need.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              FAQs
            </h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  How do I reset my password?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  You can reset your password by clicking on the &quot;Forgot Password&quot; link on the login page.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  Where can I find the latest challenges?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Challenges are listed on the &quot;Challenges&quot; page under the &quot;Community&quot; section.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  How do I contact support?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Fill out the form below or email us directly at{" "}
                  <span className="text-orange-600 dark:text-orange-400">support@nethunt.com</span>.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              Contact Support
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-2 border-blue-400 dark:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-2 border-blue-400 dark:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 border-2 border-blue-400 dark:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
              ></textarea>
              <button
                type="submit"
                className="w-44 py-3 bg-orange-600 dark:bg-orange-400 text-white rounded-lg hover:bg-orange-500 dark:hover:bg-orange-300 focus:outline-none"
              >
                Submit
              </button>
            </form>
            {submitted && (
              <p className="mt-4 text-lg text-green-600 dark:text-green-400 animate-pulse">
                Thank you for reaching out! Our team will get back to you soon.
              </p>
            )}
          </section>

          {/* Help Resources */}
          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              Help Resources
            </h2>
            <ul className="space-y-4">
              <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <Link
                  href="/docs/getting-started"
                  className="text-blue-600 dark:text-blue-400 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  Getting Started Guide
                </Link>
              </li>
              <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <Link
                  href="/docs/faq"
                  className="text-blue-600 dark:text-blue-400 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <Link
                  href="/docs/contact-support"
                  className="text-blue-600 dark:text-blue-400 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

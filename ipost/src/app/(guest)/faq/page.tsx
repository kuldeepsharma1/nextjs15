'use client'
import { useState } from 'react';

const FaqPage = () => {
  // Manage the expanded state of each question (for collapsible functionality)
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <header className="py-16 pt-24 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Find answers to some of the most common questions our community has.
        </p>
      </header>

      {/* FAQ Section */}
      <section className="py-16 px-6 sm:px-12">
        <div className="space-y-8">
          {/* FAQ Item 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div onClick={() => toggleQuestion(0)} className="cursor-pointer flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                What is iPost?
              </h3>
              <span className="text-xl text-gray-500 dark:text-gray-300">
                {activeQuestion === 0 ? '-' : '+'}
              </span>
            </div>
            {activeQuestion === 0 && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                iPost is a modern platform where you can share your thoughts, stories, and experiences with a global community. It’s a space to connect, engage, and learn from others.
              </p>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div onClick={() => toggleQuestion(1)} className="cursor-pointer flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                How can I join the iPost community?
              </h3>
              <span className="text-xl text-gray-500 dark:text-gray-300">
                {activeQuestion === 1 ? '-' : '+'}
              </span>
            </div>
            {activeQuestion === 1 && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Simply visit our signup page and create a new account. Once you’re signed up, you can start posting your content and interacting with the community.
              </p>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div onClick={() => toggleQuestion(2)} className="cursor-pointer flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Is iPost free to use?
              </h3>
              <span className="text-xl text-gray-500 dark:text-gray-300">
                {activeQuestion === 2 ? '-' : '+'}
              </span>
            </div>
            {activeQuestion === 2 && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Yes, iPost is completely free to use. You can create an account, post content, and interact with other users without any cost.
              </p>
            )}
          </div>

          {/* FAQ Item 4 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div onClick={() => toggleQuestion(3)} className="cursor-pointer flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Can I delete my account?
              </h3>
              <span className="text-xl text-gray-500 dark:text-gray-300">
                {activeQuestion === 3 ? '-' : '+'}
              </span>
            </div>
            {activeQuestion === 3 && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Yes, you can delete your account anytime. Visit your account settings to deactivate or delete your account permanently.
              </p>
            )}
          </div>

          {/* FAQ Item 5 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div onClick={() => toggleQuestion(4)} className="cursor-pointer flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                How do I report inappropriate content?
              </h3>
              <span className="text-xl text-gray-500 dark:text-gray-300">
                {activeQuestion === 4 ? '-' : '+'}
              </span>
            </div>
            {activeQuestion === 4 && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                If you come across any content that violates our guidelines, you can report it by clicking the Report button next to the post.
              </p>
            )}
          </div>

          {/* FAQ Item 6 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div onClick={() => toggleQuestion(5)} className="cursor-pointer flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                How do I create a post?
              </h3>
              <span className="text-xl text-gray-500 dark:text-gray-300">
                {activeQuestion === 5 ? '-' : '+'}
              </span>
            </div>
            {activeQuestion === 5 && (
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                To create a post, simply click on the Create Post button from your dashboard or homepage. You can add text, images, and videos to your posts.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-zinc-900 dark:bg-zinc-950 text-zinc-300 py-10 dark:text-zinc-400">
        <div className="px-6 lg:px-12 space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white dark:text-zinc-100">iPost</h2>
            <p className="text-sm mt-2 text-zinc-400 dark:text-zinc-500 max-w-md">
              A modern platform to share your thoughts, stories, and experiences. Join us and connect with like-minded individuals worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FaqPage;

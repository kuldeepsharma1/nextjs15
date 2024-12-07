'use client'

import Link from 'next/link';

const CommunityPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <header className="py-16 pt-32 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">Welcome to the iPost Community</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Connect, share, and learn from like-minded individuals. Join our community of creators, thinkers, and innovators.
        </p>
      </header>

      {/* Community Categories */}
      <section className="py-16 px-6 sm:px-12">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100">Community Categories</h2>
        <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-400">
          Explore topics and discussions that interest you the most!
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Technology</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Discuss the latest trends, gadgets, and advancements in tech.
            </p>
            <Link href="/community/technology" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Explore</Link>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Lifestyle</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Share your experiences on health, fitness, and living well.
            </p>
            <Link href="/community/lifestyle" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Explore</Link>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Creativity</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              A place for artists, writers, and creators to share their work.
            </p>
            <Link href="/community/creativity" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Explore</Link>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Business</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Engage in discussions about entrepreneurship and business growth.
            </p>
            <Link href="/community/business" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Explore</Link>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Education</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Share educational resources, tips, and learning experiences.
            </p>
            <Link href="/community/education" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Explore</Link>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Entertainment</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Dive into movies, music, gaming, and more!
            </p>
            <Link href="/community/entertainment" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Explore</Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 px-6 sm:px-12 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-gray-100">Featured Posts</h2>
        <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-400">
          Check out some of the most engaging discussions in our community.
        </p>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">The Future of AI</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Join the discussion about the impact of artificial intelligence on our daily lives.
            </p>
            <Link href="/post/ai-future" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Read More</Link>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Fitness and Well-being</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Tips and discussions on staying fit, healthy, and motivated.
            </p>
            <Link href="/post/fitness-wellbeing" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Read More</Link>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Innovative Startups</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Insights on the most innovative startups changing the business landscape.
            </p>
            <Link href="/post/startups" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Read More</Link>
          </div>
        </div>
      </section>

      {/* Join the Community Section */}
      <section className="py-16 px-6 sm:px-12 bg-blue-600 dark:bg-blue-800 text-white">
        <h2 className="text-3xl font-semibold text-center">Join the iPost Community</h2>
        <p className="mt-4 text-center text-lg">
          Be part of our growing community! Share your thoughts, stories, and experiences with others.
        </p>
        <div className="text-center mt-8">
          <Link href="/signup" className="bg-white text-blue-600 hover:bg-gray-200 px-6 py-3 rounded-md">Join Now</Link>
        </div>
      </section>

     
    </div>
  );
};

export default CommunityPage;

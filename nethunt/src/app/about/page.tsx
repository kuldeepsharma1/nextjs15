export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 pb-6">
      {/* Main Content */}
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              About <span className="text-orange-600 dark:text-orange-400">NetHunt</span>
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
              Empowering tech enthusiasts to learn, compete, and grow in the ever-evolving world of technology.
            </p>
          </section>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Our Mission</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                At NetHunt, we aim to create an engaging platform for tech enthusiasts to excel, innovate, and connect.
              </p>
              <ul className="mt-6 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Building a global tech community</li>
                <li>Promoting continuous learning</li>
                <li>Rewarding innovation and creativity</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-transform hover:scale-105">
              <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">Our Vision</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                To become the leading hub for tech enthusiasts, fostering collaboration and innovation worldwide.
              </p>
              <ul className="mt-6 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Creating opportunities for growth</li>
                <li>Leading in tech challenges and collaboration</li>
                <li>Inspiring the next generation of innovators</li>
              </ul>
            </div>
          </div>

          {/* What Makes Us Unique */}
          <div className="bg-white dark:bg-gray-800 mt-12 p-8 rounded-lg shadow-lg transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">What Makes Us Unique?</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start space-x-4">
                <div className="text-blue-600 dark:text-blue-400 text-2xl">🔥</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Engage in exciting tech challenges that test your problem-solving skills and creativity.
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <div className="text-blue-600 dark:text-blue-400 text-2xl">🏅</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Earn badges and titles like <span className="text-orange-600 dark:text-orange-400 font-bold">NetHunter</span> as a reward for your achievements.
                </p>
              </li>
              <li className="flex items-start space-x-4">
                <div className="text-blue-600 dark:text-blue-400 text-2xl">🌐</div>
                <p className="text-gray-700 dark:text-gray-300">
                  Join a vibrant community of like-minded tech enthusiasts and collaborate on innovative projects.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

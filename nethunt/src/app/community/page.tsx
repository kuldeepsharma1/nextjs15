import React from 'react';

export default function Community() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-12 ">

          {/* Left Section: Community Feed */}
          <section className="col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-blue-500 dark:text-blue-400">Welcome to the NetHunt Community!</h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">Join a community of tech enthusiasts. Share ideas, solve challenges, and level up your skills!</p>
            </div>

            {/* Featured Posts */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400">Featured Posts</h3>
              <div className="mt-4">
                <ul className="space-y-4">
                  <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                    <p className="font-medium">John Doe: &quot;How to optimize your JavaScript code?&quot;</p>
                    <p className="text-gray-600 dark:text-gray-400">A discussion about improving code efficiency and reducing load times.</p>
                  </li>
                  <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                    <p className="font-medium">Jane Smith: &quot;New AI tech trends in 2024&quot;</p>
                    <p className="text-gray-600 dark:text-gray-400">Exploring the most exciting trends in artificial intelligence for developers.</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Middle Section: Active Challenges */}
          <section className="col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400">Current Challenges</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-blue-700 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">Tech Quiz Challenge</p>
                    <p className="text-gray-700 dark:text-gray-300">Test your knowledge on the latest tech trends and become a NetHunter!</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 dark:bg-orange-400 text-white rounded-lg">Join</button>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-blue-700 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">Bug Hunt Challenge</p>
                    <p className="text-gray-700 dark:text-gray-300">Find and fix bugs in our open-source project and earn exclusive rewards!</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 dark:bg-orange-400 text-white rounded-lg">Join</button>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-100 dark:bg-blue-700 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">Code Optimization Challenge</p>
                    <p className="text-gray-700 dark:text-gray-300">Improve and optimize the performance of a complex application.</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 dark:bg-orange-400 text-white rounded-lg">Join</button>
                </div>
              </div>
            </div>
          </section>

          {/* Right Section: Leaderboards */}
          <section className="col-span-1 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400">Top NetHunters</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">Alice Williams</p>
                    <p className="text-gray-600 dark:text-gray-400">Level 5 - 20 Badges</p>
                  </div>
                  <span className="text-orange-500 font-bold">#1</span>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">Bob Johnson</p>
                    <p className="text-gray-600 dark:text-gray-400">Level 4 - 18 Badges</p>
                  </div>
                  <span className="text-orange-500 font-bold">#2</span>
                </li>
                <li className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">Charlie Brown</p>
                    <p className="text-gray-600 dark:text-gray-400">Level 3 - 15 Badges</p>
                  </div>
                  <span className="text-orange-500 font-bold">#3</span>
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* Recent Activities */}
        <section className="mt-12 bg-white dark:bg-gray-800 p-6 m-12 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-blue-500 dark:text-blue-400">Recent Activities</h3>
          <ul className="mt-4 space-y-4">
            <li className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
              <div>
                <p className="font-medium">Alice Williams</p>
                <p className="text-gray-600 dark:text-gray-400">Completed the &quot;Tech Quiz Challenge&quot; and earned 10 NetHunter Points.</p>
              </div>
              <span className="text-orange-500">Just Now</span>
            </li>
            <li className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-gray-600 dark:text-gray-400">Fixed 5 bugs in the &quot;Bug Hunt Challenge&quot; and earned a special badge.</p>
              </div>
              <span className="text-orange-500">5 minutes ago</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

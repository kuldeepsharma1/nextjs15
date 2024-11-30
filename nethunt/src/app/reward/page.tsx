'use client';
import Image from 'next/image';
import React from 'react';

export default function Rewards() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Info Section */}
          <section className="col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-400">Your Achievements</h2>
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300">Username: <span className="font-semibold text-white">JohnDoe123</span></p>
              <p className="text-gray-700 dark:text-gray-300">Level: <span className="font-semibold text-orange-400">5</span></p>
              <p className="text-gray-700 dark:text-gray-300">Total Points: <span className="font-semibold text-orange-400">1250</span></p>
            </div>
            {/* Progress Tracker */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-blue-400">Progress Tracker</h3>
              <div className="mt-4">
                <div className="text-gray-700 dark:text-gray-300">Next Level: 1500 Points</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                  <div
                    className="bg-orange-400 text-xs font-medium text-center p-1 leading-none rounded-full"
                    style={{ width: '83%' }}
                  >
                    83%
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Badges Section */}
          <section className="col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-400">Badges Gallery</h2>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <Image
                  src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_960_720.png"
                  alt="Badge 1"
                  className="w-16 h-16 mx-auto"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-gray-700 dark:text-gray-300">Tech Wizard</p>
              </div>
              <div className="text-center">
                <Image
                  src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_960_720.png"
                  alt="Badge 2"
                  className="w-16 h-16 mx-auto"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-gray-700 dark:text-gray-300">Code Slayer</p>
              </div>
              <div className="text-center">
                <Image
                  src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_960_720.png"
                  alt="Badge 3"
                  className="w-16 h-16 mx-auto"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-gray-700 dark:text-gray-300">Bug Hunter</p>
              </div>
              <div className="text-center">
                <Image
                  src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_960_720.png"
                  alt="Badge 4"
                  className="w-16 h-16 mx-auto"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-gray-700 dark:text-gray-300">Optimization Pro</p>
              </div>
              <div className="text-center">
                <Image
                  src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_960_720.png"
                  alt="Badge 5"
                  className="w-16 h-16 mx-auto"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-gray-700 dark:text-gray-300">Community Helper</p>
              </div>
              <div className="text-center">
                <Image
                  src="https://cdn.pixabay.com/photo/2023/09/22/15/45/panda-8269336_960_720.png"
                  alt="Badge 6"
                  className="w-16 h-16 mx-auto"
                  width={100}
                  height={100}
                />
                <p className="mt-2 text-gray-700 dark:text-gray-300">Community Helper</p>
              </div>
            </div>
          </section>

          {/* Rewards Section */}
          <section className="col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-400">Personalized Rewards</h2>
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm">
                <h3 className="font-medium text-orange-400">Exclusive Access</h3>
                <p className="text-gray-700 dark:text-gray-300">Gain early access to new challenges and features.</p>
              </div>
              <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm">
                <h3 className="font-medium text-orange-400">Exclusive NetHunter Badge</h3>
                <p className="text-gray-700 dark:text-gray-300">Unlock this badge for completing 5 advanced challenges.</p>
              </div>
              <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-sm">
                <h3 className="font-medium text-orange-400">Leaderboard Perks</h3>
                <p className="text-gray-700 dark:text-gray-300">Top performers receive bonus points and merchandise.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Analytics Section */}
        <section className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-blue-400">Performance Analytics</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Challenges Completed</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Completed: <span className="font-semibold">12</span></p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                <div
                  className="bg-orange-400 text-xs font-medium text-center p-1 leading-none rounded-full"
                  style={{ width: '75%' }}
                >
                  75%
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Badges Earned</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">Earned: <span className="font-semibold">8</span></p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                <div
                  className="bg-blue-400 text-xs font-medium text-center p-1 leading-none rounded-full"
                  style={{ width: '80%' }}
                >
                  80%
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

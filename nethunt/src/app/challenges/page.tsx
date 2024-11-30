import Image from 'next/image';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen px-6 py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 text-orange-400">NetHunt Challenges</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Test your knowledge, climb the leaderboard, and unlock exclusive badges. Compete in exciting tech challenges!
        </p>
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-md font-semibold">
            Start Your First Challenge
          </button>
        </div>
      </div>

      {/* Featured Challenges */}
      <div className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Featured Challenges</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[ 
            { title: 'JavaScript Mastery', level: 'Intermediate', img: '/challenge1.png' },
            { title: 'React JS Bootcamp', level: 'Advanced', img: '/challenge2.png' },
            { title: 'CSS Tricks & Tips', level: 'Beginner', img: '/challenge3.png' },
          ].map((challenge, index) => (
            <div key={index} className="bg-gray-800 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl shadow-slate-200">
              <Image
                src={challenge.img}
                alt={challenge.title}
                width={400}
                height={200}
                className="rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-orange-400">{challenge.title}</h3>
              <p className="text-gray-400 dark:text-gray-300">Level: {challenge.level}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md">
                Explore Challenge
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-16 bg-blue-800 dark:bg-blue-900 py-12 px-6 rounded-lg shadow-lg max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Why Join Challenges?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[ 
            { title: 'Earn Unique Badges', description: 'Prove your expertise and showcase your achievements.', icon: '🎖️' },
            { title: 'Level Up Your Skills', description: 'Learn new concepts while solving real-world problems.', icon: '📈' },
            { title: 'Join the Community', description: 'Compete and collaborate with a vibrant tech community.', icon: '🌐' },
          ].map((benefit, index) => (
            <div key={index} className="text-left flex gap-4">
              <span className="text-4xl">{benefit.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-orange-400">{benefit.title}</h3>
                <p className="text-gray-300 dark:text-gray-200">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Challenge CTA */}
      <div className="mt-16 text-center max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Take the First Step</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Choose a challenge, dive in, and grow your skills. There’s something for everyone!
        </p>

        <button className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-md font-semibold">
          Browse Challenges
        </button>
      </div>
    </div>
  );
}

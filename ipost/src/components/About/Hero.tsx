
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
const AboutHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <>

      <section
        ref={heroRef}
        className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center text-center"
      >
        <div>
          <h1 className="text-5xl font-extrabold mb-4">Welcome to IPOSt</h1>
          <p className="text-lg">
            Share your stories, inspire the world, and connect like never before.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-200">
            Get Started
          </button>
        </div>
      </section>

    </>
  );
};

export default AboutHero;





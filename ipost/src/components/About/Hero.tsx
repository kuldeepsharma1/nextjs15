'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AboutHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Animate the hero section on load
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Title and subtitle animations
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-content text-center py-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
      <h1
        ref={titleRef}
        className="text-4xl sm:text-6xl font-bold mb-6 text-white"
      >
        Welcome to IPOSt, the Platform for Modern Creators
      </h1>
      <p
        ref={subtitleRef}
        className="text-lg sm:text-xl mb-8 max-w-4xl mx-auto text-white opacity-80"
      >
        Empowering you to share, connect, and grow with cutting-edge tools for content creators.
      </p>
    </section>
  );
};

export default AboutHero;

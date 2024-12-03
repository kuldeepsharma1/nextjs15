'use client'

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  useEffect(() => {
    // Hero Section Fade-in animation
    gsap.from('.hero-content', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power3.out',
    });

    // Scroll animations for "Features" section
    gsap.from('.feature', {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 1.5,
      scrollTrigger: {
        trigger: '.feature',
        start: 'top 80%',
        end: 'bottom 60%',
        toggleActions: 'play none none reverse',
      },
    });

    // Timeline animation for SVG Path (Example)
    gsap.from('.line', {
      strokeDasharray: 2000,
      strokeDashoffset: 2000,
      duration: 3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Hero Section */}
      <section className="hero-content text-center py-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          Welcome to IPOSt, the Platform for Modern Creators
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-4xl mx-auto">
          Empowering you to share, connect, and grow with cutting-edge tools for content creators.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-semibold mb-6">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="feature p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Easy Content Management</h3>
            <p>Manage your content seamlessly with our intuitive platform.</p>
          </div>
          <div className="feature p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Build Your Community</h3>
            <p>Engage with your audience through community-building tools.</p>
          </div>
          <div className="feature p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Monetization</h3>
            <p>Leverage our monetization features to turn your passion into profit.</p>
          </div>
        </div>
      </section>

      {/* Timeline Animation Section */}
      <section className="py-16 px-8 text-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold mb-6">Our Timeline</h2>
        <div className="relative">
          <svg id="svg-stage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 1200" className="w-full h-96">
            <path className="line" d="M 10 200 600 200" stroke="white" strokeWidth="10" fill="none"></path>
            <circle className="ball ball01" r="20" cx="50" cy="200" fill="white"></circle>
            <circle className="ball ball02" r="20" cx="150" cy="400" fill="white"></circle>
            <circle className="ball ball03" r="20" cx="250" cy="600" fill="white"></circle>
            <circle className="ball ball04" r="20" cx="350" cy="800" fill="white"></circle>
          </svg>
        </div>
      </section>


    </div>
  );
}

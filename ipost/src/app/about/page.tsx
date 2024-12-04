"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".scrollDist",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      timeline
        .fromTo(".sky", { y: 0 }, { y: -200 }, 0)
        .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
        .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
        .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
        .fromTo(".mountBg", { y: -10 }, { y: -100 }, 0)
        .fromTo(".mountMg", { y: -30 }, { y: -250 }, 0)
        .fromTo(".mountFg", { y: -50 }, { y: -600 }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      {/* Scroll Distance */}
      <div className="scrollDist absolute w-full h-[200%]"></div>

      {/* Hero Section */}
      <main className="relative w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200  h-screen top-0 left-1/2 transform -translate-x-1/2">
        <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask1">
            <g className="cloud1">
              <rect fill="#fff" width="100%" height="801" y="799" />
              <image
                xlinkHref="https://assets.codepen.io/721952/cloud1Mask.jpg"
                width="1200"
                height="800"
              />
            </g>
          </mask>
          {/* Sky and Mountains */}
          <image
            className="sky"
            xlinkHref="https://cdn.pixabay.com/photo/2016/09/29/14/06/background-1702930_960_720.jpg"
            width="1200"
            height="590"
          />
          <image
            className="mountBg"
            xlinkHref="https://cdn.pixabay.com/photo/2017/07/17/13/34/abstract-2512412_1280.jpg"
            width="1200"
            height="800"
          />
          <image
            className="mountMg"
            xlinkHref="https://cdn.pixabay.com/photo/2016/06/29/19/23/background-1487545_640.jpg"
            width="1200"
            height="800"
          />
          <image
            className="cloud2"
            xlinkHref="https://cdn.pixabay.com/photo/2016/09/29/14/06/background-1702930_960_720.jpg"
            width="1200"
            height="800"
          />
          <image
            className="mountFg"
            xlinkHref="https://cdn.pixabay.com/photo/2017/07/17/13/34/abstract-2512412_1280.jpg"
            width="1200"
            height="800"
          />
          <image
            className="cloud1"
            xlinkHref="https://cdn.pixabay.com/photo/2016/09/29/14/06/background-1702930_960_720.jpg"
            width="1200"
            height="800"
          />
          <image
            className="cloud3"
            xlinkHref="https://cdn.pixabay.com/photo/2016/09/29/14/06/background-1702930_960_720.jpg"
            width="1200"
            height="800"
          />
          {/* Header Text */}
          <text
            fill="#fff"
            x="350"
            y="150"
            className="text-5xl font-extrabold font-sans"
          >
            Welcome to IPOSt
          </text>
          <text fill="#fff" x="350" y="250" className="text-lg font-light font-sans">
            Where Freedom of Speech Meets Responsibility
          </text>
        </svg>
      </main>

      {/* About Section */}
      <section className="relative bg-gray-900 text-white px-8 py-16 lg:px-16 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8">
            Redefining Digital Freedom
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            IPOSt empowers every individual to express their voice with freedom and responsibility.
            We believe in fostering an inclusive, uncensored platform that encourages open
            communication while combating misinformation and fostering trust.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Your Personal Space</h3>
            <p className="text-gray-300">
              A platform built around you—your thoughts, your freedom, your voice. Share your ideas
              with confidence.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Trust & Transparency</h3>
            <p className="text-gray-300">
              Leveraging blockchain technology, IPOSt ensures transparency and accountability for
              all content.
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Empowering Communities</h3>
            <p className="text-gray-300">
              Build connections, engage in thoughtful dialogue, and collaborate on shared ideas
              that inspire change.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

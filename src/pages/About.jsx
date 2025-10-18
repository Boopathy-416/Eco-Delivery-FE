import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Optional: if you want to keep using your own Button and Input components,
// you can replace <input> and <button> below with your UI components.

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function splitToLetters(text) {
  return Array.from(text).map((ch, i) => (
    <span
      key={i}
      className="letter inline-block will-change-transform will-change-filter"
      aria-hidden="true"
    >
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  const headline = "#Bpy Creation @2025";
  const lines = useMemo(
    () => [
 "Welcome to BPY Creation ., your partner in website development, digital marketing, SEO, and e-commerce solutions.",
    "We’re currently crafting something amazing. Every line of code and design detail is built with passion and precision.",
    "Stay tuned — BPY Creation is coming soon with innovative experiences for your business!",
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".letter", { opacity: 1, y: 0, filter: "none", rotate: 0 });
        gsap.set("[data-line]", { opacity: 1, y: 0 });
        return;
      }

      // Initial states
      gsap.set(".letter", {
        opacity: 0,
        y: 32,
        rotate: () => gsap.utils.random(-8, 8),
        filter: "blur(8px)",
      });
      gsap.set("[data-line]", { opacity: 0, y: 16 });

      const triggerEl = sectionRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to("[data-line]", { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 }, 0);
      tl.to(
        ".letter",
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          filter: "blur(0px)",
          stagger: 0.02,
          duration: 1.2,
        },
        0.05
      );

      // Animate clouds
      gsap.utils.toArray(".cloud").forEach((cloud, i) => {
        const distance = 120 + i * 30;
        const xShift = gsap.utils.random(-40, 40);
        gsap.to(cloud, {
          y: -distance,
          x: xShift,
          opacity: 1,
          scrollTrigger: {
            trigger: triggerEl,
            start: "top 90%",
            end: "bottom top",
            scrub: true,
          },
          ease: "none",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-w-screen overflow-hidden bg-[#006eff4c] py-24 md:py-32"
      aria-labelledby="about-title"
    >
              <svg
            class="absolute top-0 left-0 w-full"
            height="60"
            preserveAspectRatio="none"
            viewBox="0 0 1200 60"
          >
            <path
              d="M0,20 Q300,0 600,20 T1200,20 L1200,0 L0,0 Z"
              fill="#381010"
              opacity="0.8"
            />
            <path
              d="M0,30 Q300,10 600,30 T1200,30 L1200,0 L0,0 Z"
              fill="#000"
              opacity="0.6"
            />
            <path
              d="M0,40 Q300,20 600,40 T1200,40 L1200,0 L0,0 Z"
              fill="#381010"
              opacity="0.4"
            />
            <path
              d="M0,50 Q300,30 600,50 T1200,50 L1200,0 L0,0 Z"
              fill="#381010"
              opacity="0.2"
            />
          </svg>
            <div className="absolute inset-0 bg-black/50" />
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(1200px_600px_at_50%_120%,white_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-10">
        <header className="text-center mb-10 md:mb-18">
          <h2
            id="about-title"
            className="text-balance text-3xl md:text-6xl capitalize playwrite tracking-wider text-white/60"
            data-line
          >
            {splitToLetters(headline)}
          </h2>
        </header>

        <div className="mx-auto max-w-3xl space-y-4 md:space-y-6 text-center">
          {lines.map((line, idx) => (
            <p
              key={idx}
              className="stylefont text-base tracking-wider  text-white/60 md:text-3xl "
              data-line
            >
              {splitToLetters(line)}
            </p>
          ))}
        </div>

        {/* Subscription box */}
        <div className="mx-auto mt-10 md:mt-12 max-w-md">
          <form
            onSubmit={onSubmit}
            className="flex items-center gap-3"
            aria-label="Subscribe for updates"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-2 py-2 md:px-4 md:py-2 border-white border mask-b-from-0.5 rounded-lg bg-white/20 playwrites  
              focus:outline-none focus:ring-2 text-white tracking-wide focus:black/30"
            />
            <button
              type="submit"
              className="shrink-0 bg-black/60 text-gray-100 mask-b-from-0.5 border px-2 py-2 md:px-4 md:py-2 rounded-lg hover:bg-[#ff2519] duration-300 transition"
            >
              Subscribe 🔔
            </button>
          </form>
          {submitted && (
            <p className="mt-3 text-xs bg-black/20 text-right text-gray-400">
              Thanks!🍬 You’re on the list 📃.
            </p>
          )}
        </div>
      </div>

      {/* Clouds layer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] md:h-[45vh] select-none"
        aria-hidden="true"
      >
        <img
          src="src/assets/icons/Frame19.webp"
          alt="image design lft"
          className="cloud md:w-[640px] w-[120px] float absolute bottom-[-2rem] left-[-5%] opacity-80  scale-[1.1]"
        />
        <img
          src="https://res.cloudinary.com/dpm3bum4n/image/upload/v1760784212/1_vkbmvg.png"
          alt="image"
          className="cloud md:w-[500px] w-[120px] absolute top-[3rem] left-[15%] opacity-50 blur-[2px] scale-[0.9]"
        />
        <img
          src="https://res.cloudinary.com/dpm3bum4n/image/upload/v1760784212/1_vkbmvg.png"
          alt="image"
          className="cloud md:w-[600px] w-[120px] absolute bottom-[24rem] left-[45%] opacity-75 blur-[1.5px] scale-[1.05]"
        />
        <img
          src="https://res.cloudinary.com/dpm3bum4n/image/upload/v1760784212/1_vkbmvg.png"
          alt="image"
          className="cloud md:w-[600px] w-[120px] absolute bottom-[-10rem] right-[70%] opacity-80 blur-[1px] scale-[1.1]"
        />
        <img
          src="https://res.cloudinary.com/dpm3bum4n/image/upload/v1760784212/1_vkbmvg.png"
          alt="image"
          className="cloud md:w-[350px] w-[1\420px] absolute bottom-[-18rem] left-[48%] opacity-65 blur-[2px] scale-[0.95]"
        />
      </div>
    </section>
  );
}

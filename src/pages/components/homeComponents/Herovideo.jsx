// components/HeroVideo.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Video from "../../../assets/videos/Trendsmagic.mp4";
export default function HeroVideo() {
  const textRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 4, ease: "power3.out" }
    );
  }, []);

  // Animate text word by word
  gsap.utils.toArray(".animate-text").forEach((text) => {
    const words = text.textContent?.split(" ") || [];
    text.innerHTML = words
      .map((w) => `<span class="word">${w}</span>`)
      .join(" ");
    gsap.from(text.querySelectorAll(".word"), {
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.05,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: text, start: "top 75%" },
    });
  });

  return (
    <section
      className="relative w-full min-h-[100vh] overflow-hidden flex items-center"
      style={{ backgroundColor: "#000" }}
      aria-label="Hero Section"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.png"
      >
        <source src={Video} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div
        ref={textRef}
        className="relative md:ring-1 rounded-3xl  py-10 ring-white/20 z-10 mx-auto max-w-4xl bg-black/10  text-center px-6 text-white"
      >
        <h1
          style={{ fontWeight: "400", fontFamily: " Style Script" }}
          className="text-4xl md:text-6xl animate-text stylefont  leading-tight drop-shadow-lg"
        >
          New collection: live now
        </h1>

        <p className="mt-4 max-w-2xl  playwrite text-lg md:text-xl text-gray-100  leading-relaxed">
          The most gorgeous fall blooms. Rich shades for your home, office, or
          as a gift.
        </p>

        <div className="mt-6">
          <button
            onClick={() => navigate("/shop")}
            className="border playwrite   text-white px-8 py-3
             rounded-xs font-medium tracking-wider hover:bg-black/10 hover:text-white
             hover:bg-conic-180 mask-b-from-0.5 hover:ring-white/60 cursor-pointer  transition-all duration-300 shadow-md"
          >
            View All
          </button>
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="src/assets/images/1.png"
              alt="cloud"
              className="cloud float absolute md:top-18 top-50  md:bottom-0 -bottom-60 left-20  md:left-0  w-full"
            />
            <img
              src="src/assets/images/1.png"
              alt="cloud"
              className="cloud float absolute md:top-18 top-39 md:bottom-0 -bottom-60 -left-10 md:-left-50 w-full"
            />
            <img
              src="src/assets/images/1.png"
              alt="cloud"
              className="cloud float absolute md:top-18 top-70 md:bottom-0 -bottom-60 -left-10 md:left-100 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

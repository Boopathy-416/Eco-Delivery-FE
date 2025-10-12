import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Smooth fade + slide-in animation using GSAP
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.inOut" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col stylefont items-center justify-center min-h-screen text-white text-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-8xl stylefont mb-4 drop-shadow-lg ">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 drop-shadow-md">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-shadow-black bg-black/10 p-2 md:text-xl tracking-widest mb-8 opacity-90 drop-shadow-sm">
        The page you’re looking for doesn’t exist or was moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-white/10 text-black cursor-pointer  px-6 py-3 rounded-2xl font-semibold hover:bg-black/10 transition-all duration-100 shadow-md"
      >
      Return to Home
      </button>
    </div>
  );
};

export default NotFound;

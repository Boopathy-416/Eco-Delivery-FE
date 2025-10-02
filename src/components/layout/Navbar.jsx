import { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  ShoppingCartIcon,
  Waves,
} from "lucide-react";
import gsap from "gsap";
import audios from "../../assets/audio/preview.mp3";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Navbar() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const iconRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef(null);
  const closeButtonRef = useRef(null);
  const isOpen = useRef(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    { name: "Mixes", href: "/mixes" },
  ];

  useEffect(() => {
    const menu = menuRef.current;
    const menuItemsContainer = menuItemsRef.current;
    const closeButton = closeButtonRef.current;
    const toggleButton = document.getElementById("menu-toggle"); // ✅ trigger button in Nav

    if (!menu || !menuItemsContainer || !closeButton || !toggleButton) return;

    // Initial state - menu hidden
    gsap.set(menu, { autoAlpha: 0, scale: 0.95 });
    gsap.set(menuItemsContainer.children, { y: 50, autoAlpha: 0 });
    gsap.set(closeButton, { scale: 0, rotation: -180 });

    const openMenu = () => {
      if (isOpen.current) return;
      isOpen.current = true;

      const tl = gsap.timeline();

      // Animate menu overlay
      tl.to(menu, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
      });

      // Animate close button
      tl.to(
        closeButton,
        {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

      // Animate menu items
      tl.to(
        menuItemsContainer.children,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    };

    const closeMenu = () => {
      if (!isOpen.current) return;
      isOpen.current = false;

      const tl = gsap.timeline();

      // Animate menu items out
      tl.to(menuItemsContainer.children, {
        y: -50,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.in",
      });

      // Animate close button
      tl.to(
        closeButton,
        {
          scale: 0,
          rotation: 180,
          duration: 0.3,
          ease: "back.in(1.7)",
        },
        "-=0.3"
      );

      // Animate menu overlay
      tl.to(menu, {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power3.in",
      });
    };

    toggleButton.addEventListener("click", openMenu);
    closeButton.addEventListener("click", closeMenu);

    // Close menu when clicking on a link
    const links = menuItemsContainer.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    return () => {
      toggleButton.removeEventListener("click", openMenu);
      closeButton.removeEventListener("click", closeMenu);
      links.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, []);

  useEffect(() => {
    // Create audio element with a sample audio URL (you can replace this with your own)
    const audio = new Audio();
    audio.src = { audios }; // sample music
    audio.loop = true;
    audio.volume = 1;
    audioRef.current = audio;

    // Animate button on mount
    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        scale: 0,
        rotation: -360,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.5,
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      // Unmute and play
      audioRef.current.play();
      setIsPlaying(true);
      setIsMuted(false);

      // Animate icon
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(1.7)" }
        );
      }
    } else {
      // Mute and pause
      audioRef.current.pause();
      setIsPlaying(false);
      setIsMuted(true);

      // Animate icon
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { scale: 1, rotation: 0 },
          { scale: 0, rotation: 180, duration: 0.3, ease: "back.in(1.7)" }
        );
        gsap.to(iconRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
          delay: 0.3,
        });
      }
    }
  };

  return (
    <>
      <div
        ref={menuRef}
        className="fixed inset-0 z-50 bg-gradient-to-br from-purple-600 via-pink-500 md:rounded-b-full to-orange-400 flex items-center justify-center"
        style={{ visibility: "hidden" }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-8 h-8 text-white " strokeWidth={3.5} />
        </button>

        {/* Menu Items */}
        <div ref={menuItemsRef} className="flex flex-col items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href} // ✅ React Router
              className="text-6xl md:text-8xl font-black text-white hover:text-white/80 transition-all duration-300 hover:scale-110 relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-2 bg-white group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
          <div className="flex space-x-6 ">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-400 hover:text-blue-500 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-400 hover:text-pink-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-400 hover:text-sky-400 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-400 hover:text-blue-600 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-400 hover:text-red-600 transition"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>
      <nav className="fixed  top-0 left-0 right-0 z-40 bg-transparent border-gray-300 border-b backdrop-blur-md ">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="md:text-4xl text-2xl stylefont text-black backdrop-opacity-70 tracking-wider hover:opacity-80 transition-opacity"
            >
              Eco<span className=" md:text-4xl">Delivery </span>
              <ShoppingCartIcon className=" inline-flex" />
            </a>

            {/* Center Menu Button */}
            <button
              id="menu-toggle"
              className="flex items-center justify-center w-20 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all hover:border-0 border border-gray-400 border-b-4  duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              <Waves className="w-6 h-6 text-purple-600 " strokeWidth={2.9} />
            </button>

            {/* Right Side - Shop & Cart */}
            <div className="flex items-center tracking-wider gap-6">
              <a
                href="/shop"
                className="md:text-4xl text-2xl font-bold  hover:opacity-80 transition-colors flex items-center gap-2"
              >
                shop
              </a>
              <a
                href="/cart"
                className="md:text-4xl text-2xl font-bold hover:opacity-80 transition-colors flex items-center gap-2"
              >
                cart
              </a>
            </div>
          </div>
        </div>
      </nav>
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className="fixed bottom-8 left-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <div ref={iconRef} className="relative">
          {isMuted ? (
            <VolumeX className="w-7 h-7" strokeWidth={2.5} />
          ) : (
            <Volume2 className="w-7 h-7 animate-pulse" strokeWidth={2.5} />
          )}
        </div>

        {/* Ripple effect when playing */}
        {isPlaying && (
          <span
            className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping"
            style={{ animationDuration: "2s" }}
          />
        )}
      </button>

      {/* Tooltip */}
      <div className="fixed bottom-8 left-28 z-40 pointer-events-none">
        {/* <div
          className={`px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium transition-all duration-300 ${
            isMuted ? "opacity-100" : "opacity-0"
          }`}
        >
          Click to unmute music 🎵
        </div> */}
      </div>
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className="fixed bottom-8 left-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <div ref={iconRef} className="relative">
          {isMuted ? (
            <VolumeX className="w-7 h-7" strokeWidth={2.5} />
          ) : (
            <Volume2 className="w-7 h-7 animate-pulse" strokeWidth={2.5} />
          )}
        </div>

        {/* Ripple effect when playing */}
        {isPlaying && (
          <span
            className="absolute inset-0 rounded-full bg-pink-500/30 animate-ping"
            style={{ animationDuration: "2s" }}
          />
        )}
      </button>

      {/* Tooltip */}
      <div className="fixed bottom-8 left-28 z-40 pointer-events-none">
        {/* <div
          className={`px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium transition-all duration-300 ${
            isMuted ? "opacity-100" : "opacity-0"
          }`}
        >
          Click to unmute music 🎵
        </div> */}
      </div>
    </>
  );
}

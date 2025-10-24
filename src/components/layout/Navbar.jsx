import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, X,} from "lucide-react";
import gsap from "gsap";
import audios from "../../assets/audio/preview.mp3";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaShoppingBag,
} from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { GiShop } from "react-icons/gi";
import { FaRupeeSign } from "react-icons/fa";


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
  const cartRef = useRef(null);
  const inrRef = useRef(null);
  useEffect(() => {
    const cart = cartRef.current;
    const inr = inrRef.current;

    const handleMouseEnter = () => {
      gsap.to(cart, { x: 40, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        inr,
        { opacity: 0, x: -20, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    };

    const handleMouseLeave = () => {
      gsap.to(cart, { x: 0, duration: 0.4, ease: "power3.inOut" });
      gsap.to(inr, {
        opacity: 0,
        x: -20,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.inOut",
      });
    };

    const parent = cart.parentElement;
    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);


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
        className="fixed inset-0 z-50  bg-gradient-to-br from-purple-600 via-pink-500 md:rounded-b-full to-orange-400 flex items-center justify-center"
        style={{ visibility: "hidden" }}
      >
        <svg
          class="absolute top-0 left-0 w-full"
          height="60"
          preserveAspectRatio="none"
          viewBox="0 0 1200 60"
        >
          <path
            d="M0,20 Q300,0 600,20 T1200,20 L1200,0 L0,0 Z"
            fill="#3b82f6"
            opacity="0.8"
          />
          <path
            d="M0,30 Q300,10 600,30 T1200,30 L1200,0 L0,0 Z"
            fill="#3b82f6"
            opacity="0.6"
          />
          <path
            d="M0,40 Q300,20 600,40 T1200,40 L1200,0 L0,0 Z"
            fill="#3b82f6"
            opacity="0.4"
          />
          <path
            d="M0,50 Q300,30 600,50 T1200,50 L1200,0 L0,0 Z"
            fill="#3b82f6"
            opacity="0.2"
          />
        </svg>

        <div className="absolute inset-0 pointer-events-none">
          <svg
            class="absolute top-0 left-0 w-full"
            height="60"
            preserveAspectRatio="none"
            viewBox="0 0 1200 60"
          >
            <path
              d="M0,20 Q300,0 600,20 T1200,20 L1200,0 L0,0 Z"
              fill="#3b82f6"
              opacity="0.8"
            />
            <path
              d="M0,30 Q300,10 600,30 T1200,30 L1200,0 L0,0 Z"
              fill="#3b82f6"
              opacity="0.6"
            />
            <path
              d="M0,40 Q300,20 600,40 T1200,40 L1200,0 L0,0 Z"
              fill="#3b82f6"
              opacity="0.4"
            />
            <path
              d="M0,50 Q300,30 600,50 T1200,50 L1200,0 L0,0 Z"
              fill="#3b82f6"
              opacity="0.2"
            />
          </svg>
          <img
            src="src/assets/images/1.png"
            alt="cloud"
            className="cloud z-20 absolute top-10 opacity-15 left-10 w-full"
          />

          <img
            src="src/assets/images/3.png"
            alt="cloud"
            className="cloud z-20 absolute bottom-80 opacity-65  left-3/4 w-[60%] "
          />
        </div>
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="absolute top-8 z-22 right-8 w-16 h-16 ring-1 ring-black/40  rounded-4xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-10 h-10 text-[#434343e6]  cursor-pointer  " strokeWidth={1.5} />
        </button>

        {/* Menu Items */}
        <div
          ref={menuItemsRef}
          className="flex flex-col z-23  items-center gap-8"
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-6xl stylefont md:text-8xl font-black tracking-wider text-[#dedede]  opacity-70 hover:opacity-100 hover:text-gray-300 transition-all duration-300 hover:scale-110 relative group"
            >
              {item.name}
              <span className="absolute bottom-0  left-0 w-0 h-2 bg-white/60 group-hover:w-full transition-all rounded-r-2xl duration-800" />
            </Link>
          ))}
          <div className="flex space-x-6 z-24 shadow-amber-900 shadow-2xl bg-amber-300 p-1 px-2 rounded-2xl ">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-gray-400  hover:text-blue-500 transition"
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
          <p className="text-[11px] font-bold text-gray-400 tracking-widest">
            &copy; {new Date().getFullYear()} Bpy Creation. All rights reserved.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>
      <nav className="fixed ring-1 top-0 left-0 right-0 z-40 bg-transparent  backdrop-blur-sm ">
        <div className="container mx-auto px-6 pt-4 pb-2 ">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="md:text-4xl  mask-linear-from-white/200  text-xl stylefont text-[#dedede]  backdrop-opacity-70 tracking-wider hover:opacity-80 transition-opacity"
            >
              Trends<span className=" md:text-4xl text-[#1eff1a]">Magic</span>
            </a>

            {/* Center Menu Button */}
            <button
              id="menu-toggle"
              className="flex items-center justify-center md:w-18 md:h-14 w-10  rounded-b-md md:rounded-b-xl 
               transition-all  duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              <GiShop    className=" md:text-4xl hover:translate-y-2 transition-all duration-300 hover:text-[#1eff1a] text-2xl
               text-[#dedede]    cursor-pointer "
                strokeWidth={0.1}  />


            </button>

            {/* Right Side - Shop & Cart */}
            <div className="flex items-center  tracking-tighter gap-6 md:gap-16">
              <a
                href="/shop"
                className="md:text-4xl  text-[#dedede]  text-2xl font-bold 
                 hover:opacity-80 transition-colors flex items-center gap-2"
              >
              <FaShoppingBag className="hover:translate-y-2 transition-all duration-300 hover:text-[#1eff1a]" />
              </a>



  <a
      href="/cart"
      className="relative flex items-center justify-center group overflow-hidden"
    >
      {/* INR Icon */}
      <FaRupeeSign
        ref={inrRef}
        className="absolute left-0 text-[#017db3] opacity-0 text-2xl md:text-3xl"
      />

      {/* Cart Icon */}
      <RiShoppingCartFill
        ref={cartRef}
        className="text-[#d44300] group-hover:text-[#2a2a2a5b]  md:text-4xl text-2xl font-bold rounded-2xl"
      />
    </a>


            </div>
          </div>
        </div>
      </nav>
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className="fixed bottom-8 left-8 z-40 w-16  h-16 rounded-full bg-[url(src/assets/images/stiker.svg)] bg-cover text-amber-700   shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        <div ref={iconRef} className="relative">
          {isMuted ? (
            <VolumeX className="w-5 h-5" strokeWidth={2.5} />
          ) : (
            <Volume2 className="w-5 h-5 animate-pulse" strokeWidth={2.5} />
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

      </div>
      <button
        ref={buttonRef}
        onClick={toggleMute}
        className="fixed bottom-8 left-8 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-[#dedede]  shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
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
          className={`px-4 py-2 rounded-lg bg-gray-900 text-[#dedede]  text-sm font-medium transition-all duration-300 ${
            isMuted ? "opacity-100" : "opacity-0"
          }`}
        >
          Click to unmute music 🎵
        </div> */}
      </div>
    </>
  );
}

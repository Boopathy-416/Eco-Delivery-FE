import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroVideo from "./components/homeComponents/Herovideo";
import FloatingChat from "./components/homeComponents/FloatingChart";
import AboutSection from "./About";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cloud parallax animation
      gsap.utils.toArray(".cloud").forEach((cloud, index) => {
        const speed = 0.5 + index * 0.3;
        gsap.to(cloud, {
          y: -300 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });

      // Section fade in
      gsap.utils.toArray(".section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 100,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        });
      });

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

      gsap.utils.toArray(".animate-title").forEach((title) => {
        gsap.from(title, {
          scale: 0.5,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: { trigger: title, start: "top 70%" },
        });
      });

      // Animate images
      gsap.utils.toArray(".animate-image").forEach((img, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.from(img, {
          x: direction,
          opacity: 0,
          rotation: index % 2 === 0 ? -10 : 10,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: img, start: "top 80%" },
        });
      });

      // Card stagger animations
      gsap.utils.toArray(".card-item").forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotation: Math.random() * 10 - 5,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      // Review cards animation
      gsap.utils.toArray(".review-card").forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: { trigger: card, start: "top 80%" },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative pt-18  bg-[#2c0b0e] min-h-screen overflow-hidden"
    >
      {/* Clouds Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* <img
          src="src/assets/images/1.png"
          alt="cloud"
          className="cloud z-40 opacity-90 absolute top-18 left-10 w-full"
        /> */}
        <img
          src="src/assets/images/2.png"
          alt="cloud"
          className="cloud absolute  top-0 right-20 opacity-15 w-full"
        />
        <img
          src="src/assets/images/3.png"
          alt="cloud"
          className="cloud absolute   bottom-10 left-1/2 w-full"
        />
        <img
          src="src/assets/images/1.png"
          alt="cloud"
          className="cloud absolute  opacity-25 top-10 left-10 w-full"
        />
        <img
          src="src/assets/images/2.png"
          alt="cloud"
          className="cloud absolute top-20 right-20 opacity-15 w-full"
        />
        <img
          src="src/assets/images/3.png"
          alt="cloud"
          className="cloud absolute  bottom-10 left-1/2 w-full"
        />
      </div>

      <main className="flex flex-col">
        <HeroVideo />
        <FloatingChat />
      </main>

      <AboutSection />

      {/* Section 3: Products */}
      <section className="section min-h-screen flex items-center justify-center  py-20">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6">
          <h2 className="animate-title text-6xl md:text-7xl font-bold text-gray-900 mb-12 text-center">
            Products & Quality
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Selection",
                desc: "Handpicked ingredients",
                icon: "🍬",
              },
              {
                title: "Quality Testing",
                desc: "Rigorous standards",
                icon: "🔬",
              },
              { title: "Fresh Daily", desc: "Made to order", icon: "✨" },
            ].map((item, i) => (
              <div
                key={i}
                className="card-item p-8 text-center hover:shadow-xl transition-shadow bg-white/80 rounded-2xl"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Collection */}
      <section className="section min-h-screen flex items-center justify-center  py-20">
        <div className="absolute inset-0 pointer-events-none"></div>
        <div className="container mx-auto px-6">
          <h2 className="animate-title text-6xl md:text-7xl font-bold text-gray-900 mb-12 text-center">
            Latest Collection
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="card-item overflow-hidden hover:shadow-2xl transition-all bg-white/20 rounded-2xl"
              >
                <div className="animate-image">
                  <img
                    src={`/products/candy-${item}.jpg`}
                    alt={`Product ${item}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl   mb-2 text-gray-900">
                    Sweet Delight {item}
                  </h3>
                  <p className="text-gray-600  mb-4">
                    Premium handcrafted confection
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">
                      $24.99
                    </span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

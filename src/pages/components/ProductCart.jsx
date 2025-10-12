import { useState, useEffect, useRef } from "react";
import { Minus, Plus, PlusCircle } from "lucide-react";
import { gsap } from "gsap";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(100);
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const handleAddToCart = () => {
    console.log("Adding to cart:", { product, quantity });
  };

  // ✅ Tag color logic
  const getTagColor = (tag) => {
    switch (tag) {
      case "SWEET":
        return "bg-pink-200 text-pink-900";
      case "SOUR":
        return "bg-yellow-200 text-yellow-900";
      case "GLUTEN FREE":
        return "bg-green-200 text-green-900";
      case "GELATIN FREE":
        return "bg-purple-200 text-purple-900";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // ✅ Automatically choose between local or CDN image
  const getImageSource = (imagePath) => {
    if (!imagePath) return "/placeholder.svg";

    // CDN detection (Cloudinary, AWS, ImgBB, etc.)
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Local image (inside public/images)
    return `/images/${imagePath}`;
  };

  // ✅ GSAP Animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      imgRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );
  }, []);


  // bg-gradient-to-br from-gray-200 to-white
  return (
    <div
      ref={cardRef}
      className="w-[380px] overflow-hidden  border-0 bg-gradient-to-b from-[#CFC3E0]/0 to-[#af9ccc] hover:shadow-2xl transition-all duration-300 rounded-2xl hover:scale-[1.02]"
    >
      {/* ✅ Image Container */}
      <div className="relative hover:bg-gradient-to-b from-[#CFC3E0]/0 to-[#7234ce5c]  p-8 h-[320px] flex items-center justify-center">
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-xs font-bold ${getTagColor(
                tag
              )}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ✅ Auto-detect CDN/local image */}
        <img
          ref={imgRef}
          src={getImageSource(product.image)}
          alt={product.name}
          className="w-full z-40 cursor-pointer h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* ✅ Content */}
      <div className="p-6 pricefont bg-pink-50 ">
        <h3 className="text-2xl  mb-6 text-gray-700 tracking-wide">
          {product.name}
        </h3>

        {/* ✅ Price and Quantity */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toFixed(1)} {product.currency}
          </span>

          <div className="flex items-center gap-3 bg-black/20 rounded-full px-4 py-2 shadow-md">
            <button
              className="h-6 w-6 rounded-full bg-amber-400 text-gray-100 flex items-center justify-center transition-all"
              onClick={() => setQuantity(Math.max(50, quantity - 50))}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm tracking-wider min-w-[50px] text-center">
              {quantity}g
            </span>
            <button
              className="h-6 w-6  hover:opacity-75  bg-amber-500 rounded-2xl text-gray-100 flex items-center justify-center transition-all"
              onClick={() => setQuantity(quantity + 50)}
            >
              <Plus className="h-4 w-4 rounded-2xl " />
            </button>
          </div>
        </div>

        {/* ✅ Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-pink-600 mask-radial-from-neutral-200 cursor-pointer hover:bg-pink-600 text-white 
           text-base tracking-widest py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
        >
          ADD TO CART <PlusCircle className="  hover:scale-125 mask-b-from-3.5 p-0.5 inline-block " />
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCart";

export default function ProductSlider() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Use refs for card widths
  const cardWidth = 400; // width of each ProductCard + gap

  useEffect(() => {
    // ✅ Mock products: mix of local and CDN images
    const mockProducts = [
      {
        id: 1,
        name: "Strawberry Delight",
        price: 250,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SWEET", "GLUTEN FREE"],
      },
      {
        id: 2,
        name: "Citrus Blast",
        price: 180,
        currency: "₹",
        image: "https://melmagazine.com/uploads/2018/08/1NPTw5uIT4COChKKS4_Bopg.png", // local image from public/images
        tags: ["SOUR", "GELATIN FREE"],
      },
      {
        id: 3,
        name: "Choco Heaven",
        price: 300,
        currency: "₹",
        image: "https://image.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg",
        tags: ["SWEET"],
      },
      {
        id: 4,
        name: "Sour Punch",
        price: 220,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SOUR", "GLUTEN FREE"],
      },
       {
        id: 5,
        name: "Strawberry Delight",
        price: 250,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SWEET", "GLUTEN FREE"],
      },
      {
        id: 6,
        name: "Citrus Blast",
        price: 180,
        currency: "₹",
        image: "https://melmagazine.com/uploads/2018/08/1NPTw5uIT4COChKKS4_Bopg.png", // local image from public/images
        tags: ["SOUR", "GELATIN FREE"],
      },
      {
        id: 7,
        name: "Choco Heaven",
        price: 300,
        currency: "₹",
        image: "https://image.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg",
        tags: ["SWEET"],
      },
      {
        id: 8,
        name: "Sour Punch",
        price: 220,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SOUR", "GLUTEN FREE"],
      },
       {
        id: 9,
        name: "Strawberry Delight",
        price: 250,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SWEET", "GLUTEN FREE"],
      },
      {
        id: 10,
        name: "Citrus Blast",
        price: 180,
        currency: "₹",
        image: "https://melmagazine.com/uploads/2018/08/1NPTw5uIT4COChKKS4_Bopg.png", // local image from public/images
        tags: ["SOUR", "GELATIN FREE"],
      },
      {
        id: 11,
        name: "Choco Heaven",
        price: 300,
        currency: "₹",
        image: "https://image.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg",
        tags: ["SWEET"],
      },
      {
        id: 12,
        name: "Sour Punch",
        price: 220,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SOUR", "GLUTEN FREE"],
      },
       {
        id: 13,
        name: "Strawberry Delight",
        price: 250,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SWEET", "GLUTEN FREE"],
      },
      {
        id: 14,
        name: "Citrus Blast",
        price: 180,
        currency: "₹",
        image: "https://melmagazine.com/uploads/2018/08/1NPTw5uIT4COChKKS4_Bopg.png", // local image from public/images
        tags: ["SOUR", "GELATIN FREE"],
      },
      {
        id: 15,
        name: "Choco Heaven",
        price: 300,
        currency: "₹",
        image: "https://image.freepik.com/free-photo/pretty-young-stylish-sexy-woman-pink-luxury-dress-summer-fashion-trend-chic-style-sunglasses-blue-studio-background-shopping-holding-paper-bags-talking-mobile-phone-shopaholic_285396-2957.jpg",
        tags: ["SWEET"],
      },
      {
        id: 16,
        name: "Sour Punch",
        price: 220,
        currency: "₹",
        image:
          "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-04/woman%20shopping.jpg",
        tags: ["SOUR", "GLUTEN FREE"],
      },
    ];
    setProducts(mockProducts);
  }, []);

  // ✅ Jump to index without smooth animation
  const slideToIndex = (index) => {
    if (!sliderRef.current) return;
    const offset = -index * cardWidth;
    sliderRef.current.style.transform = `translateX(${offset}px)`;
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : products.length - 1;
    slideToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < products.length - 1 ? currentIndex + 1 : 0;
    slideToIndex(newIndex);
  };

  return (
<>  
          {/* <p className="cursor-pointer text-xs md:mt-18 mt-10 z-50 fixed  px-2 border-x-fuchsia-950 border-2 rounded-full bg-amber-100 text-amber-750 font-medium tracking-wider uppercase ">
            SHOP THE LATEST SWEETS  <mark className="h-2 text-xs bg-amber-500 text-gray-700">40% offer</mark>
          </p> */}
    <section
      className="relative py-22 px-4 md:px-8 lg:px-16 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #f9f9ff, #fff)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center  ">
          <h1 className="text-5xl float stylefont md:text-8xl py-4 tracking-wider backdrop-opacity-90 opacity-80  mb-6">
            Our BestSelling
            <br /> Treats
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto playwrite  leading-relaxed">
            Sweet, sour, chewy, or fruity – we've got the right candy for every
            mood. From sharp bursts of sour to soft bites of sweetness, there's
            always something to enjoy.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex  justify-end gap-3 mb-8">
          <button
            onClick={handlePrev}
            className="h-12 w-12 rounded-full  bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={handleNext}
            className="h-12 w-12 rounded-full  bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="h-10 w-10  " />
          </button>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          <div
            ref={sliderRef}
            className="flex gap-6"
            style={{
              width: "fit-content",
              transition: "none", // ✅ disable smooth GSAP animation
            }}
          >
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white px-12 py-6 text-lg playwrite  rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            TREAT YOURSELF
          </button>
        </div>
      </div>
    </section>
    </>
  );
}

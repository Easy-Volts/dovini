import React, { useState, useEffect } from "react";
import {
  Camera,
  Zap,
  Package,
  Phone,
  TrendingUp,
  Cpu,
  Gift,
  Headset,
  Aperture,
  ZoomIn,
  Focus,
  Plane,
  BatteryCharging,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { categories } from "../data/categories";
import { Link } from "react-router-dom";


const slides = [
  {
    title: "CAPTURE THE MOMENT",
    subtitle: "Up to 40% Off Premium Lenses and Kits.",
    backgroundImage: "https://images.unsplash.com/photo-1606983340222-685b8ad6a142?q=80&w=870&auto=format&fit=crop",
    tag: "SHUTTER SALE",
    tagColor: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500",
  },
  {
    title: "NEW DOVINI MARK V",
    subtitle: "Pre-order now and get a free battery grip!",
    backgroundImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=870&auto=format&fit=crop",
    tag: "PRE-ORDER",
    tagColor: "bg-gray-900",
  },
  {
    title: "DRONE FLYAWAY SALE",
    subtitle: "Massive discounts on all Aerial Gear. Limited stock!",
    backgroundImage: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=870&auto=format&fit=crop",
    tag: "FLY HIGH",
    tagColor: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500",
  },
  {
    title: "PROFESSIONAL LIGHTING",
    subtitle: "Studio lights and modifiers at unbeatable prices.",
    backgroundImage: "https://images.unsplash.com/photo-1552168324-d612d77725e3?q=80&w=870&auto=format&fit=crop",
    tag: "LIGHT UP",
    tagColor: "bg-yellow-600",
  },
  {
    title: "ACCESSORY BUNDLE",
    subtitle: "Complete your kit with essential accessories.",
    backgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=870&auto=format&fit=crop",
    tag: "BUNDLE DEAL",
    tagColor: "bg-green-600",
  },
  {
    title: "USED GEAR MARKET",
    subtitle: "Certified pre-owned equipment at great prices.",
    backgroundImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=870&auto=format&fit=crop",
    tag: "PRE-OWNED",
    tagColor: "bg-blue-600",
  },
];

const promoTiles = [
  {
    title: "Gear Deals",
    subtitle: "Flash Savings",
    backgroundImage: "https://images.unsplash.com/photo-1512025316832-8658f04f8a83?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    overlayColor: "rgba(239, 68, 68, 0.8)", // red-500 with opacity
    textColor: "text-white",
    link: "#",
  },
  {
    title: "Clearance",
    subtitle: "Up to 70% Off",
    backgroundImage: "https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    overlayColor: "rgba(107, 114, 128, 0.6)", // gray-500 with opacity
    textColor: "text-white",
    link: "#",
  },
  {
    title: "Dovini Pro",
    subtitle: "Exclusive Service",
    backgroundImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    overlayColor: "rgba(0, 0, 0, 0.7)", // black with opacity
    textColor: "text-white",
    link: "#",
  },
  {
    title: "Used Gear Sell",
    subtitle: "Quick Cash Offer",
    backgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    overlayColor: "rgba(234, 179, 8, 0.7)", // yellow-500 with opacity
    textColor: "text-white",
    link: "#",
  },
  {
    title: "Trade-Up Bonus",
    subtitle: "10% Extra Credit",
    backgroundImage: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    overlayColor: "rgba(34, 197, 94, 0.7)", // green-500 with opacity
    textColor: "text-white",
    link: "#",
  },
  {
    title: "New Arrivals",
    subtitle: "Latest Gear",
    backgroundImage: "https://images.unsplash.com/photo-1606983340222-685b8ad6a142?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    overlayColor: "rgba(99, 102, 241, 0.7)", // indigo-500 with opacity
    textColor: "text-white",
    link: "#",
  },
  {
    title: "Accessories",
    subtitle: "Bags & Straps",
    backgroundImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    overlayColor: "rgba(249, 115, 22, 0.7)", // orange-500 with opacity
    textColor: "text-white",
    link: "#",
  },
  {
    title: "Support",
    subtitle: "24/7 Experts",
    backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    overlayColor: "rgba(236, 72, 153, 0.7)", // pink-500 with opacity
    textColor: "text-white",
    link: "#",
  },
];

// Reusable Button Component for the Right Panel
const InfoButton = ({ title, description, Icon }) => (
  <div className="flex items-center p-3 transition duration-300 ease-in-out cursor-pointer hover:bg-gray-50 rounded-lg">
    <Icon className="w-6 h-6 mr-3 text-red-600" />
    <div>
      <div className="text-sm font-semibold text-gray-800">{title}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  </div>
);

// --- Main App Component ---

const Hero = () => {
  // State for the main carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // for desktop carousel

  // Auto-advance logic for the carousel (desktop)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds (5000ms)

    return () => clearTimeout(timer);
  }, [currentSlide, totalSlides]);

  const slide = slides[currentSlide];

  // Function to handle horizontal scrolling of the promo tiles
  const scrollContainer = (direction) => {
    const container = document.getElementById("promo-scroll-container");
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of the visible width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" bg-gray-100 font-sans">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-0 lg:mb-8">
          {/* 1. Left Categories Sidebar (Jumia-style menu) */}
          <div className="lg:col-span-3 xl:col-span-2 hidden lg:block">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">
                Shop Categories
              </h2>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <Link
                    to={`/products?category=${category.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    key={category.id}
                    className="flex items-center text-sm text-gray-700 p-2 rounded-lg transition duration-150 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                  >
                    <category.icon className="w-4 h-4 mr-3 opacity-70" />
                    {category.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Central Main Banner */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-7">
            {/* Desktop Carousel */}
            <div className="hidden sm:block">
              <div
                className="relative overflow-hidden h-[300px] sm:h-[400px] lg:h-[450px] rounded-xl shadow-2xl flex items-center justify-between p-6 md:p-12 transition-all duration-500 ease-in-out"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Decorative Tag */}
                <div
                  className={`absolute top-0 left-0 ${slide.tagColor} text-white px-4 sm:px-6 py-2 rounded-br-xl text-sm sm:text-lg font-extrabold shadow-md transform -translate-x-1 -translate-y-1 rotate-1 z-20`}
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                  {slide.tag}
                </div>

                {/* Text Content */}
                <div className="z-10 max-w-md">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-2 drop-shadow-lg">
                    <span className="text-red-400">DOVINI</span> {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-100 mb-4 sm:mb-6 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Featured Product Image */}
                <div className="relative z-10 hidden sm:block">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-2xl border border-white/20">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1595793550800-5bdd9d23b2fa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Professional Softbox Kit"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {slides.slice(0, 3).map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "bg-red-400 w-5"
                          : "bg-white opacity-50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden">
              <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-72 h-48 rounded-xl shadow-2xl relative overflow-hidden flex items-center justify-between p-4 transition-all duration-300 hover:shadow-3xl"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.backgroundImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    {/* Decorative Tag */}
                    <div
                      className={`absolute top-0 left-0 ${slide.tagColor} text-white px-3 py-1 rounded-br-lg text-xs font-extrabold shadow-md transform -translate-x-1 -translate-y-1 rotate-1 z-20`}
                    >
                      <Zap className="w-3 h-3 inline mr-1" />
                      {slide.tag}
                    </div>

                    {/* Text Content */}
                    <div className="z-10 max-w-xs">
                      <h1 className="text-lg font-extrabold leading-tight text-white mb-1 drop-shadow-lg">
                        <span className="text-red-400">DOVINI</span> {slide.title}
                      </h1>
                      <p className="text-xs font-light text-gray-100 drop-shadow-md">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Right Info Panel (Utility Links) */}
          <div className="col-span-1 lg:col-span-3 xl:col-span-3 hidden lg:block">
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 space-y-2">
              <InfoButton
                title="Expert Support"
                description="Schedule a call with a pro technician"
                Icon={Headset}
              />
              <div className="h-px bg-gray-200 mx-3"></div>
              <InfoButton
                title="Buy Your Gears"
                description="Get a quote for your used equipment"
                Icon={TrendingUp}
              />
              <div className="h-px bg-gray-200 mx-3"></div>
              <InfoButton
                title="Unlimited Sales"
                description="Shop unlimited products"
                Icon={Gift}
              />
            </div>

            {/* Secondary Banner */}
            <div className="mt-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-4 rounded-xl shadow-lg text-white text-center sm:text-left">
              <Phone className="w-5 h-5 mb-2" />
              <h3 className="text-xl font-bold">CALL FOR ADVICE</h3>
              <p className="text-2xl font-extrabold mt-1">1-800-DOVINI</p>
            </div>
          </div>
        </div>

        <div className="relative py-2 lg:py-4 mt-4">
          {/* Scroll Buttons */}
          <button
            onClick={() => scrollContainer("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 hover:bg-white transition hidden md:block"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 hover:bg-white transition hidden md:block"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          <div
            id="promo-scroll-container"
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for various browsers
          >
            {/* Custom utility for hiding scrollbar in CSS */}
            <style>{`
                            #promo-scroll-container::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
            {promoTiles.map((tile, index) => (
              <a
                key={index}
                href={tile.link}
                className="flex-shrink-0 w-32 sm:w-40 md:w-48 group cursor-pointer"
              >
                {/* Tile Image/Content Block */}
                <div
                  className="relative h-32 w-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.02] border-4 border-white"
                  style={{
                    backgroundImage: `linear-gradient(${tile.overlayColor}, ${tile.overlayColor}), url(${tile.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="text-center">
                      <div className={`text-lg sm:text-xl font-bold ${tile.textColor} drop-shadow-lg`}>
                        {tile.title}
                      </div>
                      <div className={`text-xs sm:text-sm ${tile.textColor} opacity-90 drop-shadow-md mt-1`}>
                        {tile.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Tile Text (Hidden on mobile, shown on larger screens) */}
                <div className="text-center mt-2 hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition">
                    {tile.title}
                  </p>
                  <p className="text-xs text-gray-500">{tile.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* --- End New Section --- */}
      </main>
    </div>
  );
};

export default Hero;

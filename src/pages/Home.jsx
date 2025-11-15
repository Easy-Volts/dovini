import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BannerSlider from "../components/BannerSlider";
import CategoryCard from "../components/CategoryCard";
import ProCard from "../components/ProCard";
import NewsletterSignup from "../components/NewsletterSignup";
import { useProducts } from "../context/ProductContext";
import {
  Phone,
  Trophy,
  Truck,
  MessageCircle,
  ArrowRight,
  Award,
  Users,
  Clock,
  Zap,
  Package,
  Heart,
  ShoppingBag,
  Timer,
  Flame,
  Sparkles,
  Star,
  Eye,
  Share2,
  Bell,
  ChevronLeft,
  ChevronRight,
  Camera,
  Aperture,
  Focus,
  Cpu,
  Video,
  Lightbulb,
  SunMedium,
  BatteryCharging,
  SlidersHorizontal,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import Hero from "../components/Hero";

const PhoneIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 3.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Countdown = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-1 text-xs font-bold text-red-600">
      <Clock className="w-3 h-3" />
      <div className="flex items-center space-x-1">
        <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
};

const MobileFlashDealsCarousel = ({ flashDeals }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === flashDeals.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [flashDeals.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Carousel Container with Overlay Background */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-red-200">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-orange-50 to-yellow-50 opacity-80"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {flashDeals.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex-shrink-0 w-full p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0.6,
                scale: index === currentIndex ? 1 : 0.9,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative bg-black/25 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-black/15 overflow-hidden">
                {/* Dark Overlay Background */}
                <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

                {/* Flash Deal Heading - Moved Up for Better Product Visibility */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <motion.div
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg relative overflow-hidden"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                  >
                    {/* Intense Lightning Flash Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-white to-yellow-400"
                      animate={{
                        opacity: [0, 1, 0.8, 0.3, 1, 0],
                        scale: [1, 1.2, 1.1, 1.15, 1.05, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2,
                      }}
                    />

                    {/* Secondary Flash Layer */}
                    <motion.div
                      className="absolute inset-0 bg-white"
                      animate={{
                        opacity: [0, 0.9, 0, 0.7, 0, 0.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2,
                        delay: 0.1,
                      }}
                    />

                    {/* Electric Arc Effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent 60%)",
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: [-100, 100, -100],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 3,
                      }}
                    />

                    {/* Animated Flame with Intense Effects */}
                    <motion.div
                      className="relative z-20"
                      animate={{
                        rotate: [0, 15, -15, 10, -10, 0],
                        scale: [1, 1.4, 1.2, 1.5, 1.1, 1],
                        filter: [
                          "brightness(1) hue-rotate(0deg)",
                          "brightness(2) hue-rotate(45deg)",
                          "brightness(1.5) hue-rotate(90deg)",
                          "brightness(2.5) hue-rotate(180deg)",
                          "brightness(1) hue-rotate(0deg)",
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2.5,
                      }}
                    >
                      <Flame className="w-5 h-5 drop-shadow-lg" />
                      {/* Flame Glow Effect */}
                      <motion.div
                        className="absolute inset-0 w-5 h-5 bg-orange-400 rounded-full blur-md"
                        animate={{
                          scale: [1, 2, 1.5, 1],
                          opacity: [0.3, 0.8, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 2.5,
                        }}
                      />
                    </motion.div>

                    {/* Animated Text with Glow */}
                    <motion.span
                      className="font-black text-sm relative z-20 drop-shadow-lg whitespace-nowrap"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(255,255,255,0.5)",
                          "0 0 20px rgba(255,255,255,1), 0 0 30px rgba(255,215,0,0.8)",
                          "0 0 10px rgba(255,255,255,0.8)",
                          "0 0 5px rgba(255,255,255,0.5)",
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2,
                      }}
                    >
                      FLASH DEALS
                    </motion.span>

                    {/* Animated Lightning Bolt with Intense Effects */}
                    <motion.div
                      className="relative z-20"
                      animate={{
                        rotate: [0, -20, 20, -15, 15, 0],
                        scale: [1, 1.5, 1.3, 1.6, 1.2, 1],
                        filter: [
                          "brightness(1) contrast(1)",
                          "brightness(3) contrast(2)",
                          "brightness(2) contrast(1.5)",
                          "brightness(4) contrast(2.5)",
                          "brightness(1) contrast(1)",
                        ],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2.5,
                        delay: 0.2,
                      }}
                    >
                      <Zap className="w-5 h-5 drop-shadow-lg" />
                      {/* Lightning Glow Effect */}
                      <motion.div
                        className="absolute inset-0 w-5 h-5 bg-yellow-300 rounded-full blur-lg"
                        animate={{
                          scale: [1, 2.5, 2, 1.5, 1],
                          opacity: [0.2, 1, 0.7, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 2.5,
                          delay: 0.2,
                        }}
                      />
                      {/* Electric Spark Effects */}
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 4,
                          delay: 0.5,
                        }}
                      />
                      <motion.div
                        className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-yellow-200 rounded-full"
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 0.8, 0],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          repeatDelay: 4,
                          delay: 0.7,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Flash Deal Badge */}
                <div className="absolute -top-1 -right-1 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  -{product.discount}%
                </div>

                {/* Product Image - Very Small and Faded */}
                <div className="relative mb-2 mt-4 opacity-60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-20 object-cover rounded-lg shadow-md"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
                </div>

                {/* Product Info - Minimal and Faded */}
                <div className="space-y-1 opacity-70">
                  <h3 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight text-center">
                    {product.name}
                  </h3>

                  {/* Countdown - Centered */}
                  <div className="flex justify-center">
                    <Countdown endTime={product.flashDealEnd} />
                  </div>

                  {/* Rating - Centered */}
                  <div className="flex items-center justify-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {flashDeals.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-red-500 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();
  const {products} = useProducts()

  const featuredProducts = products; // Show first 8 products
  const flashDeals = products
    .filter((product) => product.isFlashDeal)
    .slice(0, 6);
  const limitedStock = products
    .filter((product) => product.isLimitedStock)
    .slice(0, 9);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const extraCategoryData = {
    1: {
      image:
        "https://images.openai.com/thumbnails/url/WSbURnicu5meUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw70cw1NrwoO8Y7MLAkrcNTNKAmszC1zS88xNbNIyc8Ny6kw9jLLTYuPd3VNVyu2NTQAAB6oJYw",
      icon: SunMedium,
    },
    2: {
      image:
        "https://images.unsplash.com/photo-1574281813181-02b512471486?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      icon: Focus,
    },
    3: {
      image:
        "https://burst.shopifycdn.com/photos/black-microphone-set-against-a-pink-background.jpg?exif=0&format=pjpg&iptc=0&width=1000",
      icon: Cpu,
    },
    4: {
      image:
        "https://lumecube.com/cdn/shop/files/Studio_Panel_Lighting_Kit_UCSD-09339-1160x1500-64b44e5_1160x.jpg?v=1704215663",
      icon: Zap,
    },
    5: {
      image:
        "https://www.lighting-geek.com/wp-content/uploads/2023/05/14-3-1-e1689965711325.png",
      icon: Lightbulb,
    },
    6: {
      image:
        "https://freestockfootagearchive.com/wp-content/uploads/2019/08/Glitchy-Shapes-Strobe-Light-Overlay-Effect.jpeg",
      icon: BatteryCharging,
    },
    7: {
      image:
        "https://i.fbcd.co/products/resized/resized-750-500/c-1000-designbundle-studio-lighting-isolated-on-black02-11-10-e852f1a4722511624c5d4d237891e5857f2abad0c0b13f9912f6708d40fc8dfd.jpg",
      icon: Package,
    },
    8: {
      image: "https://www.ulanzi.com/cdn/shop/files/2_2x-2.png?v=1753167291",
      icon: Video,
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.dovinigears.ng/categories");
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        console.log(data);
        const mergedCategories = data.data.map((cat) => ({
          ...cat, 
          image: extraCategoryData[cat.id]?.image, // add frontend image
          icon: extraCategoryData[cat.id]?.icon, // add frontend icon
        }));
        setCategories(mergedCategories);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleBuyNow = (product) => {
    addToCart(product);
    showSuccess(`🎉 ${product.name} added to cart!`, 1000);
  };

  const handleGrabItNow = (product) => {
    addToCart(product);
    showSuccess(`⚡ ${product.name} secured! Limited stock grabbed!`, 1000);
  };

  const handleWishlistToggle = (product) => {
    toggleWishlist(product);
    const isInWish = isInWishlist(product.id);
    showSuccess(
      isInWish
        ? `💔 ${product.name} removed from wishlist`
        : `❤️ ${product.name} added to wishlist!`,
      1000
    );
  };

  const handleQuickView = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <Hero categories={categories}/>

      {/* Flash Deals Section */}
      <section className="py-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden hidden sm:block">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-yellow-500 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full mb-6 shadow-xl"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Flame className="w-6 h-6 animate-bounce-slow" />
              <span className="font-bold text-lg">FLASH DEALS</span>
              <Zap className="w-6 h-6 animate-bounce-slow" />
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Limited Time Offers
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Don't miss out on these incredible deals - ending soon!
            </motion.p>
          </motion.div>

          {/* Flash Deals Horizontal Slider */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => {
                const container = document.getElementById("flash-deals-slider");
                if (container) {
                  container.scrollBy({ left: -280, behavior: "smooth" });
                }
              }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <button
              onClick={() => {
                const container = document.getElementById("flash-deals-slider");
                if (container) {
                  container.scrollBy({ left: 280, behavior: "smooth" });
                }
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Horizontal Slider Container */}
            <div
              id="flash-deals-slider"
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Custom scrollbar hide */}
              <style>{`
                #flash-deals-slider::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {flashDeals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-64 sm:w-72 group"
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-100">
                    {/* Flash Deal Badge */}
                    <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow">
                      -{product.discount}%
                    </div>

                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          onClick={() => handleWishlistToggle(product)}
                          className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`w-3 h-3 ${
                              isInWishlist(product.id)
                                ? "text-red-600 fill-red-600"
                                : "text-red-600"
                            }`}
                          />
                        </motion.button>
                        <motion.button
                          onClick={() => handleQuickView(product)}
                          className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-3 h-3 text-red-600" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight">
                        {product.name}
                      </h3>

                      {/* Pricing */}
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-black text-red-600">
                          ₦{product.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Countdown */}
                      <div className="mb-2">
                        <Countdown endTime={product.flashDealEnd} />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Stock Indicator & CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Package className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600 font-medium">
                            {product.stock > 10
                              ? "In Stock"
                              : `${product.stock} left`}
                          </span>
                        </div>
                        <motion.button
                          onClick={() => handleBuyNow(product)}
                          className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-md font-semibold text-xs hover:shadow-md transition-all duration-300 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Buy</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View More Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          ></motion.div>
        </div>
      </section>

      {/* Mobile Flash Deals Section */}
      <section className="block md:hidden py-8 px-4">
        <div className="max-w-sm mx-auto">
          {/* Main Container Box */}
          <motion.div
            className="bg-white rounded-none shadow-2xl border-4 border-red-200 relative overflow-hidden cursor-pointer"
            onClick={() => navigate("/flash-deals")}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Decorative Border Elements */}
            <div className="absolute -top-1 -left-1 w-8 h-8 bg-red-500 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-yellow-500 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 w-16 h-16 bg-red-500 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-orange-500 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-500 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 p-6">
              {/* Section Header with Lightning Animation */}
              <motion.div
                className="text-center mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-sm font-black text-gray-800 mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Limited Time Offers
                </motion.h2>

                <motion.p
                  className="text-xs text-gray-600"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Don't miss out on these incredible deals!
                </motion.p>
              </motion.div>

              {/* Auto-Sliding Mobile Carousel */}
              <MobileFlashDealsCarousel
                flashDeals={flashDeals}
                onBuyNow={handleBuyNow}
                onWishlistToggle={handleWishlistToggle}
                onQuickView={handleQuickView}
                isInWishlist={isInWishlist}
              />
            </div>
          </motion.div>

          {/* Click Indicator */}
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
              <ArrowRight className="w-4 h-4 animate-bounce" />
              <span>Tap to explore all flash deals</span>
              <ArrowRight className="w-4 h-4 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Limited Stock Deals Section */}
      <section className="py-2 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-36 h-36 bg-amber-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-28 h-28 bg-yellow-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-orange-500 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full mb-6 shadow-xl"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <Timer className="w-6 h-6 animate-pulse-slow" />
              <span className="font-bold text-lg">LIMITED STOCK</span>
              <Sparkles className="w-6 h-6 animate-pulse-slow" />
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Almost Gone - Limited Stock!
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              These premium items are selling fast. Secure yours before they're
              gone!
            </motion.p>
          </motion.div>

          {/* Limited Stock Horizontal Slider */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => {
                const container = document.getElementById(
                  "limited-stock-slider"
                );
                if (container) {
                  container.scrollBy({ left: -200, behavior: "smooth" });
                }
              }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>

            <button
              onClick={() => {
                const container = document.getElementById(
                  "limited-stock-slider"
                );
                if (container) {
                  container.scrollBy({ left: 200, behavior: "smooth" });
                }
              }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-gray-200 hover:bg-white transition-all duration-200 hidden sm:block"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>

            {/* Horizontal Slider Container */}
            <div
              id="limited-stock-slider"
              className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Custom scrollbar hide */}
              <style>{`
                #limited-stock-slider::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {limitedStock.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-50 group"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-amber-100">
                    {/* Limited Stock Badge */}
                    <div className="absolute top-1 left-1 z-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-md">
                      Limited
                    </div>

                    {/* Stock Warning */}
                    <div className="absolute top-1 right-1 z-20 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-md">
                      {product.stock}
                    </div>

                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-30 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Info */}
                    <div className="p-2">
                      <h3 className="text-xs font-bold text-gray-800 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
                        {product.name}
                      </h3>

                      {/* Pricing */}
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-sm font-black text-amber-600">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-2.5 h-2.5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          <motion.button
                            onClick={() => handleWishlistToggle(product)}
                            className="flex items-center justify-center p-1 rounded bg-gray-100 hover:bg-red-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`w-3 h-3 ${
                                isInWishlist(product.id)
                                  ? "text-red-600 fill-red-600"
                                  : "text-gray-600"
                              }`}
                            />
                          </motion.button>
                          <motion.button
                            onClick={() => handleQuickView(product)}
                            className="flex items-center justify-center rounded bg-gray-100 hover:bg-blue-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-3 h-3 text-gray-600" />
                          </motion.button>
                        </div>
                        <motion.button
                          onClick={() => handleGrabItNow(product)}
                          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded text-xs font-semibold hover:shadow-md transition-all duration-300 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Zap className="w-2.5 h-2.5" />
                          <span>Buy</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-2">⚡ Don't Wait!</h3>
              <p className="text-amber-100 mb-6 max-w-md mx-auto">
                These limited stock items are disappearing fast. Add them to
                your cart before someone else gets them!
              </p>
              <motion.button
                onClick={() => navigate("/products?limitedStock=true")}
                className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition-colors flex items-center space-x-2 mx-auto shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Limited Stock</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-10 sm:py-12 bg-white relative overflow-hidden shadow-inner shadow-red-50/50">
        {/* Background Elements (Modified colors for Jumia orange/red feel) */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-400 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-400 rounded-full blur-3xl opacity-50"></div>
        </div>

        {/* Floating Particles (Kept as is for movement, but adjusted color) */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -15, 0], // Reduced movement
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 5 + i * 0.5, // Slightly faster
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Removed ArrowRight icon block for a cleaner, e-commerce look */}

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Shop Popular <span className="text-orange-600">Categories</span>
            </motion.h2>

            <motion.p
              className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-snug"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Quickly jump to the best deals across all our main departments.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 gap-x-2 gap-y-4 mb-8 sm:mb-12 p-2 bg-white border border-gray-100/80 rounded-xl shadow-lg shadow-red-50/50">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 150,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(255, 120, 0, 0.1)",
                }}
                style={{ perspective: "none" }}
                className="group col-span-1 cursor-pointer"
              >
                <div className="relative">
                  <div className="relative overflow-hidden rounded-lg bg-white hover:shadow-xl transition-all duration-300 h-full">
                    <div className="w-full p-2 h-auto">
                      <CategoryCard category={category} />
                    </div>

                    <motion.div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-orange-600" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block p-6 rounded-xl bg-orange-600 text-white shadow-2xl relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-300"
              whileHover={{ scale: 1.01, y: -2 }} // Less dramatic hover
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-red-500/80"
                animate={{
                  x: ["-100%", "100%"],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Explore the Mall!</h3>
                <p className="text-red-100 mb-4 max-w-md mx-auto text-sm">
                  Access thousands of products with daily deals and massive
                  discounts.
                </p>
                <motion.button
                  onClick={() => navigate("/products")}
                  className="bg-white text-orange-600 px-5 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors flex cursor-pointer items-center space-x-2 mx-auto shadow-md text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Shopping Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-red-50 px-2 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Explore our handpicked selection of professional photography
              equipment
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <ProCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <motion.div
            className="text-center mt-10 sm:mt-12 lg:mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg rounded-xl font-semibold hover:bg-red-700 transition flex items-center mx-auto space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <Testimonials /> */}

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

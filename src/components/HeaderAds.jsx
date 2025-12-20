import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Clock,
  ArrowRight,
  Gift,
  Star,
  Truck,
  Percent
} from "lucide-react";

const HeaderAd = () => {
  const ads = [
    {
      id: 1,
      type: "flash-sale",
      title: "⚡ FLASH SALE",
      message: "Up to 70% OFF on Professional Cameras",
      subtitle: "Limited Time - Ends Soon!",
      cta: "Shop Now",
      link: "/products?flashDeals=true",
      gradient: "from-red-500 via-orange-500 to-yellow-500",
      icon: Zap,
      badge: "HOT"
    },
    {
      id: 2,
      type: "free-shipping",
      title: "🚚 FREE SHIPPING",
      message: "Free Delivery on Orders Over ₦100,000",
      subtitle: "No Hidden Charges • Fast Delivery",
      cta: "Start Shopping",
      link: "/products",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      icon: Truck,
      badge: "FREE"
    },
    {
      id: 3,
      type: "bundle-deal",
      title: "🎁 BUNDLE DEAL",
      message: "Camera + Lens + Bag = Save ₦25,000",
      subtitle: "Complete Photography Kit Package",
      cta: "View Bundle",
      link: "/products?bundles=true",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      icon: Gift,
      badge: "SAVE"
    },
    {
      id: 4,
      type: "clearance",
      title: "🏷️ CLEARANCE SALE",
      message: "Last Chance - Accessories 50% OFF",
      subtitle: "Limited Stock Available",
      cta: "Shop Clearance",
      link: "/category/accessories",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      icon: Percent,
      badge: "50% OFF"
    },
    {
      id: 5,
      type: "new-arrival",
      title: "✨ NEW ARRIVAL",
      message: "Latest Sony A7R V Camera in Stock",
      subtitle: "Pre-order Now - Limited Units",
      cta: "Pre-order",
      link: "/product/1",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      icon: Star,
      badge: "NEW"
    }
  ];

  const [currentAd, setCurrentAd] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });

  // Countdown timer for flash sales
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset to 15 minutes when countdown ends
          return { minutes: 15, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate ads
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 6000); // rotate every 6 seconds

    return () => clearInterval(timer);
  }, [ads.length]);

  const currentAdData = ads[currentAd];
  const IconComponent = currentAdData.icon;

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-r ${currentAdData.gradient} opacity-95`} />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-lg"
          animate={{
            x: [0, -80, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative px-3 sm:px-4 py-0.5 sm:py-3">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAdData.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Mobile Simple Ad */}
              <div className="sm:hidden py-2">
                <motion.div
                  className="flex flex-col space-y-1"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="bg-white/20 backdrop-blur-sm p-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <IconComponent className="w-4 h-4 text-white" />
                      </motion.div>
                      <motion.h3
                        className="text-white font-bold text-sm tracking-wide"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentAdData.title}
                      </motion.h3>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    >
                      <Link
                        to={currentAdData.link}
                        className="bg-white text-gray-900 px-3 py-1 rounded-full font-semibold text-xs hover:bg-gray-50 transition-all duration-200 shadow-lg"
                      >
                        {currentAdData.cta}
                      </Link>
                    </motion.div>
                  </div>
                  <motion.p
                    className="text-white/90 text-xs font-medium leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentAdData.message}
                  </motion.p>
                </motion.div>
              </div>

              {/* Desktop Content */}
              <div className="hidden sm:flex items-center space-x-4 flex-1">
                {/* Badge and Icon */}
                <div className="flex items-center space-x-3">
                  {/* Badge */}
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <span className="text-white font-bold text-xs tracking-wide">
                      {currentAdData.badge}
                    </span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <motion.h3
                    className="text-white font-bold text-sm tracking-wide"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentAdData.title}
                  </motion.h3>
                  <motion.p
                    className="text-white/90 text-sm font-medium truncate"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {currentAdData.message}
                  </motion.p>
                  <motion.p
                    className="text-white/70 text-xs truncate"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {currentAdData.subtitle}
                  </motion.p>
                </div>

                {/* Desktop Right Side - CTA and Timer */}
                <div className="flex items-center space-x-4">
                  {/* Countdown Timer (for flash sales) */}
                  {currentAdData.type === 'flash-sale' && (
                    <motion.div
                      className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    >
                      <Clock className="w-4 h-4 text-white" />
                      <span className="text-white font-mono text-sm font-bold">
                        {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                      </span>
                    </motion.div>
                  )}

                  {/* CTA Button */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={currentAdData.link}
                      className="group bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <span>{currentAdData.cta}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  {/* Ad Indicators */}
                  <div className="hidden lg:flex items-center space-x-1">
                    {ads.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAd(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentAd
                            ? 'bg-white shadow-lg'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Right Side - CTA and Timer */}
              <div className="hidden sm:flex items-center space-x-4">
                {/* Countdown Timer (for flash sales) */}
                {currentAdData.type === 'flash-sale' && (
                  <motion.div
                    className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                  >
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white font-mono text-sm font-bold">
                      {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                  </motion.div>
                )}

                {/* CTA Button */}
              
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-white/30 hidden sm:block"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 6, ease: "linear" }}
        key={currentAd} // Reset animation when ad changes
      />
    </div>
  );
};

export default HeaderAd;

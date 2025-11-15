import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useProducts } from '../context/ProductContext';
import {
  Clock,
  Zap,
  Flame,
  Timer,
  Star,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
  Heart,
  ShoppingBag,
  Eye,
  TrendingUp,
  Award,
  Gift
} from 'lucide-react';

const Countdown = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

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
    <div className="flex items-center space-x-1 text-xs font-bold text-red-600 bg-red-50 rounded-lg px-2 py-1">
      <Clock className="w-3 h-3" />
      <div className="flex items-center space-x-1">
        <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span>:</span>
        <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};

const FlashDeals = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();
  const {products} = useProducts()

  const flashDeals = products.filter(product => product.isFlashDeal);

  // Countdown timer for overall flash deals
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBuyNow = (product) => {
    addToCart(product);
    showSuccess(`🎉 ${product.name} added to cart!`, 1000);
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 bg-red-500 rounded-full blur-3xl animate-pulse-slow opacity-20"></div>
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-24 h-24 sm:w-40 sm:h-40 bg-orange-500 rounded-full blur-3xl animate-pulse-slow opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-yellow-500 rounded-full blur-2xl animate-pulse-slow opacity-20"></div>
        </div>

        {/* Floating Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-red-400/30 rounded-full blur-sm"
            style={{
              top: `${15 + (i * 7)}%`,
              left: `${10 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Header */}
            <motion.div
              className="inline-flex items-center space-x-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-8 py-4 rounded-2xl mb-8 shadow-2xl relative overflow-hidden"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            >
              {/* Lightning Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white via-yellow-200 to-white"
                animate={{
                  opacity: [0, 1, 0.5, 1, 0],
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>

              <motion.span
                className="text-2xl sm:text-3xl font-black"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(255,255,255,1)',
                    '0 0 10px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                FLASH DEALS
              </motion.span>

              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: 0.2
                }}
              >
                <Flame className="w-8 h-8" />
              </motion.div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
                Unbeatable
              </span>
              <br />
              <span className="text-gray-800">Flash Deals</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Limited-time offers on premium photography equipment.
              Don't miss out on these incredible savings!
            </motion.p>

            {/* Global Countdown Timer */}
          

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">{flashDeals.length}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Deals Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-orange-600 mb-1">70%</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Avg. Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-yellow-600 mb-1">24hrs</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Time Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-red-600 mb-1">⚡</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Flash Sale</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flash Deals Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4">
              All Flash Deals
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our complete collection of flash deals. Each product has its own countdown timer!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {flashDeals.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-red-100">
                  {/* Flash Deal Badge */}
                  <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-slow">
                    -{product.discount}% OFF
                  </div>

                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 sm:h-36 lg:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlistToggle(product);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-600 fill-red-600' : 'text-red-600'}`} />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickView(product);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4 text-red-600" />
                      </motion.button>
                    </div>

                    {/* Mobile Wishlist Button */}
                    <div className="absolute top-3 left-3 md:hidden">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlistToggle(product);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-600 fill-red-600' : 'text-red-600'}`} />
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4 lg:p-5">
                    <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 mb-2 sm:mb-3">
                      <span className="text-lg sm:text-xl lg:text-xl font-black text-red-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm lg:text-base text-gray-500 line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Countdown */}
                    <div className="mb-2 sm:mb-3">
                      <Countdown endTime={product.flashDealEnd} />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3 lg:mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                    </div>

                    {/* Individual Countdown */}
                    <div className="bg-red-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-center space-x-2 text-sm font-bold text-red-600">
                        <Clock className="w-4 h-4" />
                        <span>Ends in: {new Date(product.flashDealEnd).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg sm:rounded-lg font-bold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1 sm:space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Add to Cart</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Flash Deals */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-4">
              Why Choose Flash Deals?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the thrill of unbeatable savings with our exclusive flash deals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Deals appear and disappear in the blink of an eye. Act quickly to secure your savings!</p>
            </motion.div>

            <motion.div
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600">All flash deal products maintain our high standards of quality and performance.</p>
            </motion.div>

            <motion.div
              className="text-center bg-white rounded-2xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Exclusive Savings</h3>
              <p className="text-gray-600">Up to 70% off on carefully selected premium photography equipment.</p>
            </motion.div>
          </div>
        </div>
      </section>

    
    

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Don't Miss Out!
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Flash deals disappear quickly. Set up notifications and be the first to know about new deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/products')}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Browse All Products</span>
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-red-600 transition-all flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/wishlist')}
              >
                <Heart className="w-5 h-5" />
                <span>View Wishlist</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const BenefitsMobileCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const benefits = [
    {
      icon: Zap,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      title: 'Lightning Fast',
      description: 'Deals appear and disappear in the blink of an eye. Act quickly to secure your savings!'
    },
    {
      icon: Trophy,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100',
      title: 'Premium Quality',
      description: 'All flash deal products maintain our high standards of quality and performance.'
    },
    {
      icon: Gift,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      title: 'Exclusive Savings',
      description: 'Up to 70% off on carefully selected premium photography equipment.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === benefits.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [benefits.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="block md:hidden">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-red-100 mx-auto max-w-sm">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className="flex-shrink-0 w-full p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0.7,
                  scale: index === currentIndex ? 1 : 0.95
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`w-8 h-8 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-6">
        {benefits.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-red-500 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashDeals;
import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion,AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useReviews } from '../context/ReviewsContext';
import LazyImage from './LazyImage';
import {
  Star,
  ShoppingCart,
  Heart,
  Zap,
  Award,
  TrendingUp,
  Plus,
  Check,
  Sparkles,
  Shield
} from 'lucide-react';

const ProCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);


 



  const isNew = index < 3; // First 3 products are "new"
  const isBestseller = index % 4 === 0; // Every 4th product is bestseller
  const isOnSale = index % 7 === 0; // Every 7th product is on sale
  const discount = isOnSale ? Math.floor(Math.random() * 30) + 10 : 0;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    setTimeout(() => {
      addToCart(product);
      showSuccess(`${product.name} added to cart!`, 1000);
      setIsAddingToCart(false);
    }, 600);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    showSuccess(
      isInWishlist(product.id)
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist!`,
      1000
    );
  };

  

  return (
    <motion.div
      className="group relative w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        y: -12,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: "1000px", touchAction: "manipulation" }}
    >
      <div className="bg-white h-64 sm:h-full rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200">
        <div className="absolute top-2 left-2 z-20 flex flex-col space-y-1 sm:space-y-2 hidden md:flex">
          <AnimatePresence>
            {isNew && (
              <motion.div
                key="new-badge"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-0.5 sm:space-x-1 shadow-lg"
              >
                <Zap className="w-2.5 h-2.5" />
                <span className='hidden sm:inline'>NEW</span>
              </motion.div>
            )}
            {isBestseller && (
              <motion.div
                key="bestseller-badge"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-0.5 sm:space-x-1 shadow-lg"
              >
                <Award className="w-2.5 h-2.5" />
                <span className='hidden sm:inline'>BESTSELLER</span>
              </motion.div>
            )}
            {isOnSale && (
              <motion.div
                key="sale-badge"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -45 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-0.5 sm:space-x-1 shadow-lg"
              >
                <TrendingUp className="w-2.5 h-2.5" />
                <span>-{discount}%</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <LazyImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={isHovered ? { x: ["-100%", "100%"] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
          </div>
        </Link>

        <div className="relative">
          {/* Action Buttons */}
          <div
            className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-10"
          >
            <motion.button
              onClick={handleWishlistToggle}
              className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isInWishlist(product.id)
                    ? 'text-red-600 fill-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              />
            </motion.button>
          </div>

          <motion.div
            className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hidden sm:block"
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
          >
            <motion.button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-2 px-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 cursor-pointer text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isAddingToCart ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <motion.div
                      className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-xs">Adding...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <div className="p-2 sm:p-4 cursor-pointer">
            <motion.div
              className="mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-tight flex-1">
                  {product.name}
                </h3>
                <div className="flex-shrink-0 bg-green-100 text-green-700 px-1 py-0 rounded-full text-xs font-medium flex items-center space-x-0.5 ml-1">
                  <Shield className="w-2 h-2" />
                  <span className="hidden sm:inline">Verified</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start justify-between mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center space-x-0.5 flex-grow-0 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-xs text-gray-600 mx-2">({product.reviews})</span>
              </div>

              <div className="flex flex-col items-start leading-none min-w-[50%]"> 
                {isOnSale && (
                  <span className="text-[10px] sm:text-xs text-gray-500 line-through"> 
                    ₦{(product.price * (1 + discount / 100)).toLocaleString()}
                  </span>
                )}
                <span className="text-xs sm:text-base font-black text-orange-400 mt-1"> 
                  ₦{product.price.toLocaleString()}
                </span>
              </div>

            </motion.div>

            <motion.div
              className="flex items-center justify-between text-xs text-gray-600 mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-yellow-500" />
                <span>Premium</span>
              </div>
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-500" />
                <span>In Stock</span>
              </div>
            </motion.div>
          </div>
        </Link>

        <div className="px-2 pb-2 hidden">
          <div className="flex space-x-2">
            <motion.button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-2 px-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-0.5 text-xs" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isAddingToCart ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-0.5" 
                  >
                    <motion.div
                      className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-xs">Adding...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-0.5" // Reduced space-x to 0.5
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Cart</span> {/* Shortened text for better fit */}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={handleWishlistToggle}
              className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className={`w-3 h-3 ${isInWishlist(product.id) ? 'text-red-600 fill-red-600' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

export default memo(ProCard);
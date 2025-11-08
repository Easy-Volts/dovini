import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Star,
  Gift,
  Zap,
  Trash2,
  Plus,
  CheckCircle
} from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showSuccess } = useToast();

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    showSuccess(`${productName} removed from wishlist`, 1000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`, 1000);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach(product => addToCart(product));
    showSuccess(`All ${wishlist.length} items added to cart!`, 1000);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    showSuccess('Wishlist cleared', 1000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const totalValue = wishlist.reduce((total, item) => total + item.price, 0);
  const averageRating = wishlist.length > 0
    ? wishlist.reduce((sum, item) => sum + (item.rating || 0), 0) / wishlist.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white to-pink-50/30">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">

        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            My <span className="text-red-600">Wishlist</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your curated collection of favorite products. Save what you love and never miss out on the perfect item.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {wishlist.length > 0 ? (
            <motion.div
              key="wishlist-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Enhanced Stats Dashboard */}
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-red-600">{wishlist.length}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Saved Items</div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-600">
                    ₦{totalValue.toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Value</div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-yellow-600">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Avg Rating</div>
                </motion.div>

                <motion.div
                  className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-green-600">
                    {Math.round(totalValue / wishlist.length) || 0}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Avg Price</div>
                </motion.div>
              </motion.div>

              {/* Bulk Actions */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.button
                  onClick={handleAddAllToCart}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add All to Cart</span>
                </motion.button>

                <motion.button
                  onClick={handleClearWishlist}
                  className="bg-red-100 text-red-600 py-3 px-6 rounded-2xl font-bold hover:bg-red-200 transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Clear All</span>
                </motion.button>
              </motion.div>

              {/* Enhanced Products Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {wishlist.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="relative group"
                  >
                    <ProductCard product={product} index={index} />

                    {/* Enhanced Remove Button */}
                    <motion.button
                      onClick={() => handleRemoveFromWishlist(product.id, product.name)}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      whileHover={{
                        scale: 1.2,
                        rotate: 15,
                        boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </motion.button>

                    {/* Quick Add to Cart Overlay */}
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 text-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Quick Add</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Action Buttons */}
              <motion.div
                className="mt-12 sm:mt-16 lg:mt-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-6 sm:p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                      Ready to Checkout?
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      You've got {wishlist.length} amazing items waiting for you
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/cart"
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>View Cart</span>
                      </Link>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/"
                        className="bg-white border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:border-red-300 hover:text-red-600 transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Continue Shopping</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            /* Enhanced Empty State */
            <motion.div
              key="empty-wishlist"
              className="text-center py-12 sm:py-20 lg:py-32"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated Heart Container */}
              <motion.div
                className="relative mb-8 sm:mb-12"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-red-400" />
                </motion.div>

                {/* Floating Hearts Animation */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-red-300"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [-10, -30, -10],
                      opacity: [0, 0.7, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your Wishlist is <span className="text-red-600">Empty</span>
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Discover amazing products and save your favorites by clicking the heart icon.
                Your wishlist helps you keep track of items you love and never miss a great deal!
              </motion.p>

              {/* Feature Highlights */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Quick Save</h4>
                  <p className="text-xs sm:text-sm text-gray-600">One-click to save favorites</p>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Track Prices</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Never miss a deal</p>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">Share Lists</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Share with friends</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Link
                  to="/"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center space-x-3 text-base sm:text-lg"
                >
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Start Your Wishlist Journey</span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;
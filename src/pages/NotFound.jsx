import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  ArrowLeft, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="min-h-[80vh] flex flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Animation */}
          <motion.div
            className="relative mb-8"
            variants={itemVariants}
          >
            <div className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-700 to-red-800 leading-none">
              404
            </div>
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 text-red-600"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-full h-full" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            variants={itemVariants}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Oops! The page you're looking for seems to have gone on a photography adventure. 
              It might have gotten lost in our equipment inventory or been moved to a different location.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <span>Invalid URL</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Broken Link</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span>Moved Page</span>
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            variants={itemVariants}
          >
            <Link
              to="/"
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            
            <Link
              to="/products"
              className="flex items-center space-x-2 bg-white border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              <span>Browse Products</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors font-medium px-4 py-3 rounded-lg hover:bg-red-50"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Suggested Actions */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-red-100"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/products"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <Search className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">All Products</p>
                  <p className="text-sm text-gray-600">Browse our equipment</p>
                </div>
              </Link>

              <Link
                to="/flash-deals"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg flex items-center justify-center group-hover:from-amber-200 group-hover:to-orange-200 transition-colors">
                  <span className="text-lg">⚡</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Flash Deals</p>
                  <p className="text-sm text-gray-600">Limited time offers</p>
                </div>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                  <span className="text-lg text-pink-600">❤️</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Wishlist</p>
                  <p className="text-sm text-gray-600">Your saved items</p>
                </div>
              </Link>

              <Link
                to="/cart"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-lg">🛒</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Shopping Cart</p>
                  <p className="text-sm text-gray-600">Ready to checkout</p>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Refresh Button */}
          <motion.div
            className="mt-8"
            variants={itemVariants}
          >
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-red-50"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Page</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-4 h-4 bg-red-200 rounded-full opacity-20"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-16 w-2 h-2 bg-amber-300 rounded-full opacity-30"
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-orange-300 rounded-full opacity-25"
          animate={{ 
            y: [0, -25, 0],
            opacity: [0.25, 0.6, 0.25]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  );
};

export default NotFound;
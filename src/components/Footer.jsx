import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Facebook, Home, Grid3X3, ShoppingCart, Phone, Mail, MapPin, Award, Users, Clock, Heart, Star } from 'lucide-react';
import logo from '../assets/logo.jpg'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-gray-50 to-red-50/30 border-t border-gray-200 mt-0">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Brand Section */}
          <motion.div
            className="sm:col-span-2 lg:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <img src='https://i.ibb.co/ZRrLbMy2/logo-2.png' alt="Dovini Logo" className='w-12 h-12 lg:w-16 lg:h-16 object-contain flex-shrink-0' />
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Your trusted source for professional camera equipment and photography gear.
              We provide top-quality products for photographers and videographers worldwide.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <motion.a
                href="#"
                className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </motion.a>
              <motion.a
                href="#"
                className="bg-white p-2.5 sm:p-3 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Grid3X3 className="w-5 h-5 mr-2 text-red-600" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center text-gray-600 hover:text-red-600 transition-colors group">
                  <Home className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center text-gray-600 hover:text-red-600 transition-colors group">
                  <Grid3X3 className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Products</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center text-gray-600 hover:text-red-600 transition-colors group">
                  <ShoppingCart className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Cart</span>
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="flex items-center text-gray-600 hover:text-red-600 transition-colors group">
                  <Heart className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Wishlist</span>
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-red-600" />
              Contact & Support
            </h4>

            <div className="space-y-3">
              <motion.a
                href="tel:08063971335"
                className="flex items-start space-x-3 p-2.5 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md hover:bg-red-50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-red-100 p-1.5 sm:p-2 rounded-lg group-hover:bg-red-200 transition-colors flex-shrink-0">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">Call for Deals</p>
                  <p className="text-red-600 font-bold text-sm sm:text-base">080-6397-1335</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:support@dovinigears.ng"
                className="flex items-start space-x-3 p-2.5 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md hover:bg-red-50 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-red-100 p-1.5 sm:p-2 rounded-lg group-hover:bg-red-200 transition-colors flex-shrink-0">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">Email Support</p>
                  <p className="text-gray-600 text-xs sm:text-sm">support@dovinigears.ng</p>
                </div>
              </motion.a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Award className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                <span>Certified</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-blue-500 flex-shrink-0" />
                <span>10K+ Customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center">

            {/* Copyright */}
            <motion.div
              className="text-center sm:text-left lg:col-span-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 text-sm">
                © {currentYear} <span className="font-semibold text-gray-900">Dovini</span>.
                All rights reserved.
              </p>
            </motion.div>

            {/* Additional Links */}
            <motion.div
              className="flex items-center justify-center space-x-4 sm:space-x-6 text-sm lg:col-span-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/about" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
                About
              </Link>
              <Link to="/privacy-policies" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-red-600 transition-colors font-medium">
                Terms
              </Link>
            </motion.div>

            {/* Rating */}
            <motion.div
              className="flex items-center justify-center space-x-2 lg:col-span-1 lg:justify-end"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">4.8/5</span>
              <span className="text-xs text-gray-600 hidden sm:inline">(2,341 reviews)</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-red-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-red-400/5 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
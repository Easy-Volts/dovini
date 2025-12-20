import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import RecentlyViewedSection from '../components/RecentlyViewedSection';
import { useProducts } from '../context/ProductContext';
import {
  MessageCircle,
  ShoppingCart,
  Heart,
  Trash2,
  Plus,
  Minus,
  Shield,
  Truck,
  CreditCard,
  Gift,
  Clock,
  Star,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Package,
  MapPin,
  Phone,
  Mail,
  Lock,
  Award,
  Zap,
  Eye,
  BookmarkPlus,
  ArrowLeft
} from 'lucide-react';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotal, addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [giftMessage, setGiftMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const {products} = useProducts()

 useEffect(() => {
   window.scrollTo({top: 0, behavior: 'smooth'})
  },[])


  const recommendations = products.filter(p => !cart.some(item => item.id === p.id)).slice(0, 4);

  const subtotal = getTotal();
  const shippingCost = selectedShipping === 'express' ? 5000 : selectedShipping === 'standard' ? 2500 : 0;
  const discount = appliedDiscount;
  const total = subtotal + shippingCost - discount;

  const handleSaveForLater = (item) => {
    removeFromCart(item.id);
    setSavedItems(prev => [...prev, item]);
  };

  const handleMoveToCart = (item) => {
    setSavedItems(prev => prev.filter(saved => saved.id !== item.id));
    addToCart(item);
  };

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    } else {
      navigate(`/checkout?shipping=${selectedShipping}`);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };


  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'dovini10') {
      setAppliedDiscount(subtotal * 0.1);
    } else if (promoCode.toLowerCase() === 'welcome20') {
      setAppliedDiscount(subtotal * 0.2);
    }
  };

  if (cart.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50/20 py-16">
        <div className="container mx-auto px-4">
          {/* Empty Cart Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 rounded-3xl shadow-2xl">
                <ShoppingCart className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-black text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your Cart is Empty
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Looks like you haven't added any items to your cart yet. Discover amazing photography equipment and start building your perfect setup!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Link
                to="/"
                className="text-white rounded-2xl hover:scale-[0.95] transition duration-300 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-8 py-4 text-lg flex items-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Start Shopping</span>
              </Link>
              <Link
                to="/products"
                className="btn-secondary px-8 py-4 text-lg flex items-center space-x-2"
              >
                <Package className="w-5 h-5" />
                <span>Browse Categories</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Recently Viewed Products */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Recently Viewed</h2>
              <p className="text-gray-600">Products you might be interested in</p>
            </div>

            <RecentlyViewedSection limit={6} />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-white py-4 sm:py-8">
        {/* Login Prompt Modal */}
        <AnimatePresence>
          {showLoginPrompt && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Lock className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Login Required
                </motion.h2>

                <motion.p
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Please log in to your account to proceed with checkout and save your cart.
                </motion.p>

                <motion.div
                  className="flex flex-col space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <button
                    onClick={handleLoginRedirect}
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Login Now
                  </button>
                  <Link
                    to="/signup"
                    className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Create Account
                  </Link>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Continue as Guest
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-3 sm:px-4">
          {/* Header */}
          <motion.div
            className="mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Continue Shopping</span>
              </Link>

              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-800">Shopping Cart</h1>
                <p className="text-gray-600 text-sm sm:text-base">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
              </div>

              <div className="flex items-center space-x-2 justify-center sm:justify-end">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="text-xs sm:text-sm text-gray-600">Secure Checkout</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Header */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <ShoppingCart className="w-6 h-6 text-red-600" />
                  <span>Cart Items ({cart.length})</span>
                </h2>
                <div className="flex items-center space-x-2 text-xs  text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Auto-saved</span>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 shadow-lg border border-gray-100"
                      initial={{ opacity: 0, x: -50, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 50, scale: 0.95 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                        {/* Product Image and Basic Info */}
                        <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md"
                            />
                            {item.isFlashDeal && (
                              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse-slow">
                                🔥
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2">Brand: {item.brand || 'Premium'}</p>

                            {/* Price */}
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg sm:text-2xl font-black text-red-600">
                                ₦{item.price.toLocaleString()}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm sm:text-lg text-gray-500 line-through">
                                  ₦{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                          {/* Quantity Controls and Item Total */}
                          <div className="flex items-center justify-between sm:justify-start space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1 flex-shrink-0">
                              <motion.button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>

                              <span className="w-8 sm:w-12 text-center font-semibold text-gray-800 text-sm sm:text-base">
                                {item.quantity}
                              </span>

                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </motion.button>
                            </div>

                            {/* Item Total */}
                            <div className="text-center sm:text-left">
                              <div className="text-base sm:text-lg font-bold text-gray-800">
                                ₦{(item.price * item.quantity).toLocaleString()}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-600">
                                ₦{item.price.toLocaleString()} each
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex space-x-2 sm:space-x-0 sm:space-y-2 sm:flex-col justify-center sm:justify-end">
                            <motion.button
                              onClick={() => handleSaveForLater(item)}
                              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <BookmarkPlus className="w-4 h-4" />
                              <span className="text-xs sm:text-sm hidden sm:inline">Save</span>
                            </motion.button>

                            <motion.button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="text-xs sm:text-sm hidden sm:inline">Remove</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <motion.div
                className="bg-white rounded-2xl shadow-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                  <BookmarkPlus className="w-5 h-5 text-blue-600" />
                  <span>Saved for Later ({savedItems.length})</span>
                </h3>

                <div className="space-y-3">
                  {savedItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg gap-3">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h4>
                          <p className="text-red-600 font-bold text-sm sm:text-base">₦{item.price.toLocaleString()}</p>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => handleMoveToCart(item)}
                        className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 cursor-pointer w-full sm:w-auto text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Move to Cart
                      </motion.button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

              {/* Order Summary Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Order Summary */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 xl:sticky xl:top-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                <span className="text-sm sm:text-base">Order Summary</span>
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Promo Code</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <motion.button
                    onClick={applyPromoCode}
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply
                  </motion.button>
                </div>
                {appliedDiscount > 0 && (
                  <motion.div
                    className="mt-2 text-green-600 font-semibold flex items-center space-x-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Discount applied: ₦{appliedDiscount.toLocaleString()}</span>
                  </motion.div>
                )}
              </div>

              {/* Shipping Options */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Shipping Method</h3>
                <div className="space-y-2">
                  {[
                    { id: 'standard', name: 'Standard Delivery', cost: 2500, time: '1-3 business days within Port Harcourt', icon: Package },
                    { id: 'standardX', name: 'Express Delivery', cost: 5000, time: '1-6 business days outside Port Harcourt', icon: Zap }
                  ].map((option) => (
                    <motion.div
                      key={option.id}
                      onClick={() => setSelectedShipping(option.id)}
                      className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        selectedShipping === option.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <option.icon className={`w-5 h-5 ${selectedShipping === option.id ? 'text-red-600' : 'text-gray-600'} flex-shrink-0`} />
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-800 text-sm sm:text-base">{option.name}</div>
                            <div className="text-xs sm:text-sm text-gray-600">{option.time}</div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="font-bold text-gray-800 text-sm sm:text-base">
                            {`₦${option.cost.toLocaleString()}`}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Gift Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-purple-600" />
                  <span>Gift Options</span>
                </h3>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add a gift message (optional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Order Breakdown */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span className="text-sm sm:text-base">Subtotal ({cart.length} items)</span>
                  <span className="text-sm sm:text-base font-medium">₦{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="text-sm sm:text-base">Shipping</span>
                  <span className="text-sm sm:text-base font-medium">{shippingCost === 0 ? 'FREE' : `₦${shippingCost.toLocaleString()}`}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span className="text-sm sm:text-base">Discount</span>
                    <span className="text-sm sm:text-base">-₦{appliedDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                    <span className="text-lg sm:text-2xl font-black text-gray-800">Total</span>
                    <span className="text-lg sm:text-2xl font-black text-gray-800">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    Including VAT • Excluding import duties
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.div
                className="mt-6 sm:mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
                >
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Secure Checkout</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </motion.div>

              {/* Security Badges */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-xs">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-xs">Trusted</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs">Verified</span>
                </div>
              </div>

              {/* Payment Methods Preview */}
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3 text-center">We accept</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs font-semibold">Visa</div>
                  <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs font-semibold">Mastercard</div>
                  <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs font-semibold">PayPal</div>
                  <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs font-semibold">Bank Transfer</div>
                </div>
              </div>
            </motion.div>

            {/* Help & Support */}
            <motion.div
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-xl p-6 border border-green-100"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span>Need Help?</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Call: 08063971335</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Email: support@dovinigears.ng</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">24/7 Customer Support</span>
                </div>
              </div>
            </motion.div>
          </div>

            {/* Recently Viewed */}
            <RecentlyViewedSection limit={6} />

            {/* Cross-sell Recommendations */}
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>You Might Also Like</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {recommendations.map((product) => (
                  <motion.div
                    key={product.id}
                    className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-red-600 font-bold text-sm">₦{product.price.toLocaleString()}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Cart;
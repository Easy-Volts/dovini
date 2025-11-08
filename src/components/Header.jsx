import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import HeaderAds from './HeaderAds'
import { motion } from "framer-motion";
import {
  Home,
  Grid3X3,
  ShoppingCart,
  ShoppingBag,
  Phone,
  Search,
  Menu,
  X,
  Heart,
  User,
  LogOut,
  Landmark,
  Download,
  Star,
  Truck
} from "lucide-react";

const Header = () => {
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };



  return (
    <>
      <motion.div
        className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="sm:flex hidden items-center space-x-4">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Truck className="w-4 h-4" />
                <span>Free shipping on orders over ₦50,000</span>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.a
                href="#"
                className="flex items-center space-x-1 hover:text-red-200 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Download className="w-4 h-4" />
                <span>Download App</span>
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center space-x-1 hover:text-red-200 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-4 h-4" />
                <span>Rate Us</span>
              </motion.a>
            </div>
          </div>
        </div>
        <HeaderAds/>

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-1 left-10 w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1 right-20 w-1 h-1 bg-white rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </motion.div>

      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row - Logo, Navigation, Actions */}
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center relative">
               <button
                className="lg:hidden rounded-lg hover:bg-gray-100 transition-colors relative- z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
               <Link to="/" className="hover:opacity-90 transition-opacity relative -left-10">
                 <img
                   src='https://i.ibb.co/ZRrLbMy2/logo-2.png'
                   alt="logo"
                   className="md:w-45 md:h-45 w-30 h-30 drop-shadow-sm "
                 />
               </Link>
             </div>

            {/* Desktop Navigation with Icons */}
            <nav className="hidden lg:flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>

              <Link
                to="/flash-deals"
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors font-semibold px-3 py-2 rounded-lg bg-red-50"
              >
                <span className="text-lg">⚡</span>
                <span>Flash Deals</span>
              </Link>

              <Link
                to="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <Landmark className="w-5 h-5" />
                <span>About</span>
              </Link>
            </nav>

            {/* Right Side Actions with Text */}
            <div className="flex items-center space-x-2">
             
              
              {/* Wishlist with Text */}
              <Link
                to="/wishlist"
                className="relative hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              

             {user ? (
               <div className="relative" ref={userMenuRef}>
                 <button
                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                   className="flex relative left-6 md:left-0 items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                 >
                   <img
                     src={user.avatar}
                     alt={user.name}
                     className="w-8 h-8 rounded-full border-2 border-red-200"
                   />
                   <span className="hidden xl:inline font-medium text-gray-700">{user.name}</span>
                 </button>

                 {isUserMenuOpen && (
                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                     <div className="px-4 py-3 border-b border-gray-200">
                       <div className="flex items-center space-x-3">
                         <img
                           src={user.avatar}
                           alt={user.name}
                           className="w-10 h-10 rounded-full border-2 border-red-200"
                         />
                         <div>
                           <p className="font-semibold text-gray-900">{user.name}</p>
                           <p className="text-sm text-gray-600">{user.email}</p>
                         </div>
                       </div>
                     </div>
                     <Link
                       to="/orders"
                       className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                       onClick={() => setIsUserMenuOpen(false)}
                     >
                       <ShoppingBag className="w-5 h-5" />
                       <span>My Orders</span>
                     </Link>
                     <Link
                       to="/my-account"
                       className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                       onClick={() => setIsUserMenuOpen(false)}
                     >
                       <User className="w-5 h-5" />
                       <span>My Account</span>
                     </Link>
                     <div className="border-t border-gray-200 mt-2">
                       <button
                         onClick={() => {
                           logout();
                           setIsUserMenuOpen(false);
                         }}
                         className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                       >
                         <LogOut className="w-5 h-5" />
                         <span>Sign Out</span>
                       </button>
                     </div>
                   </div>
                 )}
               </div>
             ) : (
               <div className="hidden lg:flex items-center space-x-2">
                 <Link
                   to="/login"
                   className="text-gray-700 hover:text-red-600 font-medium transition-colors"
                 >
                   Sign In
                 </Link>
                 <Link
                   to="/signup"
                   className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                 >
                   Sign Up
                 </Link>
               </div>
             )}

             <a
               href="tel:08063971335"
               className="hidden xl:flex items-center space-x-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
             >
               <Phone className="w-4 h-4" />
               <span className="hidden 2xl:inline">08063971335</span>
             </a>
            
               <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                  to="/cart"
                  className="flex md:hidden relative items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 font-bold" />
                  {cartCount > 0 && (
                    <motion.span
                      className="absolute -top-0.5 left-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                  </Link>
            </div>
          </div>

          {/* Search Bar Row - Desktop */}
          <div className="hidden md:flex justify-center py-4 border-t border-gray-100">
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for premium photography equipment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm bg-gray-50 hover:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  <Link
                    to="/"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>

                  <Link
                    to="/flash-deals"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">⚡</span>
                    <span>Flash Deals</span>
                  </Link>

                  <Link
                    to="/products"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Grid3X3 className="w-5 h-5" />
                    <span>All Products</span>
                  </Link>
                 
                  
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                  to="/wishlist"
                  className="flex relative items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <Heart className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <motion.span
                      className="absolute top-1 left-26 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </Link>

                  <Link
                    to="/about"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Landmark className="w-5 h-5" />
                    <span>About</span>
                  </Link>
                </div>

                {/* Mobile Categories */}
              

                {user ? (
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-red-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        to="/orders"
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <ShoppingBag className="w-5 h-5" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>Profile</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <Link
                      to="/login"
                      className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center justify-center w-full py-3 px-4 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Mobile Contact */}
                <div className="border-t border-gray-100 pt-4">
                  <a
                    href="tel:08063971335"
                    className="flex items-center justify-center space-x-3 w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call: 08063971335</span>
                  </a>
                </div>
              </div>
            </div>
          )}
      </header>
    </>
  );
};

export default Header;

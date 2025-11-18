import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import HeaderAds from './HeaderAds'
import { motion } from "framer-motion";
import { useOrders } from "../context/OrdersContext";
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
  Truck,
  MapPin,
  Settings,
  HelpCircle,
  Shield,
  MessageCircle,
  Tag,
  Package,
  FileText,
  Lock
} from "lucide-react";

const Header = () => {
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef(null);
  const {orders} = useOrders()

  useEffect(() => {
    console.log(user)
  }, [user])
  

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
          <div className="flex items-center justify-between text-sm z-[2000]">
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
              <Link
                to="/terms"
                className="flex items-center space-x-1 hover:text-red-200 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Terms & Conditions</span>
              </Link>
              <Link
                to="/privacy"
                className="flex items-center space-x-1 hover:text-red-200 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Privacy Policy</span>
              </Link>
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
              <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                  to="/cart"
                  className="flex md:hidden relative left-4 items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
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

             {!isLoading && user ? (
               <div className="relative border border-gray-200 rounded-lg shadow-xs hover:shadow-md transition-shadow duration-200" ref={userMenuRef}>
                 <button
                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                   className="flex items-center justify-center space-x-2 p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group w-full md:max-w-[200px]"
                 >
                   <img
                     src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f97316&color=fff`}
                     alt={user.name}
                     className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-red-200 group-hover:border-red-300 transition-colors flex-shrink-0"
                     onError={(e) => {
                       e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f97316&color=fff`;
                     }}
                   />
                   {/* Desktop name display */}
                   <span className="hidden md:inline lg:inline xl:inline font-semibold text-sm text-gray-800 bg-gray-100 group-hover:bg-gray-200 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all duration-200 border border-gray-200 group-hover:border-gray-300 truncate max-w-[80px] md:max-w-none">
                     {user.name}
                   </span>
                   
                   {/* Mobile-friendly short name with proper containment */}
                   <span className="md:hidden lg:hidden xl:hidden font-semibold text-xs text-gray-800 bg-red-100 group-hover:bg-red-200 px-2 py-1 rounded-full transition-all duration-200 border border-red-200 truncate max-w-[50px]">
                     {user.name?.split(' ')[0] || user.name}
                   </span>
                 </button>

                 {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[60] overflow-visible">
                      
                     <div className="px-4 py-3 border-b border-gray-200">
                       <div className="flex items-center space-x-3">
                         <img
                           src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f97316&color=fff`}
                           alt={user.name}
                           className="w-10 h-10 rounded-full border-2 border-red-200"
                           onError={(e) => {
                             e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f97316&color=fff`;
                           }}
                         />
                         <div className="flex-1 min-w-0">
                           <p className="font-semibold text-sm sm:text-md text-gray-900 truncate">
                             {user.name}
                           </p>
                           <p className="text-sm text-gray-600 truncate">{user.email}</p>
                         </div>
                       </div>
                     </div>
                     <Link
                       to="/orders"
                       className="flex hidden sm:flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                       onClick={() => setIsUserMenuOpen(false)}
                     >
                       <ShoppingBag className="w-5 h-5" />
                       <span>My Orders</span>
                     </Link>
                     <Link
                       to="/my-account"
                       className="sm:flex hidden items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                       onClick={() => setIsUserMenuOpen(false)}
                     >
                       <User className="w-5 h-5" />
                       <span>My Account</span>
                     </Link>
                     <div className="border-t border-gray-200 mt-2">
                       <button
                         onClick={() => {
                           logout(() => {
                             navigate('/login');
                             setIsUserMenuOpen(false);
                           });
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
          <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">

              {/* User Profile Section - When Logged In */}
              {!isLoading && user ? (
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-lg p-4 text-white mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f97316&color=fff`}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-white/20"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=f97316&color=fff`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{user.name}</p>
                        <p className="text-white/80 text-sm truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-gray-800">{cartCount}</div>
                      <div className="text-xs text-gray-600">Cart</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-gray-800">{wishlistCount}</div>
                      <div className="text-xs text-gray-600">Wishlist</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-gray-800">{orders.length}</div>
                      <div className="text-xs text-gray-600">Orders</div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Main Navigation */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Main Menu</div>

                <Link
                  to="/about"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Landmark className="w-5 h-5" />
                  <span>About Us</span>
                </Link>
              </div>

              {/* Account Section */}
              {!isLoading && user ? (
                <div className="space-y-1 pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">My Account</div>
                  
                   <Link
                    to="/my-account"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>My Orders</span>
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                 
                </div>
              ) : (
                <div className="space-y-1 pt-4 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Account</div>
                  
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 mx-4 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                  
                  <Link
                    to="/signup"
                    className="flex items-center justify-center space-x-2 mx-4 py-3 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Create Account</span>
                  </Link>
                </div>
              )}

              {/* Support Section */}
              <div className="space-y-1 pt-4 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">Support</div>
                
                <a
                  href="tel:08063971335"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Support</span>
                </a>

               

             
              </div>

              {!isLoading && user ? (
                <div className="space-y-1 pt-4 border-t border-gray-200 ">
                  <button
                    onClick={() => {
                      logout(() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      });
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : null}

              {/* App Promotion */}
             
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/flash-deals"
            className="flex flex-col items-center justify-center space-y-1 text-red-600 hover:text-red-700 transition-colors mb-2"
          >
            <span className="text-lg">⚡</span>
            <span className="text-xs">Deals</span>
          </Link>

          <Link
            to="/products"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-red-600 transition-colors"
          >
            <Grid3X3 className="w-5 h-5" />
            <span className="text-xs">Products</span>
          </Link>

          <Link
            to="/wishlist"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-red-600 transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 right-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-red-600 transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 right-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

    </>
  );
};

export default Header;

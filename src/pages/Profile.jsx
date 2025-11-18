import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useOrders } from '../context/OrdersContext';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Package,
  Truck,
  Star,
  Calendar,
  Phone,
  Mail,
  Edit,
  ChevronRight,
  Award,
  TrendingUp,
  PlusCircle,
  AlertTriangle,
  X,
  ShoppingCart,
  Home
} from 'lucide-react';
import AddAddressModal from '../components/AddAddressModal';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, addAddress, updateAddress } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { orders } = useOrders()
  const [totalSpent, setTotalSpent] = useState(0)

  const userStats = {
    totalOrders: 24,
    totalSpent: 1250000,
    wishlistItems: wishlist.length,
    reviewsGiven: 12
  };

 useEffect(() => {
  if (!orders) return;

  const totalSpentCount = orders
    .filter(order => order.status === "confirmed")
    .reduce((sum, order) => sum + order.total, 0);

  setTotalSpent(totalSpentCount);
}, [orders]);




  
  

  const menuItems = [
    { icon: Home, label: 'Home', path: '/', separator: true },
    { icon: Package, label: 'My Orders', count: orders.length, id: '#orders' },
    { icon: Heart, label: 'Wishlist', count: userStats.wishlistItems, id: '#wishlist' },
    { icon: MapPin, label: 'Addresses', count: user?.address ? 1 : 0, id: '#addresses' },
    { icon: Settings, label: 'Account Settings', path: '/myaccount/settings' },
    { icon: LogOut, label: 'Logout', action: () => logout(() => navigate('/login')), separator: true }
  ];
  const [showAddress, setShowAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-white">
      {/* Colorful Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white hover:text-amber-100 transition-colors bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-sm">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">My Account</h1>
                <p className="text-amber-100 text-sm">Manage your profile and preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* User Welcome Badge */}
              <div className="hidden sm:flex items-center space-x-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-white text-sm font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
              </div>
              
              <button
                onClick={() => logout(() => navigate('/login'))}
                className="text-white hover:text-amber-100 transition-colors bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-sm"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-red-100"
                  />
                  <button className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors">
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <p className="text-gray-500 text-xs mt-1">Member since {new Date(user?.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  const showSeparator = item.separator && index > 0;
                  
                  return (
                    <React.Fragment key={index}>
                      {showSeparator && (
                        <div className="border-t border-gray-200 my-4"></div>
                      )}
                      
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.count && (
                              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                {item.count}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                          </div>
                        </Link>
                      ) : item.action ? (
                        <button
                          onClick={item.action}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                        </button>
                      ) : (
                        <a
                          href={item.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-5 h-5 text-gray-600 group-hover:text-red-600" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {item.count && (
                              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                {item.count}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                          </div>
                        </a>
                      )}
                    </React.Fragment>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: ShoppingBag, label: 'Total Orders', value: orders.length, color: 'from-blue-500 to-blue-600' },
                { icon: TrendingUp, label: 'Total Spent', value: `₦${totalSpent.toLocaleString()}`, color: 'from-green-500 to-green-600' },
                { icon: Heart, label: 'Wishlist Items', value: userStats.wishlistItems, color: 'from-red-500 to-red-600' },
                { icon: Award, label: 'Reviews Given', value: 0, color: 'from-yellow-500 to-orange-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6" id='orders'>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <Link to="/orders" className="text-red-600 hover:text-red-700 font-medium text-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {orders.slice(0,3).map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-red-300 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Order Header - Responsive Layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                      {/* Order Info - Stack on mobile, inline on desktop */}
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                        <div className="text-sm font-medium text-gray-800">Order #{order.order_code}</div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{order.date}</span>
                        </div>
                      </div>
                      
                      {/* Status and Total - Stack on mobile, inline on desktop */}
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium self-start ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                        <span className="font-bold text-gray-800 text-sm sm:text-base">₦{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {/* Order Items - Better text wrapping */}
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <span className="break-words">
                        {order.items.map((item, i) => (
                          <span key={i}>
                            {item.quantity}x {item.name}
                            {i < order.items?.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-2xl shadow-lg p-6" id='wishlist'>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Wishlist</h2>
                <Link to="/wishlist" className="text-red-600 hover:text-red-700 font-medium text-sm">
                  View All
                </Link>
              </div>
              {wishlist?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlist.slice(0, 6).map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:shadow-md transition-all duration-200 group"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative">
                        <img
                          src={item.image || item.images?.[0] || 'https://via.placeholder.com/200x150?text=No+Image'}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                        </button>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 font-bold text-lg">₦{item.price?.toLocaleString()}</span>
                        <Link
                          to={`/product/${item.id}`}
                          className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>View</span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6">Start adding items you love to your wishlist</p>
                  <Link
                    to="/products"
                    className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              )}
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl shadow-lg p-6" id='address'>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Shipping Addresses</h2>
                <Link to="/myaccount/settings" className="text-red-600 hover:text-red-700 font-medium text-sm">
                  Manage
                </Link>
              </div>
              
              {/* Address Display */}
              <div className="space-y-4">
                {user?.shippingAddresses && user.shippingAddresses.length > 0 ? (
                  <div className="grid gap-4">
                    {user.shippingAddresses.map((address, index) => (
                      <motion.div
                        key={address.id || index}
                        className="border border-gray-200 rounded-xl p-5 hover:border-red-300 hover:shadow-md transition-all duration-200 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Address Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-2 rounded-lg">
                              <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                                <span>{address.type || (address.isDefault ? 'Default Address' : 'Address')}</span>
                                {address.isDefault && (
                                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </h3>
                              {address.name && (
                                <p className="text-sm text-gray-600 mt-1">{address.name}</p>
                              )}
                            </div>
                          </div>
                          
                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              setEditingAddress(address);
                              setShowAddress(true);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Address Details */}
                        <div className="pl-11 space-y-2">
                          {/* Street Address */}
                          {address.street && (
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-700 text-sm leading-relaxed">{address.street}</p>
                            </div>
                          )}
                          
                          {/* City, State, Zip */}
                          {(address.city || address.state || address.zip) && (
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                {[address.city, address.state, address.zip].filter(Boolean).join(', ')}
                              </p>
                            </div>
                          )}
                          
                          {/* Country */}
                          {address.country && (
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-700 text-sm leading-relaxed">{address.country}</p>
                            </div>
                          )}
                          
                          {/* Phone Number */}
                          {address.phone && (
                            <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-gray-100">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 text-sm">{address.phone}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Add New Address Button */}
                    {(!user.shippingAddresses || user.shippingAddresses.length < 5) && (
                      <motion.button
                        onClick={() => {
                          setEditingAddress(null);
                          setShowAddress(true);
                        }}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group w-full"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="bg-gray-100 group-hover:bg-red-100 p-3 rounded-full transition-colors duration-200">
                            <PlusCircle className="w-6 h-6 text-gray-400 group-hover:text-red-600" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-700 group-hover:text-red-700">
                              Add {user.shippingAddresses?.length === 0 ? 'Home Address' : 'New Address'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {user.shippingAddresses?.length === 0
                                ? 'Add your primary shipping address'
                                : 'Add another address for deliveries'
                              }
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    )}
                  </div>
                ) : user?.address ? (
                  /* Fallback for legacy single address field */
                  <motion.div
                    className="border border-gray-200 rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-2 rounded-lg">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{user.address}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Empty State */
                  <motion.div
                    className="text-center py-12 border border-gray-200 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No addresses yet</h3>
                    <p className="text-gray-500 mb-6">Add your shipping address to get started</p>
                    <button
                      onClick={() => {
                        setEditingAddress(null);
                        setShowAddress(true);
                      }}
                      className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add Address</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          

          </div>
        </div>
      </div>
      <AddAddressModal
        showAddress={showAddress}
        setShowAddress={setShowAddress}
        editingAddress={editingAddress}
        setEditingAddress={setEditingAddress}
        onAddAddress={addAddress}
        onUpdateAddress={updateAddress}
      />
    </div>
  );
};

export default Profile;
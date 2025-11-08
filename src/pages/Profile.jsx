import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
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
  ShoppingCart
} from 'lucide-react';
import AddAddressModal from '../components/AddAddressModal';

const Profile = () => {
  const { user, logout, addAddress, updateAddress, deleteAddress } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();

  // Mock data for demonstration - in real app, this would come from API
  const userStats = {
    totalOrders: 24,
    totalSpent: 1250000,
    wishlistItems: wishlist.length,
    reviewsGiven: 12
  };
 

  // Mock recent orders
  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 150000,
      items: [
        { name: 'Professional Softbox Kit', quantity: 1, price: 150000 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 250000,
      items: [
        { name: '3-Axis Gimbal Stabilizer', quantity: 1, price: 250000 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 80000,
      items: [
        { name: 'Condenser Microphone', quantity: 1, price: 80000 }
      ]
    }
  ];

  // Mock addresses
  

  // Mock payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'Bank Transfer',
      account: '****1234',
      bank: 'GTBank',
      isDefault: false
    }
  ];

  const menuItems = [
    { icon: Package, label: 'My Orders', count: userStats.totalOrders, id: '#orders' },
    { icon: Heart, label: 'Wishlist', count: userStats.wishlistItems, id: '#wishlist' },
    { icon: MapPin, label: 'Addresses', count: user.shippingAddresses.length, id: '#addresses' },
    { icon: CreditCard, label: 'Payment Methods', count: paymentMethods.length, id: '#payment-methods' },
    { icon: Settings, label: 'Account Settings', path: '/myaccount/settings' }
  ];
  const [showAddress, setShowAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-red-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-red-600 hover:text-red-700 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">My Account</h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
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
                {menuItems.map((item, index) => (
                  item.path ? (
                    <Link
                      key={index}
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
                  ) : (
                    <a
                      key={index}
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
                  )
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: ShoppingBag, label: 'Total Orders', value: userStats.totalOrders, color: 'from-blue-500 to-blue-600' },
                { icon: TrendingUp, label: 'Total Spent', value: `₦${(userStats.totalSpent / 100000).toFixed(1)}M`, color: 'from-green-500 to-green-600' },
                { icon: Heart, label: 'Wishlist Items', value: userStats.wishlistItems, color: 'from-red-500 to-red-600' },
                { icon: Award, label: 'Reviews Given', value: userStats.reviewsGiven, color: 'from-yellow-500 to-orange-500' }
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
            <div className="bg-white rounded-2xl shadow-lg p-6" id='orders'>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <Link to="/orders" className="text-red-600 hover:text-red-700 font-medium text-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium text-gray-800">Order #{order.id}</div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{order.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                        <span className="font-bold text-gray-800">₦{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.map((item, i) => (
                        <span key={i}>{item.quantity}x {item.name}{i < order.items.length - 1 ? ', ' : ''}</span>
                      ))}
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
              {wishlist.length > 0 ? (
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
                <Link to="/addresses" className="text-red-600 hover:text-red-700 font-medium text-sm">
                  Manage
                </Link>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user?.shippingAddresses?.map((address, index) => (
                    <motion.div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span className="font-medium text-gray-800">{address.type}</span>
                          {address.isDefault && (
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setEditingAddress(address);
                            setShowAddress(true);
                          }}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="font-medium">{address.name}</div>
                        <div>{address.street}</div>
                        <div>{address.city}, {address.state} {address.zip}</div>
                        <div className="flex items-center space-x-1 mt-2">
                          <Phone className="w-3 h-3" />
                          <span>{address.phone}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Add Address Button - Show if less than 2 addresses */}
                  {(!user?.shippingAddresses || user.shippingAddresses.length < 2) && (
                    <motion.div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-red-300 transition-colors cursor-pointer"
                      onClick={() => setShowAddress(true)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-center">
                        <PlusCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          Add {user?.shippingAddresses?.length === 0 ? 'Home' : 'Work'} Address
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {user?.shippingAddresses?.length === 0
                            ? 'Add your primary shipping address'
                            : 'Add your work address for office deliveries'
                          }
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
                <Link to="/payment-methods" className="text-red-600 hover:text-red-700 font-medium text-sm">
                  Manage
                </Link>
              </div>
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={method.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {method.brand ? `${method.brand} ****${method.last4}` : method.account}
                        </div>
                        <div className="text-sm text-gray-600">
                          {method.expiry ? `Expires ${method.expiry}` : method.bank}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {method.isDefault && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-red-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
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
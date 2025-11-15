import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Eye,
  ShoppingBag
} from 'lucide-react';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load user's orders from localStorage (in a real app, this would be from an API)
    const storedOrders = localStorage.getItem(`orders_${user.id}`);
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Error parsing stored orders:', error);
      }
    } else {
      // Mock orders for demo
      const mockOrders = [
        {
          id: 'ORD-001',
          date: '2024-01-15T10:30:00Z',
          status: 'delivered',
          total: 125000,
          items: [
            { id: 1, name: 'Canon EOS R5', quantity: 1, price: 125000, image: '/api/placeholder/100/100' }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main St, Lagos',
            phone: '+2348012345678'
          },
          tracking: {
            number: 'TRK-123456789',
            carrier: 'DHL',
            status: 'delivered',
            updates: [
              { date: '2024-01-15T14:30:00Z', status: 'Order placed', location: 'Lagos' },
              { date: '2024-01-16T09:00:00Z', status: 'Order confirmed', location: 'Lagos' },
              { date: '2024-01-17T11:30:00Z', status: 'Shipped', location: 'Lagos Warehouse' },
              { date: '2024-01-19T16:45:00Z', status: 'Out for delivery', location: 'Lagos' },
              { date: '2024-01-20T10:15:00Z', status: 'Delivered', location: '123 Main St, Lagos' }
            ]
          }
        },
        {
          id: 'ORD-002',
          date: '2024-01-10T15:45:00Z',
          status: 'shipped',
          total: 89000,
          items: [
            { id: 2, name: 'Nikon Z6 II', quantity: 1, price: 89000, image: '/api/placeholder/100/100' }
          ],
          shippingAddress: {
            name: 'John Doe',
            address: '123 Main St, Lagos',
            phone: '+2348012345678'
          },
          tracking: {
            number: 'TRK-987654321',
            carrier: 'FedEx',
            status: 'shipped',
            updates: [
              { date: '2024-01-10T16:00:00Z', status: 'Order placed', location: 'Lagos' },
              { date: '2024-01-11T10:30:00Z', status: 'Order confirmed', location: 'Lagos' },
              { date: '2024-01-12T14:20:00Z', status: 'Shipped', location: 'Lagos Warehouse' }
            ]
          }
        }
      ];
      setOrders(mockOrders);
      localStorage.setItem(`orders_${user.id}`, JSON.stringify(mockOrders));
    }
  }, [user, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-3 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
              <p className="text-gray-600">Track your orders and view purchase history</p>
            </div>
          </div>
        </motion.div>

        {selectedOrder ? (
          /* Order Details View */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Order {selectedOrder.id}</h2>
                    <p className="text-red-100">
                      Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-white hover:text-red-200 transition-colors"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Order Items */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            <p className="text-lg font-semibold text-red-600">
                              ₦{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-red-600">₦{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tracking & Shipping */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Tracking</h3>

                    {/* Status */}
                    <div className="mb-6">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="capitalize">{selectedOrder.status}</span>
                      </div>
                    </div>

                    {/* Tracking Info */}
                    {selectedOrder.tracking && (
                      <div className="mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">Tracking Number:</span>
                            <span className="text-gray-600">{selectedOrder.tracking.number}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">Carrier:</span>
                            <span className="text-gray-600">{selectedOrder.tracking.carrier}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tracking Timeline */}
                    {selectedOrder.tracking?.updates && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-4">Tracking Updates</h4>
                        <div className="space-y-4">
                          {selectedOrder.tracking.updates.map((update, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{update.status}</p>
                                <p className="text-sm text-gray-600">{update.location}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(update.date).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Shipping Address */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedOrder.shippingAddress.name}</p>
                            <p className="text-gray-600">{selectedOrder.shippingAddress.address}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{selectedOrder.shippingAddress.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Orders List View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">No orders yet</h2>
                <p className="text-gray-600 mb-6">Start shopping to see your order history here</p>
                <button
                  onClick={() => navigate('/products')}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-gray-600">
                            {new Date(order.date).toLocaleDateString()} • {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-600">₦{order.total.toLocaleString()}</p>
                          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {order.items.slice(0, 3).map((item) => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                            />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {order.tracking && (
                            <div className="text-sm text-gray-600">
                              <p className="font-medium">{order.tracking.carrier}</p>
                              <p>{order.tracking.number}</p>
                            </div>
                          )}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;
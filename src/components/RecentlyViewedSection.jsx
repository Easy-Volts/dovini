import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye,Star } from 'lucide-react';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

const RecentlyViewedSection = ({ limit = 6 }) => {
  const { getRecentlyViewedProducts } = useRecentlyViewed();
  const recentlyViewed = getRecentlyViewedProducts(limit);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <Eye className="w-5 h-5 text-green-600" />
        <span>Recently Viewed</span>
      </h3>

      {recentlyViewed.length === 0 ? (
        <div className="text-center py-8">
          <Eye className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No recently viewed products yet</p>
          <p className="text-gray-400 text-xs mt-1">Products you view will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {recentlyViewed.map((product) => (
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
      )}
    </motion.div>
  );
};

export default RecentlyViewedSection;
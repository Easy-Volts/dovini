import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package, Sparkles } from "lucide-react";
import { products } from "../data/products";

const CategoryCard = ({ category }) => {
  // Get product count for this category
  const categoryProducts = products.filter(product => product.categoryId === category.id);
  const productCount = categoryProducts.length;

  // Get average price for the category
  const avgPrice = categoryProducts.length > 0
    ? Math.round(categoryProducts.reduce((sum, product) => sum + product.price, 0) / categoryProducts.length)
    : 0;

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -5, scale: 1.03 }} // Simple lift and slight scale
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ perspective: "none" }}
    >
      <Link to={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
        <motion.div
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative border border-gray-100"
          whileHover={{ scale: 1.01 }} // Very subtle scale
          transition={{ duration: 0.3 }}
        >
          {/* Removed Background Pattern (Blur elements) for a cleaner Jumia feel */}

          {/* Image Section - REDUCED HEIGHT */}
          <div className="relative overflow-hidden">
            <motion.img
              src={category.image}
              alt={category.name}
              // Fixed, smaller height
              className="w-full h-24 object-cover" 
              whileHover={{ scale: 1.1 }} // Slightly toned-down image zoom
              transition={{ duration: 0.5 }}
            />

            {/* Removed Dynamic Overlay for clean image background */}
            
            {/* Floating Elements (Product Count) - MODIFIED POSITION AND SIZE */}
            <motion.div
              className="absolute top-2 right-2 bg-black/50 rounded-full px-2 py-0.5 text-[10px] font-medium text-white shadow-md flex items-center" // Fixed small text size
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Package className="w-2.5 h-2.5 inline mr-1" />
              {productCount} items
            </motion.div>

            {/* Hover CTA - Simplified to a direct button on hover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1 }}
            >
              <div
                className="bg-orange-500 text-white rounded-full p-2 shadow-lg"
              >
                <ArrowRight className="w-4 h-4" /> {/* Smaller icon */}
              </div>
            </motion.div>

            {/* Removed Shimmer Effect for simplicity */}
          </div>

          {/* Content Section - REDUCED PADDING */}
          <div className="p-2 relative z-10"> 
            
            {/* Category Name - FIXED SMALLER FONT */}
            <motion.h3
              // Using fixed text-sm, removed all responsive classes
              className="text-sm font-bold text-gray-800 mb-0.5 group-hover:text-orange-600 transition-colors duration-300 text-center truncate" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {category.name}
            </motion.h3>

          
            <motion.div
              // Fixed text-[10px] size
              className="flex items-center justify-between text-[10px]" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center text-gray-500">
                <Sparkles className="w-2.5 h-2.5 mr-0.5 text-yellow-500" /> {/* Smaller icon */}
                <span>Premium</span>
              </div>
              <div className="text-orange-600 font-semibold">
                ₦{avgPrice.toLocaleString()}
              </div>
            </motion.div>

          </div>

          {/* Removed Decorative Elements (Blur circles) */}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;


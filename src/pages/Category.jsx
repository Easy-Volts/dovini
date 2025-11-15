import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { categories } from '../data/categories';

const Category = () => {
  const { id } = useParams();
  const categoryId = parseInt(id);
  const category = categories.find(cat => cat.id === categoryId);
  const categoryProducts = products.filter(product => product.categoryId === categoryId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Category not found</h1>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.nav
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-red-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{category.name}</li>
          </ol>
        </motion.nav>

        {/* Category Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium {category.name.toLowerCase()} equipment for professional photography
          </p>
        </motion.div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categoryProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">We're working on adding products to this category.</p>
            <Link to="/" className="btn-primary">Browse All Categories</Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Category;
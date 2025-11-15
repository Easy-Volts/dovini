import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProCard from '../components/ProCard';
import {
  Filter,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  SlidersHorizontal,
  X,
  Search,
  Heart,
  ShoppingCart,
  Star,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

   useEffect(() => {
     window.scrollTo({top: 0, behavior: 'smooth'})
   }, [])
  
  // Get category from URL params
  const categoryParam = searchParams.get('category');
  const backendCategoryId = searchParams.get('cat');
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'featured';
  const viewMode = searchParams.get('view') || 'grid';
  const flashDealsParam = searchParams.get('flashDeals') === 'true';
  const limitedStockParam = searchParams.get('limitedStock') === 'true';

 
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUsingBackend, setIsUsingBackend] = useState(false);
  const [backendProducts, setBackendProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 12;

  const transformBackendProduct = (backendProduct) => {
    return {
      id: backendProduct.id,
      name: backendProduct.name,
      price: parseFloat(backendProduct.price) || 0,
      categoryId: backendProduct.categoryId,
      image: backendProduct.image || '/api/placeholder/300/300',
      stock: backendProduct.stock || 0,
      description: backendProduct.description || 'No description available',
      rating: backendProduct.rating || 0,
      reviews: backendProduct.reviews || 0,
      brand: 'Professional Gear', // Default brand
      isFlashDeal: backendProduct.isFlashDeal || false,
      discount: backendProduct.discount || 0,
      originalPrice: backendProduct.originalPrice || parseFloat(backendProduct.price) || 0,
      isLimitedStock: (backendProduct.stock || 0) < 10,
      flashDealEnd: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Default to 24h from now
      featured: true,
    };
  };

  // Fetch products from backend API
  const fetchBackendProducts = useCallback(async (categoryId) => {
    if (!categoryId) return;
    
    
    setIsLoading(true);
    setIsUsingBackend(true);
    
    try {
      const response = await fetch(`https://api.dovinigears.ng/products/by-category?category_id=${categoryId}`);
      
      const data = await response.json();
      
      
      if (data.success && data.data) {
        const transformedProducts = data.data.map(transformBackendProduct);
        console.log('Transformed products:', transformedProducts);
        setBackendProducts(transformedProducts);
      } else {
        
        setIsUsingBackend(false);
        setBackendProducts([]);
      }
    } catch (error) {
      
      setIsUsingBackend(false);
      setBackendProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch backend products when backendCategoryId changes
  useEffect(() => {
    if (backendCategoryId) {
      fetchBackendProducts(backendCategoryId);
    } else {
      setIsUsingBackend(false);
      setBackendProducts([]);
    }
  }, [backendCategoryId, fetchBackendProducts]);

  // Fallback effect: if backend fails, use local data with category filtering
  useEffect(() => {
    if (backendCategoryId && !isLoading && !isUsingBackend) {
      console.log('Backend API failed, falling back to local filtering');
      // Find the category and filter local products
      const category = categories.find(cat => cat.id === parseInt(backendCategoryId));
      if (category) {
        console.log('Using local fallback for category:', category.name);
        // The local filtering will happen automatically in the useMemo
      }
    }
  }, [backendCategoryId, isLoading, isUsingBackend, categories]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = isUsingBackend ? backendProducts : products;

    // Filter by category
    if (categoryParam) {
      const categoryName = categoryParam.replace(/-/g, ' ');
      const category = categories.find(cat =>
        cat.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (category) {
        filtered = filtered.filter(product => product.categoryId === category.id);
      }
    }
    
    // Also handle local filtering for backend category ID when backend is not available
    if (!isUsingBackend && backendCategoryId && backendProducts.length === 0) {
      const category = categories.find(cat => cat.id === parseInt(backendCategoryId));
      if (category) {
        filtered = filtered.filter(product => product.categoryId === category.id);
      }
    }
    
    // Handle backend category filtering (already filtered by API)
    if (isUsingBackend && backendCategoryId) {
      // No additional filtering needed since backend already filtered
      // But we might want to apply other filters like search, price, etc.
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by ratings
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product =>
        selectedRatings.some(rating => product.rating >= parseInt(rating))
      );
    }

    // Filter by flash deals
    if (flashDealsParam) {
      filtered = filtered.filter(product => product.isFlashDeal);
    }

    // Filter by limited stock
    if (limitedStockParam) {
      filtered = filtered.filter(product => product.isLimitedStock);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default: // featured
        filtered.sort((a, b) => (b.isFlashDeal ? 1 : 0) - (a.isFlashDeal ? 1 : 0));
    }

    return filtered;
  }, [isUsingBackend, backendProducts, categoryParam, searchQuery, priceRange, selectedBrands, selectedRatings, sortBy, flashDealsParam, limitedStockParam]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get unique brands for filter (works with both local and backend products)
  const availableBrands = useMemo(() => {
    const sourceProducts = isUsingBackend ? backendProducts : products;
    return [...new Set(sourceProducts.map(p => p.brand).filter(Boolean))];
  }, [isUsingBackend, backendProducts]);

  // Update URL params - memoized for performance
  const updateSearchParams = useCallback((key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const clearFilters = () => {
    setPriceRange([0, 1000000]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setCurrentPage(1);
    const newParams = new URLSearchParams();
    if (categoryParam) newParams.set('category', categoryParam);
    setSearchParams(newParams);
  };

  const getCategoryInfo = () => {
    if (flashDealsParam) {
      return { name: 'Flash Deals', description: 'Limited time offers with amazing discounts' };
    }
    if (limitedStockParam) {
      return { name: 'Limited Stock', description: 'Almost gone - secure these items before they\'re sold out' };
    }
    
    // Handle backend categories
    if (isUsingBackend && backendCategoryId) {
      const category = categories.find(cat => cat.id === parseInt(backendCategoryId));
      if (category) {
        return {
          name: category.name,
          description: category.description || `Premium ${category.name.toLowerCase()} equipment from our backend collection`
        };
      }
      return { name: 'Backend Category', description: 'Products from our backend API' };
    }
    
    // Handle local categories
    if (!categoryParam) return null;
    const categoryName = categoryParam.replace(/-/g, ' ');
    const category = categories.find(cat =>
      cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    return category;
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-white overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-red-100 top-0 z-30">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-red-600 transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-gray-800 font-medium">
                {flashDealsParam ? 'Flash Deals' :
                 limitedStockParam ? 'Limited Stock' :
                 categoryInfo ? categoryInfo.name :
                 searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
              </li>
            </ol>
          </motion.nav>

          {/* Title and Description */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
              {flashDealsParam ? 'Flash Deals' :
               limitedStockParam ? 'Limited Stock' :
               categoryInfo ? categoryInfo.name :
               searchQuery ? 'Search Results' : 'All Products'}
            </h1>
            <p className="md:text-xl text-gray-600 max-w-2xl mx-auto">
              {flashDealsParam ? 'Limited time offers with amazing discounts - don\'t miss out!' :
               limitedStockParam ? 'Almost gone - secure these items before they\'re sold out!' :
               categoryInfo ? categoryInfo.description || `Discover our premium ${categoryInfo.name.toLowerCase()} equipment for professional photography` :
               searchQuery ? `Found ${filteredAndSortedProducts.length} results for "${searchQuery}"` :
               'Explore our complete collection of professional photography equipment'}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => updateSearchParams('search', e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-lg bg-white/80 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Popular Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 8).map((cat, index) => (
                <motion.button
                  key={cat.id}
                  onClick={() => updateSearchParams('category', cat.name.toLowerCase().replace(/\s+/g, '-'))}
                  className="flex items-center space-x-2 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <cat.icon className="w-4 h-4 text-red-600" />
                  <span>{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {(priceRange[0] > 0 || priceRange[1] < 1000000 || selectedBrands.length > 0 || selectedRatings.length > 0) && (
                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs rounded-full px-2 py-1">
                    {(priceRange[0] > 0 ? 1 : 0) + (priceRange[1] < 1000000 ? 1 : 0) + selectedBrands.length + selectedRatings.length}
                  </span>
                )}
              </button>

              {(priceRange[0] > 0 || priceRange[1] < 1000000 || selectedBrands.length > 0 || selectedRatings.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => updateSearchParams('sort', e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode */}
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => updateSearchParams('view', 'grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateSearchParams('view', 'list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Backdrop */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowFilters(false)}
              />
            )}
          </AnimatePresence>

          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 300 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 300 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-end sm:items-start sm:justify-start"
              >
                <div className="w-full sm:w-80 bg-white rounded-t-2xl sm:rounded-2xl shadow-xl p-6 h-fit max-h-[80vh] sm:max-h-none overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₦{priceRange[0].toLocaleString()}</span>
                      <span>₦{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Brands</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ratings */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRatings.includes(rating.toString())}
                          onChange={(e) => {
                            if (selectedRatings.includes(rating.toString())) {
                              setSelectedRatings(selectedRatings.filter(r => r !== rating.toString()));
                            } else {
                              setSelectedRatings([...selectedRatings, rating.toString()]);
                            }
                          }}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm text-gray-700">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 w-full">
            {/* Results Count */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                </p>
                {backendCategoryId && !isUsingBackend && backendProducts.length === 0 && !isLoading && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5"></div>
                    Local Data
                  </span>
                )}
                {isUsingBackend && backendProducts.length > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5 animate-pulse"></div>
                    Live Data
                  </span>
                )}
              </div>
            </motion.div>

            {/* Products */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <motion.div
className={`grid gap-4 sm:gap-6 mb-8 ${
 viewMode === 'grid'
  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' // This line is changed
  : 'grid-cols-1'
 }`}
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
>
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <ProCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    className="flex justify-center items-center space-x-2 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 border flex items-center justify-center rounded-lg ${
                          currentPage === i + 1
                            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white border-red-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      Next
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h2>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
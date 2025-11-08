import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { products } from '../data/products';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle,
  MessageCircle,
  Package,
  Award,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Eye,
  ThumbsUp,
  Flag,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showSuccess, showError } = useToast();
    const { addToRecentlyViewed } = useRecentlyViewed();


  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
   window.scrollTo({top: 0, behavior: 'smooth'})
  },[])

  
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product?.id]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      // Set initial selected image
      setSelectedImage(0);


      const related = products
        .filter(p => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);

      // Generate mock reviews
      const mockReviews = Array.from({ length: Math.floor(Math.random() * 20) + 5 }, (_, i) => ({
        id: i + 1,
        name: ['John D.', 'Sarah M.', 'Mike R.', 'Emma L.', 'David K.', 'Lisa P.'][Math.floor(Math.random() * 6)],
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        comment: [
          'Excellent product! Exactly as described. Fast shipping and great customer service.',
          'Very satisfied with this purchase. Quality is outstanding and it works perfectly.',
          'Great value for money. Would definitely recommend to others.',
          'Professional grade equipment. Exactly what I needed for my work.',
          'Fast delivery and well packaged. Product performs as expected.',
          'Outstanding quality and customer support. Highly recommended!'
        ][Math.floor(Math.random() * 6)],
        helpful: Math.floor(Math.random() * 15),
        verified: Math.random() > 0.3
      }));
      setReviews(mockReviews);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      showSuccess(`${quantity} x ${product.name} added to cart!`, 1000);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product);
      const isInWish = isInWishlist(product.id);
      showSuccess(
        isInWish
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist!`,
        1000
      );
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this amazing ${product?.name} on Dovini!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSuccess('Product link copied to clipboard!', 1000);
    }
  };

  const nextImage = () => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : product?.rating || 0;

  const faqs = [
    {
      question: "What's the warranty period for this product?",
      answer: "This product comes with a 1-year manufacturer warranty covering defects in materials and workmanship."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by location."
    },
    {
      question: "Can I return this product if I'm not satisfied?",
      answer: "We offer a 30-day return policy for unused items in their original packaging. Please review our return policy for full details."
    },
    {
      question: "Is this product eligible for expedited shipping?",
      answer: "Yes, expedited shipping options are available at checkout for faster delivery."
    }
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/products" className="hover:text-red-600 transition-colors">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <div
                className="relative aspect-square cursor-zoom-in"
                onClick={() => setIsImageZoomed(true)}
              >
                <img
                  src={product.images && product.images.length > 0 ? product.images[selectedImage] : product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                </div>

                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isFlashDeal && (
                    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      FLASH DEAL
                    </div>
                  )}
                  {product.isLimitedStock && (
                    <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      LIMITED STOCK
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-red-500 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={product.images && product.images.length > 0 ? product.images[index] : product.image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-lg font-semibold text-gray-900 ml-2">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-600">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl md:text-3xl font-bold text-red-600">
                ₦{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                product.stock > 10 ? 'bg-green-500' :
                product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className={`font-medium ${
                product.stock > 10 ? 'text-green-600' :
                product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {product.stock > 10 ? 'In Stock' :
                 product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </motion.button>

              <motion.button
                onClick={handleWishlistToggle}
                className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isInWishlist(product.id)
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                <span>Wishlist</span>
              </motion.button>

              <motion.button
                onClick={handleShare}
                className="px-4 py-4 rounded-xl border border-gray-300 text-gray-700 hover:border-gray-400 flex items-center justify-center transition-all duration-200 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5" />Share
              </motion.button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders over ₦50,000</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">2 Year Warranty</div>
                  <div className="text-sm text-gray-600">Full coverage included</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">30-Day Returns</div>
                  <div className="text-sm text-gray-600">Easy returns policy</div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Brand:</span>
                  <span className="ml-2 text-gray-900">{product.brand}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Category:</span>
                  <span className="ml-2 text-gray-900">Professional Equipment</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">SKU:</span>
                  <span className="ml-2 text-gray-900">DV-{product.id.toString().padStart(4, '0')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Availability:</span>
                  <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto px-4 py-2">
            {['description', 'specifications', 'reviews', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-6 lg:px-8 py-3 sm:py-4 font-medium transition-colors capitalize whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab
                    ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Professional grade quality</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Durable construction</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Easy to use and maintain</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span>Compatible with industry standards</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span>Main product unit</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span>User manual and documentation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span>Original packaging</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span>Warranty card</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-3">
                      <div className="font-medium text-gray-900">Dimensions</div>
                      <div className="text-gray-600">Various sizes available</div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="font-medium text-gray-900">Weight</div>
                      <div className="text-gray-600">Lightweight design</div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="font-medium text-gray-900">Material</div>
                      <div className="text-gray-600">Premium quality materials</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-3">
                      <div className="font-medium text-gray-900">Compatibility</div>
                      <div className="text-gray-600">Universal compatibility</div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="font-medium text-gray-900">Power Source</div>
                      <div className="text-gray-600">Battery or AC powered</div>
                    </div>
                    <div className="border-b border-gray-200 pb-3">
                      <div className="font-medium text-gray-900">Warranty</div>
                      <div className="text-gray-600">2 years manufacturer warranty</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < Math.floor(averageRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="font-semibold text-gray-900 ml-2 text-sm sm:text-base">
                        {averageRating.toFixed(1)}
                      </span>
                      <span className="text-gray-600 text-sm">({reviews.length} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 font-semibold text-sm sm:text-base">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{review.name}</div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                      i < review.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full whitespace-nowrap">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{review.date}</div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
                          <Flag className="w-4 h-4" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {reviews.length > 3 && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'faq' && (
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 text-sm sm:text-base pr-2">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-700 text-sm sm:text-base">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <motion.div
            className="mt-16 sm:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-red-200 px-4 py-2 rounded-full mb-4"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-4 h-4 text-red-600" />
                <span className="text-red-700 font-medium text-sm">You might also like</span>
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl font-black text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Related <span className="text-red-600">Products</span>
              </motion.h2>

              <motion.p
                className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Discover more products from our collection that complement your choice
              </motion.p>
            </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8 px-1 sm:px-0">
  {relatedProducts.map((relatedProduct, index) => (
    <motion.div
      key={relatedProduct.id}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group flex flex-col h-full"
    >
      <Link to={`/product/${relatedProduct.id}`} className="block h-full">
        <div className="flex flex-col h-full bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200">

          {/* Product Image */}
          <div className="relative overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick Action */}
            <motion.div
              className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
              </div>
            </motion.div>

            {/* Rating */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 sm:px-3 sm:py-1 flex items-center space-x-1">
              <Star className="w-2.5 h-2.5 sm:w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-[10px] sm:text-xs font-semibold text-gray-800">
                {relatedProduct.rating}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between flex-grow p-3 sm:p-5">
            <div>
              <h3 className="font-semibold sm:font-bold text-gray-900 mb-1.5 sm:mb-3 line-clamp-2 text-[12px] sm:text-base group-hover:text-red-600 transition-colors duration-300">
                {relatedProduct.name}
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm sm:text-lg font-black text-red-600">
                    ₦{relatedProduct.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500">
                    Free shipping
                  </span>
                </div>

                <motion.button
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl transition duration-300 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart();
                  }}
                >
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="flex items-center justify-between mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-1 text-[10px] sm:text-xs text-gray-600">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center space-x-1 text-[10px] sm:text-xs text-gray-600">
                <Shield className="w-3 h-3 text-blue-500" />
                <span>Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  ))}
</div>




            {/* View All Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to="/products">
                <motion.button
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View All Products</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.images && product.images.length > 0 ? product.images[selectedImage] : product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setIsImageZoomed(false)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;
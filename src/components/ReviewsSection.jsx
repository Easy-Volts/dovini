import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewsContext';
import { useToast } from '../context/ToastContext';
import { Star, ThumbsUp, MessageCircle, User, Send } from 'lucide-react';

const ReviewsSection = ({ productId }) => {
  const { user } = useAuth();
  const { getProductReviews, getReviewStats, addReview } = useReviews();
  const { showSuccess, showError } = useToast();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const reviews = getProductReviews(productId);
  const stats = getReviewStats(productId);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!user) {
      showError('Please sign in to leave a review');
      return;
    }

    if (!newReview.title.trim() || !newReview.comment.trim()) {
      showError('Please fill in all fields');
      return;
    }

    const review = {
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
    };

    addReview(productId, review);
    showSuccess('Review submitted successfully!', 1000);

    setNewReview({ rating: 5, title: '', comment: '' });
    setShowReviewForm(false);
  };

  const StarRating = ({ rating, interactive = false, onRatingChange }) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type={interactive ? 'button' : 'span'}
          className={`text-lg ${interactive ? 'cursor-pointer' : ''}`}
          onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          onClick={interactive ? () => onRatingChange(star) : undefined}
          whileHover={interactive ? { scale: 1.1 } : {}}
          whileTap={interactive ? { scale: 0.9 } : {}}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (interactive ? hoveredRating || newReview.rating : rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        {user && (
          <motion.button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Write Review</span>
          </motion.button>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write Your Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <StarRating
                  rating={newReview.rating}
                  interactive
                  onRatingChange={(rating) => setNewReview({ ...newReview, rating })}
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Summarize your experience"
                  required
                />
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Tell others about your experience with this product"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center space-x-3">
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
                </motion.button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {stats.averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(stats.averageRating)} />
            <p className="text-gray-600 mt-2">
              Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {stats.distribution.map((item) => (
              <div key={item.rating} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 w-8">{item.rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-yellow-400 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
            <p className="text-gray-600">Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} />
                        <span className="text-sm text-gray-600">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>

                  <div className="flex items-center space-x-4 mt-4">
                    <motion.button
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">Helpful</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  AlertTriangle, 
  Shield, 
  X,
  Timer
} from 'lucide-react';

const InactivityModal = ({ 
  isOpen, 
  countdownTime, 
  onCancel,
  userName 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-6 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold">Session Timeout</h2>
                      <p className="text-red-100 text-sm">
                        Hi {userName}, your session will expire soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                {/* Countdown Display */}
                <motion.div
                  className="mb-6"
                  animate={{ scale: countdownTime <= 10 ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.5, repeat: countdownTime <= 10 ? Infinity : 0 }}
                >
                  <div className="relative inline-block">
                    {/* Circular Progress */}
                    <motion.div
                      className="w-24 h-24 mx-auto mb-4"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: countdownTime * 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#f3f4f6"
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#f97316"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - (30 - countdownTime) / 30)}
                          initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        />
                      </svg>
                    </motion.div>
                    
                    {/* Timer Numbers */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-center flex flex-col items-center justify-center"
                        animate={{ scale: countdownTime <= 10 ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: countdownTime <= 10 ? Infinity : 0 }}
                      >
                        <div className="text-3xl font-black text-red-600">
                          {countdownTime}
                        </div>
                        <div className="text-xs text-gray-600">seconds</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-gray-800">
                      Your session will expire in:
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    For security reasons, you'll be automatically logged out when your session expires.
                    Click the button below to continue browsing.
                  </p>
                </motion.div>

                {/* Security Notice */}
                <motion.div
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-800 text-sm">
                      Secure Session Protection
                    </span>
                  </div>
                  <p className="text-blue-700 text-xs">
                    This timeout helps protect your account from unauthorized access when you're away.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={onCancel}
                    className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Timer className="w-4 h-4" />
                    <span>Keep Me Logged In</span>
                  </motion.button>
                </motion.div>

                {/* Warning Text */}
                <motion.div
                  className="mt-4 text-xs text-gray-500 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="inline-flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>Auto-logout will occur when timer reaches zero</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InactivityModal;
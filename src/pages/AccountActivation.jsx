import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, ArrowRight, ShoppingBag, Clock, RefreshCw, CheckCircle } from 'lucide-react';

const AccountActivation = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpExpiration, setOtpExpiration] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { sendOTP, verifyOTP } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state or query params
  useEffect(() => {
    const emailFromState = location.state?.email;
    const emailFromQuery = new URLSearchParams(location.search).get('email');
    setEmail(emailFromState || emailFromQuery || '');
  }, [location]);

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (otpExpiration) {
      interval = setInterval(() => {
        const now = Date.now();
        const distance = otpExpiration - now;
        
        if (distance <= 0) {
          setCountdown(0);
          setOtpExpiration(null);
        } else {
          setCountdown(Math.floor(distance / 1000));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpExpiration]);

  // Format countdown time (seconds -> MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showError('Email address is required');
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendOTP(email);

      if (result.success) {
        // Set expiration to exactly 5 minutes from now
        const expiration = Date.now() + 300000;
        setOtpExpiration(expiration);
        showSuccess(`OTP sent successfully to ${email}`);
      } else {
        showError(result.error || 'Failed to send OTP');
      }
    } catch (error) {
      showError('An error occurred while sending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    
    if (!otp) {
      showError('Please enter the OTP');
      return;
    }

    if (countdown === 0) {
      showError('OTP has expired. Please request a new one.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyOTP(email, otp, 'activation');

      if (result.success) {
        showSuccess('Account activated successfully! You can now log in! 🎉', 1500);
        // Redirect to login page after successful activation
        navigate('/login', {
          state: {
            email: email,
            message: 'Account activated! You can now log in.'
          }
        });
      } else {
        showError(result.error || 'Invalid OTP');
      }
    } catch (error) {
      showError('An error occurred while verifying OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const result = await sendOTP(email);

      if (result.success) {
        const expiration = Date.now() + 300000;
        setOtpExpiration(expiration);
        showSuccess('OTP resent successfully');
      } else {
        showError(result.error || 'Failed to resend OTP');
      }
    } catch (error) {
      showError('An error occurred while resending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CheckCircle className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Activate Your <span className="text-purple-600">Account</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please verify your email to activate your account
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          className="mt-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* OTP Input */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    maxLength="6"
                    autoComplete="off"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center font-mono tracking-widest text-lg"
                    placeholder="000000"
                  />
                </div>
              </div>

              {/* Countdown */}
              {countdown > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Expires in: {formatTime(countdown)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Send OTP Button */}
            {!otpExpiration && (
              <motion.button
                type="button"
                onClick={handleSendOTP}
                disabled={isLoading || !email}
                className="mt-8 w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>
            )}

            {/* Verify OTP Button */}
            {otpExpiration && (
              <motion.button
                type="submit"
                onClick={handleVerifyOTP}
                disabled={isLoading || countdown === 0 || !otp}
                className="mt-8 w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify & Activate</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>
            )}

            {/* Resend OTP Button */}
            {otpExpiration && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-sm text-purple-600 hover:text-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <RefreshCw className="h-4 w-4 inline mr-1" />
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        </motion.form>

        {/* Links */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-600">
            Already have an active account?{' '}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link
              to="/contact"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              Contact Support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountActivation;
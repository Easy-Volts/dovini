import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShoppingBag, Clock, RefreshCw } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState(1); // 1=email+password, 2=otp
  const [otpExpiration, setOtpExpiration] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [showActivationPrompt, setShowActivationPrompt] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login, sendOTP, verifyOTP, checkAccountStatus, validatePassword } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Countdown timer effect for OTP login
  React.useEffect(() => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (step === 1) {
        // First, check if account exists and is active without signing in
        const accountStatus = await checkAccountStatus(formData.email);

        if (!accountStatus.success) {
          showError('Unable to verify account. Please try again.');
          return;
        }

        if (!accountStatus.data.exists) {
          showError('No account found with this email address. Please sign up first.');
          return;
        }

        if (!accountStatus.data.is_active) {
          setShowActivationPrompt(true);
          showError('Account is not active. Please verify your email to activate your account.');
          return;
        }

        // Account is active, now validate password (but don't sign in yet)
        const validateResult = await validatePassword(formData.email, formData.password);

        if (!validateResult.success) {
          showError(validateResult.error || 'Invalid password');
          return;
        }

        // Password is valid, now send OTP for verification
        const otpResult = await sendOTP(formData.email);
        
        if (otpResult.success) {
          setStep(2);
          // Set expiration to exactly 5 minutes from now
          const expiration = Date.now() + 300000;
          setOtpExpiration(expiration);
          showSuccess(`OTP sent successfully to ${formData.email}`);
        } else {
          showError(otpResult.error || 'Failed to send OTP');
        }
      } else if (step === 2) {
        // Verify OTP for login
        if (countdown === 0) {
          showError('OTP has expired. Please request a new one.');
          setIsLoading(false);
          return;
        }

        const otpResult = await verifyOTP(formData.email, formData.otp, 'login');

        if (otpResult.success) {
          // Now actually sign in the user after successful OTP verification
          const loginResult = await login(formData.email, formData.password);

          if (loginResult.success) {
            showSuccess('Welcome back! 🎉', 1000);
            navigate(from, { replace: true });
          } else {
            showError('Failed to sign in after OTP verification');
          }
        } else {
          showError(otpResult.error || 'Invalid OTP');
        }
      }
    } catch {
      showError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const result = await sendOTP(formData.email);

      if (result.success) {
        const expiration = Date.now() + 300000;
        setOtpExpiration(expiration);
        showSuccess('OTP resent successfully');
      } else {
        // Check if the error is about inactive account
        if (result.error && result.error.includes('not active')) {
          setShowActivationPrompt(true);
          showError(result.error);
        } else {
          showError(result.error || 'Failed to resend OTP');
        }
      }
    } catch {
      showError('An error occurred while resending OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateAccount = () => {
    navigate('/account-activation', {
      state: {
        email: formData.email,
        message: 'Please verify your email to activate your account.'
      }
    });
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ email: '', password: '', otp: '' });
    setOtpExpiration(null);
    setCountdown(0);
    setShowActivationPrompt(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mx-auto h-16 w-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ShoppingBag className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome back to <span className="text-red-600">Dovini</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue shopping
          </p>
        </motion.div>

        {/* Form */}
        {!showActivationPrompt && (<motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
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
                    value={formData.email}
                    onChange={handleChange}
                    disabled={step === 2}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field - Only show in step 1 */}
              {step === 1 && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Field - Only show in step 2 */}
              {step === 2 && (
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
                      value={formData.otp}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-center font-mono tracking-widest text-lg"
                      placeholder="000000"
                    />
                  </div>
                </div>
              )}

              {/* OTP Countdown and Resend */}
              {step === 2 && countdown > 0 && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Expires in: {formatTime(countdown)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <span>{step === 1 ? 'Sign in' : 'Verify OTP'}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </motion.button>

            {/* Resend OTP Button */}
            {step === 2 && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-sm text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <RefreshCw className="h-4 w-4 inline mr-1" />
                  Resend OTP
                </button>
              </div>
            )}

            {/* Back to Step 1 */}
            {step === 2 && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  ← Back to login
                </button>
              </div>
            )}
          </div>
        </motion.form>)}

        {/* Account Activation Prompt */}
        {showActivationPrompt && (
          <motion.div
            className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Account Not Activated
            </h3>
            <p className="text-gray-600 mb-4">
              Your account exists but hasn't been verified yet. Please activate your account to continue.
            </p>
            <button
              onClick={handleActivateAccount}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Activate Account</span>
            </button>
            <button
              onClick={() => setShowActivationPrompt(false)}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Try different email
            </button>
          </motion.div>
        )}
        
        {/* Links */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
            >
              Sign up for free
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
            >
              Forgot your password?
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
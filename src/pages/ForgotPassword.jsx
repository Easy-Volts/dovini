import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, ArrowRight, ShoppingBag, Clock, RefreshCw } from 'lucide-react';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [otpExpiration, setOtpExpiration] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { sendOTP, verifyOTP } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

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
          // Convert milliseconds to seconds for countdown display
          const remainingSeconds = Math.floor(distance / 1000);
          setCountdown(remainingSeconds);
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

  // Debug function removed - countdown is now working correctly

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      showError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendOTP(formData.email);

      if (result.success) {
        // Use the correct approach - calculate expiration time as current time + 300 seconds
        const expiration = Date.now() + 300000; // 300 seconds = 5 minutes
        setOtpExpiration(expiration);
        
        setStep(2);
        showSuccess(`OTP sent successfully to ${formData.email}`);
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
    
    if (!formData.otp) {
      showError('Please enter the OTP');
      return;
    }

    if (countdown === 0) {
      showError('OTP has expired. Please request a new one.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyOTP(formData.email, formData.otp);

      if (result.success) {
        setStep(3);
        showSuccess('OTP verified successfully');
      } else {
        showError(result.error || 'Invalid OTP');
      }
    } catch (error) {
      showError('An error occurred while verifying OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Add password reset API call here
      showSuccess('Password reset successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      showError('An error occurred while resetting password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const result = await sendOTP(formData.email);

      if (result.success) {
        // Reset countdown to 5 minutes
        const expiration = Date.now() + 300000; // 300 seconds = 5 minutes
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
            <ShoppingBag className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Your <span className="text-red-600">Password</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Follow the steps to reset your account password
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <div className="mt-8 space-y-6">
            <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
              <div className="space-y-6">
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
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSendOTP}
                disabled={isLoading}
                className="mt-8 w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send OTP</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {step === 2 && (
          <div className="mt-8 space-y-6">
            <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code sent to <strong>{formData.email}</strong>
                </p>
              </div>

              <div className="space-y-6">
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
                      required
                      value={formData.otp}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-center text-lg font-mono tracking-widest"
                      placeholder="000000"
                    />
                  </div>
                </div>

                {countdown > 0 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Expires in: {formatTime(countdown)}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    onClick={handleVerifyOTP}
                    disabled={isLoading || countdown === 0}
                    className="flex-1 flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Verify OTP</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resend OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="mt-8 space-y-6">
            <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
              <div className="space-y-6">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleResetPassword}
                disabled={isLoading}
                className="mt-8 w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Reset Password</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-red-600 hover:text-red-500 transition-colors duration-200"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
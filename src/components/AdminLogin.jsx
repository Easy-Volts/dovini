import React, { useState } from 'react';

import {
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  Zap,
  Star,
  ArrowRight,
  Mail,
  Key,
  AlertCircle,
  Home
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useAdmin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
    const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) navigate('/app/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative flex flex-col py-8 sm:py-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Home className="sm:h-5 sm:w-5 w-4 h-4" />
          <span className="font-medium text-sm">Back to Home</span>
        </button>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Branding & Info */}
          <div className="text-center lg:text-left">
            {/* Logo Section */}
            <div className="inline-flex mt-6 sm:mt-0 items-center justify-center sm:w-24 sm:h-24 h-20 w-20 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl shadow-2xl mb-8">
              <Shield className="h-12 w-12 text-white" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 flex items-center justify-center sm:justify-start gap-2">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Admin
              </span>
              <br />
              <span className="text-white">Login</span>
            </h1>

            {/* Subtitle */}
            <p className="sm:text-xl text-gray-300 mb-8 max-w-lg">
              Secure access to Dovini Cameras & Gears ecommerce management platform.
              Control your business with confidence.
            </p>

            {/* Feature Icons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {[
                { icon: <Zap className="h-6 w-6" />, text: "Lightning Fast" },
                { icon: <Shield className="h-6 w-6" />, text: "Secure" },
                { icon: <Star className="h-6 w-6" />, text: "Powerful" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300">
                  <div className="text-amber-400">
                    {item.icon}
                  </div>
                  <span className="sm:text-sm text-xs font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            {/* Form Container */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl shadow-lg mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300">Sign in to your admin account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="admin@example.com"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-amber-500 bg-white/5 border border-white/10 rounded focus:ring-amber-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                    Forgot password?
                  </a>
                </div>
                 {error && <p style={{ color: 'red' }}>{error}</p>}

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-gray-400"
                  disabled={loading}
                >

                  {!loading ? (<span className="flex items-center justify-center space-x-2">
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-5 w-5" />
                  </span>) : (
                      <div className='flex items-center justify-center gap-1'>
                        <div className='w-6 h-6 border-white border-5 border-t-transparent rounded-full animate-spin'></div>
                        <p>Signing in...</p>
                      </div>
                  )}
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-200">
                      <span className="font-medium">Security Notice:</span> This is a secure admin area. 
                      All access attempts are logged and monitored.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Protected by enterprise-grade security
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-gray-400">Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-gray-400">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
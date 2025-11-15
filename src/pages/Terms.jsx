import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  FileText,
  Users,
  CreditCard,
  Truck,
  Globe,
  Lock,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Scale,
  Heart,
  ArrowLeft,
  Sparkles,
  Award,
  Zap,
  Home
} from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const termsSections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: Scale,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      content: [
        'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'Your continued use of our website following any changes indicates your acceptance of the new terms.'
      ]
    },
    {
      id: 'user-account',
      title: 'User Accounts',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      content: [
        'You must provide accurate and complete information when creating an account.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must notify us immediately of any unauthorized use of your account.',
        'We reserve the right to suspend or terminate accounts that violate our terms.'
      ]
    },
    {
      id: 'products',
      title: 'Products and Services',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      content: [
        'All product descriptions and specifications are accurate to the best of our knowledge.',
        'Prices are subject to change without notice, but we honor prices at time of purchase.',
        'We strive to maintain accurate inventory, but cannot guarantee product availability.',
        'Product images may vary slightly from actual items due to display variations.'
      ]
    },
    {
      id: 'ordering',
      title: 'Ordering and Payment',
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      content: [
        'All orders are subject to acceptance and availability.',
        'Payment must be received in full before orders are processed.',
        'We accept major credit cards and other payment methods as displayed.',
        'Prices include applicable taxes unless otherwise stated.'
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping and Delivery',
      icon: Truck,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      content: [
        'Shipping times are estimates and may vary based on location and product availability.',
        'Risk of loss passes to you upon delivery to the carrier.',
        'You are responsible for providing accurate shipping addresses.',
        'Additional fees may apply for expedited shipping or special handling.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      icon: Lock,
      color: 'from-teal-500 to-blue-500',
      bgColor: 'from-teal-50 to-blue-50',
      content: [
        'We collect and use your personal information as described in our Privacy Policy.',
        'We implement appropriate security measures to protect your data.',
        'We do not sell your personal information to third parties.',
        'You have the right to access, correct, or delete your personal data.'
      ]
    },
    {
      id: 'returns',
      title: 'Returns and Refunds',
      icon: CheckCircle,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      content: [
        'We offer a 30-day return policy for most items in original condition.',
        'Some products may have different return policies due to their nature.',
        'Return shipping costs are your responsibility unless the item is defective.',
        'Refunds are processed within 5-10 business days after we receive returned items.'
      ]
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      icon: BookOpen,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      content: [
        'All content on this website, including text, images, logos, and software, is our property.',
        'You may not reproduce, distribute, or create derivative works without permission.',
        'Trademarks and service marks remain our property and are protected by law.',
        'We respect the intellectual property rights of others and expect the same from users.'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      content: [
        'Our liability is limited to the purchase price of the product or service.',
        'We are not liable for indirect, incidental, or consequential damages.',
        'Some jurisdictions do not allow limitations of liability, so these may not apply to you.',
        'We provide services "as is" without warranties to the maximum extent permitted by law.'
      ]
    },
    {
      id: 'governing',
      title: 'Governing Law',
      icon: Globe,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'from-violet-50 to-purple-50',
      content: [
        'These terms are governed by the laws of the jurisdiction where our company is located.',
        'Any disputes will be resolved through binding arbitration or in applicable courts.',
        'If any provision of these terms is found unenforceable, the remainder will remain in effect.',
        'Failure to enforce any provision does not constitute a waiver of our rights.'
      ]
    }
  ];

  const quickFacts = [
    { icon: Users, label: 'User Safety', value: '100% Protected' },
    { icon: Shield, label: 'Data Security', value: 'Enterprise Grade' },
    { icon: Heart, label: 'Customer Care', value: '24/7 Support' },
    { icon: Zap, label: 'Response Time', value: '< 2 Hours' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-10"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back Button */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Animated Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl mb-8 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            Terms & Conditions
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Your rights and responsibilities when using our platform. 
            We've made it simple, transparent, and fair for everyone.
          </motion.p>

          {/* Last Updated */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-medium text-sm">
              Last updated: January 13, 2025
            </span>
          </motion.div>
        </motion.div>

        {/* Quick Facts Dashboard */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              className="bg-white rounded-2xl p-4 text-center shadow-lg border border-gray-100"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <fact.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-black text-gray-800">{fact.value}</div>
              <div className="text-sm text-gray-600">{fact.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {termsSections.map((section, index) => (
            <motion.div
              key={section.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <section.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                    <p className="text-white/80">Section {index + 1} of {termsSections.length}</p>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className={`bg-gradient-to-r ${section.bgColor} p-6`}>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                    >
                      <motion.div
                        className={`w-6 h-6 bg-gradient-to-r ${section.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          className="max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 text-white text-center shadow-2xl">
            <motion.div
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-8 h-8" />
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-4">Questions About Our Terms?</h3>
            <p className="text-purple-100 mb-6 text-lg">
              We're here to help! Contact our legal team for any clarifications or concerns.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-2xl p-4">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Legal Compliance</div>
                <div className="text-sm text-purple-100">Full regulatory adherence</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">User Protection</div>
                <div className="text-sm text-purple-100">Your rights are our priority</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4">
                <Globe className="w-8 h-8 mx-auto mb-2" />
                <div className="font-semibold">Global Standards</div>
                <div className="text-sm text-purple-100">International best practices</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/privacy-policies"
              className="bg-white border-2 border-purple-300 text-purple-700 px-6 py-3 rounded-2xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Lock className="w-5 h-5" />
              <span>Privacy Policy</span>
            </Link>
            <Link
              to="/"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
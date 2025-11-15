import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  FileText, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  ArrowLeft,
  Heart,
  CheckCircle
} from 'lucide-react';

const Privacy = () => {
  const privacySections = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Data Protection",
      description: "We implement industry-standard security measures to protect your personal information.",
      content: "Your personal data is encrypted and stored securely using advanced security protocols. We never share your information with third parties without your explicit consent."
    },
    {
      icon: <Eye className="h-6 w-6 text-green-600" />,
      title: "Information We Collect",
      description: "We collect only the information necessary to provide you with our services.",
      content: "This includes your name, email address, shipping addresses, payment information, and browsing preferences. We do not collect unnecessary personal data."
    },
    {
      icon: <Lock className="h-6 w-6 text-purple-600" />,
      title: "How We Use Your Data",
      description: "Your information is used solely to enhance your shopping experience.",
      content: "We use your data to process orders, provide customer support, send order updates, improve our services, and personalize your shopping experience."
    },
    {
      icon: <Database className="h-6 w-6 text-orange-600" />,
      title: "Data Storage",
      description: "Your data is stored securely and can be deleted upon request.",
      content: "All data is stored on secure servers with regular backups. You have the right to request data deletion at any time through your account settings."
    },
    {
      icon: <UserCheck className="h-6 w-6 text-red-600" />,
      title: "Your Rights",
      description: "You have complete control over your personal information.",
      content: "You can access, modify, or delete your personal data at any time. You can also opt out of marketing communications and data processing."
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      title: "Cookies Policy",
      description: "We use cookies to improve your browsing experience.",
      content: "Cookies help us remember your preferences and provide personalized content. You can control cookie settings through your browser preferences."
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-red-500" />,
      label: "Email",
      value: "info@dovinigears.ng"
    },
    {
      icon: <Phone className="h-5 w-5 text-red-500" />,
      label: "Phone",
      value: "080-6397-1335"
    },
    {
      icon: <MapPin className="h-5 w-5 text-red-500" />,
      label: "Address",
      value: "123 Commerce Street, Business District, NY 10001"
    }
  ];

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mx-auto h-20 w-20 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Shield className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-gray-900">Last Updated</h2>
          </div>
          <p className="text-gray-600">
            This privacy policy was last updated on <span className="font-semibold text-red-600">November 13, 2025</span>. 
            We may update this policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
          </p>
        </motion.div>

        {/* Privacy Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {privacySections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gray-50 p-2 rounded-xl">
                  {section.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{section.description}</p>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Data Processing Rights */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="text-center mb-6">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Data Rights</h2>
            <p className="text-gray-600">We believe you should have complete control over your personal information</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Right to access your data",
              "Right to correct your data",
              "Right to delete your data",
              "Right to data portability",
              "Right to restrict processing",
              "Right to object to processing"
            ].map((right, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{right}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center mb-6">
            <Mail className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
            <p className="text-gray-600">Have questions about our privacy policy? We're here to help.</p>
          </div>
          
          <div className="space-y-4">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                {contact.icon}
                <div>
                  <p className="text-sm font-medium text-gray-600">{contact.label}</p>
                  <p className="text-gray-900">{contact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Security */}
        <motion.div
          className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="text-center mb-6">
            <Lock className="h-8 w-8 text-amber-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Measures</h2>
            <p className="text-gray-600">Your data is protected with enterprise-level security</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "SSL Encryption", desc: "All data transmission is encrypted" },
              { title: "Secure Servers", desc: "Data stored on protected servers" },
              { title: "Regular Audits", desc: "Security systems regularly reviewed" }
            ].map((security, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{security.title}</h4>
                <p className="text-sm text-gray-600">{security.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
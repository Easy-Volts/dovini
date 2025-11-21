import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence,motion } from 'framer-motion';
import {
  Cookie,
  Shield,
  Settings,
  Check,
  X,
  Eye,
  BarChart3,
  Target,
  Clock
} from 'lucide-react';

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, 
    analytics: false,
    marketing: false,
    personalization: false
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowPopup(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
    localStorage.setItem("cookiesAccepted", "true");
    setShowPopup(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem("cookieConsent", JSON.stringify(onlyNecessary));
    localStorage.setItem("cookiesAccepted", "true");
    setShowPopup(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    localStorage.setItem("cookiesAccepted", "true");
    setShowPopup(false);
  };

  const handlePreferenceChange = (type) => {
    if (type === 'necessary') return; 
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const cookieTypes = [
    {
      key: 'necessary',
      title: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable basic features like page navigation, access to secure areas, and shopping cart functionality.',
      icon: <Shield className="h-5 w-5" />,
      required: true,
      examples: ['Shopping cart', 'Security', 'Authentication']
    },
    {
      key: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      icon: <BarChart3 className="h-5 w-5" />,
      required: false,
      examples: ['Google Analytics', 'Page visits', 'User behavior']
    },
    {
      key: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.',
      icon: <Target className="h-5 w-5" />,
      required: false,
      examples: ['Facebook Pixel', 'Google Ads', 'Remarketing']
    },
    {
      key: 'personalization',
      title: 'Personalization Cookies',
      description: 'Remember your preferences and choices to provide a personalized shopping experience.',
      icon: <Settings className="h-5 w-5" />,
      required: false,
      examples: ['Language preference', 'Currency', 'Wishlist']
    }
  ];

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {!showDetails ? (
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-3 rounded-2xl">
                    <Cookie className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Privacy Matters</h2>
                    <p className="text-gray-600">We use cookies to enhance your shopping experience</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar technologies to provide you with the best shopping experience,
                  analyze site traffic, and personalize content. Some cookies are essential for our website
                  to function properly, while others help us improve our services and show you relevant offers.
                </p>
                <p className="text-sm text-gray-600">
                  You can manage your preferences or learn more in our{' '}
                  <Link
                    to="/privacy-policies"
                    className="text-red-600 hover:text-red-700 underline font-medium"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setShowDetails(true)}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Customize</span>
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span>Reject All</span>
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl font-semibold"
                >
                  <Check className="h-5 w-5" />
                  <span>Accept All</span>
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                You can change your cookie preferences at any time in your account settings
              </p>
            </div>
          ) : (
            <div className="max-h-[90vh] overflow-y-auto">
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-3 rounded-2xl">
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
                      <p className="text-gray-600">Choose which cookies you want to allow</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6 mb-8">
                  {cookieTypes.map((cookie) => (
                    <div key={cookie.key} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-red-500">
                            {cookie.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                              <span>{cookie.title}</span>
                              {cookie.required && (
                                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                                  Required
                                </span>
                              )}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => handlePreferenceChange(cookie.key)}
                            disabled={cookie.required}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                              preferences[cookie.key]
                                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500'
                                : 'bg-gray-200'
                            } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                preferences[cookie.key] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{cookie.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cookie.examples.map((example, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Clock className="h-5 w-5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl font-semibold"
                  >
                    <Check className="h-5 w-5" />
                    <span>Save Preferences</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Want to learn more?</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Read our comprehensive Privacy Policy to understand how we collect, use, and protect your data.
                      </p>
                      <Link
                        to="/privacy-policies"
                        className="text-red-600 hover:text-red-700 underline text-sm font-medium"
                        target="_blank"
                      >
                        View Privacy Policy →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CookieConsent;
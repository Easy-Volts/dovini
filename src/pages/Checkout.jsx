import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  Gift,
  Star,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  Award,
  ShoppingCart,
  MessageCircle,
  Zap,
} from "lucide-react";

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { showSuccess } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });
  const [formErrors, setFormErrors] = useState({});

   useEffect(() => {
     window.scrollTo({top: 0, behavior: 'smooth'})
   }, [])
  
  const total = getTotal();
  const shipping = total > 50000 ? 0 : 2500;
  const tax = Math.round(total * 0.075);
  const finalTotal = total + shipping + tax;

  const steps = [
    { id: 1, title: "Shipping", icon: Truck },
    { id: 2, title: "Payment", icon: CreditCard },
    { id: 3, title: "Review", icon: CheckCircle },
  ];

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const validateStep = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      if (!formData.phone.trim()) errors.phone = "Phone is required";
      if (!formData.address.trim()) errors.address = "Address is required";
      if (!formData.city.trim()) errors.city = "City is required";
      if (!formData.state.trim()) errors.state = "State is required";
    }

    if (step === 2 && selectedPayment === "card") {
      if (!formData.cardNumber.trim())
        errors.cardNumber = "Card number is required";
      if (!formData.expiryDate.trim())
        errors.expiryDate = "Expiry date is required";
      if (!formData.cvv.trim()) errors.cvv = "CVV is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsProcessing(true);

    try {
      // Get authentication token
      const token = localStorage.getItem('dovini_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      // Format order data according to API specification
      const orderData = {
        user_id: user.id,
        sub_total: total,
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      // Make API call to create order
      const response = await fetch('https://api.dovinigears.ng/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Order created successfully
      setOrderPlaced(true);
      showSuccess("Order placed successfully! 🎉", 1000);
      clearCart();
      
    } catch (error) {
      console.error('Order creation error:', error);
      showSuccess("Failed to create order. Please try again.", 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  // Order Success Animation Component
  const OrderSuccess = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        <motion.div
          className="relative z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Order Confirmed! 🎉
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Your order has been placed successfully. You'll receive a
            confirmation email shortly.
          </motion.p>

          <motion.div
            className="flex space-x-3 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating sparkles animation */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-white">
      <AnimatePresence>{orderPlaced && <OrderSuccess />}</AnimatePresence>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header with Progress */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-2xl shadow-xl">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-black text-gray-800 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            Secure <span className="text-red-600">Checkout</span>
          </motion.h1>

          <motion.p
            className="text-md text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Complete your purchase with confidence. Your information is secure
            and encrypted.
          </motion.p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8 w-full max-w-4xl">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  className="flex items-center flex-1 sm:flex-initial"
                >
                  <motion.div
                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isCurrent
                        ? "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 border-red-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{
                      duration: 2,
                      repeat: isCurrent ? Infinity : 0,
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </motion.div>

                  <div className="ml-2 sm:ml-3 hidden xs:block sm:block">
                    <div
                      className={`text-xs sm:text-sm font-semibold text-center ${
                        isCompleted || isCurrent
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <motion.div
                      className={`flex-1 sm:w-8 md:w-16 h-0.5 mx-2 sm:mx-4 rounded ${
                        isCompleted ? "bg-green-500" : "bg-gray-300"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isCompleted ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2 space-y-8">
            {/* Step 1: Shipping Information */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        Shipping Information
                      </h2>
                      <p className="text-gray-600">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>

                  <form className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                          <User className="w-4 h-4" />
                          <span>Full Name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            formErrors.name
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                          }`}
                          placeholder="Enter your full name"
                        />
                        {formErrors.name && (
                          <motion.p
                            className="text-red-500 text-sm flex items-center space-x-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <span>⚠️</span>
                            <span>{formErrors.name}</span>
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                          <Mail className="w-4 h-4" />
                          <span>Email Address</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            formErrors.email
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                          }`}
                          placeholder="your@email.com"
                        />
                        {formErrors.email && (
                          <motion.p
                            className="text-red-500 text-sm flex items-center space-x-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <span>⚠️</span>
                            <span>{formErrors.email}</span>
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          formErrors.phone
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                        }`}
                        placeholder="+234 xxx xxx xxxx"
                      />
                      {formErrors.phone && (
                        <motion.p
                          className="text-red-500 text-sm flex items-center space-x-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <span>⚠️</span>
                          <span>{formErrors.phone}</span>
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                        <MapPin className="w-4 h-4" />
                        <span>Street Address</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          formErrors.address
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                        }`}
                        placeholder="123 Main Street, Apartment 4B"
                      />
                      {formErrors.address && (
                        <motion.p
                          className="text-red-500 text-sm flex items-center space-x-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <span>⚠️</span>
                          <span>{formErrors.address}</span>
                        </motion.p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            formErrors.city
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                          }`}
                          placeholder="Lagos"
                        />
                        {formErrors.city && (
                          <motion.p
                            className="text-red-500 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {formErrors.city}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                            formErrors.state
                              ? "border-red-300 focus:ring-red-200"
                              : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                          }`}
                          placeholder="Lagos State"
                        />
                        {formErrors.state && (
                          <motion.p
                            className="text-red-500 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {formErrors.state}
                          </motion.p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-all"
                          placeholder="100001"
                        />
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <CreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        Payment Method
                      </h2>
                      <p className="text-gray-600">
                        Choose how you'd like to pay
                      </p>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {[
                      {
                        id: "card",
                        name: "Credit Card",
                        icon: CreditCard,
                        description: "Visa, Mastercard, etc.",
                      },
                      {
                        id: "bank",
                        name: "Bank Transfer",
                        icon: Award,
                        description: "Direct bank payment",
                      },
                      {
                        id: "paypal",
                        name: "PayPal",
                        icon: Shield,
                        description: "Pay with PayPal",
                      },
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <motion.div
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedPayment === method.id
                              ? "border-red-500 bg-red-50 shadow-lg"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon
                              className={`w-6 h-6 ${
                                selectedPayment === method.id
                                  ? "text-red-600"
                                  : "text-gray-600"
                              }`}
                            />
                            <div>
                              <div
                                className={`font-semibold ${
                                  selectedPayment === method.id
                                    ? "text-red-600"
                                    : "text-gray-800"
                                }`}
                              >
                                {method.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {method.description}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Card Payment Form */}
                  {selectedPayment === "card" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border">
                        <div className="flex items-center space-x-2 mb-4">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold text-gray-800">
                            Card Information
                          </span>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                formErrors.cardNumber
                                  ? "border-red-300 focus:ring-red-200"
                                  : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                              }`}
                              placeholder="1234 5678 9012 3456"
                            />
                            {formErrors.cardNumber && (
                              <motion.p
                                className="text-red-500 text-sm"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                {formErrors.cardNumber}
                              </motion.p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                  formErrors.expiryDate
                                    ? "border-red-300 focus:ring-red-200"
                                    : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                                }`}
                                placeholder="MM/YY"
                              />
                              {formErrors.expiryDate && (
                                <motion.p
                                  className="text-red-500 text-sm"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  {formErrors.expiryDate}
                                </motion.p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                CVV
                              </label>
                              <input
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                  formErrors.cvv
                                    ? "border-red-300 focus:ring-red-200"
                                    : "border-gray-300 focus:ring-red-200 focus:border-red-400"
                                }`}
                                placeholder="123"
                              />
                              {formErrors.cvv && (
                                <motion.p
                                  className="text-red-500 text-sm"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  {formErrors.cvv}
                                </motion.p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="saveCard"
                              name="saveCard"
                              checked={formData.saveCard}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <label
                              htmlFor="saveCard"
                              className="text-sm text-gray-700"
                            >
                              Save card for future purchases
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Other Payment Methods */}
                  {selectedPayment !== "card" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {selectedPayment === "bank" ? (
                            <Award className="w-8 h-8 text-blue-600" />
                          ) : (
                            <Shield className="w-8 h-8 text-blue-600" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {selectedPayment === "bank"
                            ? "Bank Transfer"
                            : "PayPal Payment"}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {selectedPayment === "bank"
                            ? "You will be redirected to your bank to complete the payment securely."
                            : "You will be redirected to PayPal to complete your payment."}
                        </p>
                        <div className="bg-white p-4 rounded-lg border">
                          <p className="text-sm text-gray-600">
                            <strong>Note:</strong>{" "}
                            {selectedPayment === "bank"
                              ? "Bank transfers are processed instantly and may take 1-3 business days to reflect."
                              : "PayPal payments are processed immediately with full buyer protection."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        Review Your Order
                      </h2>
                      <p className="text-gray-600">
                        Please review all details before confirming
                      </p>
                    </div>
                  </div>

                  {/* Order Review */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Shipping Info */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center space-x-2">
                        <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <span className="text-sm sm:text-base">
                          Shipping Address
                        </span>
                      </h3>
                      <div className="text-gray-700 text-sm sm:text-base space-y-1">
                        <p className="font-medium">{formData.name}</p>
                        <p className="break-words">{formData.address}</p>
                        <p>
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p>{formData.phone}</p>
                        <p className="break-all">{formData.email}</p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        <span className="text-sm sm:text-base">
                          Payment Method
                        </span>
                      </h3>
                      <div className="flex items-center space-x-3">
                        {selectedPayment === "card" && (
                          <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        )}
                        {selectedPayment === "bank" && (
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        )}
                        {selectedPayment === "paypal" && (
                          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        )}
                        <span className="text-gray-700 capitalize text-sm sm:text-base">
                          {selectedPayment} Payment
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
                        Order Items
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white rounded-lg gap-3 sm:gap-0"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                                  {item.name}
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="font-bold text-red-600 text-sm sm:text-base">
                                ₦{(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
                whileHover={{ scale: currentStep > 1 ? 1.05 : 1 }}
                whileTap={{ scale: currentStep > 1 ? 0.95 : 1 }}
              >
                ← Previous
              </motion.button>

              {currentStep < 3 ? (
                <motion.button
                  onClick={handleNextStep}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next Step →
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="px-6 sm:px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Complete Order</span>
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div
            className="space-y-4 sm:space-y-6 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:sticky lg:top-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-red-100 p-3 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Order Summary
                </h2>
              </div>

              {/* Order Items */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600 text-xs sm:text-sm">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t border-gray-200 pt-4 sm:pt-6 space-y-2 sm:space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span className="text-xs sm:text-sm">Subtotal</span>
                  <span className="text-xs sm:text-sm font-medium">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="text-xs sm:text-sm">Shipping</span>
                  <span className="text-xs sm:text-sm font-medium">
                    {shipping === 0 ? "FREE" : `₦${shipping.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="text-xs sm:text-sm">Tax</span>
                  <span className="text-xs sm:text-sm font-medium">
                    ₦{tax.toLocaleString()}
                  </span>
                </div>

                <motion.div
                  className="border-t border-gray-300 pt-3 sm:pt-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                    <span className="text-base sm:text-lg font-black text-gray-800">
                      Total
                    </span>
                    <motion.span
                      className="text-xl sm:text-2xl font-black text-red-600"
                      key={finalTotal}
                      initial={{ scale: 1.2, color: "#10B981" }}
                      animate={{ scale: 1, color: "#DC2626" }}
                      transition={{ duration: 0.3 }}
                    >
                      ₦{finalTotal.toLocaleString()}
                    </motion.span>
                  </div>
                  <div className="text-xs text-gray-600 mt-2 flex items-center space-x-1">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span>Estimated delivery: 2-3 business days</span>
                  </div>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    <span>Trusted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2">
                  <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs font-semibold">
                    Visa
                  </div>
                  <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs font-semibold">
                    Mastercard
                  </div>
                  <div className="bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs font-semibold">
                    PayPal
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Help Section */}
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-4 sm:p-6 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                  Need Help?
                </h3>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <span>Call: 08063971335</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                  <span className="break-all">Email: support@dovini.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

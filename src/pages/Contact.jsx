import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  Headphones,
  Star,
  CheckCircle,
  Globe,
  Award,
  Users,
  Camera,
  Heart,
  Shield,
  Zap
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      })
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    }, 1500)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      subtitle: 'Speak with our experts',
      value: '080-6397-1335',
      action: 'tel:08063971335',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Mail,
      title: 'Email Us',
      subtitle: 'Get written support',
      value: 'support@dovinigears.ng',
      action: 'mailto:support@dovinigears.ng',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      subtitle: 'Instant assistance',
      value: 'Available 24/7',
      action: '#',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50'
    }
  ]

  const faqs = [
    {
      question: 'What are your business hours?',
      answer: 'We\'re available 24/7 for online support, and our phone support runs from 8 AM to 8 PM (WAT) Monday through Saturday.'
    },
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond to emails within 2-4 hours during business hours. Live chat responses are immediate during operating hours.'
    },
    {
      question: 'Do you offer technical support?',
      answer: 'Yes! Our certified photography experts provide comprehensive technical support for all products we sell.'
    },
    {
      question: 'Can I visit your physical store?',
      answer: 'Yes, visit us at our Lagos showroom. Contact us first to schedule a consultation with our equipment specialists.'
    }
  ]

  const stats = [
    { number: '< 2hrs', label: 'Average Response Time', icon: Clock },
    { number: '24/7', label: 'Online Support', icon: Headphones },
    { number: '98%', label: 'Customer Satisfaction', icon: Star },
    { number: '10K+', label: 'Happy Customers', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-16 sm:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="font-semibold text-sm">Get In Touch</span>
              <Heart className="w-4 h-4" />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're Here to
              <br />
              <span className="text-red-200">Help You Succeed</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-red-100 mb-6 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions about our products or need expert advice? Our team of certified photography 
              professionals is ready to help you find the perfect equipment for your creative vision.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Award className="w-3 h-3 text-yellow-300" />
                <span className="text-xs font-medium">Expert Support</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Globe className="w-3 h-3 text-blue-300" />
                <span className="text-xs font-medium">Global Reach</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Shield className="w-3 h-3 text-green-300" />
                <span className="text-xs font-medium">Secure & Private</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl shadow-xl">
                <Phone className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Multiple Ways to <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Reach Us</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                className="group block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <div className={`bg-gradient-to-br ${method.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 h-full`}>
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${method.color} text-white shadow-lg mb-4`}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <method.icon className="w-6 h-6" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {method.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3">
                    {method.subtitle}
                  </p>

                  <p className="text-sm font-semibold text-gray-900 break-all">
                    {method.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-red-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                <motion.div
                  className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-semibold text-sm mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  <Send className="w-3 h-3" />
                  <span>Send us a message</span>
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                  Get <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Personalized</span> Help
                </h2>

                <p className="text-gray-600 mb-6">
                  Tell us about your needs and our experts will get back to you with tailored recommendations.
                </p>

                {submitStatus === 'success' && (
                  <motion.div
                    className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center space-x-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! We'll get back to you soon.</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="warranty">Warranty Claim</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-red-600 hover:to-red-700 hover:shadow-lg'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Location Info */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Visit Our Showroom</h3>
                </div>
                <p className="text-gray-600 mb-3">
                  Experience our products hands-on at our Lagos showroom. Schedule a consultation 
                  with our equipment specialists.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900">Dovini Photography Equipment</p>
                  <p className="text-gray-600 text-sm">Victoria Island, Lagos, Nigeria</p>
                  <p className="text-gray-600 text-sm">Monday - Saturday: 9 AM - 6 PM</p>
                </div>
              </div>

              {/* Response Time Stats */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Our Support?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="inline-flex p-2 rounded-lg bg-red-50 mb-2">
                        <stat.icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="text-lg font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-3">Need Immediate Help?</h3>
                <p className="text-red-100 mb-4">
                  For urgent matters or quick questions, reach out through these channels:
                </p>
                <div className="space-y-2">
                  <a
                    href="tel:08063971335"
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold">Call Now: 080-6397-1335</span>
                  </a>
                  <a
                    href="mailto:support@dovinigears.ng"
                    className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="font-semibold">Email Support</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-3 rounded-xl shadow-xl">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Frequently Asked <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">Questions</span>
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-red-50/30 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                  <Zap className="w-5 h-5 text-red-600 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Ready to Get Started?
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-red-100 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Whether you're a professional photographer or just starting your creative journey, 
              we're here to help you find the perfect equipment.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => navigate('/products')}
                className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-4 h-4" />
                <span>Browse Products</span>
              </motion.button>

              <motion.a
                href="tel:08063971335"
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
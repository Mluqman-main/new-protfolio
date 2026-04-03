import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  // Contact Info Data
  const contactInfo = [
    {
      icon: "fa-envelope",
      label: "Email",
      value: "princekhan27012007@gmail.com",
      link: "princekhan27012007@gmail.com",
      color: "from-purple-500 to-blue-500",
      hoverColor: "group-hover:shadow-purple-500/25"
    },
    {
      icon: "fa-phone-alt",
      label: "Phone",
      value: "+92 (03) 1918-444-03",
      link: "tel:+923191844403",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "group-hover:shadow-blue-500/25"
    },
    {
      icon: "fa-map-marker-alt",
      label: "Location",
      value: "San Francisco, CA",
      link: "https://maps.app.goo.gl/yKa2g1ssEtc1CZcCA",
      color: "from-cyan-500 to-green-500",
      hoverColor: "group-hover:shadow-cyan-500/25"
    },
    {
      icon: "fa-clock",
      label: "Working Hours",
      value: "Mon-Fri 9AM-6PM PST",
      link: "https://maps.app.goo.gl/yKa2g1ssEtc1CZcCA",
      color: "from-green-500 to-yellow-500",
      hoverColor: "group-hover:shadow-green-500/25"
    }
  ];

  const socialLinks = [
    { icon: "fab fa-github", label: "GitHub", url: "https://github.com", color: "hover:text-white hover:bg-gray-800" },
    { icon: "fab fa-linkedin-in", label: "LinkedIn", url: "https://linkedin.com", color: "hover:text-white hover:bg-blue-600" },
    { icon: "fab fa-twitter", label: "Twitter", url: "https://twitter.com", color: "hover:text-white hover:bg-sky-500" },
    { icon: "fab fa-instagram", label: "Instagram", url: "https://instagram.com", color: "hover:text-white hover:bg-pink-600" },
    { icon: "fab fa-dribbble", label: "Dribbble", url: "https://dribbble.com", color: "hover:text-white hover:bg-pink-500" },
    { icon: "fab fa-behance", label: "Behance", url: "https://behance.net", color: "hover:text-white hover:bg-blue-500" }
  ];

  const faqs = [
    {
      question: "What is your typical response time?",
      answer: "I typically respond within 24 hours during business days. For urgent matters, please mention it in your message subject."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! I offer a free 30-minute consultation call to discuss your project requirements and see if we're a good fit."
    },
    {
      question: "What's your project minimum?",
      answer: "Project minimums vary based on scope and complexity. Let's discuss your needs and find the best approach together."
    }
  ];

  // Animated Input Component
  const AnimatedInput = ({ type, name, placeholder, value, onChange, error, icon }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
      setIsFilled(value.length > 0);
    }, [value]);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
        {/* Floating Label Container */}
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
          {/* Icon */}
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300 ${isFocused ? 'text-purple-400' : 'text-gray-500'}`}>
            <i className={`fas ${icon}`}></i>
          </div>
          {/* Input */}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full pl-12 pr-4 py-4 bg-gray-900/50 backdrop-blur-xl border-2 rounded-xl text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
              error
                ? 'border-red-500 focus:border-red-500'
                : isFocused
                  ? 'border-purple-500 focus:border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'border-white/10 hover:border-white/20'
            }`}
            id={name}
          />
          {/* Label */}
          <label
            htmlFor={name}
            className={`absolute left-12 transition-all duration-300 pointer-events-none ${
              isFocused || isFilled
                ? '-top-3 text-xs bg-gray-900 px-2 text-purple-400'
                : 'top-1/2 -translate-y-1/2 text-gray-500'
            }`}
          >
            {placeholder}
          </label>
          {/* Focus Glow Effect */}
          {isFocused && (
            <motion.div
              layoutId="focusGlow"
              className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500/20 to-blue-500/20 blur-xl -z-10"
            />
          )}
        </div>
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-red-400 text-sm flex items-center gap-2"
            >
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Textarea Component
  const AnimatedTextarea = ({ name, placeholder, value, onChange, error, icon }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const maxLength = 1000;

    useEffect(() => {
      setCharCount(value.length);
    }, [value]);

    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative group">
        {/* Icon */}
        <div className={`absolute left-4 top-4 z-10 transition-colors duration-300 ${isFocused ? 'text-purple-400' : 'text-gray-500'}`}>
          <i className={`fas ${icon}`}></i>
        </div>
        {/* Textarea */}
        <textarea
          name={name}
          value={value}
          onChange={(e) => {
            onChange(e);
            setCharCount(e.target.value.length);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows="5"
          maxLength={maxLength}
          className={`w-full pl-12 pr-16 py-4 bg-gray-900/50 backdrop-blur-xl border-2 rounded-xl text-white placeholder-transparent focus:outline-none resize-none transition-all duration-300 ${
            error
              ? 'border-red-500 focus:border-red-500'
              : isFocused
                ? 'border-purple-500 focus:border-purple-500 shadow-lg shadow-purple-500/20'
                : 'border-white/10 hover:border-white/20'
          }`}
          id={name}
        />
        {/* Label */}
        <label
          htmlFor={name}
          className={`absolute left-12 transition-all duration-300 pointer-events-none ${
            isFocused || value.length > 0
              ? '-top-3 text-xs bg-gray-900 px-2 text-purple-400'
              : 'top-4 text-gray-500'
          }`}
        >
          {placeholder}
        </label>
        {/* Character Count */}
        <div className={`absolute right-4 bottom-3 text-xs font-mono transition-colors ${
          charCount > maxLength * 0.9 ? 'text-red-400' : 'text-gray-500'
        }`}>
          {charCount}/{maxLength}
        </div>
        {/* Focus Glow */}
        {isFocused && (
          <motion.div
            layoutId="textareaGlow"
            className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500/20 to-blue-500/20 blur-xl -z-10"
          />
        )}
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-red-400 text-sm flex items-center gap-2"
            >
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Contact Info Card Component
  const ContactInfoCard = ({ info, index }) => (
    <motion.a
      href={info.link}
      target={info.link.startsWith('http') ? '_blank' : undefined}
      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group relative p-6 bg-linear-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden ${info.hoverColor} hover:shadow-xl`}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-linear-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      <div className="relative flex items-start gap-4">
        <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-linear-to-br ${info.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
          <i className={`fas ${info.icon}`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{info.label}</p>
          <p className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">{info.value}</p>
        </div>
        <i className="fas fa-arrow-right text-gray-600 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 mt-1"></i>
      </div>
    </motion.a>
  );

  // Social Link Component
  const SocialLink = ({ social, index }) => (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-14 h-14 flex items-center justify-center rounded-xl bg-gray-900/80 backdrop-blur border border-white/10 text-gray-400 transition-all duration-300 ${social.color}`}
      aria-label={social.label}
    >
      <i className={`${social.icon} text-xl`}></i>
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
        {social.label}
      </span>
    </motion.a>
  );

  // FAQ Item Component
  const FAQItem = ({ faq, index, isOpen, toggle }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center justify-between p-6 bg-linear-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-left group">
        <span className="font-semibold text-white group-hover:text-purple-300 transition-colors pr-4">{faq.question}</span>
        <motion.i animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="fas fa-chevron-down text-purple-400 shrink-0"></motion.i>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Main Contact State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [openFAQ, setOpenFAQ] = useState(null);

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';

    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen px-4 sm:px-6 py-24 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <motion.span initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded-full">
            Get In Touch
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's work together to bring your ideas to life. Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          {/* Left - Contact Info */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-2 space-y-6">
            {/* Availability Status */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="p-6 bg-linear-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <span className="font-semibold text-green-400">Currently Available</span>
              </div>
              <p className="text-gray-400 text-sm">
                I'm currently accepting new projects and freelance work. Average response time: under 24 hours.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <ContactInfoCard key={info.label} info={info} index={i} />
              ))}
            </div>

            {/* Social Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {socialLinks.map((social, i) => (
                  <SocialLink key={social.label} social={social} index={i} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-3">
            <div className="relative p-8 bg-linear-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              {/* Form */}
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Send Me a Message</h3>
                  <p className="text-gray-400 text-sm">Fill out the form below and I'll get back to you shortly</p>
                </div>
                {/* Name & Subject */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <AnimatedInput type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} error={errors.name} icon="fa-user" />
                  <AnimatedInput type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} error={errors.subject} icon="fa-tag" />
                </div>
                {/* Email */}
                <AnimatedInput type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} error={errors.email} icon="fa-envelope" />
                {/* Message */}
                <AnimatedTextarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} error={errors.message} icon="fa-comment-alt" />
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500 hover:shadow-2xl hover:shadow-purple-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </motion.button>
                {/* Success/Error messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }} className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 flex items-center gap-3">
                      <i className="fas fa-check-circle text-xl"></i>
                      <div>
                        <p className="font-semibold">Message Sent Successfully!</p>
                        <p className="text-sm text-green-400">Thank you for reaching out. I'll get back to you soon.</p>
                      </div>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }} className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 flex items-center gap-3">
                      <i className="fas fa-exclamation-circle text-xl"></i>
                      <div>
                        <p className="font-semibold">Something Went Wrong</p>
                        <p className="text-sm text-red-400">Please try again later or contact me directly via email.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Privacy note */}
                <p className="text-xs text-gray-600 text-center pt-4">
                  <i className="fas fa-lock mr-1"></i>
                  Your information is secure and will never be shared with third parties.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
            <i className="fas fa-question-circle text-purple-400"></i>
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openFAQ === i}
                toggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-linear-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl border border-white/10">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Your Project?</h3>
              <p className="text-gray-400">Let's discuss how we can work together to achieve your goals</p>
            </div>
            <motion.a href="mailto:hello@johndeveloper.com" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all whitespace-nowrap">
              <i className="fas fa-calendar-check"></i>
              Schedule a Call
            </motion.a>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2 flex-wrap">
            <i className="fas fa-heart text-red-500 animate-pulse"></i>
            Built with passion and dedication
            <span className="mx-2">•</span>
            Available for freelance work & collaborations worldwide
            <span className="mx-2">•</span>
            © 2024 All Rights Reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Example usage:
// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.render(<Contact />, document.getElementById('root'));

export default Contact;
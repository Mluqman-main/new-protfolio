import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, 
  FaDribbble, FaBehance, FaArrowUp, FaHeart,
  FaEnvelope, FaMapMarkerAlt,
  FaRocket, FaCode, FaPalette, FaLightbulb 
} from "react-icons/fa";

// ============ FOOTER DATA ============
const FOOTER_LINKS = {
  navigation: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ],
  services: [
    { label: "Web Development", icon: FaCode },
    { label: "UI/UX Design", icon: FaPalette },
    { label: "React Apps", icon: FaRocket },
    { label: "Consulting", icon: FaLightbulb  },
  ],
  socials: [
    { icon: FaGithub, href: "https://github.com", label: "GitHub", color: "#333" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0077b5" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "#1da1f2" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "#e4405f" },
    { icon: FaDribbble, href: "https://dribbble.com", label: "Dribbble", color: "#ea4c89" },
    { icon: FaBehance, href: "https://behance.net", label: "Behance", color: "#1769ff" },
  ]
};

// ============ ANIMATED BACKGROUND ============
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <motion.div
      animate={{ 
        y: [0, -30, 0], 
        x: [0, 20, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] left-0 bottom-0"
    />
    <motion.div
      animate={{ 
        y: [0, 40, 0], 
        x: [0, -20, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] right-0 top-0"
    />
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        rotate: [0, 180, 360]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      className="absolute w-64 h-64 bg-pink-500/10 rounded-full blur-[100px] left-1/2 top-1/2"
    />
    
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
    
    <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-gray-950 to-transparent" />
  </div>
);

// ============ SOCIAL ICON COMPONENT (FIXED) ============
const SocialIcon = ({ icon, href, label, color, index }) => {
  // ✅ Explicit assignment - ESLint can now track usage
  const IconComponent = icon;
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -5, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white backdrop-blur-sm transition-all duration-300 overflow-hidden"
      style={{ "--hover-color": color }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: `${color}20` }}
      />
      
      {/* ✅ Used explicitly */}
      <IconComponent size={18} className="relative z-10" />
      
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.a>
  );
};

// ============ LINK ITEM COMPONENT ============
const LinkItem = ({ label, path, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href={path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 py-1"
    >
      <motion.span
        animate={{ width: isHovered ? 16 : 0 }}
        className="block h-px bg-purple-400"
        transition={{ duration: 0.2 }}
      />
      <span className="text-sm">{label}</span>
    </motion.a>
  );
};

// ============ SERVICE ITEM COMPONENT (FIXED) ============
const ServiceItem = ({ label, icon }) => {
  // ✅ Explicit assignment - ESLint can now track usage
  const ServiceIconComponent = icon;
  
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group cursor-default py-2"
    >
      {/* ✅ Used explicitly */}
      <ServiceIconComponent className="text-purple-400 group-hover:scale-110 transition-transform" size={14} />
      <span className="text-sm">{label}</span>
    </motion.div>
  );
};

// ============ NEWSLETTER COMPONENT ============
const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-4">
      <h4 className="text-white font-semibold flex items-center gap-2">
        <FaEnvelope className="text-purple-400" /> Stay Updated
      </h4>
      <p className="text-sm text-gray-500">Get notified about new projects and articles</p>
      
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <motion.input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="your@email.com"
          className={`w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border ${
            isFocused ? 'border-purple-400/50' : 'border-white/10'
          } text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all`}
        />
        
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
        >
          <FaRocket size={14} />
        </motion.button>
      </form>
      
      <p className="text-xs text-gray-600">🔒 No spam, unsubscribe anytime</p>
    </div>
  );
};

// ============ BACK TO TOP BUTTON ============
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsVisible(window.scrollY > 500);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ y: -5, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ============ MAIN FOOTER COMPONENT ============
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative mt-40 pt-20 pb-8 overflow-hidden border-t border-white/5 bg-gray-950/50">
        <AnimatedBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ===== CTA SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              whileHover={{ scale: 1.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            >
              Let's Build Something{" "}
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Amazing
              </span>{" "}
              🚀
            </motion.h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Available for freelance projects & collaboration opportunities.
              Let's turn your ideas into reality!
            </p>

            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a
                href="/contact"
                className="group relative px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold overflow-hidden shadow-lg shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project <FaRocket className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </motion.div>
          </motion.div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & About */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <Link to="/" className="inline-flex items-center gap-2 group">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white"
                >
                  D
                </motion.div>
                <span className="text-xl font-bold">
                  <span className="text-white">DEV</span>
                  <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">.PORT</span>
                </span>
              </Link>

              <p className="text-sm text-gray-500 leading-relaxed">
                Crafting digital experiences that blend beautiful design with powerful functionality. 
                Based in the universe 🌌
              </p>

              <div className="space-y-3 pt-2">
                <a href="mailto:hello@devport.com" className="flex items-center gap-3 text-sm text-gray-500 hover:text-purple-400 transition-colors">
                  <FaEnvelope size={14} className="text-purple-400/60" />
                  hello@devport.com
                </a>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <FaMapMarkerAlt size={14} className="text-purple-400/60" />
                  Remote / Worldwide
                </div>
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-white font-semibold text-lg">Quick Links</h4>
              <div className="space-y-3">
                {FOOTER_LINKS.navigation.map((link, idx) => (
                  <LinkItem key={link.path} {...link} delay={idx * 0.1} />
                ))}
              </div>
            </motion.div>

            {/* Column 3: Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h4 className="text-white font-semibold text-lg">Services</h4>
              <div className="space-y-2">
                {FOOTER_LINKS.services.map((service) => (
                  <ServiceItem key={service.label} {...service} />
                ))}
              </div>
            </motion.div>

            {/* Column 4: Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <NewsletterSignup />
            </motion.div>

          </div>

          {/* ===== SOCIAL LINKS BAR ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-8 border-t border-b border-white/5 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-sm text-gray-500">
                Connect with me on social media
              </p>
              
              <div className="flex gap-3">
                {FOOTER_LINKS.socials.map((social, idx) => (
                  <SocialIcon key={social.label} {...social} index={idx} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== BOTTOM BAR ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600"
          >
            <p className="flex items-center gap-1">
              © {currentYear} DEV.PORT. Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500 inline-block"
              >
                <FaHeart size={12} />
              </motion.span>{" "}
              by Checking
            </p>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-700">|</span>
              <span>Advanced Developer Experience</span>
              <span className="text-gray-700">|</span>
              <span>Built with React ⚛️</span>
            </div>
          </motion.div>

        </div>
      </footer>

      <BackToTop />
    </>
  );
};

export default Footer;
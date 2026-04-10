import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars, FaTimes, FaArrowRight,
  FaGithub, FaLinkedin, FaTwitter
} from "react-icons/fa";

// ============ NAVIGATION LINKS DATA ============
const NAV_LINKS = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/about", label: "About", icon: "👤" },
  { path: "/projects", label: "Projects", icon: "💼" },
  { path: "/contact", label: "Contact", icon: "✉️" },
];

// ============ ANIMATED LOGO COMPONENT ============
const Logo = () => (
  <Link to="/" className="group relative flex items-center gap-2">
    <motion.div
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/30"
    >
      D
    </motion.div>
    <span className="text-xl font-bold tracking-wider">
      <span className="text-white">DEV</span>
      <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">.ML</span>
    </span>

    {/* Hover Glow Effect */}
    <motion.div
      className="absolute -inset-2 bg-linear-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
    />
  </Link>
);

// ============ MOBILE MENU BUTTON ============
const MenuButton = ({ isOpen, onClick }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all z-50 md:hidden"
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaTimes size={20} />
        </motion.div>
      ) : (
        <motion.div
          key="menu"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaBars size={20} />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// ============ NAV LINK COMPONENT (FIXED) ============
const NavLink = ({ to, children, isActive, onClick }) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      className={`relative px-4 py-2 text-sm font-medium transition-colors  duration-300 ${isActive
        ? "text-purple-400"
        : "text-gray-300 hover:text-white"
        }`}
    >
      {children}

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-linear-to-r from-purple-400 to-blue-400 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Hover Underline */}
      <div className="absolute bottom-0 left-2 right-2 h-0.5   origin-left scale-x-0 hover:scale-x-100 transition-transform duration-300" />
    </motion.div>
  </Link>
);

// ============ MOBILE MENU OVERLAY ============
const MobileMenu = ({ isOpen, links, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />

        {/* Menu Panel */}
        <motion.nav
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className=" sticky top-0 right-0 h-full w-70 bg-gray-900/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col p-8 md:hidden"
        >
          {/* Close Button Area */}
          <div className="flex justify-end mb-12">
            <MenuButton isOpen={isOpen} onClick={onClose} />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={link.path}
                  onClick={onClose}
                  className="group flex items-center gap-4 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-lg font-medium">{link.label}</span>
                  <FaArrowRight className="ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-purple-400" size={14} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-auto"
          >
            <Link
              to="/contact"
              onClick={onClose}
              className="block w-40 h-auto py-3 text-center bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
            >
              Hire Me ✨
            </Link>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-white/10">
              {[FaGithub, FaLinkedin, FaTwitter].map((SocialIcon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="p-2 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <SocialIcon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.nav>
      </>
    )}
  </AnimatePresence>
);

// ============ MAIN NAVBAR COMPONENT ============
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentLocation = useLocation();

  // Scroll Detection Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className=" fixed z-50">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  isActive={currentLocation.pathname === link.path}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">

              {/* Desktop CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  to="/contact"
                  className="group relative px-6 py-2.5 overflow-hidden rounded-xl font-medium text-sm text-white bg-linear-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Hire Me
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" size={12} />
                  </span>

                  {/* Shimmer Effect */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                  />
                </Link>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <MenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />

            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        links={NAV_LINKS}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default Navbar;
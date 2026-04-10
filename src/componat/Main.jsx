import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  FaGithub, FaLinkedin, FaTwitter, FaInstagram,
  FaArrowDown, FaCode, FaRocket,
  FaEnvelope, FaGraduationCap, FaBriefcase, FaClock
} from "react-icons/fa";
import Profile from '../assets/profile.png';


// ============ ANIMATED BACKGROUND COMPONENT ============
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950">
    <motion.div
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -50, 100, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-40 -left-40 w-125 h-125 bg-purple-600/30 rounded-full blur-[120px]"
    />
    <motion.div
      animate={{
        x: [0, -80, 60, 0],
        y: [0, 80, -60, 0],
        scale: [1, 1.1, 1.3, 1],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-40 -right-40 w-150 h-150 bg-blue-600/25 rounded-full blur-[130px]"
    />
    <motion.div
      animate={{
        x: [0, 50, -30, 0],
        y: [0, 30, -50, 0],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-pink-500/20 rounded-full blur-[100px]"
    />

    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-size[64px_64px]" />
  </div>
);

// ============ SKILL BADGE COMPONENT ============
const SkillBadge = ({ children, delay = 0 }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    whileHover={{
      scale: 1.1,
      backgroundColor: "rgba(168, 85, 247, 0.2)",
      borderColor: "rgba(168, 85, 247, 0.5)"
    }}
    className="px-4 py-2 border border-white/10 rounded-full bg-white/5 text-sm font-medium text-gray-300 backdrop-blur-sm cursor-default transition-colors"
  >
    {children}
  </motion.span>
);

// ============ SOCIAL LINK COMPONENT ============
const SocialLink = ({ href, iconComponent, label, delay }) => {
  const IconComponent = iconComponent;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.2, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-purple-400 hover:border-purple-400/50 hover:bg-purple-400/10 backdrop-blur-sm transition-all duration-300"
    >
      <IconComponent size={20} />
    </motion.a>
  );
};

// ============ STATUS INDICATOR COMPONENT ============
const StatusIndicator = ({ iconComponent, text, color = "green", delay = 0 }) => {
  const IconComponent = iconComponent;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2 text-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 bg-${color}-500`} />
      </span>
      <IconComponent className={`text-${color}-400 text-xs`} />
      <span className="text-gray-400">{text}</span>
    </motion.div>
  );
};

// ============ MAIN COMPONENT ============
const Main = () => {
  const containerRef = useRef(null);





  // Profile Data
  const profile = {
    name: "Muhammad Luqman",
    title: "MERN Stack Developer & UI/UX Designer",
    image: Profile,
    bio: "I craft modern digital experiences that blend beautiful design with powerful functionality. Specializing in React ecosystems with a passion for smooth animations and performant code.",
    status: [
      { iconComponent: FaGraduationCap, text: "CS Student @ University", color: "blue" },
      { iconComponent: FaBriefcase, text: "Open to Freelance Projects", color: "purple" },
      { iconComponent: FaClock, text: "Available 5+ hrs/day", color: "green" }
    ],
    skills: [
      "React.js", "Next.js", "TypeScript", "Tailwind CSS",
      "Node.js", "Framer Motion", "UI/UX Design",
      "Git",
    ],
    socials: [
      { href: "https://github.com", iconComponent: FaGithub, label: "GitHub" },
      { href: "https://linkedin.com", iconComponent: FaLinkedin, label: "LinkedIn" },
      { href: "https://twitter.com", iconComponent: FaTwitter, label: "Twitter" },
      { href: "https://instagram.com", iconComponent: FaInstagram, label: "Instagram" },
    ]
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  return (
    <div ref={containerRef} className="statice min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content Grid */}
      <motion.div

        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl w-full relative z-10"
      >

        {/* ===== LEFT COLUMN: CONTENT ===== */}
        <div className="space-y-8 order-2 lg:order-1">

          {/* Greeting Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-sm font-medium">Available for work</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          >
            <span className="text-white">Hi, I'm </span>
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              M luqman
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-gray-400 font-light"
          >
            {profile.title}
          </motion.p>

          {/* Bio Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl"
          >
            {profile.bio}
          </motion.p>

          {/* Status Indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            {profile.status.map((statusItem, idx) => (
              <StatusIndicator key={idx} {...statusItem} delay={idx * 0.1} />
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className="pt-4">
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-4 font-semibold">Tech Stack</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {profile.skills.map((skill) => (
                <SkillBadge key={skill}>{skill}</SkillBadge>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaEnvelope /> Get In Touch
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300"
            >
              View Projects <FaArrowDown className="inline ml-2" />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 pt-6 border-t border-white/5"
          >
            {profile.socials.map((social, idx) => (
              <SocialLink key={social.label} {...social} delay={0.8 + idx * 0.1} />
            ))}
          </motion.div>

        </div>

        {/* ===== RIGHT COLUMN: PROFILE IMAGE ===== */}
        <motion.div
          variants={itemVariants}
          className="relative flex justify-center items-center order-1 lg:order-2"
        >

          {/* Decorative Rings */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-purple-500/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
          <div className="absolute w-80 h-80 sm:w-125 sm:h-125 rounded-full border border-blue-500/20 animate-spin-slow reverse" style={{ animationDuration: '25s' }} />

          {/* Glow Effect Behind Image */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-linear-to-br from-purple-500/40 to-blue-500/40 rounded-full blur-3xl"
          />

          {/* Profile Image Container */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-1 bg-linear-to-br from-purple-500 via-pink-500 to-blue-500"
          >
            {/* Inner Border Glow */}
            <div className="w-full h-full rounded-full bg-gray-950 p-1">
              <img
                src={profile.image}
                alt={`${profile.name}'s profile photo`}
                loading="lazy"
                className="w-full h-full object-cover rounded-full  hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Floating Status Badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-2 -right-2 px-4 py-2 bg-gray-900 border border-green-500/30 rounded-full shadow-lg shadow-green-500/20 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-400">Online</span>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaRocket className="text-white text-lg" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-linear-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaCode className="text-white text-sm" />
            </motion.div>

          </motion.div>

        </motion.div>

      </motion.div>

      {/* ===== SCROLL INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-700 flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow.reverse {
          animation-direction: reverse;
        }
      `}</style>

    </div>
  );
};

export default Main;
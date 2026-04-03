import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { icon: "fa-code", number: 50, suffix: "+", label: "Projects Completed", color: "from-purple-500 to-blue-500" },
  { icon: "fa-calendar", number: 2, suffix: "+", label: "Years Experience", color: "from-blue-500 to-cyan-500" },
  { icon: "fa-users", number: 30, suffix: "+", label: "Happy Clients", color: "from-cyan-500 to-green-500" },
  { icon: "fa-coffee", number: 1000, suffix: "+", label: "Cups of Coffee", color: "from-yellow-500 to-orange-500" }
];

const skills = [
  { name: "React / Next.js", level: 95, category: "Frontend", icon: "fab fa-react" },
  { name: "TypeScript", level: 88, category: "Frontend", icon: "fab fa-js-square" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", icon: "fab fa-css3-alt" },
  { name: "Node.js / Express", level: 75, category: "Backend", icon: "fab fa-node-js" },
  { name: "MongoDB / SQL", level: 70, category: "Backend", icon: "fas fa-database" },
  { name: "REST APIs / GraphQL", level: 80, category: "Backend", icon: "fas fa-plug" },
  { name: "Git / GitHub", level: 90, category: "Tools", icon: "fab fa-github" },
  { name: "Figma / Design", level: 78, category: "Tools", icon: "fab fa-figma" }
];

const services = [
  {
    icon: "fa-laptop-code",
    title: "Web Development",
    desc: "Building responsive and performant web applications using modern frameworks and best practices.",
    color: "purple"
  },
  {
    icon: "fa-palette",
    title: "UI/UX Design",
    desc: "Creating beautiful, intuitive interfaces with attention to user experience and accessibility.",
    color: "blue"
  },
  {
    icon: "fa-mobile-alt",
    title: "Responsive Design",
    desc: "Ensuring seamless experiences across all devices with mobile-first approach.",
    color: "cyan"
  },
  {
    icon: "fa-rocket",
    title: "Performance Optimization",
    desc: "Optimizing applications for speed, SEO, and overall performance excellence.",
    color: "pink"
  }
];

const timeline = [
  {
    year: "2024",
    title: "Freelance Developer",
    desc: "Started working as a full-stack freelance developer, delivering client projects.",
    current: true
  },
  {
    year: "2023",
    title: "Advanced Frontend Skills",
    desc: "Mastered React ecosystem, Next.js, and advanced animation techniques.",
    current: false
  },
  {
    year: "2022",
    title: "Web Development Journey",
    desc: "Began learning web development with HTML, CSS, JavaScript fundamentals.",
    current: false
  }
];

// AnimatedCounter component
const AnimatedCounter = ({ target, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// SkillBar component
const SkillBar = ({ skill, index }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setWidth(skill.level);
      }, index * 100);
    }
  }, [isInView, index, skill.level]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <i className={`${skill.icon} text-purple-400 group-hover:text-purple-300 transition-colors`}></i>
          <span className="font-medium text-white">{skill.name}</span>
        </div>
        <span className="text-sm font-mono text-purple-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full relative"
        >
          <div className="absolute inset-0 bg-white/20 blur-sm"></div>
        </motion.div>
      </div>
      <span className="inline-block mt-1 text-xs text-gray-500 font-medium px-2 py-0.5 bg-gray-800/50 rounded">
        {skill.category}
      </span>
    </motion.div>
  );
};

// ServiceCard component
const ServiceCard = ({ service, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative group p-6 bg-linear-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
  >
    {/* Glow Effect */}
    <div className={`absolute inset-0 bg-linear-to-br from-${service.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    
    {/* Icon */}
    <div className={`w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-linear-to-br from-${service.color}-500 to-${service.color}-600 text-white text-2xl shadow-lg shadow-${service.color}-500/25 group-hover:scale-110 transition-transform duration-300`}>
      <i className={`fas ${service.icon}`}></i>
    </div>

    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{service.title}</h3>
    <p className="text-gray-400 leading-relaxed">{service.desc}</p>
    {/* Arrow */}
    <div className="mt-4 flex items-center gap-2 text-purple-400 opacity-0 group-hover:opacity-100 transform -translate-x-2.5 group-hover:translate-x-0 transition-all duration-300">
      <span className="text-sm font-semibold">Learn More</span>
      <i className="fas fa-arrow-right"></i>
    </div>
  </motion.div>
);

// TimelineItem component
const TimelineItem = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-6`}
  >
    {/* Content */}
    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
      <div className="inline-block p-6 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 max-w-md">
        <span className="text-purple-400 font-bold text-lg">{item.year}</span>
        <h3 className="text-xl font-bold text-white mt-2 mb-3">{item.title}</h3>
        <p className="text-gray-400">{item.desc}</p>
        {item.current && (
          <span className="inline-block mt-3 px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
            Current Position
          </span>
        )}
      </div>
    </div>
    {/* Center Dot */}
    <div className="hidden md:flex w-12 h-12 items-center justify-center z-10">
      <div className={`w-4 h-4 rounded-full ${item.current ? 'bg-purple-500 ring-4 ring-purple-500/30' : 'bg-gray-600'} transition-all`}></div>
    </div>
    {/* Spacer */}
    <div className="flex-1 hidden md:block"></div>
  </motion.div>
);

const About = () => {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div id="about" className="min-h-screen px-4 sm:px-6 py-24 relative overflow-hidden bg-black">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-37.5 h-37.5 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded-full"
          >
            Get To Know Me
          </motion.span>
          
          {/* Fixed the gradient class here */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-white via-purple-200 to-blue-200">
            About Me
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Passionate about creating exceptional digital experiences through clean code and creative design
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Profile Image & Intro */}
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl blur-lg opacity-40"></div>
              <div className="relative p-8 bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-white/10">
                {/* Avatar */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative shrink-0">
                    <div className="w-28 h-28 rounded-2xl bg-linear-to-br from-purple-500 via-blue-500 to-cyan-500 p-1">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">John Developer</h3>
                    <p className="text-purple-400 font-medium mb-3">Full Stack Developer</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30">
                        Available for Hire
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                        Remote Friendly
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio Text */}
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    I'm a passionate <span className="text-white font-semibold">Full Stack Developer</span> focused on building modern, high-performance web applications. With a keen eye for design and love for clean code, I specialize in creating beautiful UI/UX with smooth animations and scalable architecture.
                  </p>
                  <p>
                    Currently, I'm expanding my expertise in backend technologies while working as a freelancer, delivering real-world projects that exceed client expectations. I believe in continuous learning and pushing the boundaries of what's possible on the web.
                  </p>
                </div>

                {/* Quick Info */}
                <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-purple-400"></i>
                    <span className="text-gray-400 text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope text-purple-400"></i>
                    <span className="text-gray-400 text-sm">hello@email.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-briefcase text-purple-400"></i>
                    <span className="text-gray-400 text-sm">Open to Opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-graduation-cap text-purple-400"></i>
                    <span className="text-gray-400 text-sm">Self-Taught Developer</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Contact Me
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 hover:border-purple-500/50 transition-all"
                  >
                    <i className="fas fa-download"></i>
                    Download CV
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tabs Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Tabs Navigation */}
            <div className="flex gap-2 p-2 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10">
              {["skills", "services", "journey"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "skills" && (
                <div className="p-6 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10 space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <i className="fas fa-chart-line text-purple-400"></i>
                    Technical Skills
                  </h3>
                  <div className="space-y-5">
                    {skills.map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "services" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <ServiceCard key={service.title} service={service} index={index} />
                  ))}
                </div>
              )}
              {activeTab === "journey" && (
                <div className="p-6 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    <i className="fas fa-road text-purple-400"></i>
                    My Journey
                  </h3>
                  {/* Timeline */}
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-500 via-blue-500 to-cyan-500 hidden md:block"></div>
                    <div className="space-y-8">
                      {timeline.map((item, index) => (
                        <TimelineItem key={item.year} item={item} index={index} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative p-6 bg-linear-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center overflow-hidden"
          >
            {/* Background glow */}
            <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            {/* Icon */}
            <div className={`relative w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-linear-to-br ${stat.color} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            {/* Counter */}
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
            </div>
            {/* Label */}
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Technologies Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20"
      >
        <h3 className="text-center text-gray-500 text-sm font-semibold uppercase tracking-wider mb-8">
          Technologies I Work With
        </h3>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black to-transparent z-10"></div>
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {/* Repeating sections to make marquee seamless */}
            {Array.from({ length: 2 }).map((_, index) => (
              <React.Fragment key={index}>
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "MongoDB",
                  "PostgreSQL",
                  "Tailwind CSS",
                  "Framer Motion",
                  "GraphQL",
                  "Docker",
                  "AWS",
                  "Figma"
                ].map((tech) => (
                  <div key={tech + index} className="flex items-center gap-3 px-6 py-3 bg-gray-900/50 backdrop-blur border border-white/10 rounded-full">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-linear-to-br from-purple-500/20 to-blue-500/20">
                      <i className="fas fa-check text-purple-400 text-xs"></i>
                    </div>
                    <span className="text-white font-medium whitespace-nowrap">{tech}</span>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
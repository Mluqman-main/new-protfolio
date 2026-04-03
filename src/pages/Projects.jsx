import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Data
const projects = [
  {
    title: "E-Commerce UI",
    desc: "A modern e-commerce interface with seamless shopping experience",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    link: "#",
    category: "Web App",
    technologies: ["React", "Tailwind", "Node.js"],
    featured: true,
    year: "2024"
  },
  {
    title: "YouTube UI",
    desc: "A pixel-perfect UI clone of YouTube platform with dark mode",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    link: "#",
    category: "UI Clone",
    technologies: ["React", "CSS", "API"],
    featured: false,
    year: "2024"
  },
  {
    title: "Portfolio",
    desc: "A personal portfolio website with stunning animations",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    link: "#",
    category: "Website",
    technologies: ["Next.js", "Framer Motion"],
    featured: true,
    year: "2023"
  },
  {
    title: "Blog Platform",
    desc: "A modern blogging platform UI with markdown support",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=300&fit=crop",
    link: "#",
    category: "Web App",
    technologies: ["Vue.js", "Firebase", "MDX"],
    featured: false,
    year: "2023"
  },
  {
    title: "Landing Page",
    desc: "A responsive landing page with conversion optimization",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    link: "#",
    category: "Website",
    technologies: ["HTML", "GSAP", "Tailwind"],
    featured: false,
    year: "2023"
  },
  {
    title: "Admin Dashboard",
    desc: "A comprehensive dashboard UI for admin panel management",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    link: "#",
    category: "Dashboard",
    technologies: ["React", "Chart.js", "Redux"],
    featured: true,
    year: "2024"
  }
];

const categories = ["All", ...new Set(projects.map(p => p.category))];

// Custom Hook for Tilt Effect
const useTilt = () => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return { ref, handleMouseMove, handleMouseLeave };
};

// Image component with loading state
const ProjectImage = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden w-full h-52 bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// Tag component
const TechTag = ({ tech }) => (
  <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-linear-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 mr-1 mb-1">
    {tech}
  </span>
);

// Featured badge
const FeaturedBadge = () => (
  <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-linear-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full shadow-lg shadow-orange-500/50 animate-pulse">
    ⭐ Featured
  </div>
);

// Main Projects component
const Projects = () => {
  const [active, setActive] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "featured") return b.featured - a.featured;
      if (sortBy === "year") return b.year.localeCompare(a.year);
      return 0;
    });

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div id="projects" className="min-h-screen px-4 sm:px-6 py-24 relative overflow-hidden bg-black">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-purple-400 bg-purple-500/10 border border-purple-500/30 rounded-full"
        >
          My Work
        </motion.span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
          Projects Experience
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Explore my latest projects showcasing modern web development skills and creative solutions
        </p>
      </motion.div>

      {/* Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto mb-12 relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-6 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10">
          {/* Search */}
          <div className="relative w-full lg:w-auto flex-1 max-w-md">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="featured">Featured First</option>
            <option value="year">Newest First</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-500 text-center lg:text-left">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} setActive={setActive} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <i className="fas fa-search text-6xl text-gray-700 mb-4"></i>
          <p className="text-gray-500 text-xl">No projects found matching your criteria</p>
        </motion.div>
      )}

      {/* Modal Preview */}
      <AnimatePresence>
        {active && <ProjectModal active={active} setActive={setActive} />}
      </AnimatePresence>
    </div>
  );
};

// Project Card
const ProjectCard = ({ project, index, setActive }) => {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 via-blue-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500"></div>

      {/* Card Container */}
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-transform duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {project.featured && <FeaturedBadge />}

        {/* Image Section */}
        <div className="relative overflow-hidden cursor-pointer" onClick={() => setActive(project)}>
          <ProjectImage src={project.img} alt={project.title} />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-2xl shadow-white/20 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-eye"></i>
              Quick Preview
            </motion.button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
            {project.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <span className="text-xs text-gray-500 font-mono">{project.year}</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
          {/* Tech Tags */}
          <div className="mb-4 flex flex-wrap">
            {project.technologies.map((tech) => (
              <TechTag key={tech} tech={tech} />
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              <i className="fas fa-external-link-alt"></i>
              View Live
            </a>
            <button
              onClick={() => setActive(project)}
              className="px-4 py-2.5 bg-white/5 text-white text-sm font-semibold rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all"
            >
              <i className="fas fa-expand"></i>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Modal Component
const ProjectModal = ({ active, setActive }) => {
  const modalRef = useRef(null);
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setActive(null);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-gray-900 rounded-3xl max-w-4xl w-full overflow-hidden border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActive(null)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-500 hover:rotate-90 transition-all duration-300"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={active.img} alt={active.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent"></div>
          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex gap-2">
            <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">{active.category}</span>
            {active.featured && (
              <span className="px-3 py-1 bg-yellow-500/90 backdrop-blur-sm text-black text-sm font-bold rounded-full">⭐ Featured</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">{active.title}</h3>
            <span className="text-sm text-gray-500 font-mono">{active.year}</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">{active.desc}</p>
          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {active.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-linear-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 rounded-lg font-medium"
                >
                  <i className="fas fa-code mr-2"></i>{tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={active.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-purple-500 via-blue-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all transform hover:scale-105"
            >
              <i className="fas fa-external-link-alt"></i>
              Visit Live Site
            </a>
            <button
              onClick={() => setActive(null)}
              className="px-6 py-4 bg-white/5 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main export component
export default function ProjectsExperience() {
  return <Projects />;
}
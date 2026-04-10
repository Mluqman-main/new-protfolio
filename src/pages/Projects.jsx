import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaEye, FaExternalLinkAlt, FaTimes, FaCode } from "react-icons/fa";

/* ---------------- ANIMATION SYSTEM ---------------- */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
};

/* ---------------- DATA ---------------- */

const projects = [
  {
    title: "E-Commerce UI",
    desc: "Modern e-commerce interface",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    category: "Web App",
    technologies: ["React", "Tailwind"],
    featured: true,
    year: "2024"
  },
  {
    title: "Portfolio",
    desc: "Animated portfolio website",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400",
    category: "Website",
    technologies: ["Next.js", "Framer Motion"],
    featured: true,
    year: "2023"
  }
];

const categories = ["All", ...new Set(projects.map(p => p.category))];

/* ---------------- MAIN ---------------- */

const Projects = () => {
  const [active, setActive] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = projects.filter(p =>
    (selectedCategory === "All" || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-950 text-white px-6 py-24 relative overflow-hidden"
    >
      {/* BACKGROUND */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"
      />

      {/* HEADER */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="text-center mb-16"
      >
        <motion.h2 variants={item} className="text-5xl font-bold">
          Projects
        </motion.h2>
        <motion.p variants={item} className="text-gray-400 mt-4">
          My latest work & experiments
        </motion.p>
      </motion.div>

      {/* CONTROLS */}
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" className="mb-10 flex flex-wrap gap-4 justify-between items-center">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-10 py-2 px-4 bg-gray-900 border border-white/10 rounded-xl focus:border-purple-500 outline-none"
          />
        </div>

        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl ${selectedCategory === cat
                  ? "bg-linear-to-r from-purple-500 to-blue-500"
                  : "bg-white/5"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filtered.map((p, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            className="group relative"
          >
            {/* glow */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-500 to-blue-500 blur opacity-30 group-hover:opacity-60 rounded-2xl"></div>

            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-white/10">
              <img src={p.img} className="w-full h-48 object-cover" />

              <div className="p-5">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{p.desc}</p>

                <div className="flex gap-2 flex-wrap mt-3">
                  {p.technologies.map(t => (
                    <span key={t} className="text-xs bg-purple-500/20 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setActive(p)}
                    className="flex-1 bg-white text-black py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <FaEye /> Preview
                  </button>
                  <button className="px-3 border border-white/20 rounded-lg">
                    <FaExternalLinkAlt />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gray-900 p-6 rounded-2xl max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4"
              >
                <FaTimes />
              </button>

              <img src={active.img} className="rounded-xl mb-4" />
              <h3 className="text-2xl font-bold">{active.title}</h3>
              <p className="text-gray-400 mt-2">{active.desc}</p>

              <div className="flex gap-2 mt-4 flex-wrap">
                {active.technologies.map(t => (
                  <span key={t} className="bg-purple-500/20 px-3 py-1 rounded">
                    <FaCode className="inline mr-1" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
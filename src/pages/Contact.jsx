import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime
} from "react-icons/md";
import {
  FaUser,
  FaTag,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane
} from "react-icons/fa";

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

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70 } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70 } }
};

/* ---------------- COMPONENT ---------------- */

const Contact = () => {
  const [, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  /* ---------------- DATA ---------------- */

  const contactInfo = [
    {
      icon: MdEmail,
      label: "Email",
      value: "princekhan27012007@gmail.com",
      link: "mailto:princekhan27012007@gmail.com",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: MdPhone,
      label: "Phone",
      value: "+92 319 1844403",
      link: "tel:+923191844403",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MdLocationOn,
      label: "Location",
      value: "Pakistan",
      link: "#",
      gradient: "from-cyan-500 to-green-500"
    },
    {
      icon: MdAccessTime,
      label: "Working Hours",
      value: "Mon–Fri 9AM–6PM",
      link: "#",
      gradient: "from-green-500 to-yellow-500"
    }
  ];

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ---------------- UI ---------------- */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white px-6 py-20 relative overflow-hidden"
    >
      {/* 🔥 Animated Background */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="text-center mb-16"
        >
          <motion.h2 variants={item} className="text-5xl font-bold">
            Contact Me
          </motion.h2>
          <motion.p variants={item} className="text-gray-400 mt-4">
            Let’s build something amazing together.
          </motion.p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* LEFT */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={i}
                  href={info.link}
                  variants={item}
                  whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900/70 border border-white/10 hover:border-purple-500 transition"
                >
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br ${info.gradient}`}
                  >
                    <Icon size={26} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    <p className="font-semibold">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            className="lg:col-span-3"
          >
            <motion.form
              variants={container}
              className="space-y-6 bg-gray-900/80 p-8 rounded-3xl border border-white/10"
            >
              {/* INPUT */}
              {[
                { name: "name", icon: FaUser, placeholder: "Your Name" },
                { name: "subject", icon: FaTag, placeholder: "Subject" },
                { name: "email", icon: FaEnvelope, placeholder: "Email" }
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div key={i} variants={item} className="relative">
                    <Icon className="absolute left-4 top-4 text-gray-400" />
                    <input
                      name={f.name}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="w-full pl-12 p-4 bg-black/50 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
                    />
                  </motion.div>
                );
              })}

              {/* TEXTAREA */}
              <motion.div variants={item} className="relative">
                <FaCommentDots className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  name="message"
                  rows="4"
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full pl-12 p-4 bg-black/50 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
                />
              </motion.div>

              {/* BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 25px rgba(168,85,247,0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-linear-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center gap-2 font-bold"
              >
                Send Message <FaPaperPlane />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
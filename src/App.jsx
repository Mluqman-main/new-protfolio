import React from "react";
import { Routes, Route } from "react-router-dom";
import Navber from "./componat/Navber";
import Main from "./componat/Main";
import Footer from "./componat/Footer";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  return (
    <div className="bg-black text-white  backdrop-blur-lg overflow-x-hidden">

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/About" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Contact" element={<Contact />} />

      </Routes>



      <br /> <br />
      <Navber />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
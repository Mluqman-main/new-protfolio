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
      <Navber />
       <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
      
      
      
      <br /> <br />
      
      <Projects />
      <About/>
      <Contact/>
      <Footer />
    </div>
  );
}

export default App;
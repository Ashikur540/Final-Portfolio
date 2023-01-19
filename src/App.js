import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import './App.css';
import { About } from './components/About';
import Footer from "./components/Footer";
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from "./components/Projects.jsx";
import Skills from './components/Skills';
import BottomFooter from './components/Small/BottomFooter';
function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");


  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "#06021d",
      mixBlendMode: "color-dodge",

    }
  }

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");



  return (
    <motion.div className="">
      <Toaster />
      <motion.div
        className="z-[999] h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm fixed top-0 left-0 pointer-events-none"
        variants={variants}
        animate={cursorVariant}
      />
      <Navbar />
      <Hero textEnter={textEnter} textLeave={textLeave} />
      <About />
      <Skills />
      <Projects />
      <Footer />
      <BottomFooter />
    </motion.div>
  );
}

export default App;

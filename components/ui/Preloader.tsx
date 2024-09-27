import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [currentText, setCurrentText] = useState("Hello!");
  // const [loading, setLoading] = useState(true);

  // List of greetings in different languages
  const greetings = [
    "Hello!",
    "হ্যালো!",
    "नमस्ते!",
    "Bonjour!",
    "Ciao!",
    "안녕하세요!",
    "こんにちは!",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setCurrentText(greetings[index]);
      index = (index + 1) % greetings.length;
    }, 100); // Change every 500ms

    // Simulate loading completion after 4 seconds
    // const timeout = setTimeout(() => {
    //   setLoading(false);
    // }, 4000);

    return () => {
      clearInterval(interval);
      // clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {/* {loading && ( */}
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#2c2c2c",
          fontSize: "3rem",
          fontWeight: "bold",
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 9999, // To overlay everything
        }}
        // Initial position coming from the top
        initial={{ opacity: 1, y: "-100%" }}
        // Animate into view
        animate={{ opacity: 1, y: 0 }}
        // Smooth exit by moving it up and out
        exit={{
          scale: 0,
          opacity: 0,
          y: "-100%",
          transition: {
            duration: 0.6,
            ease: "easeInOut",
            staggerDirection: -1,
          },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="h-screen w-full dark:bg-black-200 bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <h1>{currentText}</h1>
        </div>
      </motion.div>
      {/* )} */}
    </AnimatePresence>
  );
};

export default Preloader;

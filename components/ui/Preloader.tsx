"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  { language: "English", text: "Hello!" },
  { language: "Bangla", text: "হ্যালো!" },
  { language: "Hindi", text: "नमस्ते!" },
  { language: "French", text: "Bonjour!" },
  { language: "Italian", text: "Ciao!" },
  { language: "Korean", text: "안녕하세요!" },
  { language: "Japanese", text: "こんにちは!" },
];

const Preloader = ({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 250);

    // Simulate loading time (replace with actual loading logic)
    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      setTimeout(() => onLoadingComplete(), 1000); // Delay to allow for exit animation
    }, 2000);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
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
            <motion.h1
              key={currentGreeting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-6xl text-white "
            >
              {greetings[currentGreeting].text}
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

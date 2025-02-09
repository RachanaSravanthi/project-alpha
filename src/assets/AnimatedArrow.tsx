"use client";

import { motion } from "framer-motion";

export default function AnimatedArrow() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative cursor-pointer mx-auto"
      onClick={() => scrollTo("work")}
    >
      {/* Mobile Arrows */}
      <div className="relative h-28 w-20 sm:h-32 sm:w-24 md:hidden">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {[0, 1, 2].map((index) => (
            <motion.svg
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                top: `calc(${index * 25}%)`, // Adjusted for 3 arrows in mobile
              }}
              viewBox="0 0 48 30"
              initial={{ opacity: index === 0 ? 0.8 : 0.2 }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <motion.path
                d="M4 6 L24 24 L44 6"
                stroke="white"
                strokeWidth="3" // Reduced for mobile
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />
            </motion.svg>
          ))}
        </motion.div>
      </div>

      {/* Medium-Sized Arrows */}
      {/* <div className="relative hidden md:block lg:hidden h-32 w-24">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {[0, 1, 2].map((index) => (
            <motion.svg
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                top: `calc(${index * 18}%)`, // Slightly tighter spacing for medium screens
              }}
              viewBox="0 0 48 30"
              initial={{ opacity: index === 0 ? 0.8 : 0.2 }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <motion.path
                d="M4 6 L24 24 L44 6"
                stroke="white"
                strokeWidth="3.5" // Slightly reduced for medium screens
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />
            </motion.svg>
          ))}
        </motion.div>
      </div> */}

      <div className="relative hidden md:block h-40 w-40 lg:h-40 lg:w-20">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ y: [0, 20, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {[0, 1, 2].map((index) => (
            <motion.svg
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                top: `calc(${index * 15}%)`,
              }}
              viewBox="0 0 48 30"
              initial={{ opacity: index === 0 ? 0.8 : 0.2 }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <motion.path
                d="M4 6 L24 24 L44 6"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              />
            </motion.svg>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

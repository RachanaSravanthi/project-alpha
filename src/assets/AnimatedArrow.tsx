"use client"

import { motion } from "framer-motion"

export default function AnimatedArrow() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      className="relative h-16 w-32 md:w-12 md:h-12 lg:w-20 lg:h-40 cursor-pointer mx-auto"
      onClick={() => scrollTo("work")}
    >
      <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />

      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{ y: [0, 40, 0] }}
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
            style={{ top: `${index * 20}px` }}
            viewBox="0 0 48 30" // Increased width and height for a larger arrow
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
              d="M4 6 L24 24 L44 6" // Widened the arrow points
              stroke="white"
              strokeWidth="4" // Increased stroke width for a thicker arrow
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" // Increased shadow for better visibility
            />
          </motion.svg>
        ))}
      </motion.div>
    </div>
  )
}


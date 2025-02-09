import { motion } from "framer-motion";

export default function AnimatedArrow2() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative h-20 w-44  md:w-14 md:h-14  lg:w-24 lg:h-48 cursor-pointer mx-auto " // Centered container with responsive width
      onClick={() => scrollTo("work")}
    >
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />

      {/* Wrapping container for entire set of arrows (entire set moves up and down) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{ y: [0, 50, 0] }} // Animate the entire set of arrows up and down
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Arrows with opacity animation */}
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.svg
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ top: `${index * 18}px` }} // Added spacing between arrows
            viewBox="0 0 24 26" // Adjusted viewBox height for better alignment
            initial={{ opacity: index === 0 ? 0.8 : 0.2 }}
            animate={{
              opacity: [0.1, 0.8, 0.1], // Change opacity to create illusion of movement
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4, // Increased delay to separate animations
            }}
          >
            <motion.path
              d="M4 4 L12 12 L20 4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
            />
          </motion.svg>
        ))}
      </motion.div>
    </div>
  );
}

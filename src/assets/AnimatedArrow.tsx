  import { motion } from "framer-motion";

  export default function AnimatedArrow() {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <div
        className="relative w-24 h-48 cursor-pointer" // Adjusted height to accommodate more arrows
        onClick={() => scrollTo("work")}
      >
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl " />

        {[0, 1, 2, 3, 4].map((index) => ( // Added more arrows
          <motion.svg
            key={index}
            className="absolute top-0 left-0 w-full h-full"
            style={{ top: `${index * 6}px` }} // Added spacing between arrows
            viewBox="0 0 24 16" // Adjusted viewBox height for better alignment
            initial={{ opacity: index === 0 ? 0.8 : 0.2, y: 0 }}
            animate={{
              opacity: index === 0 ? 0.8 : 0.2,
              y: [0, 40, 0], // Increased y spacing for larger gaps
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
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
            />
          </motion.svg>
        ))}
      </div>
    );
  }

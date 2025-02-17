import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn, faBehance } from "@fortawesome/free-brands-svg-icons"
import { useLocation } from "react-router-dom"

interface FooterProps {
  isLoaded: boolean
}

export default function Footer2({ isLoaded }: FooterProps) {
  const location = useLocation()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.2 },
  }

  const watermarkAnimation = {
    initial: { opacity: 0.6, scale: 1 },
    hover: { 
      opacity: 1, 
      scale: 1.05,
      rotate: [0, -2, 2, -2, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  }

  return (
    <motion.footer
      className="bg-black text-white px-8 py-12 relative"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      <motion.div
        variants={fadeIn}
        className="bg-white/10 text-[#FFF] py-10 px-8 shadow-sm rounded-md flex items-center justify-around md:flex-row flex-col space-y-6 md:space-y-0 mb-8"
        whileHover={{
          boxShadow: "0 0 15px rgba(255,255,255,0.3)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div whileHover={hoverScale}>
          <motion.h1 variants={fadeIn} className="text-2xl text-center font-inter">
            Start a project!
          </motion.h1>
        </motion.div>
        <motion.div whileHover={hoverScale}>
          <motion.p variants={fadeIn} className="text-center font-inter">
            Interested in working together? We should queue
            <br />
            up a time to chat.
          </motion.p>
        </motion.div>
        <motion.a
          variants={fadeIn}
          className="py-2 px-7 border-2 font-inter border-[#FFF] hover:bg-black hover:border-black rounded-lg duration-300 text-center"
          href="mailto:test@gmail.com"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#FFF",
            color: "#000",
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          Let's do this!
        </motion.a>
      </motion.div>

      <motion.div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-9" variants={staggerChildren}>
        {/* Left Column */}
        <motion.div
          variants={fadeIn}
          className="space-y-2 hover:text-gray-300 transition-colors duration-300"
          whileHover={hoverScale}
        >
          <h2 className="text-3xl font-medium">Rachana Sravanthi</h2>
          <p className="text-md text-gray-400">
            Multi-Disciplinary Designer & VFX Artist
            <br />
            In Toronto, Canada.
          </p>
        </motion.div>

        {/* Middle Column - Navigation */}
        <motion.nav variants={fadeIn} className="space-y-3 text-md">
          {location.pathname !== "/" ? (
            <motion.a
              href="/#works"
              className="block hover:text-gray-300 transition-colors duration-300"
              whileHover={{ x: 5, color: "#FFF" }}
            >
              Works
            </motion.a>
          ) : (
            <motion.a
              href="/about"
              className="block hover:text-gray-300 transition-colors duration-300"
              whileHover={{ x: 5, color: "#FFF" }}
            >
              About
            </motion.a>
          )}
          <motion.a
            target="_blank"
            href="https://www.behance.net/rachanaSravanthi"
            className="block hover:text-gray-300 transition-colors duration-300"
            whileHover={{ x: 5, color: "#FFF" }}
            rel="noreferrer"
          >
            Behance
          </motion.a>
          <motion.a
            target="_blank"
            href="https://www.linkedin.com/in/rachana-s-vfx/"
            className="block hover:text-gray-300 transition-colors duration-300"
            whileHover={{ x: 5, color: "#FFF" }}
            rel="noreferrer"
          >
            Linkedin
          </motion.a>
          <motion.a
            href="/contact"
            className="block hover:text-gray-300 transition-colors duration-300"
            whileHover={{ x: 5, color: "#FFF" }}
          >
            Contact
          </motion.a>
        </motion.nav>

        {/* Right Column */}
        <motion.div variants={fadeIn} className="space-y-6">
          <motion.div className="text-md text-gray-400" whileHover={hoverScale}>
            ©2025 Rachana Sravanthi
            <br />
            All Rights Reserved
          </motion.div>

          {/* Social Icons */}
          <motion.div className="flex gap-4" variants={staggerChildren}>
            <motion.a
              target="_blank"
              href="https://www.linkedin.com/in/rachana-s-vfx/"
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} size="xl" />
            </motion.a>
            <motion.a
              target="_blank"
              href="https://www.behance.net/rachanaSravanthi"
              className="hover:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faBehance} size="xl" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn} className="space-y-6">
          {/* Say Hello Button */}
          <motion.a
            href="/contact"
            className="py-2 px-7 bg-white font-semibold text-black border-2 font-inter border-[#000] hover:bg-white hover:border-white rounded-lg duration-300 text-center"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#000",
              color: "#FFF",
              boxShadow: "0 0 15px rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Let's talk
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Watermark */}
      <motion.a
        href="https://devoctane.in"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-8 bottom-4 text-white/60 font-light text-sm cursor-pointer"
        initial="initial"
        whileHover="hover"
        variants={watermarkAnimation}
      >
        <motion.div className="flex items-center gap-2">
          <motion.span 
            className="inline-block"
            animate={{ 
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Handcrafted by
          </motion.span>
          <motion.span 
            className="font-semibold underline underline-offset-2"
            animate={{ 
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            Octane
          </motion.span>
        </motion.div>
      </motion.a>
    </motion.footer>
  )
}
"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin } from 'lucide-react'

interface FooterProps {
  isLoaded: boolean
}

export default function Footer2({ isLoaded }: FooterProps) {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <>
    
    <motion.footer
      className="bg-black text-white px-8 py-12"
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={staggerChildren}
    >
      <motion.div
                variants={fadeIn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="bg-white/10 text-[#FFF] py-10 px-8 shadow-sm rounded-md flex items-center justify-around md:flex-row flex-col space-y-6 md:space-y-0 mb-8"
            >
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="text-2xl text-center font-inter"
                    >
                        Start a project!
                    </motion.h1>
                </div>
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="text-center font-inter"
                    >
                        Interested in working together? We should queue
                        <br />
                        up a time to chat.
                    </motion.p>
                </div>
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="py-2 px-7 border-2 font-inter border-[#FFF] hover:bg-black hover:border-black rounded-lg duration-300 text-center"
                    href="mailto:test@gmail.com"
                >
                    Lets do this!
                </motion.a>
            </motion.div>
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-9">
        {/* Left Column */}
        <motion.div variants={fadeIn} className="space-y-2 hover:text-gray-300 transition-colors duration-300">
          <h2 className="text-3xl font-medium">Rachana Sravanthi</h2>
          <p className="text-md text-gray-400">
          Multi-Disciplinary Designer & VFX Artist
            <br />
            In Toronto, Canada.
          </p>
        </motion.div>

        {/* Middle Column - Navigation */}
        <motion.nav variants={fadeIn} className="space-y-3 text-md">
          <motion.a
            href="#about"
            className="block  hover:text-gray-300 transition-colors duration-300"
          >
            About
          </motion.a>
          <motion.a
            href="#logos"
            className="block  hover:text-gray-300 transition-colors duration-300"
          >
            Behance
          </motion.a>
          <motion.a
            href="#about"
            className="block  hover:text-gray-300 transition-colors duration-300"
          >
            Linkedin
          </motion.a>
          <motion.a
            href="#contact"
            className="block  hover:text-gray-300 transition-colors duration-300"
          >
            Contact
          </motion.a>
        </motion.nav>

        {/* Right Column */}
        <motion.div variants={fadeIn} className="space-y-6">
          <div className="text-md text-gray-400">
            ©2025 Rachana Sravanthi
            <br />
            All Rights Reserved
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              <Facebook size={25} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              <Instagram size={25} />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
              <Linkedin size={25} />
            </a>
          </div>
        </motion.div>
        <motion.div variants={fadeIn} className="space-y-6">
          {/* Say Hello Button */}
          <motion.a
            href="mailto:contact@example.com"
            className="py-2 px-7 bg-white font-semibold text-black border-2 font-inter border-[#000] hover:bg-white hover:border-white rounded-lg duration-300 text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Lets talk
          </motion.a>
        </motion.div>
      </div>
    </motion.footer>
    </>
  )
}


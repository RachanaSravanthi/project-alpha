
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronUp } from 'lucide-react'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Toggle visibility of the button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-[rgb(255,255,255,1)] text-white p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300 flex items-center justify-center"
          aria-label="Scroll to top"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={24} color="black" />
        </motion.button>
      )}
    </div>
  )
}

export default ScrollToTopButton


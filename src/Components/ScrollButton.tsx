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
        <motion.div
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-white text-black p-3 rounded-full shadow-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
          aria-label="Scroll to top"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp size={24} color="black" />
          <span className="text-sm font-medium">Back to Top</span>
        </motion.div>
      )}
    </div>
  )
}

export default ScrollToTopButton

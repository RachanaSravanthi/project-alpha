
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
      <header className="flex justify-center items-center p-4 bg-black sticky top-0 z-50">
        <nav className="w-full max-w-4xl">
          <ul className="flex justify-center items-center space-x-8">
            <img
              src="/placeholder.svg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <li><a href="/about" className="hover:text-gray-300 transition-colors duration-300">About</a></li>
            <li><a href="/work" className="hover:text-gray-300 transition-colors duration-300">Work</a></li>
            <li><a href="/contact" className="hover:text-gray-300 transition-colors duration-300">Let's talk</a></li>
          </ul>
        </nav>
      </header>

      <main className="relative">
        {/* Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-[repeat(28,1fr)] grid-rows-[repeat(16,1fr)] max-w-screen max-h-screen">
            {[...Array(28 * 16)].map((_, i) => (
              <div
                key={i}
                className="border border-white/10"
                style={{
                  animation: `pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite ${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 py-16"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={staggerChildren}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div variants={fadeIn}>
              <motion.h1 
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About me
              </motion.h1>
              <motion.p 
                className="text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </motion.p>
            </motion.div>
            <motion.div 
              variants={fadeIn} 
              className="relative h-[400px] overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="About me"
                
                // layout="fill"
                // objectFit="cover"
                
              />
            </motion.div>
          </div>

          <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item} 
                className="text-center"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="What I do icon"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <motion.h2 
                  className="text-2xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  What I do?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  As a generalist I tackle almost all of post production whether it be 2D or
                  animation, motion graphics, titles, visual effects or compositing
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={fadeIn} 
            className="bg-gray-900 p-8 rounded-lg text-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2 
              className="text-2xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Let's work together
            </motion.h2>
            <motion.p 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Interested in working together? We should queue up a time to chat.
            </motion.p>
            <motion.button 
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ping me
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      <footer className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <ul className="flex flex-col space-y-2">
            <motion.li whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">view my behance</a>
            </motion.li>
            <motion.li whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">get in touch</a>
            </motion.li>
            <motion.li whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">view my dribble</a>
            </motion.li>
          </ul>
          <p className="mt-8 text-sm text-gray-500">
            Handcrafted by <a href="https://theoctane.vercel.app" className="text-white hover:underline">Octane</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import Modal from "../Components/Modal"
// import AnimatedArrow2 from "../assets/AnimatedArrow2"
import AnimatedArrow from "../assets/AnimatedArrow"

interface HomePageProps {
  isLoaded: boolean
  scrollTo: (id: string) => void
  projectData: Array<{
    id: number
    title: string
    category: string
    subtitle: string
    link: string
    images: string[]
    iframeLink: string
    description: string
    thumbnail: string
  }>
  fadeIn: any
  staggerChildren: any
}

export default function HomePage() {
  const { isLoaded, projectData, fadeIn, staggerChildren } = useOutletContext<HomePageProps>()
  const [selectedCategory, setSelectedCategory] = useState<string>("Motion Design")
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [filteredProjects, setFilteredProjects] = useState(projectData)

  const categories = ["Motion Design", "Graphic Design", "VFX for film"]

  const mainRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: mainRef })
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  useEffect(() => {
    setFilteredProjects(
      selectedCategory ? projectData.filter((project) => project.category === selectedCategory) : projectData,
    )
  }, [selectedCategory, projectData])

  const handlePreviousProject = () => {
    setSelectedProjectIndex((prevIndex) =>
      prevIndex !== null ? (prevIndex - 1 + projectData.length) % projectData.length : null,
    )
  }

  const handleNextProject = () => {
    setSelectedProjectIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % projectData.length : null))
  }

  const handleProjectClick = (index: number) => {
    const project = filteredProjects[index]
    const projectIndexInOriginalData = projectData.findIndex((p) => p.id === project.id)
    setSelectedProjectIndex(projectIndexInOriginalData)
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const getItemVariants = (index: number) => {
    const positions = [
      { x: "-100%", y: 0 }, // Left
      { x: "100%", y: 0 }, // Right
      { x: 0, y: "100%" }, // Bottom
      { x: 0, y: "-100%" }, // Top
      { x: "-100%", y: "100%" }, // Bottom-left
      { x: "100%", y: "100%" }, // Bottom-right
    ]
    const position = positions[index % positions.length]

    return {
      hidden: { opacity: 0, ...position },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
        },
      },
    }
  }
  return (
    <>
      <motion.main
        className="mx-auto"
        ref={mainRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.section
  id="about"
  className="relative text-center py-36 flex items-center justify-center flex-col overflow-hidden aspect-[50/50] sm:aspect-[28/15] md:aspect-[28/15] bg-black"
  initial="hidden"
  animate={isLoaded ? "visible" : "hidden"}
  variants={staggerChildren}
  style={{ y: yBg, opacity: opacityBg }}
>
  <motion.div
    className="absolute inset-0 z-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <picture>
      <source 
        media="(min-width: 640px)" 
        srcSet="/Banner.png?height=1080&width=1920" 
      />
      <source 
        media="(max-width: 639px)" 
        srcSet="/BannerImage_Mobile.png?height=926&width=428" 
      />
      <img
        src="/Banner.png?height=1080&width=1920"
        alt="Background"
        className="w-full h-full object-cover opacity-50"
      />
    </picture>
  </motion.div>

  <motion.div
    className="relative z-20 min-h-[60vh] flex items-center justify-center flex-col"
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    <motion.h1
      variants={fadeIn}
      className="text-xl md:text-4xl lg:text-5xl text-dim-white mb-2 font-inter font-medium"
    >
      Hello! I'm Rachana Sravanthi
    </motion.h1>
    <motion.h2
      variants={fadeIn}
      className="text-2xl md:text-5xl lg:text-6xl font-medium text-off-white mb-3 font-inter max-w-3xl mx-auto"
    >
      Bringing Imagination to Life:
    </motion.h2>
    <motion.h2
      variants={fadeIn}
      className="text-2xl md:text-5xl lg:text-6xl font-medium text-off-white mb-3 font-inter max-w-4xl mx-auto"
    >
      Stunning VFX, 2D & 3D Designs
    </motion.h2>
    <motion.h2
      variants={fadeIn}
      className="text-2xl md:text-5xl lg:text-6xl font-medium text-off-white  mb-3 font-inter max-w-2xl mx-auto"
    >
      for Film and Beyond!
    </motion.h2>
    {/* <AnimatedArrow2 /> */}
    <AnimatedArrow />
  </motion.div>
</motion.section>

        <motion.div
          className="flex justify-center space-x-4 my-8"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category ? "bg-white text-black" : "bg-transparent text-white border border-white"
              }`}
              onClick={() => setSelectedCategory(category)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.section
          id="work"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 mb-8"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {filteredProjects.map((project, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden group hover:cursor-pointer"
              variants={getItemVariants(i)}
              onClick={() => handleProjectClick(i)}
              whileHover={{ scale: 1.05, zIndex: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-full h-[300px] overflow-hidden"
                initial={{ scale: 1.2, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {project.thumbnail && project.thumbnail.trim() !== "" ? (
                  <motion.img
                    src={project.thumbnail}
                    alt="Project thumbnail"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  />
                ) : project.images[0]?.includes("drive.google.com") ? (
                  <motion.div
                    className="relative w-full h-full overflow-hidden"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <iframe
                      src={project.images[0].replace("/view?usp=sharing", "/preview")}
                      className="w-full h-[400px] absolute left-0 pointer-events-none object-fit"
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        maskImage: "linear-gradient(to bottom, black 83%, transparent 100%)",
                        transform: "scale(4) translateY(145px)",
                        position: "absolute",
                      }}
                      frameBorder="0"
                      scrolling="no"
                    />
                  </motion.div>
                ) : (
                  <motion.img
                    src={project.images[0]}
                    alt="Project thumbnail"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  />
                )}
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 + 0.3 }}
              >
                <motion.h3
                  className="text-lg font-bold text-white px-2 py-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.4 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-gray-300 px-2 pb-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 + 0.5 }}
                >
                  {project.subtitle}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.section>
      </motion.main>

      <AnimatePresence>
        {selectedProjectIndex !== null && (
          <Modal
            project={projectData[selectedProjectIndex]}
            onClose={() => setSelectedProjectIndex(null)}
            onPrevious={handlePreviousProject}
            onNext={handleNextProject}
          />
        )}
      </AnimatePresence>
    </>
  )
}


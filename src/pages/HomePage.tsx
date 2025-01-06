import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Modal from "../Components/Modal";
// import VimeoEmbed from "../components/VEM";
// import AnimatedArrow from "../assets/AnimatedArrow";
import AnimatedArrow2 from "../assets/AnimatedArrow2";


interface HomePageProps {
    isLoaded: boolean;
    scrollTo: (id: string) => void;
    projectData: Array<{
        id: number;
        title: string;
        category: string;
        subtitle: string;
        link: string;
        images: string[];
        iframeLink: string;
        description: string;
        tools: string;
    }>;
    fadeIn: any;
    staggerChildren: any;
}

export default function HomePage() {
    const { isLoaded, projectData, fadeIn, staggerChildren } = useOutletContext<HomePageProps>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>("Motion Design");
    const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

    const categories = ["Motion Design", "Graphics Design", "VFX for film"];

    const handlePreviousProject = () => {
        setSelectedProjectIndex((prevIndex) =>
            prevIndex !== null ? (prevIndex - 1 + projectData.length) % projectData.length : null
        );
    };

    const handleNextProject = () => {
        setSelectedProjectIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % projectData.length : null));
    };

    const handleProjectClick = (index: number) => {
        const project = filteredProjects[index]; // Get the clicked project from the filtered list
        const projectIndexInOriginalData = projectData.findIndex((p) => p.id === project.id); // Find its index in the original data
        setSelectedProjectIndex(projectIndexInOriginalData);
    };
    

    const filteredProjects = selectedCategory
        ? projectData.filter((project) => project.category === selectedCategory)
        : projectData;

        // const scrollTo = (id: string) => {
        //     const element = document.getElementById(id);
        //     if (element) {
        //         element.scrollIntoView({ behavior: "smooth" });
        //     }
        // };
        

    return (
        <>
            <main className="mx-auto">
                <motion.section
                    id="about"
                    className="relative text-center py-36 flex items-center justify-center flex-col overflow-hidden aspect-[50/50] sm:aspect-[28/15] md:aspect-[28/15]"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    <div className="absolute inset-0 grid grid-cols-[repeat(28,1fr)] grid-rows-[repeat(15,1fr)]">
                        {[...Array(28 * 16)].map((_, i) => (
                            <div
                                key={i}
                                className="border border-white/15"
                                style={{
                                    animation: `pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite ${i * 0.05}s`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 min-h-[60vh] flex items-center justify-center flex-col">
                        <motion.h1
                            variants={fadeIn}
                            className="text-2xl md:text-5xl text-dim-white mb-2 font-inter font-medium"
                        >
                            Hello! I'm Rachana Sravanthi
                        </motion.h1>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-6xl font-medium text-off-white mb-3 font-inter max-w-3xl mx-auto"
                        >
                            Bringing Imagination to Life:
                        </motion.h2>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-6xl font-medium text-off-white mb-3 font-inter max-w-4xl mx-auto"
                        >
                            Stunning VFX, 2D & 3D Designs
                        </motion.h2>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-6xl font-medium text-off-white mb-3 font-inter max-w-2xl mx-auto"
                        >
                            for Film and Beyond!
                        </motion.h2>
                        {/* <motion.div
                            className="mt-8 cursor-pointer"
                            animate={{
                                y: [0, 10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            onClick={() => scrollTo("work")}
                            // onClick={() => scrollTo("work")}
                        >
                            <img src={Arrow} alt="Scroll to works" className="w-44 h-44 opacity-80" />
                        </motion.div> */}
                        <AnimatedArrow2/>
                        {/* <AnimatedArrow/> */}
                    </div>
                </motion.section>

                <motion.div className="flex justify-center space-x-4 my-8" variants={fadeIn}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full ${
                                selectedCategory === category
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white border border-white"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                <motion.section
                    id="work"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    {filteredProjects.map((project, i) => (
                        <motion.div
                            key={i}
                            className="relative overflow-hidden group hover:cursor-pointer"
                            variants={fadeIn}
                            // onClick={() => setSelectedProjectIndex(i)}
                             onClick={() => handleProjectClick(i)}

                        >
                            {/* {project.link ? (
                                <VimeoEmbed link={project.link} />
                            ) : (<h1>hi</h1>)} */}
                            <img
                                src={`${project.images[0]}`}
                                alt="Project thumbnail"
                                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                            />

                            <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-lg font-bold">{project.title}</h3>
                                <p className="text-sm">{project.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.section>
            </main>

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
    );
}

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Modal from "../components/Modal";

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
        description: string;
    }>;
    fadeIn: any;
    staggerChildren: any;
}

export default function HomePage() {
    const { isLoaded, projectData, fadeIn, staggerChildren } = useOutletContext<HomePageProps>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

    const filteredProjects = selectedCategory
        ? projectData.filter((project) => project.category === selectedCategory)
        : projectData;

    return (
        <>
            <main className="mx-auto">
                <motion.section
                    id="about"
                    className="relative text-center py-36 flex items-center justify-center flex-col overflow-hidden"
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
                            className="text-2xl md:text-4xl text-dim-white mb-2 font-inter font-medium"
                        >
                            Hello! I'm Rachana Sravanti
                        </motion.h1>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-5xl font-medium text-off-white mb-3 font-inter max-w-2xl mx-auto"
                        >
                            Bringing Imagination to Life:
                        </motion.h2>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-5xl font-medium text-off-white mb-3 font-inter max-w-4xl mx-auto"
                        >
                            Stunning VFX, 2D & 3D Designs
                        </motion.h2>
                        <motion.h2
                            variants={fadeIn}
                            className="text-3xl md:text-5xl font-medium text-off-white mb-3 font-inter max-w-2xl mx-auto"
                        >
                            for Film and Beyond!
                        </motion.h2>
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
                            onClick={() => setSelectedCategory(category === selectedCategory ? selectedCategory : category)}
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
                    {filteredProjects.map((project, key) => (
                        <motion.div
                            key={key}
                            className="relative overflow-hidden group hover:cursor-pointer"
                            variants={fadeIn}
                            onClick={() => setSelectedProjectIndex(key)}
                        >
                            <img
                                src={project.images[0]}
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

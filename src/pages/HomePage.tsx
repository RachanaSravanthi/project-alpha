import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom"

interface HomePageProps {
    isLoaded: boolean;
    scrollTo: (id: string) => void;
    projectData: Array<{ title: string; subtitle: string }>;
    fadeIn: any;
    staggerChildren: any;
}

export default function HomePage() {

    const { isLoaded, /*scrollTo,*/ projectData, fadeIn, staggerChildren } = useOutletContext<HomePageProps>();
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
                        <motion.div
                            variants={fadeIn}
                            className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 md:mt-8"
                        >
                            <a
                                href="#contact"
                                className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 w-full md:w-auto"
                            >
                                Let's talk
                            </a>
                            <a
                                href="#work"
                                className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300 w-full md:w-auto"
                            >
                                My works
                            </a>
                        </motion.div>
                    </div>
                </motion.section>

                <motion.section
                    id="work"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    {projectData.map((project, i) => (
                        <motion.div key={i} className="relative overflow-hidden group hover:cursor-pointer" variants={fadeIn}>
                            <img
                                src="https://i.pinimg.com/originals/72/f6/b3/72f6b3a4898f8b00f415954cdf0d1081.jpg"
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

        </>
    );
}
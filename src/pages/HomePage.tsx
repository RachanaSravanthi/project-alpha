import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";

export default function HomePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            orientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchInertiaMultiplier: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            // direction: 'vertical',
            // gestureDirection: 'vertical',
            // smooth: true,
            // mouseMultiplier: 1,
            // smoothTouch: false,
            // touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        setIsLoaded(true);

        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const projectData = [
        { title: "Project 1", subtitle: "VFX" },
        { title: "Project 2", subtitle: "2D Design" },
        { title: "Project 3", subtitle: "3D Design" },
        { title: "Project 4", subtitle: "Film" },
        { title: "Project 5", subtitle: "Animation" },
        { title: "Project 6", subtitle: "Concept Art" },
        { title: "Project 7", subtitle: "Motion Graphics" },
        { title: "Project 8", subtitle: "Visual Effects" },
        { title: "Project 9", subtitle: "Digital Art" },
    ];

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            lenisRef.current?.scrollTo(element, { immediate: false });
        }
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden font-inter">
            <motion.header
                className="flex justify-center items-center p-4 bg-white text-black sticky top-0 z-50"
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
            >
                <nav className="w-full">
                    <ul className="flex justify-center items-center space-x-8">
                        <img
                            src="/placeholder.svg"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full mb-4 md:mb-0"
                        />
                        <motion.li variants={fadeIn}>
                            <button
                                onClick={() => scrollTo("about")}
                                className="hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                            >
                                About
                            </button>
                        </motion.li>
                        <motion.li variants={fadeIn}>
                            <button
                                onClick={() => scrollTo("work")}
                                className="hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                            >
                                Work
                            </button>
                        </motion.li>
                        <motion.li variants={fadeIn}>
                            <button
                                onClick={() => scrollTo("contact")}
                                className="hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                            >
                                Let's talk
                            </button>
                        </motion.li>
                    </ul>
                </nav>
            </motion.header>

            <main className="mx-auto">
                <motion.section
                    id="about"
                    className="text-center py-20 flex items-center justify-center flex-col"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    <motion.h1 variants={fadeIn} className="text-2xl md:text-4xl text-dim-white mb-2 font-inter font-medium">
                        Hello! I'm Rachana Sravanti
                    </motion.h1>
                    <motion.h2
                        variants={fadeIn}
                        className="text-3xl  md:text-5xl font-medium text-off-white mb-3 font-inter w-2/4"
                    >
                        Bringing Imagination to Life:
                    </motion.h2>
                    <motion.h2
                        variants={fadeIn}
                        className="text-3xl  md:text-5xl font-medium text-off-white mb-3 font-inter w-2/4"
                    >
                        Stunning VFX, 2D & 3D Designs
                    </motion.h2>
                    <motion.h2
                        variants={fadeIn}
                        className="text-3xl  md:text-5xl font-medium text-off-white mb-3 font-inter w-2/4"
                    >
                        for Film and Beyond!
                    </motion.h2>
                    <motion.div
                        variants={fadeIn}
                        className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 md:mt-8"
                    >
                        <button
                            onClick={() => scrollTo("contact")}
                            className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors duration-300 w-full md:w-auto"
                        >
                            Let's talk
                        </button>
                        <button
                            onClick={() => scrollTo("work")}
                            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300 w-full md:w-auto"
                        >
                            My works
                        </button>
                    </motion.div>
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

                <motion.footer
                    id="contact"
                    className="flex flex-col gap-10 justify-between p-10"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    {/* <ul className="flex flex-wrap justify-center space-x-8"> */}
                    <ul className="flex flex-col justify-start font-normal text-[1.3rem] ">
                        <motion.li variants={fadeIn}>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                                view my behance
                            </a>
                        </motion.li>
                        <motion.li variants={fadeIn}>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                                get in touch
                            </a>
                        </motion.li>
                        <motion.li variants={fadeIn}>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-300">
                                view my dribble
                            </a>
                        </motion.li>
                    </ul>
                    <ul className="flex flex-col justify-start font-normal text-[1.4rem] text-[#909090] ">
                        <motion.li variants={fadeIn}>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Handcrafted by <span className='text-[#E9E9E9]'>Octane</span> </a>
                        </motion.li>
                    </ul>
                </motion.footer>
            </main>
        </div>
    );
}

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    // const [isTimelineVisible, setIsTimelineVisible] = useState(false);
    const timelineRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const autoScrollRef = useRef<NodeJS.Timeout>()

    const experiences = [
        {
            period: "Nov 2023 - Present",
            company: "Adfuel Media",
            role: "Multimedia Designer",
            image:"/about/aboutImg.png"
        },
        {
            period: "Aug 2022 - Sept 2023",
            company: "DNEG",
            role: "Lighting Technical Director",
            image:"/about/aboutImg.png"
        },
        {
            period: "Jan 2021 - July 2021",
            company: "Elite crest technologies",
            role: "Graphic Designer",
            image:"/about/aboutImg.png"
        },
        {
            period: "Aug 2020 - Dec 2020",
            company: "Shunya",
            role: "Motion graphic Designer",
            image:"/about/aboutImg.png"
        },
        {
            period: "July 2017 - Aug 2020",
            company: "Freelance",
            role: "Graphic Designer",
            image:"/about/aboutImg.png"
        },
    ];

    const scrollTo = useCallback((index: number) => {
        if (containerRef.current) {
            const newIndex = (index + experiences.length) % experiences.length;
            setCurrentIndex(newIndex);
            const cardWidth = window.innerWidth >= 768 ? containerRef.current.offsetWidth / 3 : containerRef.current.offsetWidth;
            const scrollLeft = newIndex * cardWidth;
            containerRef.current.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            });
        }
    }, [experiences.length]);
    
    // Infinite scroll functionality
    useEffect(() => {
        const startAutoScroll = () => {
            autoScrollRef.current = setInterval(() => {
                scrollTo(currentIndex + 1);
            }, 3000); // Scroll every 3 seconds
        };
    
        startAutoScroll();
    
        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [currentIndex, scrollTo]);

    // Pause auto-scroll on hover
    const handleMouseEnter = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current)
        }
    }

    // Resume auto-scroll on mouse leave
    const handleMouseLeave = () => {
        autoScrollRef.current = setInterval(() => {
            scrollTo(currentIndex + 1);
        }, 3000);
    }

    useEffect(() => {
        setIsLoaded(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // setIsTimelineVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }

        return () => {
            if (timelineRef.current) {
                observer.unobserve(timelineRef.current);
            }
        };
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

    return (
        <>
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
                    className="relative z-10 max-w-6xl mx-auto px-4 py-8 md:py-16"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    <div className="grid md:grid-cols-2 gap-8 mb-16 md:h-[600px]">
                        <motion.div variants={fadeIn} className="flex flex-col justify-center">
                            <motion.h1
                                className="text-3xl md:text-4xl font-bold mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                About me
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-3xl mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Hello I'm Rachana, a multi-disciplinary designer and VFX artist based in Toronto, Canada. I
                                specialize in crafting compelling motion graphics for brands and striking visual effects for
                                film.
                            </motion.p>
                            <motion.p
                                className="text-base md:text-xl font-light text-gray-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                With around 7 years of experience in the creative industry, I have cultivated a robust skill
                                set that blends both technical and artistic expertise. I hold a Post-Graduate degree in Visual
                                Effects from Sheridan College, Canada, and a Bachelor's in Multimedia, Digital Design, and VFX
                                from JNTUH, India, providing me with a comprehensive foundation in design and visual
                                storytelling.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            variants={fadeIn}
                            className="relative overflow-hidden rounded-lg h-64 md:h-auto"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src="https://plus.unsplash.com/premium_photo-1664366737698-3a98169201c3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="About me"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full mx-auto px-4 md:px-6 shadow-lg relative flex flex-col justify-center items-center min-h-[50vh]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 }
                    }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Experience Details</h2>
                    
                    {/* Navigation Buttons */}
                    <div className="w-full max-w-[1200px] relative">
                        <button 
                            onClick={() => scrollTo(currentIndex - 1)}
                            className="absolute left-0 md:-left-12 top-1/2 z-10 transform -translate-y-1/2 bg-gray-900/50 p-2 rounded-full hover:bg-gray-900/75 transition-colors"
                            aria-label="Previous experience"
                        >
                            <ChevronLeft className="h-6 w-6 text-white" />
                        </button>
                        <button 
                            onClick={() => scrollTo(currentIndex + 1)}
                            className="absolute right-0 md:-right-12 top-1/2 z-10 transform -translate-y-1/2 bg-gray-900/50 p-2 rounded-full hover:bg-gray-900/75 transition-colors"
                            aria-label="Next experience"
                        >
                            <ChevronRight className="h-6 w-6 text-white" />
                        </button>

                        {/* Cards Container */}
                        <div 
                            ref={containerRef}
                            className="flex overflow-x-hidden snap-x snap-mandatory w-full max-w-[1200px] mx-auto"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {[...experiences, ...experiences.slice(0, 2)].map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex-none w-full md:w-1/3 snap-center px-2"
                                >
                                    <div className="backdrop-blur-sm rounded-xl p-4 md:p-6 h-full text-center">
                                        <div className="aspect-square relative mb-4 md:mb-6">
                                            <img
                                                src={exp.image}
                                                alt={`${exp.company} illustration`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{exp.company}</h3>
                                        <p className="text-base md:text-lg text-gray-400 mb-2">{exp.role}</p>
                                        <p className="text-sm md:text-base text-gray-500">{exp.period}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <style>{`
                    @keyframes pulse {
                        0%,
                        100% {
                            opacity: 0.1;
                        }
                        50% {
                            opacity: 0.2;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}


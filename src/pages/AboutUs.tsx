import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTimelineVisible, setIsTimelineVisible] = useState(false);
    const timelineRef = useRef(null);

    useEffect(() => {
        setIsLoaded(true);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsTimelineVisible(true);
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

    const experiences = [
        {
            period: "Nov 2023 - Present",
            company: "Adfuel Media",
            role: "Multimedia Designer",
        },
        {
            period: "Aug 2022 - Sept 2023",
            company: "DNEG",
            role: "Lighting Technical Director",
        },
        {
            period: "Jan 2021 - July 2021",
            company: "Elite crest technologies",
            role: "Graphic Designer",
        },
        {
            period: "Aug 2020 - Dec 2020",
            company: "Shunya",
            role: "Motion graphic Designer",
        },
        {
            period: "July 2017 - Aug 2020",
            company: "Freelance",
            role: "Graphic Designer",
        },
    ];
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
                    className="relative z-10 max-w-6xl mx-auto px-4 py-16"
                    initial="hidden"
                    animate={isLoaded ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    <div className="grid md:grid-cols-2 gap-8 mb-16 h-[600px]">
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
                                className="text-3xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Hello I'm Rachana, a multi-disciplinary designer and VFX artist based in Toronto, Canada. I
                                specialize in crafting compelling motion graphics for brands and striking visual effects for
                                film.
                            </motion.p>
                            <br />
                            <motion.p
                                className="text-xl font-light text-gray-300"
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
                            className="relative overflow-hidden rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src="https://plus.unsplash.com/premium_photo-1664366737698-3a98169201c3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="About me"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg"
                    ref={timelineRef}
                    initial="hidden"
                    animate={isTimelineVisible ? "visible" : "hidden"}
                    variants={staggerChildren}
                >
                    <h2 className="text-3xl font-bold mb-8 text-center">Experience Details</h2>
                    <div className="relative">
                        {/* Animated vertical line */}
                        <div
                            className={`absolute left-[15px] top-[24px] w-[2px] bg-orange-500 transition-all duration-1000 ease-out ${
                                isTimelineVisible ? "h-full" : "h-0"
                            }`}
                        />

                        {experiences.map((exp, index) => (
                            <motion.div key={index} className="flex gap-4 mb-8" variants={fadeIn}>
                                {/* Timeline dot */}
                                <div className="relative w-8 h-8 shrink-0">
                                    <div className="absolute top-[8
                                    px] left-[8px] w-4 h-4 rounded-full bg-orange-500" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-2">
                                    <h3 className="font-bold text-lg text-orange-500">{exp.company}</h3>
                                    <p className="text-gray-300 font-medium">{exp.role}</p>
                                    <p className="text-sm text-gray-400 mt-1">{exp.period}</p>
                                </div>
                            </motion.div>
                        ))}
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

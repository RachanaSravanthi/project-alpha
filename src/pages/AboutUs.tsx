import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
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
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1668319914124-57301e0a1850?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                                    As a generalist I tackle almost all of post production whether it be 2D or animation,
                                    motion graphics, titles, visual effects or compositing
                                </motion.p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
        </>
    );
}

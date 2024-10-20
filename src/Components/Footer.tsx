import { motion } from "framer-motion";

interface FooterProps {
    isLoaded: boolean;
}

export default function Footer({ isLoaded }: FooterProps) {
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

    return (
        <motion.footer
            id="contact"
            className="flex flex-col gap-10 justify-between p-10"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={staggerChildren}
        >
            <motion.div
                variants={fadeIn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="bg-gray-900 text-[#FFF] py-10 px-8 shadow-sm rounded-md flex items-center justify-around md:flex-row flex-col space-y-6 md:space-y-0"
            >
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="text-2xl text-center"
                    >
                        Start a project!
                    </motion.h1>
                </div>
                <div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="text-center"
                    >
                        Interested in working together? We should queue
                        <br />
                        up a time to chat.
                    </motion.p>
                </div>
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="py-2 px-7 border-2 border-[#FFF] hover:bg-[#6b7bef] hover:border-[#6b7bef] rounded-lg duration-300 text-center"
                    href="mailto:imdelbingeorge@gmail.com"
                >
                    Lets do this!
                </motion.a>
            </motion.div>

            <ul className="flex flex-col justify-start font-normal text-[1.3rem]">
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
            <ul className="flex flex-col justify-start font-normal text-[1.4rem] text-[#909090]">
                <motion.li variants={fadeIn}>
                    <a href="https://www.devoctane.in" className="text-[1rem] font-inter font-medium tracking-wide">
                        <span className="text-[#4A4A4A] transition-colors duration-300">Handcrafted by </span>
                        <span className="text-[#909090] hover:underline">Octane</span>
                    </a>
                </motion.li>
            </ul>
        </motion.footer>
    );
}

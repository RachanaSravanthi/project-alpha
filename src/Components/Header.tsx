import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    isLoaded: boolean;
    scrollTo: (id: string) => void;
}

export default function Header({ isLoaded, scrollTo }: HeaderProps) {
    const fadeIn = {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    const navigate = useNavigate();

    return (
        <motion.header
            className="flex justify-center items-center p-4 bg-black text-white fixed top-0 left-0 w-full z-50"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <nav className="w-full">
                <ul className="flex justify-center items-center space-x-8">
                    <img
                        src="/Pic1.png"
                        alt="Profile"
                        className="rounded-full mb-4 md:mb-0 cursor-pointer w-8 h-8 object-cover"
                        onClick={() => navigate("/")}
                    />
                    <motion.li variants={fadeIn}>
                        <button
                            onClick={async () => {
                                await navigate("/");
                                scrollTo("work");
                            }}
                            className="hover:text-gray-600 lg:text-xl transition-colors duration-300 cursor-pointer"
                        >
                            Work
                        </button>
                    </motion.li>
                    <motion.li variants={fadeIn}>
                        <button
                            onClick={() => navigate("/about")}
                            className="hover:text-gray-600 lg:text-xl transition-colors duration-300 cursor-pointer"
                        >
                            About
                        </button>
                    </motion.li>
                    <motion.li variants={fadeIn}>
                        <button
                            onClick={() => navigate("/contact")}
                            className="hover:text-gray-600 lg:text-xl transition-colors duration-300 cursor-pointer"
                        >
                            Let's talk
                        </button>
                    </motion.li>
                </ul>
            </nav>
        </motion.header>
    );
}

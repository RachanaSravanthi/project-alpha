import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    isLoaded: boolean;
    scrollTo: (id: string) => void;
}

export default function Header({ isLoaded, scrollTo }: HeaderProps) {
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    const navigate = useNavigate();

    return (
        <motion.header
            className="flex justify-center items-center p-4 bg-white text-black sticky top-0 z-50"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeIn}
        >
            <nav className="w-full">
                <ul className="flex justify-center items-center space-x-8">
                    <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile"
                        className="rounded-full mb-4 md:mb-0 cursor-pointer w-8 h-8 object-cover"
                        onClick={() => navigate("/")}
                    />
                    <motion.li variants={fadeIn}>
                        <button
                            onClick={() => navigate("/about")}
                            className="hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                        >
                            About
                        </button>
                    </motion.li>
                    <motion.li variants={fadeIn}>
                        <button
                            onClick={async () => {
                                await navigate("/")
                                         scrollTo("work")
                        }
                        }
                            className="hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                        >
                            Work
                        </button>
                    </motion.li>
                    <motion.li variants={fadeIn}>
                        <button
                            onClick={() => navigate("/contact")}
                            className="hover:text-gray-600 transition-colors duration-300 cursor-pointer"
                        >
                            Let's talk
                        </button>
                    </motion.li>
                </ul>
            </nav>
        </motion.header>
    );
}

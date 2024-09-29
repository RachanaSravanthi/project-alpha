
import { motion } from "framer-motion";


interface HeaderProps {
  isLoaded: boolean;
  scrollTo: (id: string) => void;
}

export default function Header({ isLoaded, scrollTo }: HeaderProps) {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

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
  );
}
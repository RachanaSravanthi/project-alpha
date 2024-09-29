
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
          <h1 className="text-[1rem] font-inter font-medium tracking-wide">
            <span className="text-gray-400 transition-colors duration-300">Handcrafted by </span>
            <a className="text-[#E9E9E9] hover:underline" href="https://theoctane.vercel.app">
              Octane
            </a>
          </h1>
        </motion.li>
      </ul>
    </motion.footer>
  );
}
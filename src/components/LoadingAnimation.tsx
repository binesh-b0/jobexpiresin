import { motion } from "framer-motion";
import AnimatedShinyText from "./magicui/animated-shiny-text";

const loaderVariants = {
  initial: { scale: 0, rotate: 0, opacity: 0 },
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 360, 0],
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const, 
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: 1, 
      duration: 1 
    } 
  },
};

export default function LoadingAnimation() {
  return (
    <motion.div
      className="flex justify-center items-center mt-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Loader with improved animation */}
        <motion.div
          className="loader"
          variants={loaderVariants}
          initial="initial"
          animate="animate"
        ></motion.div>

        {/* Staggered text animation */}
        <motion.p
          className="text-lg mt-4 text-center"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">

          It should be somewhere around here...
          </AnimatedShinyText>
        </motion.p>
      </div>
    </motion.div>
  );
}

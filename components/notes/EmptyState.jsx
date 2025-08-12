"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EmptyState = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center min-h-[50vh] text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Empty State Image */}
      <motion.div
        className="mb-12"
        variants={imageVariants}
      >
        <Image src={'/Empty-icon.svg'} width={202} height={180} alt="Empty Icon" />
      </motion.div>

      {/* Text Content */}
      <motion.h2
        className="text-xl font-medium text-gray-700 mb-4"
        variants={itemVariants}
      >
        No note here...
      </motion.h2>

      <motion.p
        className="text-gray-500 text-sm leading-relaxed"
        variants={itemVariants}
      >
        Add notes and get
        <br />
        it is organized in the best
        <br />
        way!
      </motion.p>
    </motion.div>
  );
};

export default EmptyState;
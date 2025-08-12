"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

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

  return (
    <motion.div
      className="w-full text-center py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-md mx-auto rounded-lg border-2 border-dashed border-gray-300 p-12 bg-gray-50"
        variants={itemVariants}
      >
        <motion.div
          className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15,
            delay: 0.3,
          }}
        >
          <Plus className="w-8 h-8 text-gray-400" />
        </motion.div>

        <motion.h3
          className="text-lg font-medium text-gray-900 mb-2"
          variants={itemVariants}
        >
          No Notes Yet
        </motion.h3>

        <motion.p
          className="text-sm text-gray-500 mb-4"
          variants={itemVariants}
        >
          Create your first note by clicking the "Add" button above.
        </motion.p>

        <motion.div
          className="text-sm text-gray-500"
          variants={itemVariants}
        >
          <p>Organize your thoughts by priority:</p>
          <div className="flex justify-center gap-2 mt-3">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
              <span>Urgent</span>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-1"></div>
              <span>High</span>
            </motion.div>
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-teal-400 rounded-full mr-1"></div>
              <span>Low</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
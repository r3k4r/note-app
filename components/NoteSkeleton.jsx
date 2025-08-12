"use client"

import { motion } from "framer-motion"

export default function NoteSkeleton({ viewMode = "grid", count = 3 }) {
  // Create an array of the specified count to render multiple skeletons
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const getRandomHeight = () => {
    const heights = ["h-[120px]", "h-[130px]", "h-[140px]"];
    return heights[Math.floor(Math.random() * heights.length)];
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Skeleton for grid view
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative">
        {/* Column headers */}
        <div className="hidden md:contents">
          <div className="text-center mb-4">
            <motion.div 
              className="h-6 w-20 bg-gray-200 rounded-md mx-auto animate-pulse"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            ></motion.div>
          </div>
          <div className="text-center mb-4">
            <motion.div 
              className="h-6 w-20 bg-gray-200 rounded-md mx-auto animate-pulse"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            ></motion.div>
          </div>
          <div className="text-center mb-4">
            <motion.div 
              className="h-6 w-20 bg-gray-200 rounded-md mx-auto animate-pulse"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            ></motion.div>
          </div>
        </div>

        {/* Divider lines */}
        <div className="hidden md:block absolute left-1/3 top-0 bottom-0 border-l-2 border-dashed border-gray-200 transform -translate-x-1/2"></div>
        <div className="hidden md:block absolute left-2/3 top-0 bottom-0 border-l-2 border-dashed border-gray-200 transform -translate-x-1/2"></div>
            
        {/* Urgent Column */}
        <motion.div 
          className="space-y-4 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {skeletons.map((index) => (
            <motion.div 
              key={`urgent-${index}`} 
              className={`rounded-lg p-4 w-[380px] ${getRandomHeight()} animate-pulse bg-red-200 flex flex-col relative`}
              variants={itemVariants}
            >
              <div className="flex mb-3">
                <div className="w-5 h-5 rounded-md bg-red-300 mr-3"></div>
                <div className="flex-1 flex justify-between">
                  <div className="h-5 bg-red-300 rounded w-32"></div>
                  <div className="h-5 bg-red-300 rounded w-20"></div>
                </div>
              </div>
              <div className="flex-1 px-4">
                <div className="h-4 bg-red-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-red-300 rounded w-3/4"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* High Priority Column */}
        <motion.div 
          className="space-y-4 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {skeletons.map((index) => (
            <motion.div 
              key={`high-${index}`} 
              className={`rounded-lg p-4 w-[380px] ${getRandomHeight()} animate-pulse bg-orange-200 flex flex-col relative`}
              variants={itemVariants}
              transition={{ delay: index * 0.05 + 0.2 }}
            >
              <div className="flex mb-3">
                <div className="w-5 h-5 rounded-md bg-orange-300 mr-3"></div>
                <div className="flex-1 flex justify-between">
                  <div className="h-5 bg-orange-300 rounded w-32"></div>
                  <div className="h-5 bg-orange-300 rounded w-20"></div>
                </div>
              </div>
              <div className="flex-1 px-4">
                <div className="h-4 bg-orange-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-orange-300 rounded w-3/4"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Low Priority Column */}
        <motion.div 
          className="space-y-4 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {skeletons.map((index) => (
            <motion.div 
              key={`low-${index}`} 
              className={`rounded-lg p-4 w-[380px] ${getRandomHeight()} animate-pulse bg-teal-200 flex flex-col relative`}
              variants={itemVariants}
              transition={{ delay: index * 0.05 + 0.4 }}
            >
              <div className="flex mb-3">
                <div className="w-5 h-5 rounded-md bg-teal-300 mr-3"></div>
                <div className="flex-1 flex justify-between">
                  <div className="h-5 bg-teal-300 rounded w-32"></div>
                  <div className="h-5 bg-teal-300 rounded w-20"></div>
                </div>
              </div>
              <div className="flex-1 px-4">
                <div className="h-4 bg-teal-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-teal-300 rounded w-3/4"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Skeleton for list view
  return (
    <div className="flex justify-center">
      <motion.div 
        className="space-y-4 ml-20"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {skeletons.map((index) => (
          <motion.div 
            key={`list-${index}`} 
            className={`rounded-lg p-4 w-[450px] h-[130px] animate-pulse ${
              index % 3 === 0 
                ? "bg-red-200" 
                : index % 3 === 1 
                  ? "bg-orange-200" 
                  : "bg-teal-200"
            } relative mb-4`}
            variants={itemVariants}
          >
            <div className="flex h-full w-full">
              <div className={`w-5 h-5 rounded-md mr-3 ${
                index % 3 === 0 
                  ? "bg-red-300" 
                  : index % 3 === 1 
                    ? "bg-orange-300" 
                    : "bg-teal-300"
              }`}></div>
              
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between gap-12 mb-3 px-4">
                  <div className={`h-5 rounded w-32 ${
                    index % 3 === 0 
                      ? "bg-red-300" 
                      : index % 3 === 1 
                        ? "bg-orange-300" 
                        : "bg-teal-300"
                  }`}></div>
                  <div className={`h-5 rounded w-20 ${
                    index % 3 === 0 
                      ? "bg-red-300" 
                      : index % 3 === 1 
                        ? "bg-orange-300" 
                        : "bg-teal-300"
                  }`}></div>
                </div>
                
                <div className="flex items-start mb-3 px-4">
                  <div className="flex-1">
                    <div className={`h-4 rounded w-full mb-2 ${
                      index % 3 === 0 
                        ? "bg-red-300" 
                        : index % 3 === 1 
                          ? "bg-orange-300" 
                          : "bg-teal-300"
                    }`}></div>
                    <div className={`h-4 rounded w-3/4 ${
                      index % 3 === 0 
                        ? "bg-red-300" 
                        : index % 3 === 1 
                          ? "bg-orange-300" 
                          : "bg-teal-300"
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

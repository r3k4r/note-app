"use client"

import { Pencil, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function NoteCard({ note, onDelete, onEdit, viewMode = "grid" }) {
  const [isChecked, setIsChecked] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const contentLimit = 100
  const isContentLong = note.content.length > contentLimit

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-400"
      case "high":
        return "bg-orange-400"
      case "low":
        return "bg-teal-400"
      default:
        return "bg-gray-400"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB")
  }

  const cardVariants = {
    hidden: { 
      opacity: 0
    },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.2 } 
    }
  }

  const checkboxVariants = {
    checked: { scale: 1.2, transition: { type: "spring", stiffness: 500, damping: 15 } },
    unchecked: { scale: 1 }
  }

  if (viewMode === "list") {
    return (
      <motion.div 
        className={`${getPriorityColor(note.priority)} rounded-lg p-4 text-white relative mb-4 w-[450px] transition-all duration-300 ${isChecked ? 'opacity-70' : ''}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        style={{ height: isExpanded ? 'auto' : '130px' }}
      >
        <motion.button
          onClick={() => onDelete(note.id, note.priority)}
          className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>

        <div className='flex h-full w-full'>
          {/* CHECK BOX */}
          <motion.div 
            className="w-5 h-5 border-2 border-white rounded-md mr-3 flex-shrink-0 flex items-center my-auto justify-center cursor-pointer"
            onClick={() => setIsChecked(!isChecked)}
            variants={checkboxVariants}
            animate={isChecked ? "checked" : "unchecked"}
          >
            <AnimatePresence>
              {isChecked && (
                <motion.span 
                  className="text-white text-xs"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  ✓
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* NOTE CONTENT */}
          <div className='flex flex-col flex-1 overflow-hidden'>
            {/* TITLE AND DATE */}
            <div className="flex items-center justify-between gap-12 mb-3 px-4">
              <h3 className={`font-semibold text-lg pr-8 ${isChecked ? 'line-through' : ''}`}>{note.title}</h3>
              <span className="text-sm opacity-90 whitespace-nowrap pl-2">{formatDate(note.date)}</span>
            </div>

            {/* NOTE CONTENT */}
            <div className="flex items-start mb-3 px-4">
              <div className="flex-1 overflow-hidden">
                <p className={`text-sm opacity-90 leading-relaxed ${isChecked ? 'line-through' : ''} break-words`}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isExpanded ? 'expanded' : 'collapsed'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isExpanded ? note.content : note.content.slice(0, contentLimit)}
                    </motion.span>
                  </AnimatePresence>
                  
                  {!isExpanded && isContentLong && (
                    <>
                      {" "}
                      <motion.button 
                        onClick={() => setIsExpanded(true)}
                        className="text-xs underline inline-flex focus:outline-none hover:text-white/80"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        show more?
                      </motion.button>
                    </>
                  )}
                  {isExpanded && isContentLong && (
                    <motion.button 
                      onClick={() => setIsExpanded(false)} 
                      className="text-xs underline inline-flex ml-1 focus:outline-none hover:text-white/80"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      show less
                    </motion.button>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={`${getPriorityColor(note.priority)} rounded-lg p-4 text-white relative w-[380px] flex flex-col transition-all duration-300 ${isChecked ? 'opacity-70' : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      style={{ height: isExpanded ? 'auto' : '130px' }}
    >
      {/* Edit Button */}
      <div className='flex mb-3'>
          <motion.button
            onClick={() => onEdit(note)}
            className="absolute top-2 right-8 text-white hover:text-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Pencil size={16} />
          </motion.button>

          <motion.button
            onClick={() => onDelete(note.id, note.priority)}
            className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
      </div>

      <div className='flex h-full w-full'>
        {/* CHECK BOX */}
        <motion.div 
          className="w-5 h-5 border-2 border-white rounded-md mr-3 flex-shrink-0 flex items-center my-auto justify-center cursor-pointer"
          onClick={() => setIsChecked(!isChecked)}
          variants={checkboxVariants}
          animate={isChecked ? "checked" : "unchecked"}
        >
          <AnimatePresence>
            {isChecked && (
              <motion.span 
                className="text-white text-xs"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                ✓
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* NOTE CONTENT */}
        <div className='flex flex-col flex-1 overflow-hidden'>
          {/* TITLE AND DATE */}
          <div className="flex items-center justify-between mb-3 px-4">
            <h3 className={`font-semibold text-lg ${isChecked ? 'line-through' : ''} truncate pr-2`}>{note.title}</h3>
            <span className="text-sm opacity-90 whitespace-nowrap flex-shrink-0">{formatDate(note.date)}</span>
          </div>

          {/* NOTE CONTENT */}
          <div className="flex items-start mb-3 px-4">
            <div className="flex-1 overflow-hidden">
              <p className={`text-sm opacity-90 leading-relaxed ${isChecked ? 'line-through' : ''} break-words`}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isExpanded ? 'expanded' : 'collapsed'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isExpanded ? note.content : note.content.slice(0, contentLimit)}
                  </motion.span>
                </AnimatePresence>
                
                {!isExpanded && isContentLong && (
                  <>
                    {" "}
                    <motion.button 
                      onClick={() => setIsExpanded(true)}
                      className="text-xs underline inline-flex focus:outline-none hover:text-white/80"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      see more?
                    </motion.button>
                  </>
                )}
                {isExpanded && isContentLong && (
                  <motion.button 
                    onClick={() => setIsExpanded(false)} 
                    className="text-xs underline inline-flex ml-1 focus:outline-none hover:text-white/80"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    show less
                  </motion.button>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

}

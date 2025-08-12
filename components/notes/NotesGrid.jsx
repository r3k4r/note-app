"use client"

import { motion } from "framer-motion"
import NoteCard from "@/components/notes/NoteCard"

// Utility function defined outside component
const groupNotesByPriority = (notes) => {
  const urgent = notes.filter((note) => note.priority === "urgent")
  const high = notes.filter((note) => note.priority === "high")
  const low = notes.filter((note) => note.priority === "low")
  return { urgent, high, low }
}

// Animation variants defined outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function NotesGrid({ notes, onDelete, onEdit }) {
  const groupedNotes = groupNotesByPriority(notes);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-4 xl:gap-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hidden xl:contents">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-red-500 mb-4">Urgent</h3>
        </div>
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-orange-500 mb-4">High</h3>
        </div>
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-teal-500 mb-4">Low</h3>
        </div>
      </div>

      <div className="hidden xl:block absolute left-1/3 top-0 bottom-0 border-l-2 border-dashed border-gray-300 dark:border-gray-700 transform -translate-x-1/2"></div>
      <div className="hidden xl:block absolute left-2/3 top-0 bottom-0 border-l-2 border-dashed border-gray-300 dark:border-gray-700 transform -translate-x-1/2"></div>
    
      {/* Urgent Column */}
      <div className="space-y-4 flex flex-col items-center">
        {groupedNotes.urgent.map((note) => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onDelete={onDelete} 
            onEdit={onEdit}
            viewMode="grid" 
          />
        ))}
      </div>

      {/* High Priority Column */}
      <div className="space-y-4 flex flex-col items-center">
        {groupedNotes.high.map((note) => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onDelete={onDelete} 
            onEdit={onEdit}
            viewMode="grid" 
          />
        ))}
      </div>

      {/* Low Priority Column */}
      <div className="space-y-4 flex flex-col items-center">
        {groupedNotes.low.map((note) => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onDelete={onDelete} 
            onEdit={onEdit}
            viewMode="grid" 
          />
        ))}
      </div>
    </motion.div>
  )
}

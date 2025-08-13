'use client'

import { motion } from 'framer-motion'
import NoteCard from '@/components/notes/NoteCard'

// Utility function defined outside component
const sortNotesByPriority = notes => {
  const urgent = notes.filter(note => note.priority === 'urgent')
  const high = notes.filter(note => note.priority === 'high')
  const low = notes.filter(note => note.priority === 'low')
  return [...urgent, ...high, ...low]
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
}

export default function NotesList({ notes, onDelete, onEdit }) {
  const sortedNotes = sortNotesByPriority(notes)

  return (
    <div className="relative">
      {/* Priority Legend for List View */}
      <div className="mb-10 sm:mb-6 flex sm:flex-col gap-3 text-sm sm:absolute left-0 top-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-300">Urgent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-300">High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-300">Low</span>
        </div>
      </div>

      <motion.div
        className="flex justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-4 sm:ml-10 md:ml-20">
          {sortedNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={onDelete}
              onEdit={onEdit}
              viewMode="list"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

"use client"

import { motion, AnimatePresence } from "framer-motion"
import EmptyState from "@/components/EmptyState"
import NoteSkeleton from "@/components/NoteSkeleton"
import NotesGrid from "./NotesGrid"
import NotesList from "./NotesList"

export default function NotesContainer({ 
  isLoading,
  notes,
  viewMode,
  onDeleteNote, // This function should be properly setting state in the parent
  onEditNote
}) {
  if (isLoading) {
    return <NoteSkeleton viewMode={viewMode} />
  }

  if (!isLoading && notes.length === 0) {
    return <EmptyState />
  }

  return (
    <>
      {/* Legend for List View */}
      {viewMode === "list" && notes.length > 0 && (
        <div className="max-w-7xl mx-auto relative mb-4">
          {/* This space is for the legend which is now inside NotesList */}
        </div>
      )}

      {/* Notes View with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`view-${viewMode}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === "grid" ? (
            notes.length > 0 && (
              <NotesGrid 
                notes={notes} 
                onDelete={onDeleteNote} // Make sure this is being passed correctly
                onEdit={onEditNote} 
              />
            )
          ) : (
            notes.length > 0 && (
              <NotesList 
                notes={notes} 
                onDelete={onDeleteNote} // Make sure this is being passed correctly
                onEdit={onEditNote} 
              />
            )
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

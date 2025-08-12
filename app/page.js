"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Grid3X3, List, X, AlertTriangle } from "lucide-react"
import EmptyState from "@/components/EmptyState"
import NoteCard from "@/components/Note-Card"
import { useAuth } from "@/components/AuthContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import NoteSkeleton from "@/components/NoteSkeleton"
import { motion, AnimatePresence } from "framer-motion"
import NoteDialog from "@/components/NoteDialog"

export default function NotesDashboard() {
  const [viewMode, setViewMode] = useState("grid")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState("create")
  const [selectedNote, setSelectedNote] = useState(null)
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)
  
  const deleteDialogRef = useRef(null)

  // Animation variants for dialogs and view transitions
  const dialogVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  // Fetch notes when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchNotes()
    } else {
      // If not logged in, redirect to login
      router.push('/login')
    }
  }, [user])

  // Fetch notes from the API
  const fetchNotes = async () => {
    if (!user || !user.id) {
      toast.error("User not authenticated")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://688b2b592a52cabb9f506d87.mockapi.io/api/v1/users/${user.id}/notes`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch notes")
      }

      const fetchedNotes = await response.json()
      setNotes(fetchedNotes)
    } catch (error) {
      console.error("Error fetching notes:", error)
      toast.error("Failed to load notes. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle click outside to close delete dialog
  useEffect(() => {
    function handleClickOutside(event) {
      if (deleteDialogRef.current && !deleteDialogRef.current.contains(event.target)) {
        setDeleteDialogOpen(false)
      }
    }
    
    if (deleteDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [deleteDialogOpen])

  // Handle opening create note dialog
  const openCreateNoteDialog = () => {
    setDialogMode("create")
    setSelectedNote(null)
    setDialogOpen(true)
  }

  // Handle opening edit note dialog
  const handleEditNote = (note) => {
    setDialogMode("update")
    setSelectedNote(note)
    setDialogOpen(true)
  }

  // Handle note dialog success (create or update)
  const handleNoteDialogSuccess = (noteData) => {
    if (dialogMode === "create") {
      // Add new note to the notes array
      setNotes(prev => [...prev, noteData])
    } else {
      // Update existing note in the notes array
      setNotes(prev => prev.map(note => 
        note.id === noteData.id ? noteData : note
      ))
    }
  }

  // Handle note deletion - updated to show confirmation first
  const handleDeleteNote = (noteId, priority) => {
    const noteToRemove = notes.find(note => note.id === noteId)
    if (noteToRemove) {
      setNoteToDelete({ ...noteToRemove, id: noteId, priority })
      setDeleteDialogOpen(true)
    }
  }

  // Confirm and execute note deletion
  const confirmDeleteNote = async () => {
    if (!noteToDelete || !user || !user.id) {
      toast.error("Unable to delete note")
      return
    }
    
    try {
      const response = await fetch(
        `https://688b2b592a52cabb9f506d87.mockapi.io/api/v1/users/${user.id}/notes/${noteToDelete.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete note")
      }

      // Update local state
      setNotes((prev) => prev.filter((note) => note.id !== noteToDelete.id))
      toast.success("Note deleted successfully!")
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error("Failed to delete note. Please try again.")
    } finally {
      setDeleteDialogOpen(false)
      setNoteToDelete(null)
    }
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "low":
        return "text-teal-400"
      default:
        return "text-gray-400"
    }
  }

  const groupNotesByPriority = () => {
    const urgent = notes.filter((note) => note.priority === "urgent")
    const high = notes.filter((note) => note.priority === "high")
    const low = notes.filter((note) => note.priority === "low")

    if (viewMode === "grid") {
      return { urgent, high, low }
    } else {
      // For list view, return sorted array
      return [...urgent, ...high, ...low]
    }
  }


  // Handle view mode change
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Add debug useEffect to monitor viewMode changes
  useEffect(() => {
    console.log("Current view mode:", viewMode);
  }, [viewMode]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-16">
        {/* Add Note Button */}
        <button
          variant="outline"
          className="bg-white flex items-center border-2 border-gray-300 hover:bg-gray-50 transition-colors px-6 py-1 rounded-full text-gray-700 font-medium"
          onClick={openCreateNoteDialog}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </button>

        {/* LIST AND GRID TOGGLE - SIMPLIFIED */}
        <div className="bg-white border border-gray-300 rounded-xl shadow-sm flex overflow-hidden">
          <button
            onClick={() => handleViewModeChange("grid")}
            className={`p-2 px-4 rounded-l-lg transition-colors ${
              viewMode === "grid" 
                ? "bg-gray-200 text-gray-800 font-medium" 
                : "text-gray-600 hover:bg-gray-100 active:scale-95"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleViewModeChange("list")}
            className={`p-2 px-4 rounded-r-lg transition-colors ${
              viewMode === "list" 
                ? "bg-gray-200 text-gray-800 font-medium" 
                : "text-gray-600 hover:bg-gray-100 active:scale-95"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Loading State - Updated to pass viewMode */}
      {isLoading && (
        <NoteSkeleton viewMode={viewMode} />
      )}

      {/* Empty State */}
      {!isLoading && notes.length === 0 ? 
        <EmptyState />
        :
        <div className="max-w-7xl mx-auto relative">
          {viewMode === "list" && (
            /* Priority Legend for List View - now vertical */
            <div className="mb-6 flex flex-col gap-3 text-sm absolute left-0 top-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-gray-600">Urgent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                <span className="text-gray-600">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                <span className="text-gray-600">Low</span>
              </div>
            </div>
          )}
        </div>
      }

      {/* Notes List - Ensure viewMode is passed to all components */}
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key={`view-${viewMode}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === "grid" ? (
              notes.length !== 0 && 
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="hidden md:contents">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-red-500 mb-4">Urgent</h3>
                    </div>
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-orange-500 mb-4">High</h3>
                    </div>
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-teal-500 mb-4">Low</h3>
                    </div>
                  </div>

                  <div className="hidden md:block absolute left-1/3 top-0 bottom-0 border-l-2 border-dashed border-gray-300 transform -translate-x-1/2"></div>
                  <div className="hidden md:block absolute left-2/3 top-0 bottom-0 border-l-2 border-dashed border-gray-300 transform -translate-x-1/2"></div>
                
                {/* Urgent Column */}
                <div className="space-y-4 flex flex-col items-center">
                  {groupNotesByPriority().urgent.map((note) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      onDelete={handleDeleteNote} 
                      onEdit={handleEditNote}
                      viewMode={viewMode} 
                    />
                  ))}
                </div>

                {/* High Priority Column */}
                <div className="space-y-4 flex flex-col items-center">
                  {groupNotesByPriority().high.map((note) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      onDelete={handleDeleteNote} 
                      onEdit={handleEditNote}
                      viewMode={viewMode} 
                    />
                  ))}
                </div>

                {/* Low Priority Column */}
                <div className="space-y-4 flex flex-col items-center">
                  {groupNotesByPriority().low.map((note) => (
                    <NoteCard 
                      key={note.id} 
                      note={note} 
                      onDelete={handleDeleteNote} 
                      onEdit={handleEditNote}
                      viewMode={viewMode} 
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              notes.length > 0 && (
                <motion.div 
                  className="flex justify-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="space-y-4 ml-20">
                    {groupNotesByPriority().map((note) => (
                      <NoteCard 
                        key={note.id} 
                        note={note} 
                        onDelete={handleDeleteNote} 
                        onEdit={handleEditNote}
                        viewMode="list" // Force viewMode to ensure it's correct
                      />
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Note Dialog - for both Create and Edit */}
      <AnimatePresence>
        {dialogOpen && (
          <NoteDialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSuccess={handleNoteDialogSuccess}
            mode={dialogMode}
            noteData={selectedNote}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteDialogOpen && noteToDelete && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              ref={deleteDialogRef}
              className="relative bg-white rounded-3xl shadow-xl w-full max-w-sm p-8"
              variants={dialogVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >            
              <h2 className="text-xl font-bold text-center mb-4">
                Delete this <span className={getPriorityColor(noteToDelete.priority)}>Note</span>?
              </h2>
              
              <p className="text-gray-600 text-sm text-center mb-6">
                to be confirmed, It will not be possible to restore the deleted note.
              </p>
              
              <div className="flex gap-4 justify-center mt-10">
                <motion.button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-500 text-sm text-white font-semibold rounded-lg transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "#22c55e" }}
                  whileTap={{ scale: 0.95 }}
                >
                  No, Cancel
                </motion.button>
                
                <motion.button
                  onClick={confirmDeleteNote}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 text-sm text-white font-semibold rounded-lg transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Yes, Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
             

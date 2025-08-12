"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import NoteDialog from "@/components/NoteDialog"
import NoteHeader from "@/components/notes/NoteHeader"
import NotesContainer from "@/components/notes/NotesContainer"
import DeleteNoteDialog from "@/components/notes/DeleteNoteDialog"
import { ENDPOINTS } from "@/config"

export default function NotesDashboard() {
  const [viewMode, setViewMode] = useState("grid")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState("create")
  const [selectedNote, setSelectedNote] = useState(null)
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)
  
  const { user } = useAuth()
  const router = useRouter()

  // Fetch notes from API
  const fetchNotes = useCallback(async () => {
    if (!user || !user.id) return;
    
    setIsLoading(true)
    try {
      const response = await fetch(ENDPOINTS.NOTES(user.id))

      if (!response.ok) {
        toast.error("No Notes to Show. Please try again.")
        return
      }

      const fetchedNotes = await response.json()
      setNotes(fetchedNotes)
    } catch (error) {
      console.error("Error fetching notes:", error)
      toast.error("Failed to load notes. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [user]) 
  
  // Fetch notes when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchNotes()
    }
  }, [user, fetchNotes, router]) 

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
      setDeleteDialogOpen(true)  // Make sure this is being set to true
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
        ENDPOINTS.NOTE(user.id, noteToDelete.id),
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        toast.error("Failed to delete note. Please try again.")
        return
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <NoteHeader 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        openCreateNoteDialog={openCreateNoteDialog} 
      />

      {/* Notes Container */}
      <NotesContainer 
        isLoading={isLoading}
        notes={notes}
        viewMode={viewMode}
        onDeleteNote={handleDeleteNote}
        onEditNote={handleEditNote}
      />
      
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

      {/* Delete Confirmation Dialog - Updated to use open prop */}
      <DeleteNoteDialog 
        noteToDelete={noteToDelete}
        open={deleteDialogOpen}  // Pass the open state prop
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteNote}
      />
    </div>
  )
}



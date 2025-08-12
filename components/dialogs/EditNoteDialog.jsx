"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "../AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import NoteForm from "./NoteForm"
import { ENDPOINTS } from "@/config"
import { Spinner } from "@/components/ui/spinner"

export default function EditNoteDialog({ isOpen, onClose, onSuccess, noteData }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [defaultValues, setDefaultValues] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (noteData) {
      setDefaultValues({
        title: noteData.title || "",
        content: noteData.content || "",
        date: noteData.date || "",
        priority: noteData.priority || ""
      })
    }
  }, [noteData])

  const handleUpdateNote = async (data) => {
    if (!user || !user.id || !noteData || !noteData.id) {
      toast.error("Cannot update note. Missing information.")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const url = ENDPOINTS.NOTE(user.id, noteData.id)
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update note")
      }

      const responseData = await response.json()
      
      toast.success("Note updated successfully!")
      onSuccess(responseData)
      onClose()
      
    } catch (error) {
      console.error("Error updating note:", error)
      toast.error("Failed to update note. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Only render the dialog if we have default values
  if (!defaultValues && noteData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-black">
            Edit Note
            {isSubmitting && <Spinner size="sm" color="black" className="ml-2" />}
          </DialogTitle>
        </DialogHeader>
        
        <NoteForm 
          defaultValues={defaultValues}
          onSubmit={handleUpdateNote}
          isSubmitting={isSubmitting}
          mode="update"
        />
      </DialogContent>
    </Dialog>
  )
}

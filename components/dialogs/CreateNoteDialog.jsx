"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import NoteForm from "./NoteForm"
import { axiosClient, API_PATHS } from "@/config"

export default function CreateNoteDialog({ isOpen, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()

  const handleCreateNote = async (data) => {
    if (!user || !user.id) {
      toast.error("Please log in to create notes")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create note with axios
      const response = await axiosClient.post(API_PATHS.NOTES(user.id), data);
      
      toast.success("Note created successfully!")
      onSuccess(response.data)
      onClose()
      
    } catch (error) {
      console.error("Error creating note:", error)
      toast.error("Failed to create note. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
        </DialogHeader>
        
        <NoteForm 
          onSubmit={handleCreateNote}
          isSubmitting={isSubmitting}
          mode="create"
        />
      </DialogContent>
    </Dialog>
  )
}
       

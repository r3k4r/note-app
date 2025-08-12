"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "../AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import NoteForm from "./NoteForm"
import { ENDPOINTS } from "@/config"

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
      const url = ENDPOINTS.NOTES(user.id)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create note")
      }

      const responseData = await response.json()
      
      toast.success("Note created successfully!")
      onSuccess(responseData)
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

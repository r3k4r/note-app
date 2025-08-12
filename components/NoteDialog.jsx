"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "./AuthContext"
import { ENDPOINTS } from "@/config"
import CreateNoteDialog from "./dialogs/CreateNoteDialog"
import EditNoteDialog from "./dialogs/EditNoteDialog"

export default function NoteDialog({ 
  isOpen, 
  onClose, 
  onSuccess, 
  mode = "create", 
  noteData = null 
}) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (mode === "update" && noteData) {
      setFormData({
        title: noteData.title,
        content: noteData.content,
      })
    } else {
      setFormData({
        title: "",
        content: "",
      })
    }
  }, [mode, noteData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user || !user.id) {
      toast.error("Please log in to manage notes")
      return
    }
    
    setIsSubmitting(true)
    
    try {
      let url = ENDPOINTS.NOTES(user.id)
      let method = 'POST'
      
      if (mode === "update" && noteData && noteData.id) {
        url = ENDPOINTS.NOTE(user.id, noteData.id)
        method = 'PUT' 
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()

      toast.success(`Note ${mode === "create" ? "created" : "updated"} successfully`)
      onSuccess(result)
      onClose()
    } catch (error) {
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} note: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (mode === "create") {
    return (
      <CreateNoteDialog
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    )
  }
  
  return (
    <EditNoteDialog
      isOpen={isOpen}
      onClose={onClose}
      onSuccess={onSuccess}
      noteData={noteData}
    />
  )}



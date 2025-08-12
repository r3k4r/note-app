"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "./AuthContext"

export default function NoteDialog({ 
  isOpen, 
  onClose, 
  onSuccess, 
  mode = "create", 
  noteData = null 
}) {
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dialogRef = useRef(null)
  
  // Initialize form state - either with provided note data or empty values
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    priority: ""
  })

  // Update form data when noteData changes or mode changes
  useEffect(() => {
    if (mode === "update" && noteData) {
      setFormData({
        title: noteData.title || "",
        content: noteData.content || "",
        date: noteData.date || "",
        priority: noteData.priority || ""
      })
    } else {
      // Reset form for create mode
      setFormData({
        title: "",
        content: "",
        date: "",
        priority: ""
      })
    }
  }, [mode, noteData, isOpen])

  // Handle click outside to close dialog
  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle priority selection
  const handlePrioritySelect = (priority) => {
    setFormData(prev => ({ ...prev, priority }))
  }

  // Handle form submission - Create or Update a note
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user || !user.id) {
      toast.error("Please log in to manage notes")
      return
    }
    
    if (!formData.priority) {
      toast.error("Please select a priority level")
      return
    }

    setIsSubmitting(true)
    
    try {
      let url = `https://688b2b592a52cabb9f506d87.mockapi.io/api/v1/users/${user.id}/notes`
      let method = 'POST'
      
      if (mode === "update" && noteData && noteData.id) {
        url = `${url}/${noteData.id}`
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
        toast.error(`Failed to ${mode === "create" ? "create" : "update"} note. Please try again.`)
      }

      const responseData = await response.json()
      
      // Show success message
      toast.success(mode === "create" ? "Note created successfully!" : "Note updated successfully!")
      
      // Call the success callback with the created/updated note
      onSuccess(responseData)
      
      // Close dialog
      onClose()
      
    } catch (error) {
      console.error(`Error ${mode === "create" ? "creating" : "updating"} note:`, error)
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} note. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Dialog title and button text based on mode
  const dialogTitle = mode === "create" ? "Add New Note" : "Edit Note"
  const buttonText = mode === "create" 
    ? (isSubmitting ? "Creating Note..." : "Add Note") 
    : (isSubmitting ? "Updating Note..." : "Update Note")

  // Animation variants
  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 } 
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div 
        ref={dialogRef}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        variants={dialogVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 rounded-full p-1 transition-all duration-200 transform hover:scale-110"
          aria-label="Close dialog"
          disabled={isSubmitting}
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Dialog Title */}
        <h2 className="text-xl font-semibold text-center mb-6">{dialogTitle}</h2>
        
        {/* Note Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className={`w-full p-2 border rounded-md transition-colors duration-200
                ${formData.title 
                  ? 'border-2 border-green-500' 
                  : 'border-gray-300'} 
                focus:outline-none focus:ring-2 focus:ring-gray-200`}
              placeholder="Title"
            />
          </div>
          
          {/* Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              rows={4}
              className={`w-full p-2 border rounded-md transition-colors duration-200
                ${formData.content 
                  ? 'border-2 border-green-500' 
                  : 'border-gray-300'} 
                focus:outline-none focus:ring-2 focus:ring-gray-200`}
              placeholder="Content"
            />
          </div>
          
          {/* Date Input */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className={`w-full p-2 border rounded-md transition-colors duration-200
                ${formData.date 
                  ? 'border-2 border-green-500' 
                  : 'border-gray-300'} 
                focus:outline-none focus:ring-2 focus:ring-gray-200`}
            />
          </div>
          
          {/* Priority Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handlePrioritySelect("urgent")}
                disabled={isSubmitting}
                className={`flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-red-400 hover:bg-red-500 transition-colors
                  ${formData.priority === "urgent" ? "ring-2 ring-offset-2 ring-red-500 bg-red-500" : ""}`}
              >
                Urgent
              </button>
              <button
                type="button"
                onClick={() => handlePrioritySelect("high")}
                disabled={isSubmitting}
                className={`flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-yellow-600 hover:bg-yellow-700 transition-colors
                  ${formData.priority === "high" ? "ring-2 ring-offset-2 ring-yellow-700 bg-yellow-700" : ""}`}
              >
                High
              </button>
              <button
                type="button"
                onClick={() => handlePrioritySelect("low")}
                disabled={isSubmitting}
                className={`flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors
                  ${formData.priority === "low" ? "ring-2 ring-offset-2 ring-teal-700 bg-teal-700" : ""}`}
              >
                Low
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-2 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-1.5 text-white font-medium rounded-lg bg-gradient-to-r from-left to-right disabled:opacity-70"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

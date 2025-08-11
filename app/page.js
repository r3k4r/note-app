"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Grid3X3, List, X } from "lucide-react"
import EmptyState from "@/components/EmptyState"


export default function NotesDashboard() {
  const [viewMode, setViewMode] = useState("grid")
  const [openDialog, setOpenDialog] = useState(false)
  const [notes, setNotes] = useState([])
  
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    date: "",
    priority: ""
  })

  
  const dialogRef = useRef(null)

  // Handle click outside to close dialog
  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setOpenDialog(false)
      }
    }
    
    if (openDialog) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDialog])

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewNote(prev => ({ ...prev, [name]: value }))
  }

  // Handle priority selection
  const handlePrioritySelect = (priority) => {
    setNewNote(prev => ({ ...prev, priority }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Add new note to the notes array
    setNotes(prev => [...prev, { ...newNote }])
    // Reset form
    setNewNote({
      title: "",
      content: "",
      date: "",
      priority: ""
    })
    // Close dialog
    setOpenDialog(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-16">
        {/* Add Note Button */}
        <button
          variant="outline"
          className="bg-white flex items-center border-2 border-gray-300 hover:bg-gray-50 transition-colors px-6 py-1 rounded-full text-gray-700 font-medium"
          onClick={() => setOpenDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </button>

        {/* LIST AND GRID TOGGLE */}
        <div className="bg-white border border-gray-300 rounded-xl shadow-sm flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 px-4 rounded-l-lg transition-colors ${
                viewMode === "grid" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 px-4 rounded-r-lg transition-colors ${
                viewMode === "list" ? "bg-gray-200 text-gray-800" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      {/* Empty State */}
      { notes.length === 0 && 
        <EmptyState />
      }

      {/* Add Note Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            ref={dialogRef}
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in duration-200"
          >
            {/* Close Button */}
            <button 
              onClick={() => setOpenDialog(false)}
              className="absolute top-3 right-3 text-gray-600 rounded-full p-1 transition-all duration-200 transform hover:scale-110"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Dialog Title */}
            <h2 className="text-xl font-semibold text-center mb-6">Add New Note</h2>
            
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
                  value={newNote.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                  value={newNote.content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                  value={newNote.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                    className={`flex-1 py-2 px-3 rounded-md font-medium text-white bg-red-500 hover:bg-red-600 transition-colors
                      ${newNote.priority === "urgent" ? "ring-2 ring-offset-2 ring-red-500" : ""}`}
                  >
                    Urgent
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrioritySelect("high")}
                    className={`flex-1 py-2 px-3 rounded-md font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors
                      ${newNote.priority === "high" ? "ring-2 ring-offset-2 ring-yellow-500" : ""}`}
                  >
                    High
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrioritySelect("low")}
                    className={`flex-1 py-2 px-3 rounded-md font-medium text-white bg-green-500 hover:bg-green-600 transition-colors
                      ${newNote.priority === "low" ? "ring-2 ring-offset-2 ring-green-500" : ""}`}
                  >
                    Low
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

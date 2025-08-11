"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Grid3X3, List, X } from "lucide-react"
import EmptyState from "@/components/EmptyState"
import NoteCard from "@/components/Note-Card"


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


  // Handle note deletion
   const handleDeleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
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
      { notes.length === 0 ? 
        <EmptyState />
        :
         <div className="max-w-7xl mx-auto">
          {viewMode === "list" && (
            /* Priority Legend for List View */
            <div className="mb-6 flex flex-wrap gap-4 text-sm">
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

      {/* Notes List */}
      {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Urgent Column */}
              <div className="space-y-4">
                {groupNotesByPriority().urgent.map((note) => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                ))}
              </div>

              {/* High Priority Column */}
              <div className="space-y-4">
                {groupNotesByPriority().high.map((note) => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                ))}
              </div>

              {/* Low Priority Column */}
              <div className="space-y-4">
                {groupNotesByPriority().low.map((note) => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl space-y-4">
              {groupNotesByPriority().map((note) => (
                <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
              ))}
            </div>
          )}
      

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
                  className={`w-full p-2 border rounded-md transition-colors duration-200
                    ${newNote.title 
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
                  value={newNote.content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className={`w-full p-2 border rounded-md transition-colors duration-200
                    ${newNote.content 
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
                  value={newNote.date}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-2 border rounded-md transition-colors duration-200
                    ${newNote.date 
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
                    className={`flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-red-400 hover:bg-red-500 transition-colors
                      ${newNote.priority === "urgent" ? "ring-2 ring-offset-2 ring-red-500 bg-red-500" : ""}`}
                  >
                    Urgent
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrioritySelect("high")}
                    className={`flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-yellow-600 hover:bg-yellow-700 transition-colors
                      ${newNote.priority === "high" ? "ring-2 ring-offset-2 ring-yellow-700 bg-yellow-700" : ""}`}
                  >
                    High
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrioritySelect("low")}
                    className={`flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors
                      ${newNote.priority === "low" ? "ring-2 ring-offset-2 ring-teal-700 bg-teal-700" : ""}`}
                  >
                    Low
                  </button>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-1.5 text-white font-medium rounded-lg bg-gradient-to-r from-left to-right"
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

"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, Grid3X3, List, X, AlertTriangle } from "lucide-react"
import EmptyState from "@/components/EmptyState"
import NoteCard from "@/components/Note-Card"


export default function NotesDashboard() {
  const [viewMode, setViewMode] = useState("grid")
  const [openDialog, setOpenDialog] = useState(false)
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Sample Note 1",
      content: "This is a sample note content.",
      date: "2023-10-01",
      priority: "urgent"
    },
    {
      id: 2,
      title: "Sample Note 2",
      content: "This is another sample note content.",
      date: "2023-10-02",
      priority: "high"
    },
    {
      id: 3,
      title: "Sample Note 3",
      content: "This is yet another sample note content.",
      date: "2023-10-03",
      priority: "low"
    }
  ])
  
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    date: "",
    priority: ""
  })

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)
  
  
  const dialogRef = useRef(null)
  const deleteDialogRef = useRef(null)

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

  // Handle note deletion - updated to show confirmation first
  const handleDeleteNote = (noteId, priority) => {
    const noteToRemove = notes.find(note => note.id === noteId)
    if (noteToRemove) {
      setNoteToDelete({ ...noteToRemove, id: noteId, priority })
      setDeleteDialogOpen(true)
    }
  }

  // Confirm and execute note deletion
  const confirmDeleteNote = () => {
    if (noteToDelete) {
      setNotes((prev) => prev.filter((note) => note.id !== noteToDelete.id))
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

      {/* Notes List */}
      {viewMode === "grid" ? (
        notes.length !== 0 && 
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative">
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
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                ))}
              </div>

              {/* High Priority Column */}
              <div className="space-y-4 flex flex-col items-center">
                {groupNotesByPriority().high.map((note) => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                ))}
              </div>

              {/* Low Priority Column */}
              <div className="space-y-4 flex flex-col items-center">
                {groupNotesByPriority().low.map((note) => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="space-y-4 ml-20"> {/* Added ml-20 to make space for the legend */}
                {groupNotesByPriority().map((note) => (
                  <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} viewMode={viewMode} />
                ))}
              </div>
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

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && noteToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            ref={deleteDialogRef}
            className="relative bg-white rounded-3xl shadow-xl w-full max-w-sm p-8 animate-in fade-in duration-200"
          >            
            <h2 className="text-xl font-bold text-center mb-4">
              Delete this <span className={getPriorityColor(noteToDelete.priority)}>Note</span>?
            </h2>
            
            <p className="text-gray-600 text-sm text-center mb-6">
              to be confirmed, It will not be possible to restore the deleted note.
            </p>
            
            <div className="flex gap-4 justify-center mt-10">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-sm text-white font-semibold rounded-lg transition-colors"
              >
                No, Cancel
              </button>
              
              <button
                onClick={confirmDeleteNote}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-sm text-white font-semibold rounded-lg transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

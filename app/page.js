"use client"

import { useState } from "react"
import { Plus, Grid3X3, List } from "lucide-react"
import EmptyState from "@/components/EmptyState"


export default function NotesDashboard() {
  const [viewMode, setViewMode] = useState("grid")
  const [openDialog, setOpenDialog] = useState(false)
  const [notes, setNotes] = useState([])

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

    </div>
  )
}

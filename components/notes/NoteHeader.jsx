"use client"

import { Plus, Grid3X3, List } from "lucide-react"

export default function NoteHeader({ viewMode, setViewMode, openCreateNoteDialog }) {
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="flex items-center gap-4 mb-16">
      {/* Add Note Button */}
      <button
        variant="outline"
        className="bg-white dark:bg-gray-800 flex items-center border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors px-6 py-1 rounded-full text-gray-700 dark:text-gray-200 font-medium"
        onClick={openCreateNoteDialog}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add
      </button>

      {/* LIST AND GRID TOGGLE */}
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm flex overflow-hidden">
        <button
          onClick={() => handleViewModeChange("grid")}
          className={`p-2 px-4 rounded-l-lg transition-colors ${
            viewMode === "grid" 
              ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleViewModeChange("list")}
          className={`p-2 px-4 rounded-r-lg transition-colors ${
            viewMode === "list" 
              ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95"
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

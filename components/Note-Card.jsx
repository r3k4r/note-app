"use client"

import { X } from "lucide-react"

export default function NoteCard({ note, onDelete, viewMode = "grid" }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-400"
      case "high":
        return "bg-orange-400"
      case "low":
        return "bg-teal-400"
      default:
        return "bg-gray-400"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB")
  }

  if (viewMode === "list") {
    return (
      <div className={`${getPriorityColor(note.priority)} rounded-lg p-4 text-white relative mb-4`}>
        <button
          onClick={() => onDelete(note.id)}
          className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <span className="text-sm opacity-90">{formatDate(note.date)}</span>
        </div>

        <p className="text-sm opacity-90 leading-relaxed">{note.content}</p>
      </div>
    )
  }

  return (
    <div className={`${getPriorityColor(note.priority)} rounded-lg p-4 text-white relative h-48 flex flex-col`}>
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg pr-6">{note.title}</h3>
        <span className="text-sm opacity-90 whitespace-nowrap">{formatDate(note.date)}</span>
      </div>

      <div className="flex items-start mb-3">
        <div className="w-4 h-4 border-2 border-white rounded mr-3 mt-1 flex-shrink-0"></div>
        <p className="text-sm opacity-90 leading-relaxed flex-1 overflow-hidden">{note.content}</p>
      </div>
    </div>
  )
}

"use client"

import { X } from "lucide-react"
import { useState } from "react"

export default function NoteCard({ note, onDelete, viewMode = "grid" }) {
  const [isChecked, setIsChecked] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const contentLimit = 50
  const isContentLong = note.content.length > contentLimit

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

        <div className="flex justify-between items-start mb-2 px-4">
          <h3 className="font-semibold text-lg">{note.title}</h3>
          <span className="text-sm opacity-90">{formatDate(note.date)}</span>
        </div>

        <div className='px-4'>
            <p className="text-sm opacity-90 leading-relaxed">{note.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${getPriorityColor(note.priority)} rounded-lg p-4 text-white relative w-[380px] ${isExpanded ? 'h-auto' : 'h-[130px]'} flex flex-col transition-all duration-300 ${isChecked ? 'opacity-70' : ''}`}>
      <button
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className='flex h-full w-full'>
        {/* CHECK BOX */}
        <div 
          className="w-5 h-5 border-2 border-white rounded-md mr-3 flex-shrink-0 flex items-center my-auto justify-center cursor-pointer"
          onClick={() => setIsChecked(!isChecked)}
        >
          {isChecked && <span className="text-white text-xs">✓</span>}
        </div>

        {/* NOTE CONTENT */}
        <div className='flex flex-col'>
            {/* TITLE AND DATE */}
            <div className="flex items-center justify-between gap-12 mb-3 px-4">
                <h3 className={`font-semibold text-lg pr-8 ${isChecked ? 'line-through' : ''}`}>{note.title}</h3>
                <span className="text-sm opacity-90 whitespace-nowrap pl-2">{formatDate(note.date)}</span>
            </div>

            {/* NOTE CONTENT */}
            <div className="flex items-start mb-3 px-4">
                <div className="flex-1 overflow-hidden">
                <p className={`text-sm opacity-90 leading-relaxed ${isChecked ? 'line-through' : ''}`}>
                    {isExpanded ? note.content : note.content.slice(0, contentLimit)}
                    {!isExpanded && isContentLong && '...'}
                </p>
                {isContentLong && (
                    <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="text-xs underline mt-1 focus:outline-none hover:text-white/80"
                    >
                    {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                )}
                </div>
            </div>
        </div>
      </div>


    </div>
  )
}

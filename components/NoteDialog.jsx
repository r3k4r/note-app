"use client"

import CreateNoteDialog from "./dialogs/CreateNoteDialog"
import EditNoteDialog from "./dialogs/EditNoteDialog"

export default function NoteDialog({ 
  isOpen, 
  onClose, 
  onSuccess, 
  mode = "create", 
  noteData = null 
}) {
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

       

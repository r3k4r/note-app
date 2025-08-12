"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

export default function DeleteNoteDialog({ noteToDelete, onClose, onConfirm, open }) {
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-black">
            Delete this <span className={getPriorityColor(noteToDelete?.priority)}>Note</span>?
          </DialogTitle>
          <DialogDescription className="text-center">
            To be confirmed, it will not be possible to restore the deleted note.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex justify-center gap-4 sm:justify-center mt-6">
          <motion.button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-sm text-white font-semibold rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            No, Cancel
          </motion.button>
          
          <motion.button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 text-sm text-white font-semibold rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes, Delete
          </motion.button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

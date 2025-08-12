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

export default function LogoutDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-black dark:text-white">
            Do you want to <span className="text-red-500">logout </span>?
          </DialogTitle>
          <DialogDescription className="text-center dark:text-gray-300">
            Please confirm if you want to logout.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2 max-w-36 bg-green-600 hover:bg-green-500 text-sm text-white font-semibold rounded-lg transition-colors"
          >
            No, Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="px-6 py-2 max-w-36 bg-red-600 hover:bg-red-500 text-sm text-white font-semibold rounded-lg transition-colors"
          >
            Yes, Continue
          </motion.button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

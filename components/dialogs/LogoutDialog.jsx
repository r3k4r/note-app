"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function LogoutDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Log Out
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex justify-center gap-4 sm:justify-center mt-6">
          <Button 
            variant="secondary" 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={onConfirm}
            className="bg-gradient-to-r from-left to-right"
          >
            Yes, Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

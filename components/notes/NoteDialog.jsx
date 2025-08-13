'use client'

import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'
import { useAuth } from '../AuthContext'
import { axiosClient, API_PATHS } from '@/config'
import CreateNoteDialog from '../dialogs/CreateNoteDialog'
import EditNoteDialog from '../dialogs/EditNoteDialog'

export default function NoteDialog({
  isOpen,
  onClose,
  onSuccess,
  mode = 'create',
  noteData = null,
}) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (mode === 'update' && noteData) {
      setFormData({
        title: noteData.title,
        content: noteData.content,
      })
    } else {
      setFormData({
        title: '',
        content: '',
      })
    }
  }, [mode, noteData])

  const handleSubmit = async e => {
    e.preventDefault()

    if (!user || !user.id) {
      toast.error('Please log in to manage notes')
      return
    }

    setIsSubmitting(true)

    try {
      let url = API_PATHS.NOTES(user.id)

      if (mode === 'create') {
        const response = await axiosClient.post(url, formData)
        const result = response.data
        toast.success('Note created successfully')
        onSuccess(result)
      } else {
        const response = await axiosClient.put(API_PATHS.NOTE(user.id, noteData.id), formData)
        const result = response.data
        toast.success('Note updated successfully')
        onSuccess(result)
      }

      onClose()
    } catch (error) {
      toast.error(`Failed to ${mode === 'create' ? 'create' : 'update'} note: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (mode === 'create') {
    return <CreateNoteDialog isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
  }

  return (
    <EditNoteDialog isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} noteData={noteData} />
  )
}

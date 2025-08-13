'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema } from './NoteSchema'
import { Spinner } from '@/components/ui/spinner'

// Priority button configurations defined outside component
const priorityButtons = [
  {
    id: 'urgent',
    label: 'Urgent',
    baseClass:
      'flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-red-400 hover:bg-red-500 transition-colors',
    activeClass: 'ring-2 ring-offset-2 ring-red-500 bg-red-500',
  },
  {
    id: 'high',
    label: 'High',
    baseClass:
      'flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-yellow-600 hover:bg-yellow-700 transition-colors',
    activeClass: 'ring-2 ring-offset-2 ring-yellow-700 bg-yellow-700',
  },
  {
    id: 'low',
    label: 'Low',
    baseClass:
      'flex-1 py-1 px-3 rounded-2xl font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors',
    activeClass: 'ring-2 ring-offset-2 ring-teal-700 bg-teal-700',
  },
]

export default function NoteForm({ defaultValues, onSubmit, isSubmitting, mode = 'create' }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: defaultValues || {
      title: '',
      content: '',
      date: '',
      priority: '',
    },
  })

  const watchedPriority = watch('priority')
  const watchedTitle = watch('title')
  const watchedContent = watch('content')
  const watchedDate = watch('date')

  const handlePrioritySelect = priority => {
    setValue('priority', priority, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title Input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          className={`w-full p-2 border rounded-md transition-colors duration-200
            ${
              errors.title
                ? 'border-red-300 dark:border-red-500'
                : watchedTitle
                  ? 'border-green-500 dark:border-green-500'
                  : 'border-gray-300 dark:border-gray-600'
            } 
            focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
            dark:bg-gray-700 dark:text-white`}
          placeholder="Title"
          disabled={isSubmitting}
          {...register('title')}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      {/* Content Textarea */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={4}
          className={`w-full p-2 border rounded-md transition-colors duration-200
            ${
              errors.content
                ? 'border-red-300 dark:border-red-500'
                : watchedContent
                  ? 'border-green-500 dark:border-green-500'
                  : 'border-gray-300 dark:border-gray-600'
            } 
            focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
            dark:bg-gray-700 dark:text-white`}
          placeholder="Content"
          disabled={isSubmitting}
          {...register('content')}
        />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
      </div>

      {/* Date Input */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className={`w-full p-2 border rounded-md transition-colors duration-200
            ${
              errors.date
                ? 'border-red-300 dark:border-red-500'
                : watchedDate
                  ? 'border-green-500 dark:border-green-500'
                  : 'border-gray-300 dark:border-gray-600'
            } 
            focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
            dark:bg-gray-700 dark:text-white`}
          disabled={isSubmitting}
          {...register('date')}
        />
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
      </div>

      {/* Priority Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Priority Level
        </label>
        <div className="flex gap-3">
          {priorityButtons.map(button => (
            <button
              key={button.id}
              type="button"
              onClick={() => handlePrioritySelect(button.id)}
              disabled={isSubmitting}
              className={`${button.baseClass} ${watchedPriority === button.id ? button.activeClass : ''}`}
            >
              {button.label}
            </button>
          ))}
        </div>
        {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-5 py-1.5 text-white font-medium rounded-lg bg-gradient-to-r from-left to-right disabled:opacity-70 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Spinner size="sm" className="mr-2" />
              {mode === 'create' ? 'Creating...' : 'Updating...'}
            </>
          ) : mode === 'create' ? (
            'Create Note'
          ) : (
            'Update Note'
          )}
        </button>
      </div>
    </form>
  )
}

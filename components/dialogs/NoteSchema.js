import { z } from 'zod'

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  date: z.string().min(1, "Date is required"),
  priority: z.enum(["urgent", "high", "low"], {
    errorMap: () => ({ message: "Please select a priority level" })
  })
})

export default noteSchema

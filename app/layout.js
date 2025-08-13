import Navbar from '@/components/Navbar'
import './globals.css'
import { AuthProvider } from '@/components/AuthContext'
import { Toaster } from 'sonner'
import ThemeProvider from '@/components/theme/ThemeProvider'

export const metadata = {
  title: 'Note App',
  description:
    'This Notes App is a modern, responsive web application designed to help users efficiently manage their notes with a priority-based organization system. Built with React (Next.js) and Tailwind CSS, the app features a clean, intuitive interface that supports creating, editing, and deleting notes, each categorized into three priority levels — Urgent, High, and Low. Users can register, log in, and manage their notes in real time, with changes reflected instantly without page reloads. The application is integrated with a MockAPI backend for persistent storage and offers additional features like grid/list view switching, responsive layouts for mobile and desktop, and smooth animations for an enhanced user experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

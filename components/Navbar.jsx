'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const router = useRouter()
  const logoutDialogRef = useRef(null)

  // Handle click outside to close logout dialog
  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutDialogRef.current && !logoutDialogRef.current.contains(event.target)) {
        setLogoutDialogOpen(false)
      }
    }
    
    if (logoutDialogOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [logoutDialogOpen])

  // Handle logout
  const handleLogout = () => {
    logout()
    setLogoutDialogOpen(false)
    toast.success('Logout successful!')
    setTimeout(() => {
        router.push('/login')
      }, 1500) 
  }

  return (
    <nav className='w-full  px-4 sm:px-6 lg:px-8 border-b-2 border-Ten'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4 md:py-6 '>
        {/* Logo */}
        <div className='flex-shrink-0'>
            <Image src={'/Logo.svg'} alt='' width={144} height={38} />
        </div>

        {/* Desktop Navigation */}
        {user? 
            <button 
              onClick={() => setLogoutDialogOpen(true)}
              className='w-[100px] h-[38px] rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium'
            >
              Logout
            </button>
            :
            <div className='hidden md:flex items-center space-x-4'>
                <Link href={'/login'} className='px-6 py-1 rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium cursor-pointer'>
                    Login
                </Link>
                <Link href={'/signup'} className='px-6 py-1 rounded-[8px] bg-Ten text-white text-[18px] font-medium cursor-pointer'>
                    Sign Up
                </Link>
            </div>
        }
      </div>

      {/* Logout Confirmation Dialog */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div 
            ref={logoutDialogRef}
            className="relative bg-white rounded-3xl shadow-xl w-full max-w-sm p-8 animate-in fade-in duration-200"
          >            
            <h2 className="text-xl font-bold text-center mb-4">
              Do you want to <span className="text-red-500">logout</span>?
            </h2>
            
            <p className="text-gray-600 text-sm text-center mb-6">
              Please confirm if you want to logout.
            </p>
            
            <div className="flex gap-4 justify-center mt-10">
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-sm text-white font-semibold rounded-lg transition-colors"
              >
                No, Cancel
              </button>
              
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-sm text-white font-semibold rounded-lg transition-colors"
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar


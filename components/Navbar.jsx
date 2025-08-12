'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const router = useRouter()
  const logoutDialogRef = useRef(null)
  const menuRef = useRef(null)

  // Handle click outside to close logout dialog
  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutDialogRef.current && !logoutDialogRef.current.contains(event.target)) {
        setLogoutDialogOpen(false)
      }
      
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.hamburger-icon')) {
        setIsMenuOpen(false)
      }
    }
    
    if (logoutDialogOpen || isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [logoutDialogOpen, isMenuOpen])

  // Handle logout
  const handleLogout = () => {
    logout()
    setLogoutDialogOpen(false)
    setIsMenuOpen(false)
    toast.success('Logout successful!')
    setTimeout(() => {
        router.push('/login')
      }, 1500) 
  }

  return (
    <nav className='w-full px-4 sm:px-6 lg:px-8 border-b-2 border-Ten bg-gray-100'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4 md:py-6'>
        {/* Logo */}
        <div className='flex-shrink-0'>
            <Image src={'/Logo.svg'} alt='' width={144} height={38} />
        </div>

        {/* Desktop Navigation */}
        {user ? (
          <div className="flex items-center">
            <button 
              onClick={() => setLogoutDialogOpen(true)}
              className='w-[100px] h-[38px] rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium'
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className='hidden md:flex items-center space-x-4'>
                <Link href={'/login'} className='px-6 py-1 rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium cursor-pointer'>
                    Login
                </Link>
                <Link href={'/signup'} className='px-6 py-1 rounded-[8px] bg-Ten text-white text-[18px] font-medium cursor-pointer'>
                    Sign Up
                </Link>
            </div>
            
            {/* Hamburger Menu Icon (Mobile Only) */}
            <div className="md:hidden">
              <button 
                className="hamburger-icon p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <Menu className={`w-6 h-6 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {!user && isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-64 bg-white shadow-lg md:hidden"
          >
            <div className="p-6 h-full flex flex-col">
              <motion.div 
                className="flex justify-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </motion.div>
              
              <div 
                className="mt-8 flex flex-col space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={'/login'} 
                    className='px-6 py-2 rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium cursor-pointer text-center block'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
                
                <div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={'/signup'} 
                    className='px-6 py-2 rounded-[8px] bg-Ten text-white text-[18px] font-medium cursor-pointer text-center block'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Dialog */}
      <AnimatePresence>
        {logoutDialogOpen && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              ref={logoutDialogRef}
              className="relative bg-white rounded-3xl shadow-xl w-full max-w-sm p-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >            
              <h2 className="text-xl font-bold text-center mb-4">
                Do you want to <span className="text-red-500">logout</span>?
              </h2>
              
              <p className="text-gray-600 text-sm text-center mb-6">
                Please confirm if you want to logout.
              </p>
              
              <div className="flex gap-4 justify-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLogoutDialogOpen(false)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-500 text-sm text-white font-semibold rounded-lg transition-colors"
                >
                  No, Cancel
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 text-sm text-white font-semibold rounded-lg transition-colors"
                >
                  Yes, Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar


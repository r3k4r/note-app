"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function MobileNavigation({ isLoggedIn, isMenuOpen, setIsMenuOpen, onLogoutClick }) {
  const menuRef = useRef(null)
  
  return (
    <>
      {/* Hamburger Menu Icon - Show for all users on mobile */}
      <div className="block md:hidden">
        <button 
          className="hamburger-icon p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className={`w-6 h-6 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
        </button>
      </div>
      
      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
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
              
              <motion.div 
                className="mt-8 flex flex-col space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {isLoggedIn ? (
                  // Logged in user - show logout button
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogoutClick();
                      }}
                      className='w-full px-6 py-2 rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium text-center block'
                    >
                      Logout
                    </button>
                  </motion.div>
                ) : (
                  // Not logged in - show login/signup options
                  <>
                    <motion.div
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
                    </motion.div>
                    
                    <motion.div
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
                    </motion.div>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

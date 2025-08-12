'use client'

import Image from "next/image"
import { useState } from "react"
import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { APP_CONFIG } from "@/config"

// Import components
import DesktopNavigation from "./navigation/DesktopNavigation"
import MobileNavigation from "./navigation/MobileNavigation"
import LogoutDialog from "./navigation/LogoutDialog"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const router = useRouter()

  // Handle logout
  const handleLogout = () => {
    logout()
    setLogoutDialogOpen(false)
    setIsMenuOpen(false)
    toast.success('Logout successful!')
    setTimeout(() => {
        router.push('/login')
      }, APP_CONFIG.AUTH_TIMEOUT) 
  }

  return (
    <nav className='w-full px-4 sm:px-6 lg:px-8 border-b-2 border-Ten bg-gray-100 dark:bg-gray-900 dark:border-gray-700'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4 md:py-6'>
        {/* Logo */}
        <div className='flex-shrink-0'>
            <Image src={'/Logo.svg'} alt='' width={144} height={38} />
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigation 
          isLoggedIn={!!user} 
          onLogoutClick={() => setLogoutDialogOpen(true)} 
        />
        
        {/* Mobile Navigation */}
        <MobileNavigation 
          isLoggedIn={!!user}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          onLogoutClick={() => setLogoutDialogOpen(true)}
        />
      </div>
      
      {/* Logout Dialog */}
      <LogoutDialog 
        open={logoutDialogOpen} 
        onClose={() => setLogoutDialogOpen(false)} 
        onConfirm={handleLogout} 
      />
    </nav>
  )
}

export default Navbar

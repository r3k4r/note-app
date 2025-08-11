'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [session, setSession] = useState(null) // Placeholder for session management, replace with actual session logic
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='w-full  px-4 sm:px-6 lg:px-8 border-b-2 border-Ten'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4 md:py-6 '>
        {/* Logo */}
        <div className='flex-shrink-0'>
            <Image src={'/Logo.svg'} alt='' width={144} height={38} />
            
        </div>

        {/* Desktop Navigation */}
        {session? 
            <button className='w-[100px] h-[38px] rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium'>
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
    </nav>
  )
}

export default Navbar


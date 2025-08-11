'use client'

import Image from "next/image"
import { useState } from "react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='w-full  px-4 sm:px-6 lg:px-8 border-b-2 border-Ten'>
      <div className='max-w-7xl mx-auto flex items-center justify-between py-4 md:py-6 '>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <Image src='/logo.png' alt='Logo' width={144} height={38} className='h-8 md:h-10 w-auto' />
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-4'>
          <button className='w-[100px] h-[38px] rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium'>
            Login
          </button>
          <button className='w-[100px] h-[38px] rounded-[8px] bg-Ten text-white text-[18px] font-medium'>
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200'
          >
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {isMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className='md:hidden border-t border-Ten animate-in slide-in-from-top duration-200'>
          <div className='px-4 pt-4 pb-4 space-y-3 bg-white'>
            <button className='w-full h-[38px] rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium transition-all duration-200 hover:border-gray-400'>
              Login
            </button>
            <button className='w-full h-[38px] rounded-[8px] bg-Ten text-white text-[18px] font-medium transition-all duration-200 hover:bg-opacity-90'>
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar


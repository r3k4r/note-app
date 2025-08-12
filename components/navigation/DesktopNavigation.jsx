"use client"

import Link from "next/link"

export default function DesktopNavigation({ isLoggedIn, onLogoutClick }) {
  if (isLoggedIn) {
    return (
      <div className="hidden md:flex items-center">
        <button 
          onClick={onLogoutClick}
          className='w-[100px] h-[38px] rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium'
        >
          Logout
        </button>
      </div>
    )
  }
  
  return (
    <div className='hidden md:flex items-center space-x-4'>
      <Link href={'/login'} className='px-6 py-1 rounded-[8px] border-2 border-gray-300 text-black text-[18px] font-medium cursor-pointer'>
        Login
      </Link>
      <Link href={'/signup'} className='px-6 py-1 rounded-[8px] bg-Ten text-white text-[18px] font-medium cursor-pointer'>
        Sign Up
      </Link>
    </div>
  )
}

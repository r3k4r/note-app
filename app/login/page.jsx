'use client'

import Image from "next/image"
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password }) //later replace with actual login logic
  }


  return (
    <div className='max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex items-center justify-between'>
        {/* LEFT-SIDE */}
        <div className='w-fit'>
            {/* SVG */}
            <Image src={'/Frame.svg'} alt='' width={360} height={360} />

            <div className=''>
                <h1 className="text-5xl py-2 font-bold text-center mt-2 bg-gradient-to-r from-left to-right text-transparent bg-clip-text">
                    Organize <br /> yourself here!
                </h1>
                <p className="text-[#A89085] mt-4 text-2xl text-center font-medium">Practical, fast and free!</p>
            </div>
        </div>

        {/* Login form || RIGHT-SIDE*/}
        <div className="w-full max-w-md p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    EMAIL
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border-2 border-gray-300 rounded-sm bg-white text-gray-600 placeholder:text-gray-400"
                    required
                />
                </div>

                <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    PASSWORD
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border-2 border-gray-300 rounded-sm bg-white text-gray-600 placeholder:text-gray-400"
                    required
                />
                </div>

                <div className='flex justify-end'>
                    <button
                    type="submit"
                    className="w-fit px-6 py-1 bg-gradient-to-r from-left to-right text-white font-medium rounded-md"
                    >
                    LOGIN
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
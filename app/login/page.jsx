'use client'

import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthContext"
import { useRouter } from "next/navigation"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Query the API to find a user with the provided email
      const response = await fetch(
        `https://688b2b592a52cabb9f506d87.mockapi.io/api/v1/users?email=${encodeURIComponent(email)}`
      )
      
      if (!response.ok) {
        toast.error('Failed to fetch user data. Please try again later.')
      }
      
      const users = await response.json()
      
      
      // Check if a user with this email exists
      if (users.length === 0) {
        toast.error('User not found. Please check your email or sign up.')
        return
      }
      
      const user = users[0]
      
      // Verify the password
      if (user.password !== password) {
        toast.error('Incorrect password. Please try again.')
        return
      }
      
      // Login successful
      login(user)
      toast.success('Login successful!')
      
      // Redirect to home page after successful login
      setTimeout(() => {
        router.push('/')
      }, 1500)
      
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Failed to login. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-4'>
        {/* LEFT-SIDE */}
        <div className='w-full md:w-fit flex flex-col items-center'>
            {/* SVG */}
            <Image src={'/Frame.svg'} alt='' width={360} height={360} className="w-[240px] h-[240px]  md:w-[360px] md:h-[360px]" />

            <div className=''>
                <h1 className="text-3xl md:text-4xl py-2 font-bold text-center mt-2 bg-gradient-to-r from-left to-right text-transparent bg-clip-text">
                    Organize <br /> yourself here!
                </h1>
                <p className="text-[#A89085] mt-2 md:mt-4 text-xl  text-center font-medium">Practical, fast and free!</p>
            </div>
        </div>

        {/* Login form || RIGHT-SIDE*/}
        <div className="w-full max-w-md p-4 sm:p-6 md:p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-1 md:space-y-2">
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
                    disabled={isLoading}
                />
                </div>

                <div className="space-y-1 md:space-y-2">
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
                    disabled={isLoading}
                />
                </div>

                <div className='flex justify-end mt-4'>
                    <button
                      type="submit"
                      className="w-fit px-6 py-1 bg-gradient-to-r from-left to-right text-white font-medium rounded-md disabled:opacity-70"
                      disabled={isLoading}
                    >
                      {isLoading ? "LOGGING IN..." : "LOGIN"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
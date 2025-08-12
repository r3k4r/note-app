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
                    disabled={isLoading}
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
                    disabled={isLoading}
                />
                </div>

                <div className='flex justify-end'>
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
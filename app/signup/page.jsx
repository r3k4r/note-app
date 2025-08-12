'use client'

import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { useAuth } from "@/components/AuthContext"
import { useRouter } from "next/navigation"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const passwordRequirements = [
    { text: "Minimum of 8 characters", met: password.length >= 8 },
    { text: "A minimum of 1 special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]

  const validateForm = () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match")
      return false
    }
    
    // Check if all password requirements are met
    const allRequirementsMet = passwordRequirements.every(req => req.met)
    if (!allRequirementsMet) {
      setPasswordError("Password doesn't meet all requirements")
      return false
    }
    
    setPasswordError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error(passwordError)
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch('https://688b2b592a52cabb9f506d87.mockapi.io/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      if (!response.ok) {
        toast.error('Failed to create account. Please try again.')
      }
      
      const userData = await response.json()
      
      // Save user data in auth context
      signup(userData)
      
      toast.success('Account created successfully!')
      
      // Redirect to home page or login page after successful signup
      setTimeout(() => {
        router.push('/')
      }, 1500)
      
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  //this function is called when the confirm password input loses focus
  //it sets the confirmPasswordTouched state to true so when the user leaves the input, 
  //then the error will be shown if the passwords do not match
  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true)
  }

  const passwordsMatch = password === confirmPassword
  const showPasswordMatchError = confirmPasswordTouched && !passwordsMatch && confirmPassword.length > 0

  return (
    <div className='max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-4'>
        {/* LEFT-SIDE */}
        <div className='w-full md:w-fit flex flex-col items-center'>
            {/* SVG */}
            <Image src={'/Frame.svg'} alt='' width={360} height={360} className="w-[240px] h-[240px] md:w-[360px] md:h-[360px]" />

            <div className=''>
                <h1 className="text-3xl md:text-4xl py-2 font-bold text-center mt-2 bg-gradient-to-r from-left to-right text-transparent bg-clip-text">
                    Organize <br /> yourself here!
                </h1>
                <p className="text-[#A89085] mt-2 md:mt-4 text-xl text-center font-medium">Practical, fast and free!</p>
            </div>
        </div>

        {/* SignUp form || RIGHT-SIDE*/}
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


                <div className="relative space-y-1 md:space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                        PASSWORD
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setShowPasswordRequirements(true)}
                        onBlur={() => setShowPasswordRequirements(false)}
                        className="w-full p-2 border-2 border-gray-300 rounded-sm bg-white text-gray-600 placeholder:text-gray-400"
                        required
                        disabled={isLoading}
                    />

                    {/* Enhanced password requirements tooltip with smooth transitions */}
                    <div 
                        className={`absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full
                                    transition-all duration-300 ease-in-out origin-top
                                    ${showPasswordRequirements 
                                        ? 'opacity-100 transform translate-y-0 scale-100' 
                                        : 'opacity-0 transform -translate-y-2 scale-95 pointer-events-none'}`}
                    >
                        <div className="space-y-2">
                        {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${req.met ? "bg-green-500" : "bg-gray-300"}`}></div>
                            <span className={`text-sm transition-colors duration-300 ${req.met ? "text-green-600" : "text-gray-500"}`}>{req.text}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-1 md:space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    CONFIRM PASSWORD
                </label>
                <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onBlur={handleConfirmPasswordBlur}
                    className={`w-full p-2 border-2 ${
                      showPasswordMatchError 
                      ? "border-red-300" : "border-gray-300"
                    } rounded-sm bg-white text-gray-600 placeholder:text-gray-400`}
                    required
                    disabled={isLoading}
                />
                {showPasswordMatchError && (
                  <p className="text-red-500 text-xs mt-1">Passwords don't match</p>
                )}
                </div>

                <div className='flex justify-end mt-4'>
                    <button
                    type="submit"
                    className="w-fit px-6 py-1 bg-gradient-to-r from-left to-right text-white font-medium rounded-md disabled:opacity-70"
                    disabled={isLoading}
                    >
                    {isLoading ? "SIGNING UP..." : "SUBMIT"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
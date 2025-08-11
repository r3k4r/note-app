'use client'

import Image from "next/image"
import { useState } from "react"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Confirmpassword, setConfirmPassword] = useState("")
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)

  const passwordRequirements = [
    { text: "Minimum of 8 characters", met: password.length >= 8 },
    { text: "A minimum of 1 special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("SignUp attempt:", { email, password }) //later replace with actual SignUp logic
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

        {/* SignUp form || RIGHT-SIDE*/}
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


                <div className="relative">
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

                <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                    CONFIRM PASSWORD
                </label>
                <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm Your Password"
                    value={Confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border-2 border-gray-300 rounded-sm bg-white text-gray-600 placeholder:text-gray-400"
                    required
                />
                </div>

                <div className='flex justify-end'>
                    <button
                    type="submit"
                    className="w-fit px-6 py-1 bg-gradient-to-r from-left to-right text-white font-medium rounded-md"
                    >
                    SUBMIT
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
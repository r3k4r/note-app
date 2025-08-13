'use client'

import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/components/AuthContext'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { axiosClient, API_PATHS, APP_CONFIG } from '@/config'

// Create a schema with Zod for signup validation
const signupSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const SignUp = () => {
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Watch password field to check requirements
  const watchPassword = watch('password', '')

  // Define password requirements based on our Zod schema
  const passwordRequirements = [
    { text: 'Minimum of 8 characters', met: watchPassword.length >= 8 },
    { text: 'A minimum of 1 special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(watchPassword) },
  ]

  // The key change: register password field with custom event handlers
  const passwordRegister = register('password')

  const onSubmit = async data => {
    setIsLoading(true)

    try {
      // Create user with axios
      const response = await axiosClient.post(API_PATHS.USERS, {
        email: data.email,
        password: data.password,
      })

      const userData = response.data

      // Save user data in auth context
      signup(userData)

      toast.success('Account created successfully!')

      // Redirect to home page or login page after successful signup
      setTimeout(() => {
        router.push('/')
      }, APP_CONFIG.AUTH_TIMEOUT)
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-4">
      {/* LEFT-SIDE */}
      <div className="w-full md:w-fit flex flex-col items-center">
        {/* SVG */}
        <Image
          src={'/Frame.svg'}
          alt=""
          width={360}
          height={360}
          className="w-[240px] h-[240px] md:w-[360px] md:h-[360px]"
        />

        <div className="">
          <h1 className="text-3xl md:text-4xl py-2 font-bold text-center mt-2 bg-gradient-to-r from-left to-right text-transparent bg-clip-text">
            Organize <br /> yourself here!
          </h1>
          <p className="text-[#A89085] mt-2 md:mt-4 text-xl text-center font-medium">
            Practical, fast and free!
          </p>
        </div>
      </div>

      {/* SignUp form || RIGHT-SIDE*/}
      <div className="w-full max-w-md p-4 sm:p-6 md:p-8 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div className="space-y-1 md:space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 uppercase tracking-wide"
            >
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className={`w-full p-2 border-2 ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-sm bg-white text-gray-600 placeholder:text-gray-400`}
              disabled={isLoading}
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="relative space-y-1 md:space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 uppercase tracking-wide"
            >
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              className={`w-full p-2 border-2 ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-sm bg-white text-gray-600 placeholder:text-gray-400`}
              disabled={isLoading}
              {...passwordRegister}
              onFocus={() => {
                setShowPasswordRequirements(true)
                passwordRegister.onFocus()
              }}
              onBlur={e => {
                setShowPasswordRequirements(false)
                passwordRegister.onBlur(e)
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}

            {/* Enhanced password requirements tooltip with smooth transitions */}
            <div
              className={`absolute top-full left-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full
                                    transition-all duration-300 ease-in-out origin-top
                                    ${
                                      showPasswordRequirements
                                        ? 'opacity-100 transform translate-y-0 scale-100 pointer-events-auto'
                                        : 'opacity-0 transform -translate-y-2 scale-95 pointer-events-none'
                                    }`}
            >
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${req.met ? 'bg-green-500' : 'bg-gray-300'}`}
                    ></div>
                    <span
                      className={`text-sm transition-colors duration-300 ${req.met ? 'text-green-600' : 'text-gray-500'}`}
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-gray-700 uppercase tracking-wide"
            >
              CONFIRM PASSWORD
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Your Password"
              className={`w-full p-2 border-2 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-sm bg-white text-gray-600 placeholder:text-gray-400`}
              disabled={isLoading}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="w-fit px-6 py-1 bg-gradient-to-r from-left to-right text-white font-medium rounded-md disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? 'SIGNING UP...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp

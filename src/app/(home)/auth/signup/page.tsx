"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRegisterMutation } from "@/Redux/feature/authSlice"
import { toast } from "sonner"

export default function SignUp() {
  const [full_name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [register] =useRegisterMutation()



  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   // Check if passwords match
  //   try {
  //     const res = await register({ full_name, email, password }).unwrap()
  //     console.log(res)
  //     toast.success( res.message ||"Account created successfully!")
      
  //   } catch (error) {
  //     toast.error(error?.message || "Error creating account. Please try again.")
  //     console.error(error)
    
  //   }

 

  //   setIsLoading(true)

  //   // Handle signup logic here
  //   console.log({ full_name, email, password })

  //   // Simulate API call and redirect to OTP verification
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     // Redirect to OTP verification page with email as query parameter
  //     // router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
  //   }, 1000)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Move this to the start of the function
  
    try {
     
      const res = await register({ full_name, email, password }).unwrap();
      console.log(res);
      toast.success(res.message || "Account created successfully!");
      
      router.push(`/auth/verify-otp?email=${email}`);
      // router.push(`/verify-otp?email=${email}`) 
      
    } catch (error: unknown) {
      // Better error handling
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (typeof error === 'object' && error !== null && 'data' in error && 
        typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
        toast.error((error.data as { message: string }).message);
      } else {
        toast.error("Error creating account. Please try again.");
      }
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <main
        className="min-h-screen w-full bg-[#005163] text-white"
        style={{
          backgroundImage: "url('/sideGradin.png')",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 100%",
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-56 font-[Montserrat]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="w-full max-w-md bg-[#003842] rounded-lg shadow-xl p-8">
              <h1 className=" lg:text-[40px] text-2xl  font-semibold text-white text-center mb-6">Sign Up</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-white">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={full_name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-3 py-2 bg-[#003842] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ecde6] focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-white">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full px-3 py-2 bg-[#003842] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ecde6] focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password..."
                      className="w-full px-3 py-2 bg-[#003842] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ecde6] focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

              
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-[#4ecde6] hover:bg-[#3db9d1] text-[#003842] font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4ecde6] transition-colors disabled:opacity-70"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-white">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#4ecde6] hover:underline font-medium">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

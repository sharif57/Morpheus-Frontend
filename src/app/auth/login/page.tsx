"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
    // For demo purposes, we'll just redirect to home
    router.push("/")
  }

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
            {/* Login Form */}
            <div className="w-full max-w-md bg-[#003842] rounded-lg shadow-xl p-8">
              <h1 className="lg:text-[40px] text-2xl font-semibold text-white text-center mb-6">Login</h1>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      placeholder="Enter your password..."
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-[#4ecde6] focus:ring-[#4ecde6] border-gray-600 rounded bg-[#003842]"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-white">
                      Remember
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link href="/auth/forgot-password" className="text-white hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#4ecde6] hover:bg-[#3db9d1] text-[#003842] font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4ecde6] transition-colors"
                >
                  Login
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-white">
                Don&apos;t have account?{" "}
                <Link href="/auth/signup" className="text-[#4ecde6] hover:underline font-medium">
                  Sign Up Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

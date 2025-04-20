"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset logic here
    router.push("/auth/verify-otp")
    console.log({ email })
    // In a real app, you would send a reset email here
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
            <div className="w-full max-w-md bg-[#003842] rounded-lg shadow-xl p-8">
              <h1 className="lg:text-[40px] text-2xl font-semibold text-white text-center mb-6">Forgot Password</h1>

            
                  <p className="text-white text-sm mb-6 text-center">
                  Enter your email and we&#39;ll send a secure one-time passcode (OTP) to reset your password.                  </p>

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

                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-[#4ecde6] hover:bg-[#3db9d1] text-[#003842] font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4ecde6] transition-colors"
                    >
                     Send OTP
                    </button>
                  </form>
              
              

              <div className="mt-6 text-center text-sm text-white">
                <Link href="/auth/login" className="text-[#4ecde6] hover:underline font-medium">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

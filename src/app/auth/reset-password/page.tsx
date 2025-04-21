"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [, setToken] = useState("")
  const router = useRouter()
  const searchParams = useParams()

  useEffect(() => {
    // Get token from URL query parameter if available
    const tokenParam = ("token")
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      // If no token is provided, we could redirect to forgot-password
      // For demo purposes, we'll just set a dummy token
      setToken("demo-token")
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear any previous errors
    setError("")

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    // Validate password strength (optional)
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, we'll just redirect to login
      // In a real app, you would call your API to reset the password
      router.push("/")
    }, 1500)
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
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-56">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="w-full max-w-md bg-[#003842] rounded-lg shadow-xl p-8">
              <h1 className="lg:text-[40px] text-2xl font-semibold text-white text-center mb-2">Reset Password</h1>

              <p className="text-white text-sm text-center mb-6">Create your new password for your account</p>

              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-100 px-4 py-2 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm text-white">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full px-3 py-2 bg-[#003842] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ecde6] focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm text-white">
                    Re-enter new password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full px-3 py-2 bg-[#003842] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ecde6] focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-[#4ecde6] hover:bg-[#3db9d1] text-[#003842] font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4ecde6] transition-colors disabled:opacity-70"
                >
                  {isLoading ? "Resetting Password..." : "Reset Password"}
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

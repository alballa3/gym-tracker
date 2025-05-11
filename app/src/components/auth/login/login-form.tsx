"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { api } from "@/api"
import { create_token } from "@/capacitor/auth"
import { AxiosError } from "axios"
// Add keyframes for animations
const animations = `
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  50% {
    transform: translateY(0) translateX(10px);
  }
  75% {
    transform: translateY(10px) translateX(5px);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [activeField, setActiveField] = useState<string | null>(null)
  const router = useNavigate()

  // Add subtle background animation
  const [rotation, setRotation] = useState(0)

  // Track mouse position for hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.2) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const client = await api()
      const reponse = await client.post("/login", { password, email })
      console.log(reponse.data)
      await create_token(reponse.data.token)
      router("/")
    } catch (err) {
      console.log(err)
      if (err instanceof AxiosError) {
        if (err.response) {
          console.log("Error response:", err.response.data)
          console.log("Error status:", err.response.status)
          setError(err.response.data.message || "Request failed!")
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Add animations */}
      <style>{`${animations}`}</style>
      {/* {animations}
      </style> */}
      {/* Animated border effect */}
      <div
        className="absolute -inset-0.5 bg-blue-500/20 rounded-2xl blur-sm"
        style={{
          background: `conic-gradient(from ${rotation}deg at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.1) 25%, rgba(59, 130, 246, 0.3) 50%, rgba(37, 99, 235, 0.1) 75%, rgba(59, 130, 246, 0.3) 100%)`,
        }}
      ></div>

      <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-blue-500/30 relative">
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>

        {/* Subtle animated accent */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"></div>

        <div className="p-6 sm:p-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                {/* Animated rings */}
                <motion.div
                  className="absolute -inset-3 sm:-inset-4 rounded-full bg-blue-500/10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -inset-6 sm:-inset-8 rounded-full bg-blue-500/5"
                  animate={{ scale: [1.1, 1, 1.1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut", delay: 0.5 }}
                />

                {/* Icon container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30 relative z-10">
                  <LogIn className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-300">Sign in to continue to FitTrack Pro</p>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Email Field - Modern Floating Label */}
            <motion.div
              className={`relative bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${focusedField === "email" ? "border-blue-500/50 shadow-lg shadow-blue-500/10" : "border-blue-500/20"
                }`}
              whileTap={{ scale: 0.99 }}
              onMouseEnter={() => setActiveField("email")}
              onMouseLeave={() => setActiveField(null)}
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background:
                    activeField === "email"
                      ? "radial-gradient(circle at var(--x) var(--y), rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 60%)"
                      : "none",
                }}
                style={
                  {
                    "--x": `${mousePosition.x}px`,
                    "--y": `${mousePosition.y}px`,
                  } as React.CSSProperties
                }
              />

              <div className="relative z-10">
                <div className="flex items-center">
                  <div className="bg-blue-900/30 p-2 rounded-full mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1 relative">
                    <label
                      htmlFor="email"
                      className={`absolute text-gray-400 transition-all duration-300 ${email || focusedField === "email"
                        ? "text-xs -translate-y-5 text-blue-400"
                        : "text-base translate-y-0"
                        }`}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-none outline-none text-white placeholder-transparent focus:ring-0 pt-6"
                      required
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-blue-300/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </motion.div>

            {/* Password Field - Modern Floating Label */}
            <motion.div
              className={`relative bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${focusedField === "password" ? "border-blue-500/50 shadow-lg shadow-blue-500/10" : "border-blue-500/20"
                }`}
              whileTap={{ scale: 0.99 }}
              onMouseEnter={() => setActiveField("password")}
              onMouseLeave={() => setActiveField(null)}
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background:
                    activeField === "password"
                      ? "radial-gradient(circle at var(--x) var(--y), rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 60%)"
                      : "none",
                }}
                style={
                  {
                    "--x": `${mousePosition.x}px`,
                    "--y": `${mousePosition.y}px`,
                  } as React.CSSProperties
                }
              />

              <div className="relative z-10">
                <div className="flex items-center">
                  <div className="bg-blue-900/30 p-2 rounded-full mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1 relative">
                    <label
                      htmlFor="password"
                      className={`absolute text-gray-400 transition-all duration-300 ${password || focusedField === "password"
                        ? "text-xs -translate-y-5 text-blue-400"
                        : "text-base translate-y-0"
                        }`}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-none outline-none text-white placeholder-transparent focus:ring-0 pt-6 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-blue-300/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </motion.div>


            {/* Login Button */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg shadow-blue-500/20 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center w-full">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>

                {/* Button hover effect */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </span>
              </Button>
            </motion.div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import PricingPlans from "./pricing-plans"
import { Link } from "react-router"

interface StepFourProps {
  userData: {
    name: string
    email: string
    password: string
  }
  updateUserData: (data: Partial<StepFourProps["userData"]>) => void
  onPrev: () => void
  onSubmit: (e: React.FormEvent) => void
}

export default function StepFour({ userData, updateUserData, onPrev, onSubmit }: StepFourProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeField, setActiveField] = useState<string | null>(null)
  const [showPricing, setShowPricing] = useState(false)

  // Validation states
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  })

  // Track mouse position for hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const validateName = (name: string) => {
    if (!name.trim()) return "Name is required"
    if (name.trim().length < 2) return "Name must be at least 2 characters"
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return "Name contains invalid characters"
    return ""
  }

  const validateEmail = (email: string) => {
    if (!email.trim()) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePassword = (password: string) => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter"
    if (!/[0-9]/.test(password)) return "Password must include a number"
    if (!/[^A-Za-z0-9]/.test(password)) return "Password must include a special character"
    return ""
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    updateUserData({ name: newName })
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(newName) }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    updateUserData({ email: newEmail })
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(newEmail) }))
    }
  }

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    updateUserData({ password: newPassword })
    checkPasswordStrength(newPassword)
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(newPassword) }))
    }
  }

  const handleBlur = (field: keyof typeof touched) => {
    setFocusedField(null)
    setTouched((prev) => ({ ...prev, [field]: true }))

    if (field === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(userData.name) }))
    } else if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(userData.email) }))
    } else if (field === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(userData.password) }))
    }
  }

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-300"
    if (passwordStrength === 1) return "bg-red-500"
    if (passwordStrength === 2) return "bg-yellow-500"
    if (passwordStrength === 3) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return "Enter password"
    if (passwordStrength === 1) return "Weak"
    if (passwordStrength === 2) return "Fair"
    if (passwordStrength === 3) return "Good"
    return "Strong"
  }

  const isFormValid = () => {
    const nameError = validateName(userData.name)
    const emailError = validateEmail(userData.email)
    const passwordError = validatePassword(userData.password)

    return !nameError && !emailError && !passwordError
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const nameError = validateName(userData.name)
    const emailError = validateEmail(userData.email)
    const passwordError = validatePassword(userData.password)

    // Update errors and touched state
    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    })

    setTouched({
      name: true,
      email: true,
      password: true,
    })

    if (!isFormValid()) return

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onSubmit(e)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSelectPlan = (planName: string) => {
    console.log(`Selected plan: ${planName}`)
    setShowPricing(false)
    // Here you could store the selected plan in state or context if needed
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <AnimatePresence mode="wait">
      {showPricing ? (
        <PricingPlans onBack={() => setShowPricing(false)} onSelectPlan={handleSelectPlan} />
      ) : (
        <motion.div
          key="registration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center flex flex-col h-full"
        >
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <motion.h2
            className="text-xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Your Account
          </motion.h2>

          <motion.p
            className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Set up your login credentials to get started
          </motion.p>

          <motion.form
            onSubmit={handleFormSubmit}
            className="space-y-5 sm:space-y-6 mb-4 sm:mb-6 flex-1"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Name Field - Modern Floating Label */}
            <motion.div
              variants={item}
              className={`relative bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${
                focusedField === "name"
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : errors.name && touched.name
                    ? "border-red-500/50"
                    : "border-blue-500/20"
              }`}
              whileTap={{ scale: 0.99 }}
              onMouseEnter={() => setActiveField("name")}
              onMouseLeave={() => setActiveField(null)}
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background:
                    activeField === "name"
                      ? "radial-gradient(circle at var(--x) var(--y), rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 60%)"
                      : "none",
                }}
                style={
                  {
                    "--x": `${mousePosition.x}px`,
                    "--y": `${mousePosition.y}px`,
                  } as React.CSSProperties
                }
                layoutId={`background-${activeField === "name" ? "name" : ""}`}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div
                    className={`p-2 rounded-full mr-3 transition-colors duration-300 ${
                      errors.name && touched.name
                        ? "bg-red-900/30 group-hover:bg-red-800/40"
                        : "bg-blue-900/30 group-hover:bg-blue-800/40"
                    }`}
                  >
                    <User className={`h-5 w-5 ${errors.name && touched.name ? "text-red-400" : "text-blue-400"}`} />
                  </div>
                  <div className="relative w-full">
                    <label
                      htmlFor="name"
                      className={`absolute text-gray-400 transition-all duration-300 ${
                        userData.name || focusedField === "name"
                          ? `text-xs -translate-y-7 ${errors.name && touched.name ? "text-red-400" : "text-blue-400"}`
                          : "text-base translate-y-0"
                      }`}
                    >
                      Full Name
                    </label>
                  </div>
                </div>
                <input
                  id="name"
                  type="text"
                  value={userData.name}
                  onChange={handleNameChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => handleBlur("name")}
                  className={`w-full bg-transparent border-none outline-none text-white placeholder-transparent focus:ring-0 pt-2 ${
                    errors.name && touched.name ? "text-red-200" : "text-white"
                  }`}
                  required
                  aria-invalid={errors.name && touched.name ? "true" : "false"}
                  aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                />
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    errors.name && touched.name
                      ? "bg-gradient-to-r from-red-500/50 to-red-300/50"
                      : "bg-gradient-to-r from-blue-500/50 to-blue-300/50"
                  }`}
                />

                {/* Error message */}
                {errors.name && touched.name && (
                  <motion.p
                    id="name-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-400 mt-1 text-left"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Email Field - Modern Floating Label */}
            <motion.div
              variants={item}
              className={`relative bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${
                focusedField === "email"
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : errors.email && touched.email
                    ? "border-red-500/50"
                    : "border-blue-500/20"
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
                layoutId={`background-${activeField === "email" ? "email" : ""}`}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div
                    className={`p-2 rounded-full mr-3 transition-colors duration-300 ${
                      errors.email && touched.email
                        ? "bg-red-900/30 group-hover:bg-red-800/40"
                        : "bg-blue-900/30 group-hover:bg-blue-800/40"
                    }`}
                  >
                    <Mail className={`h-5 w-5 ${errors.email && touched.email ? "text-red-400" : "text-blue-400"}`} />
                  </div>
                  <div className="relative w-full">
                    <label
                      htmlFor="email"
                      className={`absolute text-gray-400 transition-all duration-300 ${
                        userData.email || focusedField === "email"
                          ? `text-xs -translate-y-7 ${errors.email && touched.email ? "text-red-400" : "text-blue-400"}`
                          : "text-base translate-y-0"
                      }`}
                    >
                      Email Address
                    </label>
                  </div>
                </div>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  value={userData.email}
                  onChange={handleEmailChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => handleBlur("email")}
                  className={`w-full bg-transparent border-none outline-none text-white placeholder-transparent focus:ring-0 pt-2 ${
                    errors.email && touched.email ? "text-red-200" : "text-white"
                  }`}
                  required
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                />
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    errors.email && touched.email
                      ? "bg-gradient-to-r from-red-500/50 to-red-300/50"
                      : "bg-gradient-to-r from-blue-500/50 to-blue-300/50"
                  }`}
                />

                {/* Error message */}
                {errors.email && touched.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-400 mt-1 text-left"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Password Field - Modern Floating Label */}
            <motion.div
              variants={item}
              className={`relative bg-gray-800/50 backdrop-blur-sm p-4 sm:p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${
                focusedField === "password"
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : errors.password && touched.password
                    ? "border-red-500/50"
                    : "border-blue-500/20"
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
                layoutId={`background-${activeField === "password" ? "password" : ""}`}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div
                    className={`p-2 rounded-full mr-3 transition-colors duration-300 ${
                      errors.password && touched.password
                        ? "bg-red-900/30 group-hover:bg-red-800/40"
                        : "bg-blue-900/30 group-hover:bg-blue-800/40"
                    }`}
                  >
                    <Lock
                      className={`h-5 w-5 ${errors.password && touched.password ? "text-red-400" : "text-blue-400"}`}
                    />
                  </div>
                  <div className="relative w-full">
                    <label
                      htmlFor="password"
                      className={`absolute text-gray-400 transition-all duration-300 ${
                        userData.password || focusedField === "password"
                          ? `text-xs -translate-y-7 ${errors.password && touched.password ? "text-red-400" : "text-blue-400"}`
                          : "text-base translate-y-0"
                      }`}
                    >
                      Password
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={handlePasswordChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => handleBlur("password")}
                    className={`w-full bg-transparent border-none outline-none text-white placeholder-transparent focus:ring-0 pt-2 pr-10 ${
                      errors.password && touched.password ? "text-red-200" : "text-white"
                    }`}
                    required
                    aria-invalid={errors.password && touched.password ? "true" : "false"}
                    aria-describedby={errors.password && touched.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                    errors.password && touched.password
                      ? "bg-gradient-to-r from-red-500/50 to-red-300/50"
                      : "bg-gradient-to-r from-blue-500/50 to-blue-300/50"
                  }`}
                />

                {/* Error message */}
                {errors.password && touched.password && (
                  <motion.p
                    id="password-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-400 mt-1 text-left"
                  >
                    {errors.password}
                  </motion.p>
                )}
              </div>

              {/* Password strength indicator */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-gray-300 flex items-center">
                    <Shield className="h-3 w-3 mr-1" /> Password strength:
                  </div>
                  <div className="text-xs font-medium text-gray-300">{getStrengthText()}</div>
                </div>
                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    className={`h-full ${getStrengthColor()} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* View Pricing Button */}
            <motion.div variants={item} className="mt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowPricing(true)}
                className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 flex items-center justify-center group"
              >
                <span>View Pricing Plans</span>
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex space-x-4 mt-auto" variants={item}>
              <Button
                type="button"
                onClick={onPrev}
                variant="outline"
                disabled={isSubmitting}
                className="flex-1 border-blue-500/20 text-white hover:bg-blue-900/20 hover:border-blue-500/40 py-3 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-3 disabled:opacity-50 shadow-lg shadow-blue-500/20 relative overflow-hidden group rounded-xl"
              >
                <span className="relative z-10 flex items-center justify-center w-full">
                  {isSubmitting ? (
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
                      Creating Account...
                    </>
                  ) : (
                    <>Create Account</>
                  )}
                </span>

                {/* Button hover effect */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </span>

                {/* Mobile tap effect */}
                <motion.span
                  className="absolute inset-0 bg-white rounded-xl pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>
          </motion.form>

          {/* Social Login Section */}
          <motion.div
            variants={item}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-2"
          >
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300"
              >
                Sign in
                </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

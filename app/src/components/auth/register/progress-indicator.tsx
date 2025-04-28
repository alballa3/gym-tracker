"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Function to get step label based on step number
  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return "Intro"
      case 2:
        return "Physical"
      case 3:
        return "Fitness"
      case 4:
        return "Account"
      default:
        return `Step ${step}`
    }
  }

  // Optimize animations to reduce layout shifts
  useEffect(() => {
    if (containerRef.current) {
      // Force a single layout calculation
      containerRef.current.getBoundingClientRect()
    }
  }, [currentStep])

  return (
    <div className="mb-6 sm:mb-8" ref={containerRef}>
      {/* Desktop step indicators */}
      <div className="hidden sm:flex justify-between items-center mb-3">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                {/* Outer ring - use transform instead of scale for better performance */}
                <motion.div
                  className={`absolute -inset-1 rounded-full ${isActive ? "bg-blue-500/30" : "bg-transparent"}`}
                  animate={
                    isActive
                      ? {
                          transform: ["scale(1)", "scale(1.1)", "scale(1)"],
                        }
                      : {}
                  }
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                />

                {/* Step indicator */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                    isActive
                      ? "bg-gradient-to-br from-blue-400 to-blue-700"
                      : isCompleted
                        ? "bg-blue-600"
                        : "bg-gray-800"
                  } text-white font-medium shadow-lg ${isActive ? "shadow-blue-500/30" : ""} relative z-10`}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-base sm:text-lg">{stepNumber}</span>
                  )}
                </div>

                {/* Glowing effect for active step - use opacity instead of blur for better performance */}
                {isActive && <div className="absolute -inset-2 bg-blue-500/20 rounded-full opacity-75 z-0"></div>}
              </div>

              {/* Step label */}
              <motion.span
                className={`text-xs sm:text-sm mt-2 font-medium ${isActive || isCompleted ? "text-blue-400" : "text-gray-400"}`}
                animate={
                  isActive
                    ? {
                        transform: ["scale(1)", "scale(1.05)", "scale(1)"],
                      }
                    : {}
                }
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              >
                {getStepLabel(stepNumber)}
              </motion.span>
            </div>
          )
        })}
      </div>

      {/* Mobile step indicator - simplified version */}
      <div className="flex sm:hidden justify-between items-center mb-3">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive
                      ? "bg-gradient-to-br from-blue-400 to-blue-700"
                      : isCompleted
                        ? "bg-blue-600"
                        : "bg-gray-800"
                  } text-white font-medium shadow-md ${isActive ? "shadow-blue-500/30" : ""}`}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm">{stepNumber}</span>
                  )}
                </div>

                {/* Pulsing effect for active step - use CSS instead of motion for better performance */}
                {isActive && <div className="absolute -inset-1 rounded-full bg-blue-500/30 animate-pulse" />}
              </div>
              <span className={`text-xs mt-1 ${isActive || isCompleted ? "text-blue-400" : "text-gray-400"}`}>
                {getStepLabel(stepNumber)}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar with animated fill */}
      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden p-0.5">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full relative"
          initial={false}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated shimmer effect - use CSS animation instead of JS for better performance */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

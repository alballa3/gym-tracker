"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Confetti from "./confetti"

interface SuccessAnimationProps {
  userName: string
  onContinue: () => void
}

export default function SuccessAnimation({ userName, onContinue }: SuccessAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Sequence the animations
  useEffect(() => {
    // Start confetti immediately
    setShowConfetti(true)

    // Show content after a short delay
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Confetti animation */}
      {showConfetti && <Confetti />}

      {/* Success content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="flex flex-col items-center text-center z-10 px-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Success icon with ring animation */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -inset-4 rounded-full bg-blue-500/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full bg-blue-500/10"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 relative z-10"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <CheckCircle className="h-12 w-12 text-white" />
              </motion.div>

              {/* Star burst effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-1 w-10 bg-gradient-to-r from-blue-400 to-transparent"
                    style={{
                      transformOrigin: "0% 50%",
                      rotate: `${i * 45}deg`,
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                    transition={{
                      delay: 0.7 + i * 0.05,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Success message */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Welcome, {userName || "Friend"}!
              </h2>
              <p className="text-gray-300 mb-6 max-w-md">
                Your account has been successfully created. Get ready to start your fitness journey with GymRat Tracker !
              </p>
            </motion.div>

            {/* Stats animation */}
            <motion.div
              className="grid grid-cols-3 gap-3 w-full max-w-md mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { label: "Workouts", value: "0" },
                { label: "Exercises", value: "0" },
                { label: "Progress", value: "0%" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
                >
                  <motion.div
                    className="text-2xl font-bold text-blue-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 }}
              className="w-full max-w-xs"
            >
              <Button
                onClick={onContinue}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg shadow-blue-500/20 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Continue to Dashboard
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>

                {/* Button hover effect */}
                <span className="absolute inset-0 overflow-hidden rounded-xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

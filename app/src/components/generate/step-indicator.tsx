"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: currentStep >= index + 1 ? 1 : 0.8,
                  opacity: currentStep >= index + 1 ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= index + 1
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20"
                    : "bg-zinc-800/80 text-zinc-400"
                }`}
              >
                {currentStep > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
              </motion.div>

              {index < totalSteps - 1 && (
                <div className="relative h-1 w-10 mx-1">
                  <div className="absolute inset-0 bg-zinc-700 rounded-full"></div>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: currentStep > index + 1 ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                  ></motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-sm font-medium text-zinc-400">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      <div className="relative h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-full"
        ></motion.div>
      </div>
    </div>
  )
}

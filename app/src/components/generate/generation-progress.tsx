"use client"

import { motion } from "framer-motion"
import { Brain, AlertCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface GenerationProgressProps {
  generationProgress: number
  generationStep: string
  generationError: string | null
  showContinueButton: boolean
  onContinue: () => void
}

export function GenerationProgress({
  generationProgress,
  generationStep,
  generationError,
  showContinueButton,
  onContinue,
}: GenerationProgressProps) {
  const progressSteps = [
    { value: 0, label: "Analyzing" },
    { value: 33, label: "Optimizing" },
    { value: 66, label: "Finalizing" },
    { value: 100, label: "Complete" },
  ]

  // Find the current step based on progress
  const currentStepIndex = progressSteps.findIndex(
    (step, index) =>
      generationProgress >= step.value &&
      (index === progressSteps.length - 1 || generationProgress < progressSteps[index + 1].value),
  )

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-28 h-28 flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-4 border-violet-500/20"></div>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        ></motion.div>
        <Brain className="h-12 w-12 text-violet-400" />
      </motion.div>

      <div className="text-center space-y-3 max-w-md">
        <motion.h3
          key={generationStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-medium text-white"
        >
          {generationStep}
        </motion.h3>
        <p className="text-zinc-400">Our AI is creating your personalized workout plan based on your preferences</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="relative">
          <Progress
            value={generationProgress}
            className="h-3 bg-zinc-800/60 rounded-full overflow-hidden [&>div]:bg-gradient-to-r [&>div]:from-violet-500 [&>div]:via-indigo-500 [&>div]:to-blue-500"
          />

          <div className="flex justify-between mt-2 px-1">
            {progressSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full mb-1 ${
                    generationProgress >= step.value ? "bg-gradient-to-r from-violet-500 to-blue-500" : "bg-zinc-700"
                  }`}
                ></div>
                <span
                  className={`text-xs ${
                    index === currentStepIndex
                      ? "text-violet-300 font-medium"
                      : generationProgress >= step.value
                        ? "text-zinc-300"
                        : "text-zinc-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {generationError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 bg-red-950/20 border border-red-900/30 p-4 rounded-lg"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>{generationError}</p>
        </motion.div>
      )}

      {showContinueButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Button
            onClick={onContinue}
            className="mt-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg shadow-violet-900/20 transition-all duration-300 animate-fadeIn flex items-center gap-2 text-base"
          >
            View Your Workout <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}

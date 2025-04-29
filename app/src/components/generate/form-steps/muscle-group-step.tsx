"use client"

import { motion } from "framer-motion"
import { ChevronLeft, Sparkles, Target, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MuscleGroup } from "@/types/workout"

interface MuscleGroupStepProps {
  selectedMuscleGroups: MuscleGroup[]
  toggleMuscleGroup: (muscleGroup: MuscleGroup) => void
  onGenerate: () => void
  onPrev: () => void
  isGenerating: boolean
}

export function MuscleGroupStep({
  selectedMuscleGroups,
  toggleMuscleGroup,
  onGenerate,
  onPrev,
  isGenerating,
}: MuscleGroupStepProps) {
  const muscleGroupOptions: MuscleGroup[] = [
    "Full Body",
    "Upper Body",
    "Lower Body",
    "Core",
    "Back",
    "Chest",
    "Arms",
    "Shoulders",
    "Legs",
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center gap-2 text-fuchsia-300">
          <div className="p-2 bg-fuchsia-500/10 rounded-lg">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-lg">Target Muscle Groups</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {muscleGroupOptions.map((muscle) => (
            <motion.div
              key={muscle}
              variants={item}
              onClick={() => toggleMuscleGroup(muscle)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 border",
                selectedMuscleGroups.includes(muscle)
                  ? "bg-fuchsia-900/30 border-fuchsia-700/50 text-fuchsia-200 shadow-md shadow-fuchsia-900/10"
                  : "bg-zinc-800/40 border-zinc-700/30 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-700/50",
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                  selectedMuscleGroups.includes(muscle) ? "border-fuchsia-400 bg-fuchsia-500" : "border-zinc-600",
                )}
              >
                {selectedMuscleGroups.includes(muscle) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="h-3 w-3 text-zinc-900" />
                  </motion.div>
                )}
              </div>
              <span className="text-sm">{muscle}</span>
            </motion.div>
          ))}
        </div>

        {selectedMuscleGroups.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400 text-sm mt-2">
            Select at least one muscle group to target
          </motion.p>
        )}
      </motion.div>

      <motion.div variants={item} className="flex justify-between mt-8">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 font-medium py-2.5 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onGenerate}
          disabled={isGenerating || selectedMuscleGroups.length === 0}
          className={`bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 h-12 text-base font-medium rounded-xl shadow-lg transition-all duration-300 group flex items-center gap-2 px-6 ${
            isGenerating || selectedMuscleGroups.length === 0 ? "opacity-50 cursor-not-allowed" : "shadow-violet-900/20"
          }`}
        >
          <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
          <span className="group-hover:tracking-wide transition-all duration-300">Generate My Workout</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}

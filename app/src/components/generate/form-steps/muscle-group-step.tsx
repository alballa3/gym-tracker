"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Sparkles, Target, Check, Dumbbell } from "lucide-react"
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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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
        staggerChildren: 0.07,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const muscleGroupIcons: Record<MuscleGroup, React.ReactNode> = {
    "Full Body": <Dumbbell className="h-4 w-4" />,
    "Upper Body": <Dumbbell className="h-4 w-4" />,
    "Lower Body": <Dumbbell className="h-4 w-4" />,
    "Core": <Dumbbell className="h-4 w-4" />,
    "Back": <Dumbbell className="h-4 w-4" />,
    "Chest": <Dumbbell className="h-4 w-4" />,
    "Arms": <Dumbbell className="h-4 w-4" />,
    "Shoulders": <Dumbbell className="h-4 w-4" />,
    "Legs": <Dumbbell className="h-4 w-4" />,
  }

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 w-full max-w-3xl mx-auto"
    >
      <motion.div variants={item} className="space-y-6">
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
            className="p-3 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 rounded-2xl shadow-lg shadow-fuchsia-900/10"
          >
            <Target className="h-6 w-6 text-fuchsia-300" />
          </motion.div>
          <div>
            <h3 className="font-bold text-xl bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
              Target Muscle Groups
            </h3>
            <p className="text-zinc-400 text-sm">Select areas you want to focus on</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {muscleGroupOptions.map((muscle, index) => (
            <motion.div
              key={muscle}
              variants={item}
              onClick={() => toggleMuscleGroup(muscle)}
              className={cn(
                "relative overflow-hidden flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300 border",
                selectedMuscleGroups.includes(muscle)
                  ? "bg-gradient-to-br from-fuchsia-900/40 to-violet-900/40 border-fuchsia-700/50 text-fuchsia-200 shadow-lg shadow-fuchsia-900/10"
                  : "bg-zinc-800/40 border-zinc-700/30 text-zinc-300 hover:bg-zinc-800/70 hover:border-zinc-600/50 hover:shadow-md hover:shadow-zinc-900/10",
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {selectedMuscleGroups.includes(muscle) && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layoutId={`bg-${muscle}`}
                />
              )}
              <div
                className={cn(
                  "min-w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300",
                  selectedMuscleGroups.includes(muscle) 
                    ? "border-fuchsia-400 bg-gradient-to-br from-fuchsia-500 to-violet-500" 
                    : "border-zinc-600 bg-zinc-800/50",
                )}
              >
                {selectedMuscleGroups.includes(muscle) ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ rotate: isLoaded ? [0, 5, -5, 0] : 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                  >
                    {muscleGroupIcons[muscle]}
                  </motion.div>
                )}
              </div>
              <span className="text-sm font-medium">{muscle}</span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedMuscleGroups.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-2 mt-2"
            >
              <div className="p-1 bg-amber-500/20 rounded-lg">
                <Target className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-amber-300 text-sm">
                Select at least one muscle group to target
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedMuscleGroups.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2"
            >
              <p className="text-sm text-zinc-400">
                Selected: <span className="text-fuchsia-300 font-medium">{selectedMuscleGroups.join(", ")}</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={item} className="flex justify-between pt-4">
        <Button
          onClick={onPrev}
          variant="outline"
          className="relative overflow-hidden group border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.span>
          <span>Back</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-zinc-700/0 via-zinc-700/5 to-zinc-700/0"
            initial={{ x: "100%" }}
            whileHover={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </Button>
        
        <Button
          onClick={onGenerate}
          disabled={isGenerating || selectedMuscleGroups.length === 0}
          className={`relative overflow-hidden bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 h-12 text-base font-medium rounded-xl shadow-lg transition-all duration-300 group flex items-center gap-3 px-6 ${
            isGenerating || selectedMuscleGroups.length === 0 ? "opacity-50 cursor-not-allowed" : "shadow-violet-900/20"
          }`}
        >
          <motion.div
            animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
            transition={isGenerating ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
            className="relative"
          >
            <Sparkles className="h-5 w-5" />
            {isGenerating && (
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          <span className="group-hover:tracking-wide transition-all duration-300">
            {isGenerating ? "Creating Workout..." : "Generate My Workout"}
          </span>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-white/10 to-blue-600/0"
            initial={{ x: "100%" }}
            whileHover={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </Button>
      </motion.div>
    </motion.div>
  )
}
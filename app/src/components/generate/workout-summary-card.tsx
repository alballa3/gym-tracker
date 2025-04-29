"use client"

import { motion } from "framer-motion"
import { Dumbbell, Clock, Zap, Flame } from "lucide-react"
import type { GeneratedWorkout } from "@/types/workout"

interface WorkoutSummaryCardProps {
  workout: GeneratedWorkout
}

export function WorkoutSummaryCard({ workout }: WorkoutSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 p-5 md:p-6 rounded-xl mb-6 border border-zinc-700/30 hover:border-zinc-700/50 transition-all duration-200 shadow-lg shadow-zinc-950/20"
    >
      <h3 className="text-xl md:text-2xl font-medium text-white mb-2">{workout.name}</h3>
      <p className="text-zinc-400">{workout.description}</p>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-2 bg-zinc-800/60 px-3 py-2 rounded-lg border border-zinc-700/30"
        >
          <Dumbbell className="h-4 w-4 text-violet-400" />
          <span className="text-zinc-300">{workout.exercises.length} exercises</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-2 bg-zinc-800/60 px-3 py-2 rounded-lg border border-zinc-700/30"
        >
          <Clock className="h-4 w-4 text-blue-400" />
          <span className="text-zinc-300">{workout.duration} minutes</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex items-center gap-2 bg-zinc-800/60 px-3 py-2 rounded-lg border border-zinc-700/30"
        >
          <Zap className="h-4 w-4 text-amber-400" />
          <span className="text-zinc-300">{workout.intensity} Intensity</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex items-center gap-2 bg-zinc-800/60 px-3 py-2 rounded-lg border border-zinc-700/30"
        >
          <Flame className="h-4 w-4 text-orange-400" />
          <span className="text-zinc-300">~{workout.caloriesBurned} calories</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

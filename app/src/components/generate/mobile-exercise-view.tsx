"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ExerciseCard } from "@/components/workout/exercise-card"
import type { Exercise } from "@/types/workout"

interface MobileExerciseViewProps {
  filteredExercises: Exercise[]
  currentExerciseIndex: number
  setCurrentExerciseIndex: (index: number) => void
  animatedItems: number[]
}

export function MobileExerciseView({
  filteredExercises,
  currentExerciseIndex,
  setCurrentExerciseIndex,
  animatedItems,
}: MobileExerciseViewProps) {
  const nextExercise = () => {
    if (currentExerciseIndex < filteredExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
    }
  }

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
    }
  }

  if (filteredExercises.length === 0) {
    return (
      <div className="p-6 text-center bg-zinc-800/30 rounded-xl border border-zinc-700/30">
        <p className="text-zinc-400">No exercises match the selected filter</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-3 z-10">
        <Button
          onClick={prevExercise}
          disabled={currentExerciseIndex === 0}
          variant="outline"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full border-zinc-700/50 bg-zinc-800/80 hover:bg-zinc-800 transition-all duration-200",
            currentExerciseIndex === 0 && "opacity-0 pointer-events-none",
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous exercise</span>
        </Button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-3 z-10">
        <Button
          onClick={nextExercise}
          disabled={currentExerciseIndex === filteredExercises.length - 1}
          variant="outline"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full border-zinc-700/50 bg-zinc-800/80 hover:bg-zinc-800 transition-all duration-200",
            currentExerciseIndex === filteredExercises.length - 1 && "opacity-0 pointer-events-none",
          )}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next exercise</span>
        </Button>
      </div>

      <div className="px-4">
        <motion.div
          key={filteredExercises[currentExerciseIndex].id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ExerciseCard
            exercise={filteredExercises[currentExerciseIndex]}
            index={currentExerciseIndex}
            isFirst={currentExerciseIndex === 0}
            isLast={currentExerciseIndex === filteredExercises.length - 1}
            onMoveUp={() => {}}
            onMoveDown={() => {}}
            onRemove={() => {}}
            onDuplicate={() => {}}
            onToggleExpand={() => {}}
            onUpdateRestTime={() => {}}
            onAddSet={() => {}}
            onRemoveSet={() => {}}
            onUpdateSet={() => {}}
            onNameChange={() => {}}
            onShowDetails={() => {}}
            onToggleSetCompletion={() => {}}
          />
        </motion.div>
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex gap-1.5">
          {filteredExercises.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentExerciseIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentExerciseIndex ? "bg-violet-500 w-4" : "bg-zinc-700 hover:bg-zinc-600"
              }`}
              aria-label={`Go to exercise ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Edit, RotateCcw, Save, Play, Dumbbell, Filter } from "lucide-react"
import { ExerciseCard } from "@/components/workout/exercise-card"
import type { GeneratedWorkout } from "@/types/workout"
import { WorkoutSummaryCard } from "./workout-summary-card"
import { ExerciseFilters } from "./exercise-filters"
import { MobileExerciseView } from "./mobile-exercise-view"

interface GeneratedWorkoutPreviewProps {
  workout: GeneratedWorkout
  onBack: () => void
  onRegenerate: () => void
}

export function GeneratedWorkoutPreview({ workout, onBack, onRegenerate }: GeneratedWorkoutPreviewProps) {
  // Animation for exercise cards
  const [animatedItems, setAnimatedItems] = useState<number[]>([])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [filteredExercises, setFilteredExercises] = useState(workout.exercises)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Animate each exercise card with a staggered delay
    const timer = setTimeout(() => {
      workout.exercises.forEach((exercise, index) => {
        setTimeout(() => {
          setAnimatedItems((prev) => [...prev, exercise.id])
        }, index * 100)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [workout.exercises])

  // Filter exercises by muscle group
  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter)

    if (!filter) {
      setFilteredExercises(workout.exercises)
    } else {
      setFilteredExercises(workout.exercises.filter((ex) => ex.muscleGroup === filter))
    }

    // Reset current exercise index when filter changes
    setCurrentExerciseIndex(0)
  }

  // Get unique muscle groups from exercises
  const muscleGroups = Array.from(new Set(workout.exercises.map((ex) => ex.muscleGroup)))

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="p-6 md:p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800/40 shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-violet-600 p-2.5 rounded-lg shadow-lg shadow-blue-900/20">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                AI Generated Workout
              </h2>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={onBack}
                className="h-10 px-4 border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800/80 hover:text-violet-300 transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-1.5 text-violet-400" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onRegenerate}
                className="h-10 px-4 border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800/80 hover:text-blue-300 transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-1.5 text-blue-400" />
                Regenerate
              </Button>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <WorkoutSummaryCard workout={workout} />
          </motion.div>

          <div className="mt-8 space-y-4">
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-violet-400" />
                Exercises
              </h3>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-9 px-3 border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800/80 text-zinc-300 hover:text-zinc-100 transition-all duration-200 flex items-center gap-1.5"
                >
                  <Filter className="h-3.5 w-3.5" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>

                <div className="flex items-center gap-1 bg-zinc-800/60 px-2 py-1 rounded-lg text-xs text-zinc-400">
                  <span className="text-zinc-300">{currentExerciseIndex + 1}</span>
                  <span>/</span>
                  <span>{filteredExercises.length}</span>
                </div>
              </div>
            </motion.div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExerciseFilters
                  muscleGroups={muscleGroups}
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
                />
              </motion.div>
            )}

            {/* Mobile view - one exercise at a time with navigation */}
            <motion.div variants={item} className="block md:hidden">
              <MobileExerciseView
                filteredExercises={filteredExercises}
                currentExerciseIndex={currentExerciseIndex}
                setCurrentExerciseIndex={setCurrentExerciseIndex}
                animatedItems={animatedItems}
              />
            </motion.div>

            {/* Desktop view - scrollable list */}
            <motion.div variants={item} className="hidden md:block">
              <ScrollArea className="h-[450px] pr-4">
                <div className="space-y-4">
                  {filteredExercises.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: animatedItems.includes(exercise.id) ? 1 : 0,
                        y: animatedItems.includes(exercise.id) ? 0 : 20,
                      }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ExerciseCard
                        exercise={exercise}
                        index={index}
                        isFirst={index === 0}
                        isLast={index === filteredExercises.length - 1}
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
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          </div>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-none h-12 rounded-xl shadow-lg shadow-emerald-900/20 transition-all duration-300">
              <Save className="mr-2 h-5 w-5" />
              Save as Template
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 border-none h-12 rounded-xl shadow-lg shadow-violet-900/20 transition-all duration-300">
              <Play className="mr-2 h-5 w-5" />
              Start Workout
            </Button>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Edit, RotateCcw, Save, Dumbbell, Filter } from "lucide-react"
import type { GeneratedWorkout, MuscleGroup } from "@/types/workout"
import { WorkoutSummaryCard } from "./workout-summary-card"
import { ExerciseFilters } from "./exercise-filters"
import { MobileExerciseView } from "./mobile-exercise-view"
import { ExerciseCard } from "../workout/index/exercise-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { api } from "@/api"
import { useNavigate } from "react-router"
import { storeWorkout } from "@/capacitor/store"

interface GeneratedWorkoutPreviewProps {
  workout: GeneratedWorkout
  onBack: () => void
  onRegenerate: () => void
}

export function GeneratedWorkoutPreview({ workout, onBack, onRegenerate }: GeneratedWorkoutPreviewProps) {
  // Animation for exercise cards
  const [animatedItems, setAnimatedItems] = useState<number[]>([])
  // console.log("am testing my own",workout)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [filteredExercises, setFilteredExercises] = useState(workout.exercises)
  let nav = useNavigate()
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const handle = async () => {
    const data = {
      id: crypto.randomUUID(),
      name: workout.name,
      is_template: true,
      created_at:new Date(),
      description: workout.description,
      exercises: workout.exercises,
      timer: parseInt(workout.duration as unknown as string) * 60
    }
    try {
      const client = await api()
      await client.post("/template", data)
    } catch (error) {
      console.log(error)
    } finally {
      storeWorkout(data)
      nav("/")
    }
  }

  // Check if screen is mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Dynamically adjust scroll area height based on screen size
  const getScrollHeight = () => {
    if (typeof window !== "undefined") {
      const vh = window.innerHeight * 0.01;
      return isMobile ? `${vh * 50}px` : "450px";
    }
    return "450px";
  }

  const [scrollHeight, setScrollHeight] = useState("450px")

  useEffect(() => {
    setScrollHeight(getScrollHeight())

    const handleResize = () => {
      setScrollHeight(getScrollHeight())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

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
  const muscleGroups = Array.from(new Set(workout?.exercises?.map((ex) => ex.muscleGroup) || []))

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-full">
      <Card className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800/40 shadow-xl rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm">
        <motion.div variants={container} initial="hidden" animate="show" className="w-full">
          <motion.div
            variants={item}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-4 md:mb-6"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-violet-600 p-2 sm:p-2.5 rounded-lg shadow-lg shadow-blue-900/20">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-300 to-violet-300 bg-clip-text text-transparent">
                AI Generated Workout
              </h2>
            </div>
            <div className="flex gap-2 w-full md:w-auto mt-3 md:mt-0">
              <Button
                size={isMobile ? "sm" : "default"}
                variant="outline"
                onClick={onBack}
                className="h-9 sm:h-10 px-3 sm:px-4 border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800/80 hover:text-violet-300 transition-all duration-200 text-xs sm:text-sm"
              >
                <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-violet-400" />
                Edit
              </Button>
              <Button
                size={isMobile ? "sm" : "default"}
                variant="outline"
                onClick={onRegenerate}
                className="h-9 sm:h-10 px-3 sm:px-4 border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800/80 hover:text-blue-300 transition-all duration-200 text-xs sm:text-sm"
              >
                <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5 text-blue-400" />
                Regenerate
              </Button>
            </div>
          </motion.div>

          <motion.div variants={item} className="w-full">
            <WorkoutSummaryCard workout={workout} />
          </motion.div>

          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3"
            >
              <h3 className="text-base sm:text-lg font-medium text-white flex items-center gap-1.5 sm:gap-2">
                <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-violet-400" />
                Exercises
              </h3>

              <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-8 sm:h-9 px-2 sm:px-3 border-zinc-700/50 bg-zinc-800/40 hover:bg-zinc-800/80 text-zinc-300 hover:text-zinc-100 transition-all duration-200 flex items-center gap-1 sm:gap-1.5 text-xs"
                >
                  <Filter className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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
                className="overflow-x-auto pb-2"
              >
                <ExerciseFilters
                  muscleGroups={muscleGroups.filter((group): group is MuscleGroup => group !== undefined)}
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
              <ScrollArea className={`h-[${scrollHeight}] pr-4`} style={{ height: scrollHeight }}>
                <div className="space-y-3 sm:space-y-4">
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
                        onMoveUp={() => { }}
                        onMoveDown={() => { }}
                        onRemove={() => { }}
                        onDuplicate={() => { }}
                        onToggleExpand={() => { }}
                        onUpdateRestTime={() => { }}
                        onAddSet={() => { }}
                        onRemoveSet={() => { }}
                        onUpdateSet={() => { }}
                        onNameChange={() => { }}
                        onShowDetails={() => { }}
                        onToggleSetCompletion={() => { }}
                      />
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <Button
              className="
                flex-1 relative group overflow-hidden
                bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500
                hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600
                border-none h-12 sm:h-14 
                rounded-xl sm:rounded-2xl
                shadow-lg shadow-emerald-900/30
                transition-all duration-500 ease-out
                text-sm sm:text-base font-medium
                before:absolute before:inset-0
                before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
                before:translate-x-[-200%] before:transition-transform before:duration-700
                hover:before:translate-x-[200%]
              "
              onClick={handle}
            >
              <Save className="mr-2.5 h-5 w-5 sm:h-6 sm:w-6 animate-pulse group-hover:animate-none" />
              Save as Template
            </Button>
          </motion.div>

        </motion.div>
      </Card>
    </motion.div>
  )
}

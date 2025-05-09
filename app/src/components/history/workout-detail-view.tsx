"use client"

import { useState } from "react"
import { formatRelative } from "date-fns"
import {
  Clock,
  Calendar,
  Dumbbell,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Share,
  Copy,
  Trash,
  Trophy,
  Heart,
  Flame,
  Zap,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { ExerciseAnimationModal } from "@/components/workout/exercise-animation-modal"
import type { HistoryWorkout } from "@/types/history"

interface WorkoutDetailViewProps {
  workout: HistoryWorkout
}

export function WorkoutDetailView({ workout }: WorkoutDetailViewProps) {
  const [expandedExercises, setExpandedExercises] = useState<number[]>([])
  const [animationExercise, setAnimationExercise] = useState<{
    name: string
    muscleGroup?: string
    equipment?: string[]
  } | null>(null)

  // Format the date
  const formattedDate = formatRelative(new Date(workout.date), new Date())

  // Format duration from seconds to minutes and seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Toggle exercise expansion
  const toggleExercise = (exerciseId: number) => {
    setExpandedExercises((prev) =>
      prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId],
    )
  }

  // Open animation modal
  const openAnimationModal = (exercise: { name: string; muscleGroup?: string; equipment?: string[] }) => {
    setAnimationExercise(exercise)
  }

  // Close animation modal
  const closeAnimationModal = () => {
    setAnimationExercise(null)
  }

  // Calculate completion percentage
  const completionPercentage = Math.round((workout.completedSets / workout.totalSets) * 100)

  return (
    <div className="space-y-6 p-1">
      {/* Animation Modal */}
      {/* {animationExercise && (
        <ExerciseAnimationModal
          exerciseName={animationExercise.name}
          muscleGroup={animationExercise.muscleGroup}
          equipment={animationExercise.equipment}
          isOpen={!!animationExercise}
          onClose={closeAnimationModal}
        />
      )} */}

      {/* Workout summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                className={`
                  ${
                    workout.intensity === "High"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : workout.intensity === "Medium"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-green-500/10 text-green-400 border border-green-500/20"
                  }
                `}
              >
                {workout.intensity === "High" ? (
                  <Flame className="h-3.5 w-3.5 mr-1.5" />
                ) : workout.intensity === "Medium" ? (
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                ) : (
                  <Heart className="h-3.5 w-3.5 mr-1.5" />
                )}
                {workout.intensity} Intensity
              </Badge>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-100">
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                  <Copy className="h-4 w-4 text-cyan-400" />
                  <span>Duplicate Workout</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer flex items-center gap-2">
                  <Share className="h-4 w-4 text-cyan-400" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 cursor-pointer flex items-center gap-2 text-red-400">
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900/70 rounded-lg p-3 flex flex-col items-center justify-center border border-gray-800/30">
              <div className="flex items-center text-cyan-400 mb-1">
                <Clock className="h-4 w-4 mr-1.5" />
                <span className="text-sm">Duration</span>
              </div>
              <span className="font-medium text-lg text-gray-100">{formatDuration(workout.duration)}</span>
            </div>

            <div className="bg-gray-900/70 rounded-lg p-3 flex flex-col items-center justify-center border border-gray-800/30">
              <div className="flex items-center text-cyan-400 mb-1">
                <Dumbbell className="h-4 w-4 mr-1.5" />
                <span className="text-sm">Exercises</span>
              </div>
              <span className="font-medium text-lg text-gray-100">{workout.exercises.length}</span>
            </div>

            <div className="bg-gray-900/70 rounded-lg p-3 flex flex-col items-center justify-center border border-gray-800/30">
              <div className="flex items-center text-cyan-400 mb-1">
                <BarChart3 className="h-4 w-4 mr-1.5" />
                <span className="text-sm">Volume</span>
              </div>
              <span className="font-medium text-lg text-gray-100">{workout.totalVolume} kg</span>
            </div>
          </div>

          {workout.notes && (
            <div className="bg-gray-900/70 rounded-lg p-3 border border-gray-800/30">
              <h4 className="text-sm font-medium text-cyan-400 mb-1">Notes</h4>
              <p className="text-gray-300 text-sm">{workout.notes}</p>
            </div>
          )}

          {/* Personal records section */}
          {workout.personalRecords && workout.personalRecords.length > 0 && (
            <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-lg p-3 border border-amber-800/30">
              <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center">
                <Trophy className="h-4 w-4 mr-1.5" />
                Personal Records
              </h4>
              <div className="space-y-2">
                {workout.personalRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-900/30 rounded-md p-2">
                    <span className="text-gray-200 text-sm">{record.exercise}</span>
                    <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {record.type === "weight" ? `${record.value}kg` : `${record.value} reps`}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-900/70 rounded-lg p-4 border border-gray-800/30">
          <h4 className="text-sm font-medium text-cyan-400 mb-3">Workout Progress</h4>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Completion</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-cyan-400">
                    {workout.completedSets}/{workout.totalSets} sets
                  </span>
                  <span className="text-sm font-medium bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
              <Progress
                value={completionPercentage}
                className="h-2 bg-gray-800/70"
                indicatorClassName={
                  completionPercentage === 100
                    ? "bg-gradient-to-r from-green-500 to-green-400"
                    : "bg-gradient-to-r from-cyan-500 to-blue-400"
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800/20">
                <div className="text-sm text-gray-400 mb-1">Calories Burned</div>
                <div className="text-lg font-medium text-gray-100 flex items-center">
                  <Flame className="h-4 w-4 mr-1.5 text-orange-400" />
                  {workout.caloriesBurned} kcal
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800/20">
                <div className="text-sm text-gray-400 mb-1">Avg. Rest Time</div>
                <div className="text-lg font-medium text-gray-100 flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-blue-400" />
                  {workout.averageRestTime}s
                </div>
              </div>
            </div>

            {/* Workout performance comparison */}
            <div className="mt-2">
              <h5 className="text-sm font-medium text-gray-300 mb-2">Performance vs Average</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Volume</span>
                  <div className="flex items-center">
                    <span
                      className={`text-sm ${workout.volumeVsAverage > 0 ? "text-green-400" : workout.volumeVsAverage < 0 ? "text-red-400" : "text-gray-400"}`}
                    >
                      {workout.volumeVsAverage > 0 ? "+" : ""}
                      {workout.volumeVsAverage}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Intensity</span>
                  <div className="flex items-center">
                    <span
                      className={`text-sm ${workout.intensityVsAverage > 0 ? "text-green-400" : workout.intensityVsAverage < 0 ? "text-red-400" : "text-gray-400"}`}
                    >
                      {workout.intensityVsAverage > 0 ? "+" : ""}
                      {workout.intensityVsAverage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises list */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-100">Exercises</h3>

        <div className="space-y-3">
          {workout.exercises.map((exercise) => {
            const isExpanded = expandedExercises.includes(exercise.id)
            const completedSets = exercise.sets.filter((set) => set.isCompleted).length
            const exerciseCompletion = Math.round((completedSets / exercise.sets.length) * 100)
            const hasPersonalRecord = exercise.personalRecord

            return (
              <Card
                key={exercise.id}
                className="bg-gray-900/70 border-gray-800/50 overflow-hidden hover:border-gray-700/50 transition-all"
              >
                <CardHeader className="py-3 px-4 cursor-pointer" onClick={() => toggleExercise(exercise.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${exerciseCompletion === 100 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"}
                      `}
                      >
                        <Dumbbell className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-100 flex items-center gap-1.5">
                          {exercise.name}
                          {hasPersonalRecord && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-gray-900 border-gray-800 text-gray-100">
                                  <p>Personal Record!</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </h4>
                        <div className="text-xs text-gray-400">
                          {exercise.sets.length} sets • {exercise.muscleGroup}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          openAnimationModal({
                            name: exercise.name,
                            muscleGroup: exercise.muscleGroup,
                            equipment: exercise.equipment,
                          })
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <div className="text-right">
                        <div className="text-sm font-medium text-cyan-400">{exercise.totalVolume} kg</div>
                        <div className="text-xs text-gray-400">volume</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0 pb-3 px-4">
                    <div className="border-t border-gray-800/50 pt-3 mt-1">
                      <div className="grid grid-cols-4 gap-2 text-xs text-gray-400 mb-2 px-1">
                        <div>SET</div>
                        <div>WEIGHT (KG)</div>
                        <div>REPS</div>
                        <div>COMPLETED</div>
                      </div>

                      <div className="space-y-2">
                        {exercise.sets.map((set, index) => (
                          <div
                            key={set.id}
                            className="grid grid-cols-4 gap-2 bg-gray-900/50 rounded-lg p-2 items-center border border-gray-800/20"
                          >
                            <div className="font-medium text-gray-300">{index + 1}</div>
                            <div className="font-medium text-gray-300">{set.weight}</div>
                            <div className="font-medium text-gray-300">{set.reps}</div>
                            <div>
                              {set.isCompleted ? (
                                <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20">
                                  Completed
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-gray-400 border-gray-700 hover:bg-gray-800">
                                  Skipped
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {exercise.notes && (
                        <div className="mt-3 bg-gray-900/50 rounded-lg p-2 text-sm border border-gray-800/20">
                          <span className="text-cyan-400 font-medium">Notes: </span>
                          <span className="text-gray-300">{exercise.notes}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

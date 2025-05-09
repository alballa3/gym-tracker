"use client"

import { useState } from "react"
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
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { ExerciseAnimationModal } from "@/components/workout/exercise-animation-modal"
import type { HistoryWorkout } from "@/types/history"
import moment from "moment"

interface WorkoutDetailViewProps {
  workout: HistoryWorkout
}

export function WorkoutDetailView({ workout }: WorkoutDetailViewProps) {
  const [expandedExercises, setExpandedExercises] = useState<number[]>([])
  // Format the date
  const formattedDate = moment(workout.created_at).fromNow()

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


  // Calculate completion percentage
  const completionPercentage = Math.round(((workout?.completedSets ?? 0) / (workout?.totalSets ?? 1)) * 100)

  return (
    <div className="space-y-6 p-1">
      {/* Workout summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Workout
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
              <span className="font-medium text-lg text-gray-100">{formatDuration(workout.timer)}</span>
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

          {workout.description && (
            <div className="bg-gray-900/70 rounded-lg p-3 border border-gray-800/30">
              <h4 className="text-sm font-medium text-cyan-400 mb-1">description</h4>
              <p className="text-gray-300 text-sm">{workout.description}</p>
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
                className={
                  completionPercentage === 100
                    ? "bg-gradient-to-r from-green-500 to-green-400 h-2 bg-gray-800/70"
                    : "bg-gradient-to-r from-cyan-500 to-blue-400 h-2 bg-gray-800/70"
                }
              />
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

                        </h4>
                        <div className="text-xs text-gray-400">
                          {exercise.sets.length} sets • {exercise.muscleGroup}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">

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

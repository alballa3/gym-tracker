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
  CheckCircle,
  XCircle,
  Info,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  let completedSets = workout.exercises.reduce((total, exercise) => {
    const completedSets = exercise.sets.filter((set) => set.isCompleted).length
    return total + completedSets
  }, 0)
  let totalSets = workout.exercises.reduce((total, exercise) => {
    const totalSets = exercise.sets.length
    return total + totalSets
  }, 0)
  let totalVolume = workout.exercises.reduce((total, exercise) => {
    const totalVolume = exercise.sets.reduce((total, set) => total + set.weight, 0)
    return total + totalVolume
  }, 0)
  // Calculate completion percentage
  const completionPercentage = Math.round((completedSets / totalSets) * 100)

  return (
    <div className="space-y-6 p-1">
      {/* Workout summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between backdrop-blur-sm bg-gray-900/40 rounded-lg p-3 border border-gray-800/30">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5 rounded-full">
                <div className="bg-gray-900 rounded-full p-1.5">
                  <Zap className="h-5 w-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-100">Workout Session</h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 rounded-full"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900/95 backdrop-blur-md border-gray-800 text-gray-100 rounded-xl shadow-xl">
                <DropdownMenuItem className="hover:bg-gray-800/70 cursor-pointer flex items-center gap-2 rounded-lg transition-colors">
                  <Copy className="h-4 w-4 text-cyan-400" />
                  <span>Duplicate Workout</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800/70 cursor-pointer flex items-center gap-2 rounded-lg transition-colors">
                  <Share className="h-4 w-4 text-cyan-400" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800/70 cursor-pointer flex items-center gap-2 text-red-400 rounded-lg transition-colors">
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center border border-gray-800/30 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-center text-cyan-400 mb-1 group-hover:scale-105 transition-transform">
                <Clock className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <span className="font-medium text-lg text-gray-100">{formatDuration(workout.timer)}</span>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center border border-gray-800/30 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-center text-cyan-400 mb-1 group-hover:scale-105 transition-transform">
                <Dumbbell className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Exercises</span>
              </div>
              <span className="font-medium text-lg text-gray-100">{workout.exercises.length}</span>
            </div>

            <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center border border-gray-800/30 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-center text-cyan-400 mb-1 group-hover:scale-105 transition-transform">
                <BarChart3 className="h-4 w-4 mr-1.5" />
                <span className="text-sm font-medium">Volume</span>
              </div>
              <span className="font-medium text-lg text-gray-100">{totalVolume} kg</span>
            </div>
          </div>

          {workout.description && (
            <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-cyan-400" />
                <h4 className="text-sm font-medium text-cyan-400">Description</h4>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{workout.description}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-4 border border-gray-800/30">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-cyan-400" />
            <h4 className="text-sm font-medium text-cyan-400">Workout Progress</h4>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Completion</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-cyan-400">
                    {workout.completedSets}/{workout.totalSets} sets
                  </span>
                  <span className="text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-800/70 rounded-full overflow-hidden">
                <Progress
                  value={completionPercentage}
                  className={
                    completionPercentage === 100
                      ? "bg-gradient-to-r from-green-500 to-green-400 h-full"
                      : "bg-gradient-to-r from-cyan-500 to-blue-400 h-full"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises list */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-gray-100">Exercises</h3>
        </div>

        <div className="space-y-3">
          {workout.exercises.map((exercise) => {
            const isExpanded = expandedExercises.includes(exercise.id)
            const completedSets = exercise.sets.filter((set) => set.isCompleted).length
            const exerciseCompletion = Math.round((completedSets / exercise.sets.length) * 100)

            return (
              <Card
                key={exercise.id}
                className={`
                  bg-gray-900/40 backdrop-blur-sm border-gray-800/50 overflow-hidden 
                  hover:border-gray-700/50 transition-all
                  ${isExpanded ? 'ring-1 ring-cyan-500/30' : ''}
                `}
              >
                <CardHeader
                  className="py-3 px-4 cursor-pointer hover:bg-gray-800/20 transition-colors"
                  onClick={() => toggleExercise(exercise.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center
                          ${exerciseCompletion === 100
                            ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30"
                            : "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30"}
                        `}
                      >
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-100 flex items-center gap-1.5">
                          {exercise.name}
                        </h4>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Badge variant="outline" className="text-xs px-1.5 py-0 border-gray-700 text-gray-300">
                            {exercise.sets.length} sets
                          </Badge>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs px-1.5 py-0 border-gray-700 text-gray-300">
                            {exercise.muscleGroup}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-right">
                              <div className="text-sm font-medium text-cyan-400">{exercise.totalVolume} kg</div>
                              <div className="text-xs text-gray-400">volume</div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-900 border-gray-800 text-gray-100">
                            <p>Total weight lifted in this exercise</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-gray-100 hover:bg-gray-800/50 rounded-full"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0 pb-3 px-4">
                    <div className="border-t border-gray-800/50 pt-3 mt-1">
                      <div className="grid grid-cols-4 gap-2 text-xs font-medium text-cyan-400/80 mb-2 px-1">
                        <div>SET</div>
                        <div>WEIGHT (KG)</div>
                        <div>REPS</div>
                        <div>COMPLETED</div>
                      </div>

                      <div className="space-y-2">
                        {exercise.sets.map((set, index) => (
                          <div
                            key={set.id}
                            className={`
                              grid grid-cols-4 gap-2 rounded-lg p-2.5 items-center 
                              border border-gray-800/20 transition-colors
                              ${set.isCompleted
                                ? 'bg-green-500/5 hover:bg-green-500/10'
                                : 'bg-gray-900/50 hover:bg-gray-800/30'}
                            `}
                          >
                            <div className="font-medium text-gray-300">{index + 1}</div>
                            <div className="font-medium text-gray-300">{set.weight}</div>
                            <div className="font-medium text-gray-300">{set.reps}</div>
                            <div>
                              {set.isCompleted ? (
                                <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Completed</span>
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-gray-400 border-gray-700 hover:bg-gray-800 flex items-center gap-1">
                                  <XCircle className="h-3 w-3" />
                                  <span>Skipped</span>
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

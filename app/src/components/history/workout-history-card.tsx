"use client"

import { formatDistanceToNow } from "date-fns"
import { Calendar, Clock, Dumbbell, BarChart3, ArrowRight, Trophy } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { HistoryWorkout } from "@/types/history"

interface WorkoutHistoryCardProps {
  workout: HistoryWorkout
  onClick: () => void
}

export function WorkoutHistoryCard({ workout, onClick }: WorkoutHistoryCardProps) {
  // Format the date to relative time (e.g., "2 days ago")
  const formattedDate = formatDistanceToNow(new Date(workout.date), { addSuffix: true })

  // Format duration from seconds to minutes
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  // Calculate completion percentage
  const completionPercentage = Math.round((workout.completedSets / workout.totalSets) * 100)

  // Determine if this workout has any personal records
  const hasPersonalRecord = workout.personalRecords && workout.personalRecords.length > 0

  return (
    <Card
      className="bg-gradient-to-br from-gray-900/90 to-gray-950/95 border-gray-800/50 shadow-xl rounded-xl overflow-hidden 
      hover:border-cyan-900/50 transition-all duration-300 cursor-pointer group hover:shadow-cyan-900/5 hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 opacity-80"></div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-100 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              {workout.name}
              {hasPersonalRecord && <Trophy className="h-4 w-4 text-amber-400" />}
            </h3>
            <div className="flex items-center text-gray-400 text-sm mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

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
            {workout.intensity} Intensity
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-900/70 rounded-lg p-2 flex flex-col items-center justify-center border border-gray-800/30 group-hover:border-gray-800/50 transition-colors">
            <div className="flex items-center text-cyan-400 mb-1">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Duration</span>
            </div>
            <span className="font-medium text-gray-200">{formatDuration(workout.duration)}</span>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-2 flex flex-col items-center justify-center border border-gray-800/30 group-hover:border-gray-800/50 transition-colors">
            <div className="flex items-center text-cyan-400 mb-1">
              <Dumbbell className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Exercises</span>
            </div>
            <span className="font-medium text-gray-200">{workout.exercises.length}</span>
          </div>

          <div className="bg-gray-900/70 rounded-lg p-2 flex flex-col items-center justify-center border border-gray-800/30 group-hover:border-gray-800/50 transition-colors">
            <div className="flex items-center text-cyan-400 mb-1">
              <BarChart3 className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Volume</span>
            </div>
            <span className="font-medium text-gray-200">{workout.totalVolume} kg</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Completion</span>
            <span className={`font-medium ${completionPercentage === 100 ? "text-green-400" : "text-cyan-400"}`}>
              {completionPercentage}%
            </span>
          </div>
          <Progress
            value={completionPercentage}
            className="h-1.5 bg-gray-800/70"
            indicatorClassName={
              completionPercentage === 100
                ? "bg-gradient-to-r from-green-500 to-green-400"
                : "bg-gradient-to-r from-cyan-500 to-blue-400"
            }
          />
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className="w-full justify-between text-cyan-400 hover:bg-gray-800/70 hover:text-cyan-300 p-2 h-auto"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  )
}

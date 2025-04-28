"use client"

import { History, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Set, PreviousData } from "@/types/workout"

interface PreviousWorkoutDataProps {
  previousData: PreviousData
  currentSets: Set[]
}

export function PreviousWorkoutData({ previousData, currentSets }: PreviousWorkoutDataProps) {
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
  }

  // Helper function to calculate weight difference
  const getWeightDifference = (current: number, previous: number) => {
    if (previous === 0 && current === 0) return "same"
    const diff = current - previous
    if (diff > 0) return "increase"
    if (diff < 0) return "decrease"
    return "same"
  }

  return (
    <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-xl p-3 border border-gray-700/30">
      <div className="flex items-center gap-2 mb-2">
        <History className="h-4 w-4 text-cyan-300" />
        <Label className="text-white text-sm">Last Workout ({formatDate(previousData.date)})</Label>
      </div>
      <div className="space-y-1.5">
        {previousData.sets.map((prevSet, idx) => {
          // Find corresponding current set
          const currentSet = currentSets[idx]
          if (!currentSet) return null

          const weightDiff = getWeightDifference(currentSet.weight, prevSet.weight)
          const repsDiff = getWeightDifference(currentSet.reps, prevSet.reps)

          return (
            <div key={idx} className="flex items-center text-sm">
              <div className="w-6 text-gray-400 text-xs">{idx + 1}</div>
              <div className="flex-1 flex items-center gap-1">
                <span className="text-gray-300">{prevSet.weight} kg</span>
                <span className="text-gray-500 mx-0.5">×</span>
                <span className="text-gray-300">{prevSet.reps}</span>
              </div>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex items-center ${
                          weightDiff === "increase"
                            ? "text-green-400"
                            : weightDiff === "decrease"
                              ? "text-red-400"
                              : "text-gray-500"
                        }`}
                      >
                        {weightDiff === "increase" ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : weightDiff === "decrease" ? (
                          <TrendingDown className="h-3.5 w-3.5" />
                        ) : (
                          <Minus className="h-3.5 w-3.5" />
                        )}
                        <span className="text-xs ml-0.5">{Math.abs(currentSet.weight - prevSet.weight)}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                      <p>
                        {weightDiff === "increase"
                          ? `Increased by ${currentSet.weight - prevSet.weight}kg`
                          : weightDiff === "decrease"
                            ? `Decreased by ${prevSet.weight - currentSet.weight}kg`
                            : "Same weight"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex items-center ml-2 ${
                          repsDiff === "increase"
                            ? "text-green-400"
                            : repsDiff === "decrease"
                              ? "text-red-400"
                              : "text-gray-500"
                        }`}
                      >
                        {repsDiff === "increase" ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : repsDiff === "decrease" ? (
                          <TrendingDown className="h-3.5 w-3.5" />
                        ) : (
                          <Minus className="h-3.5 w-3.5" />
                        )}
                        <span className="text-xs ml-0.5">{Math.abs(currentSet.reps - prevSet.reps)}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 border-gray-700 text-white">
                      <p>
                        {repsDiff === "increase"
                          ? `Increased by ${currentSet.reps - prevSet.reps} reps`
                          : repsDiff === "decrease"
                            ? `Decreased by ${prevSet.reps - currentSet.reps} reps`
                            : "Same reps"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

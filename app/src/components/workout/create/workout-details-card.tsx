"use client"

import { MoreVertical, Flame, Share, Copy, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { useWorkout } from "@/contexts/workout-context"
interface WorkoutDetailsCardProps {
  name: string
  setName: (name: string) => void
  description: string
  setDescription: (description: string) => void
  saveAsTemplate: boolean
  setSaveAsTemplate: (save: boolean) => void
  state?: any // Make state optional
  startTime?: Date // Optional start time for the timer

}

export function WorkoutDetailsCard({
  name,
  setName,
  description,
  setDescription,
  state,

}: WorkoutDetailsCardProps) {
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const {dispatch}=useWorkout()
  
  // Start the timer when the component mounts
  useEffect(() => {
    const startTime = new Date()
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const elapsed = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000)
      setElapsedTime(elapsed)
    }, 1000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval)
  }, [])
  useEffect(() => {
    dispatch({
      type:"SET_TIMER",
      payload: elapsedTime
    })
  }, [elapsedTime])
  // Format seconds to MM:SS
   const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  function getTotalSetsCount() {
    if (!state || !state.exercises) return 0
    return state.exercises.reduce((total: number, exercise: any) => total + exercise.sets.length, 0)
  }

  function getCompletedSetsCount() {
    if (!state || !state.exercises) return 0
    return state.exercises.reduce((total: number, exercise: any) => {
      return total + exercise.sets.filter((set: any) => set.isCompleted).length
    }, 0)
  }

  function getCompletionPercentage() {
    const total = getTotalSetsCount()
    if (total === 0) return 0
    return (getCompletedSetsCount() / total) * 100
  }

  return (
    <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-gray-800/50 shadow-xl rounded-2xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 via-blue-300 to-cyan-400"></div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500/30 to-blue-500/30 p-1.5 rounded-lg">
              <Flame className="h-4 w-4 text-cyan-300" />
            </div>
            Workout Details
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800/70"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                <Share className="h-4 w-4 text-cyan-300" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                <Copy className="h-4 w-4 text-cyan-300" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                <Edit className="h-4 w-4 text-cyan-300" />
                <span>Reset</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription>Enter the details for your workout</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
          {/* Timer display */}
        <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-xl p-3 border border-gray-700/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-300" />
            <Label className="text-white text-sm">Workout Time</Label>
          </div>
          <div className="text-cyan-300 font-mono text-lg">{formatTime(elapsedTime)}</div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white flex items-center gap-1.5">
            <span>Workout Name</span>
            <span className="text-xs text-cyan-300/70">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Upper Body Strength"
            className="bg-gray-800/50 border-gray-700/50 focus:border-cyan-500/50 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">
            Description (optional)
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your workout..."
            className="bg-gray-800/50 border-gray-700/50 focus:border-cyan-500/50 text-white resize-none h-20"
          />
        </div>
        {/* <div className="flex items-center space-x-2 pt-2">
          <div className="flex-1">
            <Switch
              id="save-template"
              checked={saveAsTemplate}
              onCheckedChange={setSaveAsTemplate}
              className="data-[state=checked]:bg-cyan-500"
            />
            <Label htmlFor="save-template" className="text-white ml-2">
              Save as template
            </Label>
          </div>
          <div className="text-xs text-gray-400 italic">
            {saveAsTemplate ? "Will be saved for future use" : "One-time workout"}
          </div>
        </div> */}
        {state && state.exercises && state.exercises.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700/30">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Workout Progress</span>
                <span className="text-sm text-cyan-300">
                  {getCompletedSetsCount()}/{getTotalSetsCount()} sets completed
                </span>
              </div>
              <Progress
                value={getCompletionPercentage()}
                className={
                  getCompletionPercentage() === 100
                    ? "bg-gradient-to-r from-green-500 to-green-400 h-2 bg-gray-800/50"
                    : "bg-gradient-to-r from-cyan-500 to-blue-400 h-2 bg-gray-800/50"
                }
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

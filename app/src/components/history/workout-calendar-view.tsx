"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, isSameDay } from "date-fns"
import { Dumbbell, Clock, BarChart3 } from "lucide-react"
import type { HistoryWorkout } from "@/types/history"

interface WorkoutCalendarViewProps {
  workouts: HistoryWorkout[]
  onWorkoutClick: (workout: HistoryWorkout) => void
}

export function WorkoutCalendarView({ workouts, onWorkoutClick }: WorkoutCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get workouts for the selected date
  const workoutsForSelectedDate = selectedDate
    ? workouts.filter((workout) => isSameDay(new Date(workout.date), selectedDate))
    : []

  // Function to determine if a date has workouts
  const hasWorkoutOnDate = (date: Date) => {
    return workouts.some((workout) => isSameDay(new Date(workout.date), date))
  }

  // Get workout intensity for a date
  const getWorkoutIntensity = (date: Date) => {
    const workoutsOnDate = workouts.filter((workout) => isSameDay(new Date(workout.date), date))
    if (workoutsOnDate.length === 0) return null

    // Return the highest intensity if multiple workouts
    if (workoutsOnDate.some((w) => w.intensity === "High")) return "High"
    if (workoutsOnDate.some((w) => w.intensity === "Medium")) return "Medium"
    return "Low"
  }

  // Custom renderer for calendar days
  const renderDay = (day: Date) => {
    const hasWorkout = hasWorkoutOnDate(day)
    const intensity = getWorkoutIntensity(day)

    let dotColor = "bg-cyan-400"
    if (intensity === "High") dotColor = "bg-red-400"
    else if (intensity === "Medium") dotColor = "bg-amber-400"
    else if (intensity === "Low") dotColor = "bg-green-400"

    return (
      <div className={`relative w-full h-full flex items-center justify-center ${hasWorkout ? "font-medium" : ""}`}>
        {day.getDate()}
        {hasWorkout && (
          <div
            className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 ${dotColor} rounded-full`}
          ></div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="bg-gray-900/70 border-gray-800/50 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-100">Workout Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="bg-transparent text-gray-100"
              classNames={{
                day_selected: "bg-cyan-500 text-white hover:bg-cyan-600",
                day_today: "bg-gray-800 text-cyan-400",
                day: "text-gray-100 hover:bg-gray-800",
              }}
              components={{
                Day: ({ date }) => renderDay(date),
              }}
            />

            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-1.5"></div>
                <span>Low Intensity</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-400 mr-1.5"></div>
                <span>Medium Intensity</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-400 mr-1.5"></div>
                <span>High Intensity</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="bg-gray-900/70 border-gray-800/50 shadow-lg h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-gray-100 flex items-center justify-between">
              <span>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}</span>
              {workoutsForSelectedDate.length > 0 && (
                <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {workoutsForSelectedDate.length} workout{workoutsForSelectedDate.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workoutsForSelectedDate.length > 0 ? (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {workoutsForSelectedDate.map((workout) => (
                    <div
                      key={workout.id}
                      className="bg-gray-900/90 rounded-lg p-3 cursor-pointer hover:bg-gray-800/90 transition-colors border border-gray-800/30 hover:border-gray-700/50"
                      onClick={() => onWorkoutClick(workout)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-100">{workout.name}</h4>
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
                          {workout.intensity}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex flex-col items-center bg-gray-900/50 rounded-lg p-2 border border-gray-800/20">
                          <div className="text-gray-400 flex items-center text-xs mb-1">
                            <Clock className="h-3 w-3 mr-1" />
                            Duration
                          </div>
                          <div className="text-gray-200">{Math.floor(workout.duration / 60)} min</div>
                        </div>
                        <div className="flex flex-col items-center bg-gray-900/50 rounded-lg p-2 border border-gray-800/20">
                          <div className="text-gray-400 flex items-center text-xs mb-1">
                            <Dumbbell className="h-3 w-3 mr-1" />
                            Exercises
                          </div>
                          <div className="text-gray-200">{workout.exercises.length}</div>
                        </div>
                        <div className="flex flex-col items-center bg-gray-900/50 rounded-lg p-2 border border-gray-800/20">
                          <div className="text-gray-400 flex items-center text-xs mb-1">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Volume
                          </div>
                          <div className="text-gray-200">{workout.totalVolume} kg</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="w-16 h-16 rounded-full bg-gray-800/50 flex items-center justify-center mb-3">
                  <Calendar className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-400 mb-1">No workouts found</h3>
                <p className="text-sm text-gray-500">
                  {selectedDate ? "No workouts on this date" : "Select a date to view workouts"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

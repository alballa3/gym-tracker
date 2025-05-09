"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "@/components/history/charts"
import { Dumbbell, Clock, BarChart3, Flame } from "lucide-react"
import type { HistoryWorkout } from "@/types/history"

interface WorkoutAnalyticsProps {
  workouts: HistoryWorkout[]
}

export function WorkoutAnalytics({ workouts }: WorkoutAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year" | "all">("month")

  // Filter workouts based on time range
  const filteredWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(workout.date)
    const now = new Date()

    switch (timeRange) {
      case "week":
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7))
        return workoutDate >= oneWeekAgo
      case "month":
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1))
        return workoutDate >= oneMonthAgo
      case "year":
        const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1))
        return workoutDate >= oneYearAgo
      default:
        return true
    }
  })

  // Calculate total stats
  const totalWorkouts = filteredWorkouts.length
  const totalVolume = filteredWorkouts.reduce((sum, workout) => sum + workout.totalVolume, 0)
  const totalDuration = filteredWorkouts.reduce((sum, workout) => sum + workout.duration, 0)
  const totalCalories = filteredWorkouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0)

  // Format duration from seconds to hours and minutes
  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-100">Workout Analytics</h3>
        <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
          <SelectTrigger className="w-[150px] bg-gray-900/50 border-gray-800 text-gray-100">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800 text-gray-100">
            <SelectItem value="week">Past Week</SelectItem>
            <SelectItem value="month">Past Month</SelectItem>
            <SelectItem value="year">Past Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900/70 border-gray-800/50 hover:border-gray-700/50 transition-colors">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Dumbbell className="h-4 w-4 mr-1.5 text-cyan-400" />
              Total Workouts
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-4 pb-4">
            <div className="text-2xl font-bold text-gray-100">{totalWorkouts}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800/50 hover:border-gray-700/50 transition-colors">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <BarChart3 className="h-4 w-4 mr-1.5 text-blue-400" />
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-4 pb-4">
            <div className="text-2xl font-bold text-gray-100">{totalVolume.toLocaleString()} kg</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800/50 hover:border-gray-700/50 transition-colors">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-violet-400" />
              Total Duration
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-4 pb-4">
            <div className="text-2xl font-bold text-gray-100">{formatTotalDuration(totalDuration)}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/70 border-gray-800/50 hover:border-gray-700/50 transition-colors">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
              <Flame className="h-4 w-4 mr-1.5 text-orange-400" />
              Calories Burned
            </CardTitle>
          </CardHeader>
          <CardContent className="py-0 px-4 pb-4">
            <div className="text-2xl font-bold text-gray-100">{totalCalories.toLocaleString()} kcal</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="volume" className="space-y-4">
        <TabsList className="bg-gray-900/50 border border-gray-800">
          <TabsTrigger value="volume" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
            Volume
          </TabsTrigger>
          <TabsTrigger value="frequency" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
            Frequency
          </TabsTrigger>
          <TabsTrigger value="duration" className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400">
            Duration
          </TabsTrigger>
          <TabsTrigger
            value="muscle-groups"
            className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
          >
            Muscle Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="volume" className="mt-0">
          <Card className="bg-gray-900/70 border-gray-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-100">Volume Progression</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[350px]">
                <LineChart
                  data={filteredWorkouts}
                  dataKey="totalVolume"
                  timeRange={timeRange}
                  label="Volume (kg)"
                  color="#22d3ee"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequency" className="mt-0">
          <Card className="bg-gray-900/70 border-gray-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-100">Workout Frequency</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[350px]">
                <BarChart data={filteredWorkouts} timeRange={timeRange} label="Workouts" color="#818cf8" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duration" className="mt-0">
          <Card className="bg-gray-900/70 border-gray-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-100">Workout Duration</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[350px]">
                <LineChart
                  data={filteredWorkouts}
                  dataKey="duration"
                  timeRange={timeRange}
                  label="Duration (min)"
                  color="#34d399"
                  valueFormatter={(value) => `${Math.floor(value / 60)} min`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="muscle-groups" className="mt-0">
          <Card className="bg-gray-900/70 border-gray-800/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-100">Muscle Groups Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[350px]">
                <PieChart data={filteredWorkouts} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

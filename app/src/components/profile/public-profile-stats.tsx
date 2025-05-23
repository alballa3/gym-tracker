"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BarChart as Chart } from "@/components/ui/chart"
import { ArrowUp, ArrowDown, Minus } from "lucide-react"


export default function PublicProfileStats() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  // Mock data for charts - in a real app, you would fetch this based on userId
  const workoutData = {
    week: [
      { name: "Mon", workouts: 1 },
      { name: "Tue", workouts: 0 },
      { name: "Wed", workouts: 1 },
      { name: "Thu", workouts: 0 },
      { name: "Fri", workouts: 1 },
      { name: "Sat", workouts: 0 },
      { name: "Sun", workouts: 1 },
    ],
    month: [
      { name: "Week 1", workouts: 3 },
      { name: "Week 2", workouts: 4 },
      { name: "Week 3", workouts: 2 },
      { name: "Week 4", workouts: 5 },
    ],
    year: [
      { name: "Jan", workouts: 12 },
      { name: "Feb", workouts: 15 },
      { name: "Mar", workouts: 18 },
      { name: "Apr", workouts: 14 },
      { name: "May", workouts: 20 },
      { name: "Jun", workouts: 22 },
    ],
  }

  // Calculate trend compared to previous period
  const currentTotal = workoutData[timeRange].reduce((sum, item) => sum + item.workouts, 0)
  const previousTotal = currentTotal - 2 // Mock data for demonstration
  const percentChange = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0

  const trendIcon =
    percentChange > 0 ? (
      <ArrowUp className="h-3 w-3 text-green-400" />
    ) : percentChange < 0 ? (
      <ArrowDown className="h-3 w-3 text-red-400" />
    ) : (
      <Minus className="h-3 w-3 text-zinc-400" />
    )

  const trendColor = percentChange > 0 ? "text-green-400" : percentChange < 0 ? "text-red-400" : "text-zinc-400"

  return (
    <section className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800/50 p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-base font-semibold text-white">Workout Activity</h2>
          <div className="flex items-center mt-1">
            <span className="text-xs text-zinc-400 mr-1">Trend:</span>
            <div className="flex items-center">
              {trendIcon}
              <span className={`text-xs font-medium ${trendColor} ml-1`}>{Math.abs(percentChange).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="flex bg-zinc-800/70 rounded-full p-0.5 backdrop-blur-sm">
          <Button
            size="sm"
            variant="ghost"
            className={`px-3 py-1 h-7 rounded-full text-xs ${
              timeRange === "week" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={`px-3 py-1 h-7 rounded-full text-xs ${
              timeRange === "month" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={`px-3 py-1 h-7 rounded-full text-xs ${
              timeRange === "year" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-3 h-[200px] border border-zinc-700/30 shadow-sm">
        <Chart
          data={workoutData[timeRange]}
          index="name"
          categories={["workouts"]}
          colors={["#3b82f6"]}
          valueFormatter={(value) => `${value}`}
          yAxisWidth={20}
          className="text-zinc-400"
        />
      </div>
    </section>
  )
}

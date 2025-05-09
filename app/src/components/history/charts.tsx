"use client"

import { useMemo } from "react"
import type { HistoryWorkout } from "@/types/history"

// Placeholder components for charts
// In a real app, you would use a charting library like Recharts, Chart.js, or D3.js

export function LineChart({
  data,
  dataKey,
  timeRange,
  label,
  color,
  valueFormatter = (value) => value.toString(),
}: {
  data: HistoryWorkout[]
  dataKey: keyof HistoryWorkout
  timeRange: string
  label: string
  color: string
  valueFormatter?: (value: number) => string
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="mb-2 text-lg font-medium text-gray-200">Line Chart Placeholder</div>
        <div>Would display {label} over time</div>
        <div className="mt-2 text-sm">
          {data.length} data points • {timeRange} view • <span style={{ color }}>{color}</span> color
        </div>
        <div className="mt-4 p-4 border border-gray-800 rounded-lg bg-gray-900/50 max-w-md">
          <div className="text-left mb-2 text-sm font-medium text-gray-300">Sample Data Points:</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {data.slice(0, 4).map((workout, index) => (
              <div key={index} className="flex justify-between bg-gray-900/70 p-2 rounded">
                <span>{new Date(workout.date).toLocaleDateString()}</span>
                <span className="font-medium" style={{ color }}>
                  {valueFormatter(workout[dataKey] as number)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function BarChart({
  data,
  timeRange,
  label,
  color,
}: {
  data: HistoryWorkout[]
  timeRange: string
  label: string
  color: string
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="mb-2 text-lg font-medium text-gray-200">Bar Chart Placeholder</div>
        <div>Would display {label} frequency</div>
        <div className="mt-2 text-sm">
          {data.length} data points • {timeRange} view • <span style={{ color }}>{color}</span> color
        </div>
        <div className="mt-4 p-4 border border-gray-800 rounded-lg bg-gray-900/50 max-w-md">
          <div className="text-left mb-2 text-sm font-medium text-gray-300">Workout Frequency:</div>
          <div className="space-y-2">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
              const count = data.filter(
                (workout) => new Date(workout.date).toLocaleDateString("en-US", { weekday: "long" }) === day,
              ).length
              const maxCount = Math.max(
                ...["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (d) =>
                    data.filter(
                      (workout) => new Date(workout.date).toLocaleDateString("en-US", { weekday: "long" }) === d,
                    ).length,
                ),
              )
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0

              return (
                <div key={day} className="flex items-center">
                  <div className="w-20 text-left text-sm">{day.slice(0, 3)}</div>
                  <div className="flex-1 h-6 bg-gray-900/70 rounded overflow-hidden">
                    <div className="h-full rounded" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
                  </div>
                  <div className="w-8 text-right text-sm">{count}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PieChart({
  data,
}: {
  data: HistoryWorkout[]
}) {
  // Calculate muscle group distribution
  const muscleGroupCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    data.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (exercise.muscleGroup) {
          counts[exercise.muscleGroup] = (counts[exercise.muscleGroup] || 0) + 1
        }
      })
    })

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }, [data])

  // Generate colors for each muscle group
  const colors = [
    "#22d3ee", // cyan
    "#818cf8", // indigo
    "#34d399", // green
    "#f87171", // red
    "#fbbf24", // amber
    "#a78bfa", // purple
    "#fb923c", // orange
    "#60a5fa", // blue
    "#4ade80", // emerald
  ]

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-gray-400">
        <div className="mb-2 text-lg font-medium text-gray-200">Pie Chart Placeholder</div>
        <div>Would display muscle group distribution</div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm max-w-md mx-auto">
          {muscleGroupCounts.map(({ name, value }, index) => (
            <div
              key={name}
              className="flex items-center justify-between bg-gray-900/70 rounded p-2 border border-gray-800/50"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-gray-200">{name}</span>
              </div>
              <span className="font-medium" style={{ color: colors[index % colors.length] }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

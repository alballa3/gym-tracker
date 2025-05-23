"use client"

import { motion } from "framer-motion"
import { ArrowUp, Award, BarChart3, Dumbbell } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"


export default function PublicProfileProgress() {
  // Mock data - in a real app, you would fetch this based on userId
  const personalRecords = [
    {
      id: 1,
      exercise: "Bench Press",
      value: "120 kg",
      date: "Apr 15, 2023",
      improvement: "+5 kg",
    },
    {
      id: 2,
      exercise: "Squat",
      value: "180 kg",
      date: "Mar 22, 2023",
      improvement: "+10 kg",
    },
    {
      id: 3,
      exercise: "Deadlift",
      value: "220 kg",
      date: "May 5, 2023",
      improvement: "+15 kg",
    },
    {
      id: 4,
      exercise: "Pull-ups",
      value: "18 reps",
      date: "Apr 30, 2023",
      improvement: "+3 reps",
    },
  ]

  const progressMetrics = [
    {
      id: 1,
      title: "Weekly Workout Goal",
      current: 4,
      target: 5,
      unit: "workouts",
      percentage: 80,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Monthly Volume",
      current: 12500,
      target: 15000,
      unit: "kg",
      percentage: 83,
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Cardio Goal",
      current: 120,
      target: 150,
      unit: "minutes",
      percentage: 80,
      color: "bg-green-500",
    },
    {
      id: 4,
      title: "Protein Intake",
      current: 140,
      target: 160,
      unit: "g",
      percentage: 88,
      color: "bg-amber-500",
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-6 shadow-xl shadow-black/20"
    >
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 mr-3 rounded-full"></div>
        Progress & Records
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-amber-400" />
            Personal Records
          </h3>

          <div className="space-y-4">
            {personalRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-zinc-700/30 rounded-xl p-4 shadow-lg shadow-black/10"
                whileHover={{ x: 5 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-zinc-400" />
                      <h4 className="font-medium text-white">{record.exercise}</h4>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Achieved on {record.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{record.value}</div>
                    <div className="flex items-center justify-end gap-1 text-xs text-green-400">
                      <ArrowUp className="h-3 w-3" />
                      {record.improvement}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
            Progress Metrics
          </h3>

          <div className="space-y-4">
            {progressMetrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="bg-gradient-to-br from-zinc-800/30 to-zinc-900/30 border border-zinc-700/30 rounded-xl p-4 shadow-lg shadow-black/10"
                whileHover={{ x: -5 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-white">{metric.title}</h4>
                  <Badge className="bg-zinc-800 text-zinc-300">
                    {metric.current} / {metric.target} {metric.unit}
                  </Badge>
                </div>
                <Progress value={metric.percentage} className="h-2 bg-zinc-700">
                  <div className={`h-full ${metric.color} rounded-full`} style={{ width: `${metric.percentage}%` }} />
                </Progress>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

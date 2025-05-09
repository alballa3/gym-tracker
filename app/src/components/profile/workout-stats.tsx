"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Calendar, Clock, Dumbbell, Flame, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { AreaChart, BarChart as Chart, LineChart } from "@/components/ui/chart"

export default function WorkoutStats() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")

  // Mock data for charts
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
      { name: "Jul", workouts: 25 },
      { name: "Aug", workouts: 28 },
      { name: "Sep", workouts: 30 },
      { name: "Oct", workouts: 32 },
      { name: "Nov", workouts: 35 },
      { name: "Dec", workouts: 38 },
    ],
  }

  const durationData = {
    week: [
      { name: "Mon", minutes: 45 },
      { name: "Tue", minutes: 0 },
      { name: "Wed", minutes: 60 },
      { name: "Thu", minutes: 0 },
      { name: "Fri", minutes: 50 },
      { name: "Sat", minutes: 0 },
      { name: "Sun", minutes: 75 },
    ],
    month: [
      { name: "Week 1", minutes: 180 },
      { name: "Week 2", minutes: 220 },
      { name: "Week 3", minutes: 150 },
      { name: "Week 4", minutes: 250 },
    ],
    year: [
      { name: "Jan", minutes: 720 },
      { name: "Feb", minutes: 840 },
      { name: "Mar", minutes: 900 },
      { name: "Apr", minutes: 780 },
      { name: "May", minutes: 1020 },
      { name: "Jun", minutes: 1140 },
      { name: "Jul", minutes: 1200 },
      { name: "Aug", minutes: 1320 },
      { name: "Sep", minutes: 1380 },
      { name: "Oct", minutes: 1440 },
      { name: "Nov", minutes: 1500 },
      { name: "Dec", minutes: 1560 },
    ],
  }

  const caloriesData = {
    week: [
      { name: "Mon", calories: 320 },
      { name: "Tue", calories: 0 },
      { name: "Wed", calories: 450 },
      { name: "Thu", calories: 0 },
      { name: "Fri", calories: 380 },
      { name: "Sat", calories: 0 },
      { name: "Sun", calories: 520 },
    ],
    month: [
      { name: "Week 1", calories: 1200 },
      { name: "Week 2", calories: 1500 },
      { name: "Week 3", calories: 1100 },
      { name: "Week 4", calories: 1800 },
    ],
    year: [
      { name: "Jan", calories: 5200 },
      { name: "Feb", calories: 6100 },
      { name: "Mar", calories: 6500 },
      { name: "Apr", calories: 5800 },
      { name: "May", calories: 7200 },
      { name: "Jun", calories: 8100 },
      { name: "Jul", calories: 8500 },
      { name: "Aug", calories: 9200 },
      { name: "Sep", calories: 9600 },
      { name: "Oct", calories: 10100 },
      { name: "Nov", calories: 10500 },
      { name: "Dec", calories: 11000 },
    ],
  }

  const progressData = {
    week: [
      { name: "Mon", weight: 80 },
      { name: "Tue", weight: 80 },
      { name: "Wed", weight: 79.8 },
      { name: "Thu", weight: 79.8 },
      { name: "Fri", weight: 79.5 },
      { name: "Sat", weight: 79.5 },
      { name: "Sun", weight: 79.2 },
    ],
    month: [
      { name: "Week 1", weight: 80 },
      { name: "Week 2", weight: 79.5 },
      { name: "Week 3", weight: 78.8 },
      { name: "Week 4", weight: 78 },
    ],
    year: [
      { name: "Jan", weight: 85 },
      { name: "Feb", weight: 84 },
      { name: "Mar", weight: 83 },
      { name: "Apr", weight: 82 },
      { name: "May", weight: 81 },
      { name: "Jun", weight: 80 },
      { name: "Jul", weight: 79 },
      { name: "Aug", weight: 78 },
      { name: "Sep", weight: 77 },
      { name: "Oct", weight: 76 },
      { name: "Nov", weight: 75 },
      { name: "Dec", weight: 75 },
    ],
  }

  const stats = [
    {
      title: "Total Workouts",
      value: "248",
      change: "+12%",
      icon: <Dumbbell className="h-4 w-4 text-blue-500" />,
    },
    {
      title: "Workout Hours",
      value: "186",
      change: "+8%",
      icon: <Clock className="h-4 w-4 text-green-500" />,
    },
    {
      title: "Calories Burned",
      value: "124,568",
      change: "+15%",
      icon: <Flame className="h-4 w-4 text-orange-500" />,
    },
    {
      title: "Active Days",
      value: "156",
      change: "+5%",
      icon: <Calendar className="h-4 w-4 text-purple-500" />,
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-6 shadow-xl shadow-black/20"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 mr-3 rounded-full"></div>
          Workout Statistics
        </h2>

        <div className="flex bg-zinc-800/70 rounded-full p-1 backdrop-blur-sm">
          <Button
            size="sm"
            variant={timeRange === "week" ? "default" : "ghost"}
            className={`${timeRange === "week" ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full" : "text-zinc-400 hover:text-white"}`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={timeRange === "month" ? "default" : "ghost"}
            className={`${timeRange === "month" ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full" : "text-zinc-400 hover:text-white"}`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={timeRange === "year" ? "default" : "ghost"}
            className={`${timeRange === "year" ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full" : "text-zinc-400 hover:text-white"}`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/30 shadow-lg shadow-black/10"
            whileHover={{ y: -5, backgroundColor: "rgba(39, 39, 42, 0.4)" }}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 p-2 rounded-lg shadow-inner">
                {stat.icon}
              </div>
              <div className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-zinc-400">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="workouts" className="w-full">
        <TabsList className="bg-zinc-800/70 mb-6 rounded-full p-1 backdrop-blur-sm">
          <TabsTrigger
            value="workouts"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:rounded-full"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Workouts
          </TabsTrigger>
          <TabsTrigger
            value="duration"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:rounded-full"
          >
            <Clock className="h-4 w-4 mr-2" />
            Duration
          </TabsTrigger>
          <TabsTrigger
            value="calories"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:rounded-full"
          >
            <Flame className="h-4 w-4 mr-2" />
            Calories
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:rounded-full"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="mt-0">
          <Card className="bg-zinc-800/30 border-zinc-700/30 rounded-xl shadow-xl shadow-black/10 backdrop-blur-sm">
            <div className="p-4 h-[300px]">
              <Chart
                data={workoutData[timeRange]}
                index="name"
                categories={["workouts"]}
                colors={["#3b82f6"]}
                valueFormatter={(value) => `${value} workouts`}
                yAxisWidth={40}
                className="text-zinc-400"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="duration" className="mt-0">
          <Card className="bg-zinc-800/30 border-zinc-700/30 rounded-xl shadow-xl shadow-black/10 backdrop-blur-sm">
            <div className="p-4 h-[300px]">
              <AreaChart
                data={durationData[timeRange]}
                index="name"
                categories={["minutes"]}
                colors={["#10b981"]}
                valueFormatter={(value) => `${value} min`}
                yAxisWidth={40}
                className="text-zinc-400"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="calories" className="mt-0">
          <Card className="bg-zinc-800/30 border-zinc-700/30 rounded-xl shadow-xl shadow-black/10 backdrop-blur-sm">
            <div className="p-4 h-[300px]">
              <Chart
                data={caloriesData[timeRange]}
                index="name"
                categories={["calories"]}
                colors={["#f97316"]}
                valueFormatter={(value) => `${value} kcal`}
                yAxisWidth={50}
                className="text-zinc-400"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="mt-0">
          <Card className="bg-zinc-800/30 border-zinc-700/30 rounded-xl shadow-xl shadow-black/10 backdrop-blur-sm">
            <div className="p-4 h-[300px]">
              <LineChart
                data={progressData[timeRange]}
                index="name"
                categories={["weight"]}
                colors={["#8b5cf6"]}
                valueFormatter={(value) => `${value} kg`}
                yAxisWidth={40}
                className="text-zinc-400"
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.section>
  )
}

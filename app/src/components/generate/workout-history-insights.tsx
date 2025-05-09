import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUp, ArrowDown, Minus, Dumbbell, Calendar, TrendingUp } from "lucide-react"

export function WorkoutHistoryInsights() {
  // This would normally be calculated from actual workout history
  const insights = {
    workoutsCompleted: 24,
    mostFrequentExercise: "Bench Press",
    strongestLift: "Deadlift - 315 lbs",
    averageWorkoutsPerWeek: 3.5,
    progressTrends: [
      { exercise: "Bench Press", trend: "up", percentage: 12 },
      { exercise: "Squat", trend: "up", percentage: 15 },
      { exercise: "Deadlift", trend: "stable", percentage: 0 },
      { exercise: "Overhead Press", trend: "down", percentage: 5 },
    ],
  }

  return (
    <Card className="p-4 bg-zinc-900 border-zinc-800">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
        Workout History Insights
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Workouts Completed</div>
          <div className="text-xl font-bold flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-purple-400" />
            {insights.workoutsCompleted}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Avg. Workouts/Week</div>
          <div className="text-xl font-bold flex items-center">
            <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
            {insights.averageWorkoutsPerWeek}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Most Frequent Exercise</div>
          <div className="text-md font-bold flex items-center">
            <Dumbbell className="h-4 w-4 mr-1 text-blue-400" />
            {insights.mostFrequentExercise}
          </div>
        </div>

        <div className="bg-zinc-800 p-3 rounded-lg">
          <div className="text-sm text-gray-400">Strongest Lift</div>
          <div className="text-md font-bold flex items-center">
            <Dumbbell className="h-4 w-4 mr-1 text-yellow-400" />
            {insights.strongestLift}
          </div>
        </div>
      </div>

      <h4 className="text-sm font-medium mb-2">Progress Trends</h4>
      <div className="space-y-3">
        {insights.progressTrends.map((item, index) => (
          <div key={index} className="bg-zinc-800 p-2 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">{item.exercise}</span>
              <div className="flex items-center">
                {item.trend === "up" && <ArrowUp className="h-4 w-4 text-green-500 mr-1" />}
                {item.trend === "down" && <ArrowDown className="h-4 w-4 text-red-500 mr-1" />}
                {item.trend === "stable" && <Minus className="h-4 w-4 text-yellow-500 mr-1" />}
                <span
                  className={`text-xs ${
                    item.trend === "up" ? "text-green-500" : item.trend === "down" ? "text-red-500" : "text-yellow-500"
                  }`}
                >
                  {item.trend === "up" ? "+" : item.trend === "down" ? "-" : ""}
                  {item.percentage}%
                </span>
              </div>
            </div>
            <Progress
              value={item.trend === "up" ? 70 : item.trend === "down" ? 30 : 50}
              className={
                item.trend === "up" ? "bg-green-500" : item.trend === "down" ? "bg-red-500" : "bg-yellow-500"
              }
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

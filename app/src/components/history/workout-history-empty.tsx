import { Calendar, ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export function WorkoutHistoryEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-900/70 flex items-center justify-center mb-6 border border-gray-800/50">
        <Calendar className="h-10 w-10 text-gray-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-100 mb-2">No workout history yet</h3>
      <p className="text-gray-400 max-w-md mb-6">
        Start tracking your workouts to see your progress over time and gain valuable insights into your fitness
        journey.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/create">
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create Workout
          </Button>
        </Link>
        <Link to="/generate">
          <Button variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-100 hover:bg-gray-800">
            Generate AI Workout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

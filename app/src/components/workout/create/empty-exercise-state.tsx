import { Dumbbell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EmptyExerciseStateProps {
  onAddExercise: () => void
}

export function EmptyExerciseState({ onAddExercise }: EmptyExerciseStateProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 border-gray-700/30 shadow-md rounded-2xl p-8">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 p-3 rounded-full">
          <Dumbbell className="h-6 w-6 text-cyan-300" />
        </div>
        <h3 className="text-lg font-medium text-white">No exercises added</h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Add exercises to your workout by clicking the "Add Exercise" button above
        </p>
        <Button
          onClick={onAddExercise}
          className="mt-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-xl border-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add First Exercise
        </Button>
      </div>
    </Card>
  )
}

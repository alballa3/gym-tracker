"use client"

import { X, Save, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useWorkout } from "@/contexts/workout-context"

interface BottomActionBarProps {
  is_template: boolean
  onSave: () => void
}

export function BottomActionBar({ is_template, onSave }: BottomActionBarProps) {
  const { state } = useWorkout()

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/40 px-4 py-4 shadow-2xl z-50">
      <div className="container mx-auto flex items-center justify-between gap-3 max-w-md">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 bg-gray-800/50 hover:bg-gray-700/60 text-gray-100 rounded-2xl border-gray-700/50 transition-all duration-300 hover:scale-102 hover:shadow-lg"
            >
              <X className="h-4 w-4 mr-2 opacity-80 group-hover:opacity-100 transition-opacity" />
              Cancel
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-900/98 backdrop-blur-xl border border-gray-800/60 shadow-2xl rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-100 text-xl">Are you sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-400">
                This action will discard your current workout progress.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-800/90 hover:bg-gray-700/90 text-gray-300 rounded-xl transition-colors">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Link 
                  to="/" 
                  className="inline-flex items-center justify-center bg-red-600/90 hover:bg-red-700/90 text-gray-100 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  Yes, discard
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {state.exercises.length > 0 && state.exercises.filter(ex => ex.sets.length > 0).length > 0 ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className={`
                  flex-1 rounded-2xl shadow-xl border-0 transition-all duration-300 hover:scale-102 hover:shadow-2xl
                  ${is_template
                    ? 'bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600 hover:from-violet-600 hover:via-indigo-600 hover:to-blue-700 shadow-indigo-900/40'
                    : 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 shadow-emerald-900/40'
                  }
                `}
              >
                {is_template ? (
                  <div className="flex items-center">
                    <Save className="h-4 w-4 mr-2 animate-pulse" />
                    <span className="font-medium">Save Template</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Dumbbell className="h-4 w-4 mr-2 animate-bounce" />
                    <span className="font-medium">Complete Workout</span>
                  </div>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900/98 backdrop-blur-xl border border-gray-800/60 shadow-2xl rounded-3xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-100 text-xl">
                  {is_template ? "Save as Template?" : "Finish Workout?"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-400">
                  {is_template
                    ? "This will save your current workout as a template for future use."
                    : "This will save and complete your current workout session."
                  }
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-800/90 hover:bg-gray-700/90 text-gray-300 rounded-xl transition-colors">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onSave}
                  className={`text-gray-100 rounded-xl transition-all duration-300 hover:shadow-lg ${
                    is_template
                      ? "bg-indigo-600/90 hover:bg-indigo-700/90"
                      : "bg-emerald-600/90 hover:bg-emerald-700/90"
                  }`}
                >
                  {is_template ? "Save Template" : "Complete Workout"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button disabled className="flex-1 bg-gray-800/50 text-gray-500 rounded-2xl cursor-not-allowed" onClick={onSave}>
            <Dumbbell className="h-4 w-4 mr-2 opacity-50" />
            Complete Workout
          </Button>
        )}
      </div>
    </div>
  )
}

"use client"

import { MoreVertical, ArrowUp, ArrowDown, Copy, Trash2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExerciseSetsSection } from "./exercise-sets-section"
import type { Exercise } from "@/types/workout"
import { RestTimeControl } from "../create/rest-time-control"
import { PreviousWorkoutData } from "../create/previous-workout-data"
interface ExerciseCardProps {
  exercise: Exercise
  index: number
  isFirst: boolean
  isLast: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
  onDuplicate: () => void
  onToggleExpand: () => void
  onUpdateRestTime: (value: number) => void
  onAddSet: () => void
  onRemoveSet: (setId: number) => void
  onUpdateSet: (setId: number, field: "weight" | "reps", value: number) => void
  onNameChange: (name: string) => void
  onShowDetails: () => void
  onToggleSetCompletion: (setId: number) => void
}

export function ExerciseCard({
  exercise,
  index,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
  onDuplicate,
  onToggleExpand,
  onUpdateRestTime,
  onAddSet,
  onRemoveSet,
  onUpdateSet,
  onShowDetails,
  onToggleSetCompletion,
}: ExerciseCardProps) {
  return (
    <Card className="bg-gradient-to-br from-slate-900/95 to-slate-950 border-slate-800/40 shadow-2xl rounded-3xl overflow-hidden group hover:border-indigo-500/30 hover:shadow-indigo-500/10 transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 opacity-90"></div>
      <CardHeader className="pb-3 flex flex-row items-start justify-between backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600/20 to-violet-600/20 text-indigo-300 w-8 h-8 rounded-xl flex items-center justify-center font-semibold text-sm ring-1 ring-indigo-500/10">
            {index + 1}
          </div>
          <div>
            <CardTitle className="text-base font-medium text-white/90 flex items-center gap-2">
              <span className="tracking-wide">{exercise.name || `Exercise ${index + 1}`}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={onShowDetails}
                className="h-6 w-6 rounded-full text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/20 transition-colors"
              >
                <Info className="h-3.5 w-3.5" />
              </Button>
            </CardTitle>
            <CardDescription className="text-slate-400">Configure your exercise</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200 rounded-xl shadow-xl">
              <DropdownMenuItem
                className="hover:bg-slate-800 cursor-pointer flex items-center gap-2 rounded-lg transition-colors"
                onClick={onMoveUp}
                disabled={isFirst}
              >
                <ArrowUp className="h-4 w-4 text-indigo-400" />
                <span>Move Up</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-slate-800 cursor-pointer flex items-center gap-2 rounded-lg transition-colors"
                onClick={onMoveDown}
                disabled={isLast}
              >
                <ArrowDown className="h-4 w-4 text-indigo-400" />
                <span>Move Down</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-slate-800 cursor-pointer flex items-center gap-2 rounded-lg transition-colors"
                onClick={onDuplicate}
              >
                <Copy className="h-4 w-4 text-indigo-400" />
                <span>Duplicate</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-slate-800 cursor-pointer flex items-center gap-2 rounded-lg transition-colors"
                onClick={onShowDetails}
              >
                <Info className="h-4 w-4 text-indigo-400" />
                <span>View Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-red-950/30 cursor-pointer flex items-center gap-2 text-red-400 rounded-lg transition-colors"
                onClick={onRemove}
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 backdrop-blur-sm">
        {/* Rest Time Section */}
        <RestTimeControl restTime={exercise.restTime} onChange={onUpdateRestTime} />

        {/* Previous Workout Data */}
        {exercise.previousData && (
          <PreviousWorkoutData previousData={exercise.previousData} currentSets={exercise.sets} />
        )}

        {/* Sets Section */}
        <ExerciseSetsSection
          exerciseId={exercise.id}
          sets={exercise.sets}
          restTime={exercise.restTime}
          isExpanded={exercise.isExpanded || false}
          onToggleExpand={onToggleExpand}
          onAddSet={onAddSet}
          onRemoveSet={onRemoveSet}
          onUpdateSet={onUpdateSet}
          onToggleSetCompletion={onToggleSetCompletion} />
      </CardContent>
    </Card>
  )
}

"use client"

import { Dumbbell, BarChart, ArrowRight, Plus, Activity, Target, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Exercise as LibraryExercise } from "@/types/exercise"

interface ExerciseDetailModalProps {
  exercise: LibraryExercise | null
  isOpen: boolean
  onClose: () => void
  onAddExercise?: (exercise: LibraryExercise) => void
}

export function ExerciseDetailModal({ exercise, isOpen, onClose, onAddExercise }: ExerciseDetailModalProps) {
  if (!exercise) return null



  // Get primary and secondary muscles
  const primaryMuscles = exercise.primaryMuscles || exercise.muscleGroups || []
  const secondaryMuscles = exercise.secondaryMuscles || []

  // Get difficulty/level
  const level = exercise.level || exercise.difficulty || "body only"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gradient-to-br from-gray-900/95 to-gray-950 border-gray-800/50 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400"></div>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-white">{exercise.name}</DialogTitle>

          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid grid-cols-3 bg-gray-800/70 border border-gray-700/50 mb-4">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="instructions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Instructions
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Hero Image */}
            <div className="aspect-video bg-gray-900/80 rounded-lg overflow-hidden relative group hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <img
                src={`exercises/${exercise.images[0]}`}
                alt={`${exercise.name} demonstration`}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent h-20">
                <div className="absolute bottom-4 left-4">
                  <p className="text-white/90 text-sm font-medium">Main Exercise View</p>
                </div>
              </div>
            </div>

            {/* Exercise Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 backdrop-blur-sm p-3 rounded-xl border border-purple-500/20 shadow-sm">
                <p className="text-gray-300 text-xs mb-1">Level</p>
                <div className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-purple-300" />
                  <p className="font-medium text-white capitalize">{level}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                <p className="text-gray-300 text-xs mb-1">Type</p>
                <div className="flex items-center gap-1">
                  <Target className="h-3.5 w-3.5 text-blue-300" />
                  <p className="font-medium text-white capitalize">{exercise?.mechanic || "N/A"}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 backdrop-blur-sm p-3 rounded-xl border border-cyan-500/20 shadow-sm">
                <p className="text-gray-300 text-xs mb-1">Force</p>
                <div className="flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5 text-cyan-300" />
                  <p className="font-medium text-white capitalize">{exercise.force || "N/A"}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-500/10 backdrop-blur-sm p-3 rounded-xl border border-indigo-500/20 shadow-sm">
                <p className="text-gray-300 text-xs mb-1">Category</p>
                <div className="flex items-center gap-1">
                  <BarChart className="h-3.5 w-3.5 text-indigo-300" />
                  <p className="font-medium text-white capitalize">{exercise.category || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Primary Muscles */}
            <div>
              <h3 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
                <Dumbbell className="h-4 w-4 mr-2" />
                Primary Muscles
              </h3>
              <div className="flex flex-wrap gap-2">
                {primaryMuscles.map((muscle) => (
                  <Badge
                    key={muscle}
                    variant="outline"
                    className="bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
                  >
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Secondary Muscles */}
            {secondaryMuscles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-blue-300 mb-2 flex items-center">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Secondary Muscles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {secondaryMuscles.map((muscle) => (
                    <Badge
                      key={muscle}
                      variant="outline"
                      className="bg-blue-500/10 text-blue-300 border-blue-500/30 hover:bg-blue-500/20"
                    >
                      {muscle}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment */}
            <div>
              <h3 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
                <Dumbbell className="h-4 w-4 mr-2" />
                Equipment Needed
              </h3>
              <p className="text-gray-300 text-sm bg-gray-800/30 p-4 rounded-lg border border-gray-700/30">
                {exercise.equipment}
              </p>
            </div>

            {/* Add to Workout Button */}
            {onAddExercise && (
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl shadow-md shadow-purple-900/20 border-0 py-6 mt-4"
                onClick={() => {
                  onAddExercise(exercise)
                  onClose()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to Workout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </TabsContent>

          <TabsContent value="instructions" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-purple-300 mb-4 flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Step-by-Step Instructions
              </h3>
              <ol className="space-y-3">
                {exercise.instructions.map((instruction, idx) => (
                  <li
                    key={idx}
                    className="text-gray-300 text-sm bg-gray-800/30 p-4 rounded-lg border border-gray-700/30 flex"
                  >
                    <span className="bg-purple-500/20 text-purple-300 w-7 h-7 rounded-full flex items-center justify-center font-medium text-sm mr-3 flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Add to Workout Button */}
            {onAddExercise && (
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl shadow-md shadow-purple-900/20 border-0 py-6 mt-4"
                onClick={() => {
                  onAddExercise(exercise)
                  onClose()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to Workout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-900/80 rounded-lg overflow-hidden relative group">
                <img
                  src={`exercises/${exercise.images[0]}`}
                  alt={`${exercise.name} demonstration 1`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent h-16"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">Starting Position</p>
                </div>
              </div>
              <div className="aspect-square bg-gray-900/80 rounded-lg overflow-hidden relative group">
                <img
                  src={`exercises/${exercise.images[1]}`}
                  alt={`${exercise.name} demonstration 2`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent h-16"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium">End Position</p>
                </div>
              </div>
            </div>


            {/* Add to Workout Button */}
            {onAddExercise && (
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl shadow-md shadow-purple-900/20 border-0 py-6 mt-4"
                onClick={() => {
                  onAddExercise(exercise)
                  onClose()
                }}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add to Workout
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

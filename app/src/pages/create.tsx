"use client"

import { useState } from "react"
import { Plus, Dumbbell, Library } from "lucide-react"
import { WorkoutProvider, useWorkout } from "@/contexts/workout-context"
import { WorkoutDetailsCard } from "@/components/workout/create/workout-details-card"
import { ExerciseCard } from "@/components/workout/index/exercise-card"
import { SectionHeader } from "@/components/workout/create/section-header"
import { EmptyExerciseState } from "@/components/workout/create/empty-exercise-state"
import { BottomActionBar } from "@/components/workout/create/bottom-action-bar"
import { ExerciseLibrary } from "@/components/workout/create/exercise-library"
import { ExerciseDetailModal } from "@/components/workout/create/exercise-detail-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Exercise } from "@/types/exercise"
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { useNavigate } from "react-router"
import { api } from "@/api"

function WorkoutForm() {
  const {
    state,
    dispatch,
    selectedExercise,
    isDetailModalOpen,
    setDetailModalOpen,
    getExerciseDetails,

  } = useWorkout()
  const [activeTab, setActiveTab] = useState<"workout" | "library">("workout")
  let nav = useNavigate()


  const handleSave = async () => {

    try {
      await Filesystem.stat({
        path: 'workout',
        directory: Directory.Data,
      })
    } catch (error) {
      await Filesystem.mkdir({
        path: 'workout',
        directory: Directory.Data,
        recursive: true,
      });
    }

    await Filesystem.writeFile({
      path: `workout/${state.id}.json`,
      data: JSON.stringify(state),
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });
    let client = await api()
    let respose = await client.post("/template", state)
    console.log(respose)
    nav("/")
    console.log("Saving workout:", state);
  };


  const handleSelectExercise = (exercise: Exercise) => {
    // Add the selected exercise to the workout
    dispatch({
      type: "ADD_EXERCISE_FROM_LIBRARY",
      payload: {
        name: exercise.name,
      },
    })
    // Close the modal if it's open
    if (isDetailModalOpen) {
      setDetailModalOpen(false)
    }
    // Switch back to the workout tab
    setActiveTab("workout")
  }

  const handleShowExerciseDetails = (exerciseName: string) => {
    getExerciseDetails(exerciseName)
  }

  // Add this handler in the WorkoutForm component
  const handleToggleSetCompletion = (exerciseId: number, setId: number) => {
    dispatch({
      type: "TOGGLE_SET_COMPLETION",
      payload: { exerciseId, setId },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* <Link to="/" className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link> */}
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-300 text-center to-cyan-300 bg-clip-text text-transparent">
            {state.name}
          </h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Workout Details */}
          <WorkoutDetailsCard
            name={state.name}
            setName={(name) => dispatch({ type: "SET_NAME", payload: name })}
            description={state.description}
            setDescription={(description) => dispatch({ type: "SET_DESCRIPTION", payload: description })}
            saveAsTemplate={state.saveAsTemplate}
            setSaveAsTemplate={(save) => dispatch({ type: "SET_SAVE_AS_TEMPLATE", payload: save })}
            state={state} // Pass the state prop
          />

          {/* Tabs for Workout and Library */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "workout" | "library")}>
            <TabsList className="grid grid-cols-2 bg-gray-800/70 border border-gray-700/50">
              <TabsTrigger
                value="workout"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white flex items-center gap-2"
              >
                <Dumbbell className="h-4 w-4" />
                Your Workout
              </TabsTrigger>
              <TabsTrigger
                value="library"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white flex items-center gap-2"
              >
                <Library className="h-4 w-4" />
                Exercise Library
              </TabsTrigger>
            </TabsList>

            <TabsContent value="workout" className="mt-4 space-y-3">
              <SectionHeader
                title="Exercises"
                count={state.exercises.length}
                action={{
                  label: "Add Exercise",
                  icon: <Plus className="h-4 w-4 mr-2" />,
                  onClick: () => setActiveTab("library"),
                  description: "Opens exercise library",
                }}
              />

              {state.exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === state.exercises.length - 1}
                  onMoveUp={() => dispatch({ type: "MOVE_EXERCISE", payload: { id: exercise.id, direction: "up" } })}
                  onMoveDown={() =>
                    dispatch({ type: "MOVE_EXERCISE", payload: { id: exercise.id, direction: "down" } })
                  }
                  onRemove={() => dispatch({ type: "REMOVE_EXERCISE", payload: exercise.id })}
                  onDuplicate={() => dispatch({ type: "DUPLICATE_EXERCISE", payload: exercise.id })}
                  onToggleExpand={() => dispatch({ type: "TOGGLE_EXERCISE_EXPANDED", payload: exercise.id })}
                  onUpdateRestTime={(value) =>
                    dispatch({ type: "UPDATE_REST_TIME", payload: { id: exercise.id, value } })
                  }
                  onAddSet={() => dispatch({ type: "ADD_SET", payload: exercise.id })}
                  onRemoveSet={(setId) => dispatch({ type: "REMOVE_SET", payload: { exerciseId: exercise.id, setId } })}
                  onUpdateSet={(setId, field, value) =>
                    dispatch({
                      type: "UPDATE_SET",
                      payload: { exerciseId: exercise.id, setId, field, value },
                    })
                  }
                  onToggleSetCompletion={(setId) => handleToggleSetCompletion(exercise.id, setId)}
                  onNameChange={(name) =>
                    dispatch({ type: "UPDATE_EXERCISE_NAME", payload: { id: exercise.id, name } })
                  }
                  onShowDetails={() => handleShowExerciseDetails(exercise.name)}
                />
              ))}

              {state.exercises.length === 0 && <EmptyExerciseState onAddExercise={() => setActiveTab("library")} />}
            </TabsContent>

            <TabsContent value="library" className="mt-4">
              <ExerciseLibrary onSelectExercise={handleSelectExercise} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onAddExercise={handleSelectExercise}
      />

      {/* Bottom Action Bar */}
      <BottomActionBar saveAsTemplate={state.saveAsTemplate} onSave={handleSave} />
    </div>
  )
}

export default function CreateWorkoutPage() {
  return (
    <WorkoutProvider>
      <WorkoutForm />
    </WorkoutProvider>
  )
}

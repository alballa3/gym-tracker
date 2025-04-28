"use client"

import type React from "react"

import { createContext, useContext, useReducer, useState, type ReactNode } from "react"
import type { Exercise, WorkoutFormState } from "@/types/workout"
import type { Exercise as LibraryExercise } from "@/types/exercise"

type WorkoutAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_SAVE_AS_TEMPLATE"; payload: boolean }
  | { type: "ADD_EXERCISE" }
  | { type: "LOAD_WORKOUT", payload: WorkoutFormState }
  | { type: "ADD_EXERCISE_FROM_LIBRARY"; payload: { name: string } }
  | { type: "REMOVE_EXERCISE"; payload: number }
  | { type: "MOVE_EXERCISE"; payload: { id: number; direction: "up" | "down" } }
  | { type: "TOGGLE_EXERCISE_EXPANDED"; payload: number }
  | { type: "UPDATE_EXERCISE_NAME"; payload: { id: number; name: string } }
  | { type: "UPDATE_REST_TIME"; payload: { id: number; value: number } }
  | { type: "ADD_SET"; payload: number }
  | { type: "REMOVE_SET"; payload: { exerciseId: number; setId: number } }
  | { type: "UPDATE_SET"; payload: { exerciseId: number; setId: number; field: "weight" | "reps"; value: number } }
  | { type: "DUPLICATE_EXERCISE"; payload: number }
  | { type: "TOGGLE_SET_COMPLETION"; payload: { exerciseId: number; setId: number } }
  | { type: "SET_TIMER"; payload: number }

type WorkoutContextType = {
  state: WorkoutFormState
  dispatch: React.Dispatch<WorkoutAction>
  selectedExercise: LibraryExercise | null
  setSelectedExercise: (exercise: LibraryExercise | null) => void
  isDetailModalOpen: boolean
  setDetailModalOpen: (isOpen: boolean) => void
  exerciseLibrary: LibraryExercise[]
  setExerciseLibrary: (exercises: LibraryExercise[]) => void
  getExerciseDetails: (exerciseName: string) => void
}



const initialState: WorkoutFormState = {
  id: crypto.randomUUID(),
  name: "",
  description: "",
  saveAsTemplate: true,
  timer: Date.now(),
  exercises: [],
  createdAt: Date.now().toString(),
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

function workoutReducer(state: WorkoutFormState, action: WorkoutAction): WorkoutFormState {
  switch (action.type) {
    case "SET_TIMER":
      return { ...state, timer: action.payload }
    case "SET_NAME":
      return { ...state, name: action.payload }
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload }
    case "SET_SAVE_AS_TEMPLATE":
      return { ...state, saveAsTemplate: action.payload }
    case "ADD_EXERCISE": {
      const newId = state.exercises.length > 0 ? Math.max(...state.exercises.map((ex) => ex.id)) + 1 : 1
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            id: newId,
            name: "",
            sets: [{ id: 1, weight: 0, reps: 10 }],
            restTime: 60,
            isExpanded: true,
          },
        ],
      }
    }
    case "ADD_EXERCISE_FROM_LIBRARY": {
      const newId = state.exercises.length > 0 ? Math.max(...state.exercises.map((ex) => ex.id)) + 1 : 1
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            id: newId,
            name: action.payload.name,
            sets: [{ id: 1, weight: 0, reps: 10 }],
            restTime: 60,
            isExpanded: true,
          },
        ],
      }
    }
    case "REMOVE_EXERCISE":
      return {
        ...state,
        exercises: state.exercises.filter((ex) => ex.id !== action.payload),
      }
    case "MOVE_EXERCISE": {
      const { id, direction } = action.payload
      const index = state.exercises.findIndex((ex) => ex.id === id)
      if ((direction === "up" && index === 0) || (direction === "down" && index === state.exercises.length - 1)) {
        return state // Can't move further
      }

      const newExercises = [...state.exercises]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      const temp = newExercises[targetIndex]
      newExercises[targetIndex] = newExercises[index]
      newExercises[index] = temp
      return { ...state, exercises: newExercises }
    }
    case "TOGGLE_EXERCISE_EXPANDED":
      return {
        ...state,
        exercises: state.exercises.map((ex) => (ex.id === action.payload ? { ...ex, isExpanded: !ex.isExpanded } : ex)),
      }
    case "UPDATE_EXERCISE_NAME":
      return {
        ...state,
        exercises: state.exercises.map((ex) =>
          ex.id === action.payload.id ? { ...ex, name: action.payload.name } : ex,
        ),
      }
    case "UPDATE_REST_TIME":
      return {
        ...state,
        exercises: state.exercises.map((ex) =>
          ex.id === action.payload.id ? { ...ex, restTime: action.payload.value } : ex,
        ),
      }
    case "ADD_SET": {
      return {
        ...state,
        exercises: state.exercises.map((ex) => {
          if (ex.id === action.payload) {
            const newSetId = ex.sets.length > 0 ? Math.max(...ex.sets.map((set) => set.id)) + 1 : 1
            // Copy the weight and reps from the last set if it exists
            const lastSet = ex.sets[ex.sets.length - 1]
            const newWeight = lastSet ? lastSet.weight : 0
            const newReps = lastSet ? lastSet.reps : 10

            return {
              ...ex,
              sets: [...ex.sets, { id: newSetId, weight: newWeight, reps: newReps }],
            }
          }
          return ex
        }),
      }
    }
    case "REMOVE_SET": {
      const { exerciseId, setId } = action.payload
      return {
        ...state,
        exercises: state.exercises.map((ex) => {
          if (ex.id === exerciseId) {
            // Don't remove if it's the last set
            if (ex.sets.length <= 1) return ex

            return {
              ...ex,
              sets: ex.sets.filter((set) => set.id !== setId),
            }
          }
          return ex
        }),
      }
    }
    case "UPDATE_SET": {
      const { exerciseId, setId, field, value } = action.payload
      return {
        ...state,
        exercises: state.exercises.map((ex) => {
          if (ex.id === exerciseId) {
            return {
              ...ex,
              sets: ex.sets.map((set) => {
                if (set.id === setId) {
                  return { ...set, [field]: value }
                }
                return set
              }),
            }
          }
          return ex
        }),
      }
    }
    case "DUPLICATE_EXERCISE": {
      const exerciseId = action.payload
      const exerciseToDuplicate = state.exercises.find((ex) => ex.id === exerciseId)

      if (!exerciseToDuplicate) return state

      const newId = Math.max(...state.exercises.map((ex) => ex.id)) + 1
      const newSets = exerciseToDuplicate.sets.map((set) => ({
        ...set,
        id: set.id, // Keep same IDs for sets since they're scoped to the exercise
      }))

      const newExercise: Exercise = {
        ...exerciseToDuplicate,
        id: newId,
        name: `${exerciseToDuplicate.name} (Copy)`,
        sets: newSets,
        isExpanded: true,
      }

      // Find the index of the exercise to duplicate
      const index = state.exercises.findIndex((ex) => ex.id === exerciseId)

      // Insert the new exercise after the original
      const newExercises = [...state.exercises]
      newExercises.splice(index + 1, 0, newExercise)

      return {
        ...state,
        exercises: newExercises,
      }
    }
    case "LOAD_WORKOUT": {
      let workout = action.payload
      return {
       ...state,
        name: workout.name,
        description: workout.description,
        exercises: workout.exercises,
        saveAsTemplate: workout.saveAsTemplate,
        timer: workout.timer,
      }
    }
    case "TOGGLE_SET_COMPLETION": {
      const { exerciseId, setId } = action.payload
      return {
        ...state,
        exercises: state.exercises.map((ex) => {
          if (ex.id === exerciseId) {
            return {
              ...ex,
              sets: ex.sets.map((set) => {
                if (set.id === setId) {
                  return { ...set, isCompleted: !set.isCompleted }
                }
                return set
              }),
            }
          }
          return ex
        }),
      }
    }
    default:
      return state
  }
}

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(workoutReducer, initialState)
  const [selectedExercise, setSelectedExercise] = useState<LibraryExercise | null>(null)
  const [isDetailModalOpen, setDetailModalOpen] = useState(false)
  const [exerciseLibrary, setExerciseLibrary] = useState<LibraryExercise[]>([])

  // Function to get exercise details by name
  const getExerciseDetails = (exerciseName: string) => {
    const exercise = exerciseLibrary.find((ex) => ex.name === exerciseName)
    if (exercise) {
      setSelectedExercise(exercise)
      setDetailModalOpen(true)
    }
  }

  return (
    <WorkoutContext.Provider
      value={{
        state,
        dispatch,
        selectedExercise,
        setSelectedExercise,
        isDetailModalOpen,
        setDetailModalOpen,
        exerciseLibrary,
        setExerciseLibrary,
        getExerciseDetails,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider")
  }
  return context
}

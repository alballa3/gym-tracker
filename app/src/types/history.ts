export interface HistoryWorkout {
  id: number
  name: string
  date: string
  created_at: string
  timer: number // in seconds
  exercises: HistoryExercise[]
  completedSets?: number
  totalSets?: number
  totalVolume?: number // in kg
  
  description?: string
}

export interface HistoryExercise {
  id: number
  name: string
  muscleGroup: string
  sets: HistorySet[]
  totalVolume: number // in kg
}

export interface HistorySet {
  id: number
  weight: number // in kg
  reps: number
  isCompleted: boolean
}


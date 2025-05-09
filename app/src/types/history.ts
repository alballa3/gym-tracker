export interface HistoryWorkout {
  id: number
  name: string
  date: string
  duration: number // in seconds
  intensity: "Low" | "Medium" | "High"
  exercises: HistoryExercise[]
  completedSets: number
  totalSets: number
  totalVolume: number // in kg
  caloriesBurned: number
  averageRestTime: number // in seconds
  notes?: string
  personalRecords?: PersonalRecord[]
  volumeVsAverage?: number // percentage compared to user average
  intensityVsAverage?: number // percentage compared to user average
}

export interface HistoryExercise {
  id: number
  name: string
  muscleGroup: string
  sets: HistorySet[]
  totalVolume: number // in kg
  notes?: string
  personalRecord?: boolean
  equipment?: string[]
}

export interface HistorySet {
  id: number
  weight: number // in kg
  reps: number
  isCompleted: boolean
}

export interface PersonalRecord {
  exercise: string
  value: number
  type: "weight" | "reps"
  date: string
}

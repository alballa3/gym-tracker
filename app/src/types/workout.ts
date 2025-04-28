export type Set = {
  id: number
  weight: number
  reps: number
  isCompleted?: boolean
}

export type PreviousData = {
  date: string
  sets: Set[]
}

export type Exercise = {
  id: number
  name: string
  sets: Set[]
  restTime: number
  isExpanded?: boolean
  previousData?: PreviousData
}

export type WorkoutFormState = {
  id: string
  name: string
  description: string
  saveAsTemplate: boolean
  timer:Number
  exercises: Exercise[]
  createdAt: string
}

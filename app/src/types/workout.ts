export type Set = {
  id: number
  weight: number
  reps: number
  isCompleted?: boolean
}
export type WorkoutSet = {
  id: number
  weight: number
  reps: number
  isCompleted: boolean
}

export type PreviousData = {
  date: string
  sets: Set[]
}

export type Exercise = {
  id: number
  name: string
  sets: Set[]
  muscleGroup?: MuscleGroup
  equipment?: Equipment
  difficulty?: number
  
  restTime: number
  isExpanded?: boolean
  previousData?: PreviousData
}

export type WorkoutFormState = {
  id: string
  name: string
  description: string
  is_template: boolean
  timer:Number
  exercises: Exercise[]
  created_at: string
}
export type GeneratedWorkout = {
  name: string
  description: string
  exercises: Exercise[]
  duration: number
  intensity: "Low" | "Medium" | "High"
  caloriesBurned: number
}

export type MuscleGroup =
  | "Full Body"
  | "Upper Body"
  | "Lower Body"
  | "Core"
  | "Back"
  | "Chest"
  | "Arms"
  | "Shoulders"
  | "Legs"

export type Equipment =
  | "Full Gym"
  | "Home Gym"
  | "Dumbbells Only"
  | "Bodyweight"
  | "Resistance Bands"
  | "Kettlebells"
  | "Cables"
  | "Machines"

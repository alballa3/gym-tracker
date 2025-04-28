export type ExerciseInstruction = string

export type Exercise = {
  muscleGroups: string[]
  difficulty: level
  mechanic: string
  id: number
  name: string
  description: string
  videoUrl: string
  // muscleGroups: string[]
  primaryMuscles: string[]
  secondaryMuscles: string[]
  equipment: string
  level: level
  category: string
  force: string
  images: string[]
  instructions: ExerciseInstruction[]
  thumbnailUrl: string
}

export enum level{
  beginner,
  intermediate,
  advanced
}
export type ExerciseLibraryProps = {
  onSelectExercise: (exercise: Exercise) => void
}

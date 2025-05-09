import { api } from "@/api"
import { storeTemplate } from "@/capacitor/store";
import type { Equipment, MuscleGroup, Set } from "@/types/workout"
type exercises = {
  id: number;
  name: string;
  isExpanded?: boolean

  difficulty: number; // Consider using an enum if values are fixed (e.g., 1 = Easy, 2 = Medium, etc.)
  restTime: number; // in seconds
  muscleGroup: string;
  equipment: string;

  sets: number | Set[];
};

export type WorkoutPlan = {
  name: string;
  description: string;
  exercises: exercises[];
  duration: string; // in minutes; can also be a number if preferred
  intensity: 'Low' | 'Medium' | 'High'; // You can expand this union if needed
  caloriesBurned: number;
};

// AI workout generation logic
export const generateWorkoutBasedOnInputs = async (
  description: string,
  selectedEquipment: Equipment[],
  selectedMuscleGroups: MuscleGroup[],
) => {
  const client = await api()
  const response = await client.post("/ai/generate",
    {
      equipment: selectedEquipment.join(","),
      muscleGroups: selectedMuscleGroups,
      instruction: description,
    }
  )
  let workout_plan = response.data as WorkoutPlan
  let total_set = workout_plan.exercises.map((exercise) => {
    let sets_number = exercise.sets as number
    let sets = []
    exercise["isExpanded"] = true;
    for (let i = 0; i < sets_number; i++) {
      sets.push({
        id: i,
        weight: 1,
        reps: 0,
      })
    }
    exercise.sets = sets
    return exercise
  })
  let data = {
    id: crypto.randomUUID(),
    name: workout_plan.name,
    description: workout_plan.description,
    exercises: total_set,
    duration: workout_plan.duration,
    intensity: workout_plan.intensity,
    caloriesBurned: workout_plan.caloriesBurned,
    is_template: true,
  }
  storeTemplate(data)
  console.log(data)
  return data
}

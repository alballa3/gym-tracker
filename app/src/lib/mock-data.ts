import type { HistoryWorkout } from "@/types/history"

// Generate dates for the past 30 days
const generatePastDates = (days: number) => {
  const dates = []
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(today.getDate() - i)
    dates.push(date.toISOString())
  }

  return dates
}

const pastDates = generatePastDates(30)

export const mockWorkoutHistory: HistoryWorkout[] = [
  {
    id: 1,
    name: "Upper Body Power",
    date: pastDates[2],
    duration: 3600, // 60 minutes
    intensity: "High",
    exercises: [
      {
        id: 101,
        name: "Bench Press",
        muscleGroup: "Chest",
        sets: [
          { id: 1001, weight: 80, reps: 8, isCompleted: true },
          { id: 1002, weight: 85, reps: 6, isCompleted: true },
          { id: 1003, weight: 90, reps: 4, isCompleted: true },
          { id: 1004, weight: 85, reps: 6, isCompleted: true },
        ],
        totalVolume: 2130,
        personalRecord: true,
      },
      {
        id: 102,
        name: "Pull-ups",
        muscleGroup: "Back",
        sets: [
          { id: 1005, weight: 0, reps: 12, isCompleted: true },
          { id: 1006, weight: 5, reps: 10, isCompleted: true },
          { id: 1007, weight: 10, reps: 8, isCompleted: true },
        ],
        totalVolume: 170,
      },
      {
        id: 103,
        name: "Shoulder Press",
        muscleGroup: "Shoulders",
        sets: [
          { id: 1008, weight: 50, reps: 10, isCompleted: true },
          { id: 1009, weight: 55, reps: 8, isCompleted: true },
          { id: 1010, weight: 60, reps: 6, isCompleted: true },
        ],
        totalVolume: 1010,
      },
      {
        id: 104,
        name: "Tricep Pushdown",
        muscleGroup: "Arms",
        sets: [
          { id: 1011, weight: 30, reps: 12, isCompleted: true },
          { id: 1012, weight: 35, reps: 10, isCompleted: true },
          { id: 1013, weight: 40, reps: 8, isCompleted: false },
        ],
        totalVolume: 760,
        notes: "Focus on form and full extension",
      },
    ],
    completedSets: 10,
    totalSets: 13,
    totalVolume: 4070,
    caloriesBurned: 450,
    averageRestTime: 90,
    notes: "Felt strong today, especially on bench press",
    personalRecords: [
      {
        exercise: "Bench Press",
        value: 90,
        type: "weight",
        date: pastDates[2],
      },
    ],
    volumeVsAverage: 15,
    intensityVsAverage: 10,
  },
  {
    id: 2,
    name: "Leg Day",
    date: pastDates[5],
    duration: 4200, // 70 minutes
    intensity: "High",
    exercises: [
      {
        id: 201,
        name: "Squats",
        muscleGroup: "Legs",
        sets: [
          { id: 2001, weight: 100, reps: 10, isCompleted: true },
          { id: 2002, weight: 110, reps: 8, isCompleted: true },
          { id: 2003, weight: 120, reps: 6, isCompleted: true },
          { id: 2004, weight: 110, reps: 8, isCompleted: true },
        ],
        totalVolume: 3520,
      },
      {
        id: 202,
        name: "Romanian Deadlift",
        muscleGroup: "Legs",
        sets: [
          { id: 2005, weight: 90, reps: 10, isCompleted: true },
          { id: 2006, weight: 100, reps: 8, isCompleted: true },
          { id: 2007, weight: 110, reps: 6, isCompleted: true },
        ],
        totalVolume: 2380,
      },
      {
        id: 203,
        name: "Leg Press",
        muscleGroup: "Legs",
        sets: [
          { id: 2008, weight: 150, reps: 12, isCompleted: true },
          { id: 2009, weight: 170, reps: 10, isCompleted: true },
          { id: 2010, weight: 190, reps: 8, isCompleted: true },
        ],
        totalVolume: 5300,
      },
      {
        id: 204,
        name: "Calf Raises",
        muscleGroup: "Legs",
        sets: [
          { id: 2011, weight: 60, reps: 15, isCompleted: true },
          { id: 2012, weight: 70, reps: 12, isCompleted: true },
          { id: 2013, weight: 80, reps: 10, isCompleted: true },
        ],
        totalVolume: 2290,
      },
    ],
    completedSets: 13,
    totalSets: 13,
    totalVolume: 13490,
    caloriesBurned: 580,
    averageRestTime: 120,
    volumeVsAverage: 5,
    intensityVsAverage: 8,
  },
  {
    id: 3,
    name: "Full Body Workout",
    date: pastDates[8],
    duration: 3000, // 50 minutes
    intensity: "Medium",
    exercises: [
      {
        id: 301,
        name: "Deadlift",
        muscleGroup: "Back",
        sets: [
          { id: 3001, weight: 120, reps: 8, isCompleted: true },
          { id: 3002, weight: 130, reps: 6, isCompleted: true },
          { id: 3003, weight: 140, reps: 4, isCompleted: true },
        ],
        totalVolume: 2840,
      },
      {
        id: 302,
        name: "Incline Bench Press",
        muscleGroup: "Chest",
        sets: [
          { id: 3004, weight: 70, reps: 10, isCompleted: true },
          { id: 3005, weight: 75, reps: 8, isCompleted: true },
          { id: 3006, weight: 80, reps: 6, isCompleted: false },
        ],
        totalVolume: 1280,
      },
      {
        id: 303,
        name: "Lat Pulldown",
        muscleGroup: "Back",
        sets: [
          { id: 3007, weight: 60, reps: 12, isCompleted: true },
          { id: 3008, weight: 70, reps: 10, isCompleted: true },
          { id: 3009, weight: 80, reps: 8, isCompleted: true },
        ],
        totalVolume: 1880,
      },
      {
        id: 304,
        name: "Leg Extensions",
        muscleGroup: "Legs",
        sets: [
          { id: 3010, weight: 50, reps: 15, isCompleted: true },
          { id: 3011, weight: 60, reps: 12, isCompleted: true },
          { id: 3012, weight: 70, reps: 10, isCompleted: true },
        ],
        totalVolume: 1950,
      },
    ],
    completedSets: 11,
    totalSets: 12,
    totalVolume: 7950,
    caloriesBurned: 420,
    averageRestTime: 75,
    volumeVsAverage: -2,
    intensityVsAverage: 0,
  },
  {
    id: 4,
    name: "Core & Cardio",
    date: pastDates[11],
    duration: 2700, // 45 minutes
    intensity: "Low",
    exercises: [
      {
        id: 401,
        name: "Plank",
        muscleGroup: "Core",
        sets: [
          { id: 4001, weight: 0, reps: 60, isCompleted: true }, // seconds
          { id: 4002, weight: 0, reps: 45, isCompleted: true },
          { id: 4003, weight: 0, reps: 30, isCompleted: true },
        ],
        totalVolume: 0,
      },
      {
        id: 402,
        name: "Russian Twists",
        muscleGroup: "Core",
        sets: [
          { id: 4004, weight: 10, reps: 20, isCompleted: true },
          { id: 4005, weight: 10, reps: 20, isCompleted: true },
          { id: 4006, weight: 10, reps: 15, isCompleted: true },
        ],
        totalVolume: 550,
      },
      {
        id: 403,
        name: "Mountain Climbers",
        muscleGroup: "Core",
        sets: [
          { id: 4007, weight: 0, reps: 30, isCompleted: true },
          { id: 4008, weight: 0, reps: 30, isCompleted: true },
          { id: 4009, weight: 0, reps: 30, isCompleted: true },
        ],
        totalVolume: 0,
      },
      {
        id: 404,
        name: "Treadmill",
        muscleGroup: "Cardio",
        sets: [
          { id: 4010, weight: 0, reps: 1200, isCompleted: true }, // seconds
        ],
        totalVolume: 0,
        notes: "Interval training: 1 min run, 30 sec walk",
      },
    ],
    completedSets: 10,
    totalSets: 10,
    totalVolume: 550,
    caloriesBurned: 350,
    averageRestTime: 45,
    volumeVsAverage: -80,
    intensityVsAverage: -15,
  },
  {
    id: 5,
    name: "Push Day",
    date: pastDates[14],
    duration: 3300, // 55 minutes
    intensity: "Medium",
    exercises: [
      {
        id: 501,
        name: "Bench Press",
        muscleGroup: "Chest",
        sets: [
          { id: 5001, weight: 80, reps: 10, isCompleted: true },
          { id: 5002, weight: 85, reps: 8, isCompleted: true },
          { id: 5003, weight: 90, reps: 6, isCompleted: true },
        ],
        totalVolume: 1940,
      },
      {
        id: 502,
        name: "Overhead Press",
        muscleGroup: "Shoulders",
        sets: [
          { id: 5004, weight: 50, reps: 10, isCompleted: true },
          { id: 5005, weight: 55, reps: 8, isCompleted: true },
          { id: 5006, weight: 60, reps: 6, isCompleted: true },
        ],
        totalVolume: 1010,
      },
      {
        id: 503,
        name: "Incline Dumbbell Press",
        muscleGroup: "Chest",
        sets: [
          { id: 5007, weight: 30, reps: 12, isCompleted: true },
          { id: 5008, weight: 35, reps: 10, isCompleted: true },
          { id: 5009, weight: 40, reps: 8, isCompleted: true },
        ],
        totalVolume: 1060,
      },
      {
        id: 504,
        name: "Tricep Extensions",
        muscleGroup: "Arms",
        sets: [
          { id: 5010, weight: 25, reps: 15, isCompleted: true },
          { id: 5011, weight: 30, reps: 12, isCompleted: true },
          { id: 5012, weight: 35, reps: 10, isCompleted: false },
        ],
        totalVolume: 735,
      },
    ],
    completedSets: 11,
    totalSets: 12,
    totalVolume: 4745,
    caloriesBurned: 400,
    averageRestTime: 85,
    volumeVsAverage: 3,
    intensityVsAverage: -2,
  },
]

"use client"
import { ChevronRight } from "lucide-react"
import { LastWorkoutCard } from "./last-workout-card"
import { motion } from "framer-motion"
import { Link } from "react-router"
import { EmptyWorkoutState } from "./empty-workout-state"
interface LastWorkoutSectionProps {
    lastWorkout: any | null
}

export function LastWorkoutSection({ lastWorkout }: LastWorkoutSectionProps) {
    return (
        <section>
            <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Last Workout
                </h2>
                {lastWorkout && (
                    <Link
                        to="/workouts"
                        className="text-blue-300 text-sm flex items-center gap-1 hover:text-blue-200 transition-colors"
                    >
                        View all <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            </motion.div>

            {lastWorkout ? (
                <LastWorkoutCard
                    title={lastWorkout.title}
                    date={lastWorkout.date}
                    duration={lastWorkout.duration}
                    exerciseCount={lastWorkout.exerciseCount}
                    volume={lastWorkout.volume}
                    onViewDetails={() => console.log("View last workout details")}
                />
            ) : (
                <EmptyWorkoutState
                    title="No Workouts Yet"
                    description="Start tracking your first workout"
                    buttonText="Start Workout"
                    buttonLink="/create"
                />
            )}
        </section>
    )
}

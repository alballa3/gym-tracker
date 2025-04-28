"use client"

import { useEffect, useState } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { WorkoutTemplatesGrid } from "@/components/workout/index/workout-templates-grid"
import { NewWorkoutCard } from "@/components/workout/index/new-workout-card"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { LastWorkoutSection } from "@/components/workout/index/last-workout-section"
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem"
import { WorkoutFormState } from "@/types/workout"

export default function HomePage() {
    const [activeTab, setActiveTab] = useState("home")
    const [templates, setTemplates] = useState<WorkoutFormState[]>([])
 
    useEffect(() => {
        const handle = async () => {
            const files = await Filesystem.readdir({
                path: "workout",
                directory: Directory.Data,

            })
            const workouts: WorkoutFormState[] = await Promise.all(
                files.files.map(async file => {
                    try {
                        const { data } = await Filesystem.readFile({
                            path: `workout/${file.name}`,
                            directory: Directory.Data,
                            encoding: Encoding.UTF8
                        });
                        return JSON.parse(data as string);                     // guarded parse :contentReference[oaicite:10]{index=10}
                    } catch (err) {
                        console.error('Skipping invalid JSON in', file.name, err);
                        return null;
                    }
                })
            );

            const validWorkouts = workouts.filter(w => w !== null);
            setTemplates(validWorkouts);
        }
        handle()
    }, [])
    // For demo purposes, you can toggle this to show/hide the last workout
    const lastWorkout = {
        title: "Upper Body Strength",
        date: "Today, 9:30 AM",
        duration: "45 min",
        exerciseCount: 8,
        volume: "4,500 kg",
    }

    // For demo purposes, you can set this to an empty array to show the empty state

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
            {/* Background particles/effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6 pb-24 relative">
                <AppHeader />

                <div className="grid gap-8">
                    {templates.length === 0 ? (
                        <div className="flex flex-col items-center justify-center mt-12 px-4 py-8 rounded-2xl bg-gray-900/50 backdrop-blur-lg border border-gray-800/50">
                            <div className="w-16 h-16 mb-6 rounded-full bg-gray-800 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                No Workouts Yet
                            </h2>
                            <p className="text-gray-400 mb-8 text-center max-w-md">
                                Ready to start your fitness journey? Create your first workout template and track your progress.
                            </p>
                            <div className="transform transition-transform hover:scale-105">
                                <NewWorkoutCard />
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Last Workout Section */}
                            <LastWorkoutSection lastWorkout={lastWorkout} />

                            {/* Workout Templates Section */}
                            <WorkoutTemplatesGrid templates={templates} templateColors={templateColors} />

                            {/* Track New Workout */}
                            <section className="mt-4">
                                <NewWorkoutCard />
                            </section>
                        </>
                    )}
                </div>
            </main>

            {/* Mobile Navigation */}
            <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    )
}



// Template color variations
const templateColors = [
    "bg-gradient-to-r from-blue-400 to-blue-300",
    "bg-gradient-to-r from-purple-400 to-blue-300",
    "bg-gradient-to-r from-blue-500 to-cyan-400",
]

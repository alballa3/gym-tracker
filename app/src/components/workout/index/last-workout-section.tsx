"use client"
import { ChevronRight, Activity } from "lucide-react"
import { LastWorkoutCard } from "./last-workout-card"
import { motion } from "framer-motion"
import { Link } from "react-router"
import { EmptyWorkoutState } from "./empty-workout-state"
import { useState, useEffect } from "react"

interface LastWorkoutSectionProps {
    lastWorkout: any | null
}

export function LastWorkoutSection({ lastWorkout }: LastWorkoutSectionProps) {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        // Trigger visibility after component mounts for animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);
    
    if (!lastWorkout && typeof window !== 'undefined') {
        console.error('No workout data available');
    }

    return (
        <motion.section 
            className="relative z-50 mt-6 px-4 py-6 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 -z-10">
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-sm"
                    animate={{ 
                        opacity: isHovering ? 0.9 : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div 
                    className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-xl"
                    animate={{ 
                        opacity: isHovering ? 0.7 : 0.3,
                        scale: isHovering ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                />
                <motion.div 
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0"
                    animate={{ 
                        opacity: isHovering ? 1 : 0.5,
                        backgroundPosition: isHovering ? "100% 0%" : "0% 0%",
                    }}
                    transition={{ duration: 2, repeat: isHovering ? Infinity : 0 }}
                    style={{ backgroundSize: "200% 100%" }}
                />
            </div>

            <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            >
                <div className="flex items-center gap-3">
                    <motion.div 
                        className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-2 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Activity className="h-5 w-5 text-blue-400" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                        Last Workout
                    </h2>
                </div>
                
                {lastWorkout && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to="/workouts"
                            className="group flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 rounded-full border border-blue-500/30 hover:border-blue-500/50 shadow-sm hover:shadow-md hover:shadow-blue-500/10"
                        >
                            View all 
                            <motion.div
                                animate={{ x: isHovering ? 3 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </motion.div>
                        </Link>
                    </motion.div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ 
                    duration: 0.6, 
                    delay: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
                className="relative"
            >
                {lastWorkout ? (
                    <motion.div 
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <LastWorkoutCard
                            title={lastWorkout.title}
                            date={lastWorkout.date}
                            duration={lastWorkout.duration}
                            exerciseCount={lastWorkout.exerciseCount}
                            volume={lastWorkout.volume}
                            onViewDetails={() => console.log("View last workout details")}
                        />
                    </motion.div>
                ) : (
                    <motion.div 
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="border border-gray-800 rounded-xl p-1 bg-gradient-to-br from-gray-900 to-gray-800/80 shadow-lg shadow-gray-950/50 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-purple-500/0"></div>
                        <EmptyWorkoutState
                            title="No Workouts Yet"
                            description="Start your fitness journey by tracking your first workout"
                            buttonText="Create Workout"
                            buttonLink="/create"
                        />
                    </motion.div>
                )}
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </motion.section>
    )
}

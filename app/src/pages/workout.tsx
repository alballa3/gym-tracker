"use client"

import { useEffect, useState } from "react"
import { Plus, Dumbbell, Library, Brain, Clock } from "lucide-react"
import { WorkoutProvider, useWorkout } from "@/contexts/workout-context"
import { ExerciseCard } from "@/components/workout/index/exercise-card"
import { SectionHeader } from "@/components/workout/create/section-header"
import { EmptyExerciseState } from "@/components/workout/create/empty-exercise-state"
import { BottomActionBar } from "@/components/workout/create/bottom-action-bar"
import { ExerciseLibrary } from "@/components/workout/create/exercise-library"
import { ExerciseDetailModal } from "@/components/workout/create/exercise-detail-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Exercise } from "@/types/exercise"
import { useNavigate, useParams } from "react-router"
import { WorkoutFormState } from "@/types/workout"
import { api } from "@/api"
import { storeWorkout } from "@/capacitor/store"
import { toast } from "sonner"
import AICoach from "./ai-coach"
import { motion, AnimatePresence } from "framer-motion"

function WorkoutForm() {
    const {
        state,
        dispatch,
        selectedExercise,
        isDetailModalOpen,
        setDetailModalOpen,
        getExerciseDetails,
    } = useWorkout()
    const [activeTab, setActiveTab] = useState<"workout" | "library" | "ai">("workout")
    const [isLoading, setIsLoading] = useState(true)
    const nav = useNavigate()
    const { id } = useParams()
    
    useEffect(() => {
        const handle = async () => {
            setIsLoading(true)
            try {
                const client = await api()
                const response = await client.get(`/template/${id}`)
                const data: WorkoutFormState = response.data
                data.saveAsTemplate = false
                data.exercises.map((exercise) => {
                    exercise.sets = exercise.sets.map((set) => ({
                        ...set,
                        isCompleted:false
                    }))
                })
                dispatch({
                    type: "LOAD_WORKOUT",
                    payload: data
                })
            } catch (error) {
                toast.error("Failed to load workout template")
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        
        if (id) {
            handle()
        } else {
            setIsLoading(false)
        }
    }, [id, dispatch])

    const [elapsedTime, setElapsedTime] = useState<number>(0)

    // Start the timer when the component mounts
    useEffect(() => {
        const startTime = new Date()
        const timerInterval = setInterval(() => {
            const currentTime = new Date()
            const elapsed = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000)
            setElapsedTime(elapsed)
        }, 1000)

        // Clean up the interval when the component unmounts
        return () => clearInterval(timerInterval)
    }, [])
    
    useEffect(() => {
        dispatch({
            type: "SET_TIMER",
            payload: elapsedTime
        })
    }, [elapsedTime, dispatch])
    
    // Format seconds to MM:SS
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    const handleSave = async () => {
        toast.promise(
            async () => {
                storeWorkout(state)
                const client = await api()
                await client.post("/workouts", state)
                nav("/")
            },
            {
                loading: 'Saving your workout...',
                success: 'Workout saved successfully!',
                error: 'Failed to save workout'
            }
        )
    }

    const handleSelectExercise = (exercise: Exercise) => {
        // Add the selected exercise to the workout
        dispatch({
            type: "ADD_EXERCISE_FROM_LIBRARY",
            payload: {
                name: exercise.name,
            },
        })
        // Close the modal if it's open
        if (isDetailModalOpen) {
            setDetailModalOpen(false)
        }
        // Switch back to the workout tab
        setActiveTab("workout")
        
        // Show success toast
        toast.success(`Added ${exercise.name} to your workout`)
    }

    const handleShowExerciseDetails = (exerciseName: string) => {
        getExerciseDetails(exerciseName)
    }

    // Add this handler in the WorkoutForm component
    const handleToggleSetCompletion = (exerciseId: number, setId: number) => {
        dispatch({
            type: "TOGGLE_SET_COMPLETION",
            payload: { exerciseId, setId },
        })
    }

    const getTabIcon = (tab: string) => {
        switch(tab) {
            case 'workout': return <Dumbbell className="h-4 w-4" />
            case 'library': return <Library className="h-4 w-4" />
            case 'ai': return <Brain className="h-4 w-4" />
            default: return null
        }
    }

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white pb-24"
            >
                {/* Header */}
                <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-3">
                            
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-bold">
                                        <motion.span 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-2xl text-white font-display"
                                        >
                                            {isLoading ? "Loading..." : state.name}
                                        </motion.span>
                                    </h1>
                                </div>
                            </div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-2 bg-gray-800/70 px-3 py-2 rounded-full"
                            >
                                <Clock className="h-4 w-4 text-cyan-400" />
                                <div className="text-cyan-400 font-mono text-xl tracking-wider">
                                    {formatTime(elapsedTime)}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid gap-6"
                    >
                        {/* Tabs for Workout, Library and AI */}
                        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "workout" | "library" | "ai")}>
                            <TabsList className="grid grid-cols-3 bg-gray-800/70 border border-gray-700/50 rounded-xl overflow-hidden h-auto ">
                                {["workout", "library", "ai"].map((tab) => (
                                    <TabsTrigger
                                        key={tab}
                                        value={tab}
                                        className="data-[state=active]:bg-gradient-to-r h-auto data-[state=active]:from-purple- data-[state=active]:to-blue-500 data-[state=active]:text-white flex items-center gap-2 py-3"
                                    >
                                        {getTabIcon(tab)}
                                        <span className="capitalize">{tab === "ai" ? "AI Coach" : tab}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <AnimatePresence mode="wait">
                                <TabsContent value="workout" className="mt-6 space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <SectionHeader
                                            title="Exercises"
                                            count={state.exercises.length}
                                            action={{
                                                label: "Add Exercise",
                                                icon: <Plus className="h-4 w-4 mr-2" />,
                                                onClick: () => setActiveTab("library"),
                                                description: "Opens exercise library",
                                            }}
                                        />

                                        <div className="mt-4 space-y-4">
                                            {state.exercises.map((exercise, index) => (
                                                <motion.div
                                                    key={exercise.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <ExerciseCard
                                                        exercise={exercise}
                                                        index={index}
                                                        isFirst={index === 0}
                                                        isLast={index === state.exercises.length - 1}
                                                        onMoveUp={() => dispatch({ type: "MOVE_EXERCISE", payload: { id: exercise.id, direction: "up" } })}
                                                        onMoveDown={() =>
                                                            dispatch({ type: "MOVE_EXERCISE", payload: { id: exercise.id, direction: "down" } })
                                                        }
                                                        onRemove={() => dispatch({ type: "REMOVE_EXERCISE", payload: exercise.id })}
                                                        onDuplicate={() => dispatch({ type: "DUPLICATE_EXERCISE", payload: exercise.id })}
                                                        onToggleExpand={() => dispatch({ type: "TOGGLE_EXERCISE_EXPANDED", payload: exercise.id })}
                                                        onUpdateRestTime={(value) =>
                                                            dispatch({ type: "UPDATE_REST_TIME", payload: { id: exercise.id, value } })
                                                        }
                                                        onAddSet={() => dispatch({ type: "ADD_SET", payload: exercise.id })}
                                                        onRemoveSet={(setId) => dispatch({ type: "REMOVE_SET", payload: { exerciseId: exercise.id, setId } })}
                                                        onUpdateSet={(setId, field, value) =>
                                                            dispatch({
                                                                type: "UPDATE_SET",
                                                                payload: { exerciseId: exercise.id, setId, field, value },
                                                            })
                                                        }
                                                        onToggleSetCompletion={(setId) => handleToggleSetCompletion(exercise.id, setId)}
                                                        onNameChange={(name) =>
                                                            dispatch({ type: "UPDATE_EXERCISE_NAME", payload: { id: exercise.id, name } })
                                                        }
                                                        onShowDetails={() => {
                                                            handleShowExerciseDetails(exercise.name);
                                                            setDetailModalOpen(true);
                                                        }}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {state.exercises.length === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <EmptyExerciseState onAddExercise={() => setActiveTab("library")} />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="ai" className="mt-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <AICoach />
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="library" className="mt-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ExerciseLibrary onSelectExercise={handleSelectExercise} />
                                    </motion.div>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </motion.div>
                </main>

                {/* Exercise Detail Modal */}
                <ExerciseDetailModal
                    exercise={selectedExercise}
                    isOpen={isDetailModalOpen}
                    onClose={() => setDetailModalOpen(false)}
                    onAddExercise={handleSelectExercise}
                />

                {/* Bottom Action Bar */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                >
                    <BottomActionBar saveAsTemplate={state.saveAsTemplate} onSave={handleSave} />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default function Workout() {
    return (
        <WorkoutProvider>
            <WorkoutForm />
        </WorkoutProvider>
    )
}

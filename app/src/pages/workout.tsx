"use client"

import { useEffect, useState } from "react"
import { Plus, Dumbbell, Library } from "lucide-react"
import { WorkoutProvider, useWorkout } from "@/contexts/workout-context"
import { ExerciseCard } from "@/components/workout/index/exercise-card"
import { SectionHeader } from "@/components/workout/create/section-header"
import { EmptyExerciseState } from "@/components/workout/create/empty-exercise-state"
import { BottomActionBar } from "@/components/workout/create/bottom-action-bar"
import { ExerciseLibrary } from "@/components/workout/create/exercise-library"
import { ExerciseDetailModal } from "@/components/workout/create/exercise-detail-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Exercise } from "@/types/exercise"
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { useNavigate, useParams } from "react-router"
import { WorkoutFormState } from "@/types/workout"
import { api } from "@/api"

function WorkoutForm() {
    const {
        state,
        dispatch,
        selectedExercise,
        isDetailModalOpen,
        setDetailModalOpen,
        getExerciseDetails,

    } = useWorkout()
    const [activeTab, setActiveTab] = useState<"workout" | "library">("workout")
    let nav = useNavigate()
    // const [data,setData]=useState([])
    let { id } = useParams()
    useEffect(() => {
        const handle = async () => {
            let file = await Filesystem.readFile({
                path: `workout/${id}.json`,
                directory: Directory.Data,
                encoding: Encoding.UTF8
            })
            let data: WorkoutFormState = JSON.parse(file.data as string)
            data.saveAsTemplate = false;
            data.exercises.map((execures) => {
                execures.previousData = {
                    date: new Date(Number(data.createdAt)).toISOString(),
                    sets: execures.sets.map((set) => ({ ...set })), // deep clone each set
                }
                execures.sets.map((set) => {
                    set.isCompleted = false;
                    set.reps = 1
                    set.weight = 1
                    return set
                })
            })
            dispatch({
                type: "LOAD_WORKOUT",
                payload: data
            }),
                console.log(state)
        }
        handle()

    }, [id])
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
    }, [elapsedTime])
    // Format seconds to MM:SS
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    const handleSave = async () => {

        let path = await Filesystem.stat({
            path: 'workout',
            directory: Directory.Data,
        })
        if (!path) {
            await Filesystem.mkdir({
                path: 'workout',
                directory: Directory.Data,
                recursive: true,
            });
        }
        await Filesystem.writeFile({
            path: `workout/${state.id}.json`,
            data: JSON.stringify(state),
            directory: Directory.Data,
            encoding: Encoding.UTF8
        });
        const client = await api()
        let response =await client.post("/template", state)
        console.log(response)
        // nav("/")
        // console.log("Saving workout:", state);
    };


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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white pb-24">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4 shadow-lg">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold">
                            <span className="text-4xl bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent font-display">
                                {state.name}
                            </span>
                        </h1>
                        <div className="text-cyan-400 font-mono text-xl tracking-wider animate-pulse">
                            {formatTime(elapsedTime)}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Future action buttons can go here */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <div className="grid gap-6">

                    {/* Tabs for Workout and Library */}
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "workout" | "library")}>
                        <TabsList className="grid grid-cols-2 bg-gray-800/70 border border-gray-700/50">
                            <TabsTrigger
                                value="workout"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white flex items-center gap-2"
                            >
                                <Dumbbell className="h-4 w-4" />
                                Your Workout
                            </TabsTrigger>
                            <TabsTrigger
                                value="library"
                                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white flex items-center gap-2"
                            >
                                <Library className="h-4 w-4" />
                                Exercise Library
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="workout" className="mt-4 space-y-3">
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

                            {state.exercises.map((exercise, index) => (
                                <ExerciseCard
                                    key={exercise.id}
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
                                    onShowDetails={() => handleShowExerciseDetails(exercise.name)}
                                />
                            ))}

                            {state.exercises.length === 0 && <EmptyExerciseState onAddExercise={() => setActiveTab("library")} />}
                        </TabsContent>

                        <TabsContent value="library" className="mt-4">
                            <ExerciseLibrary onSelectExercise={handleSelectExercise} />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            {/* Exercise Detail Modal */}
            <ExerciseDetailModal
                exercise={selectedExercise}
                isOpen={isDetailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                onAddExercise={handleSelectExercise}
            />

            {/* Bottom Action Bar */}
            <BottomActionBar saveAsTemplate={state.saveAsTemplate} onSave={handleSave} />
        </div>
    )
}

export default function Workout() {
    return (
        <WorkoutProvider>
            <WorkoutForm />
        </WorkoutProvider>
    )
}

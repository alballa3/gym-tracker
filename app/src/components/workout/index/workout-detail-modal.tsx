import { Dumbbell, Clock, CheckCircle, Circle, Timer, ArrowRight, BarChart3, Activity, TrendingUp, Award, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { Exercise, WorkoutFormState } from "@/types/workout"
import { Link } from "react-router"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import moment from "moment"

interface WorkoutDetailModalProps {
    workout: WorkoutFormState
    isOpen: boolean
    onClose: () => void
}

export function WorkoutDetailModal({ workout, isOpen, onClose }: WorkoutDetailModalProps) {
    if (!workout) return null

    // Calculate completion percentage
    const calculateCompletion = (exercises: Exercise) => {
        let totalSets = 0
        let completedSets = 0

        exercises.sets.forEach((exercise) => {
            totalSets += exercises.sets.length
            completedSets += exercise.isCompleted ? 1 : 0
        })

        return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0
    }

    // Format seconds to minutes and seconds
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    // Calculate overall completion percentage
    const overallCompletionPercentage = workout.exercises.length > 0 
        ? Math.round(workout.exercises.reduce((total, exercise) => total + calculateCompletion(exercise), 0) / workout.exercises.length)
        : 0

    // Calculate total volume (weight × reps)
    const totalVolume = workout.exercises.reduce((total, exercise) => {
        return total + exercise.sets.reduce((setTotal, set) => setTotal + (set.weight * set.reps), 0)
    }, 0)

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="bg-gradient-to-br from-gray-900/95 to-gray-950 border-gray-800/50 text-white max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-sm">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"></div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DialogHeader>
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-lg"></div>
                                        <div className="bg-gradient-to-br from-blue-500/30 to-blue-500/20 p-2 rounded-lg relative">
                                            <Dumbbell className="h-5 w-5 text-blue-300" />
                                        </div>
                                    </div>
                                    <DialogTitle className="text-xl text-white">{workout.name}</DialogTitle>
                                </div>
                                <DialogDescription className="text-gray-400">{workout.description}</DialogDescription>
                            </DialogHeader>
                            <div className="mt-6">
                                {/* Workout Progress Overview */}
                                <div className="mb-8 flex flex-col lg:flex-row items-center gap-6">
                                    <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                                        <CircularProgressbar
                                            value={overallCompletionPercentage}
                                            text={`${overallCompletionPercentage}%`}
                                            styles={buildStyles({
                                                textSize: '16px',
                                                textColor: '#fff',
                                                pathColor: overallCompletionPercentage === 100 ? '#10b981' : '#0ea5e9',
                                                trailColor: 'rgba(255, 255, 255, 0.1)',
                                            })}
                                        />
                                    </div>
                                    
                                    <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 w-full">
                                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                                            <p className="text-gray-300 text-xs mb-1">Duration</p>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5 text-blue-300" />
                                                <p className="font-medium text-white">{Math.floor(Number(workout.timer) / 60)} min</p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                                            <p className="text-gray-300 text-xs mb-1">Exercises</p>
                                            <div className="flex items-center gap-1">
                                                <Dumbbell className="h-3.5 w-3.5 text-blue-300" />
                                                <p className="font-medium text-white">{workout.exercises.length} total</p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                                            <p className="text-gray-300 text-xs mb-1">Total Volume</p>
                                            <div className="flex items-center gap-1">
                                                <Activity className="h-3.5 w-3.5 text-blue-300" />
                                                <p className="font-medium text-white">{totalVolume.toLocaleString()} kg</p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                                            <p className="text-gray-300 text-xs mb-1">Total Sets</p>
                                            <div className="flex items-center gap-1">
                                                <BarChart3 className="h-3.5 w-3.5 text-blue-300" />
                                                <p className="font-medium text-white">
                                                    {workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                                            <p className="text-gray-300 text-xs mb-1">Completed</p>
                                            <div className="flex items-center gap-1">
                                                <CheckCircle className="h-3.5 w-3.5 text-blue-300" />
                                                <p className="font-medium text-white">
                                                    {workout.exercises.reduce(
                                                        (total, ex) => total + ex.sets.filter((set) => set.isCompleted).length,
                                                        0,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                                            <p className="text-gray-300 text-xs mb-1">Created</p>
                                            <div className="flex items-center gap-1">
                                                <TrendingUp className="h-3.5 w-3.5 text-blue-300" />
                                                <p className="font-medium text-white">
                                                    {moment(workout.created_at).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs for different views */}
                                <Tabs defaultValue="exercises" className="mt-4">
                                    <TabsList className="grid grid-cols-2 bg-gray-800/70 border border-gray-700/50 mb-4">
                                        <TabsTrigger
                                            value="exercises"
                                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-400 data-[state=active]:text-white"
                                        >
                                            Exercises
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="details"
                                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-400 data-[state=active]:text-white"
                                        >
                                            Details
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="exercises" className="space-y-4">
                                        {workout.exercises.map((exercise, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-blue-500/20 text-blue-300 w-6 h-6 rounded-md flex items-center justify-center font-medium text-xs">
                                                            {idx + 1}
                                                        </div>
                                                        <h3 className="text-white font-medium">{exercise.name}</h3>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/30">
                                                            {exercise.sets.length} sets
                                                        </Badge>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-blue-500/10 text-blue-300 border-blue-500/30 flex items-center gap-1"
                                                        >
                                                            <Timer className="h-3 w-3" />
                                                            {exercise.restTime}s rest
                                                        </Badge>
                                                    </div>
                                                </div>

                                                {/* Exercise Progress */}
                                                <div className="mb-3">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-400">Completion</span>
                                                        <span className="text-blue-300">{calculateCompletion(exercise)}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                                                            style={{ width: `${calculateCompletion(exercise)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* Sets */}
                                                <div className="space-y-2">
                                                    <div className="hidden sm:grid grid-cols-12 gap-2 px-2 py-1 text-xs text-gray-400">
                                                        <div className="col-span-1">#</div>
                                                        <div className="col-span-3">Weight</div>
                                                        <div className="col-span-3">Reps</div>
                                                        <div className="col-span-5">Status</div>
                                                    </div>

                                                    {exercise.sets.map((set, setIdx) => (
                                                        <motion.div
                                                            key={setIdx}
                                                            className={`
                                                                relative overflow-hidden backdrop-blur-sm
                                                                grid grid-cols-1 sm:grid-cols-12 gap-2
                                                                ${set.isCompleted
                                                                    ? "bg-gradient-to-r from-green-500/15 to-green-400/10 border-green-500/30"
                                                                    : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-gray-700/40"
                                                                }
                                                                rounded-xl p-3 items-center border
                                                                hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/5
                                                                transition-all duration-300 ease-out
                                                            `}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ 
                                                                type: "spring",
                                                                stiffness: 100,
                                                                damping: 15,
                                                                delay: idx * 0.1 + setIdx * 0.05 
                                                            }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                                            
                                                            <div className="sm:hidden grid grid-cols-3 gap-3 mb-2">
                                                                <div className="text-xs font-medium text-gray-400">Set</div>
                                                                <div className="text-xs font-medium text-gray-400">Weight</div>
                                                                <div className="text-xs font-medium text-gray-400">Reps</div>
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-3 sm:grid-cols-12 gap-3 items-center relative z-10">
                                                                <div className="sm:col-span-1 flex justify-center">
                                                                    <div className="bg-blue-500/30 text-blue-200 w-6 h-6 rounded-lg flex items-center justify-center font-semibold text-xs shadow-inner shadow-blue-400/10">
                                                                        {setIdx + 1}
                                                                    </div>
                                                                </div>
                                                                <div className="sm:col-span-3 text-white text-sm font-medium">{set.weight} kg</div>
                                                                <div className="sm:col-span-3 text-white text-sm font-medium">{set.reps} reps</div>
                                                                <div className="col-span-3 sm:col-span-5 flex items-center">
                                                                    {set.isCompleted ? (
                                                                        <span className="text-xs flex items-center gap-1.5 text-green-300 bg-green-500/10 px-2 py-1 rounded-full">
                                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                                            Completed
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-xs flex items-center gap-1.5 text-gray-400 bg-gray-700/30 px-2 py-1 rounded-full">
                                                                            <Circle className="h-3.5 w-3.5" />
                                                                            Not completed
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="details" className="space-y-4">
                                        <motion.div
                                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                                                <Award className="h-4 w-4 text-blue-300" />
                                                Workout Details
                                            </h3>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between py-2 border-b border-gray-700/30">
                                                    <span className="text-gray-400">Template</span>
                                                    <span className="text-white">{workout.is_template ? "Yes" : "No"}</span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-700/30">
                                                    <span className="text-gray-400">Total Sets</span>
                                                    <span className="text-white">
                                                        {workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-700/30">
                                                    <span className="text-gray-400">Completed Sets</span>
                                                    <span className="text-white">
                                                        {workout.exercises.reduce(
                                                            (total, ex) => total + ex.sets.filter((set) => set.isCompleted).length,
                                                            0,
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-gray-700/30">
                                                    <span className="text-gray-400">Total Duration</span>
                                                    <span className="text-white">{formatTime(Number(workout.timer))}</span>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-gray-400">Completion</span>
                                                    <span className="text-white">{overallCompletionPercentage}%</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Share Options */}
                                        <motion.div
                                            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                                                <Share className="h-4 w-4 text-blue-300" />
                                                Share Workout
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                <Button variant="outline" size="sm" className="bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                                                    Export as PDF
                                                </Button>
                                                <Button variant="outline" size="sm" className="bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                                                    Share Link
                                                </Button>
                                                <Button variant="outline" size="sm" className="bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                                                    Save as Template
                                                </Button>
                                            </div>
                                        </motion.div>

                                      
                                    </TabsContent>
                                </Tabs>

                                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto border-gray-700 bg-gray-800/30 text-gray-300 hover:bg-gray-800 hover:text-white"
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Link to={`/workout/${workout.id}`} className="w-full sm:w-auto">
                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white border-0 relative group">
                                            <span className="absolute inset-0 rounded-md bg-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            <span className="relative">Start Workout</span>
                                            <ArrowRight className="h-4 w-4 ml-2 relative" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}

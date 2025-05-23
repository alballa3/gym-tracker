"use client"

import { Dumbbell, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { PlayIcon } from "@/components/ui/icons"
import { Exercise, WorkoutFormState } from "@/types/workout"
import { useMemo } from "react"

interface WorkoutTemplateCardProps {
    template: WorkoutFormState
    index: number
    templateColors: string[]
    onViewDetails: () => void
    onStartWorkout: () => void
}

export function WorkoutTemplateCard({
    template,
    index,
    templateColors,
    onViewDetails,
    onStartWorkout,
}: WorkoutTemplateCardProps) {
    // Format time from seconds to readable format
    const formatTime = (seconds: number): string => {
        if (!seconds) return "0 min";
        
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes} min`;
    };

    // Calculate completion percentage for a single exercise
    const calculateExerciseCompletion = (exercise: Exercise): number => {
        if (!exercise.sets || exercise.sets.length === 0) return 0;
        
        const totalSets = exercise.sets.length;
        const completedSets = exercise.sets.filter(set => set.isCompleted).length;
        
        return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
    };

    // Calculate overall workout completion percentage
    const completionPercentage = useMemo(() => {
        if (!template.exercises || template.exercises.length === 0) return 0;
        
        const totalCompletion = template.exercises.reduce(
            (total, exercise) => total + calculateExerciseCompletion(exercise), 
            0
        );
        
        return Math.round(totalCompletion / template.exercises.length);
    }, [template.exercises]);

    // Get color for the progress bar based on completion
    const getProgressColor = (percentage: number): string => {
        if (percentage === 0) return "bg-gray-800/50";
        if (percentage < 30) return "from-blue-500/70 to-blue-400/70";
        if (percentage < 70) return "from-blue-500 to-blue-400";
        return "from-green-500 to-green-400";
    };

    const progressColor = getProgressColor(completionPercentage);
    const colorClass = templateColors[index % templateColors.length];
    const formattedTime = formatTime(template.timer as number || 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative"
        >
            <div 
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-400/5 rounded-2xl blur-xl"
                aria-hidden="true"
            ></div>
            <Card 
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-gray-800/50 hover:border-blue-500/30 transition-all shadow-lg hover:shadow-blue-900/10 rounded-2xl overflow-hidden group backdrop-blur-sm relative"
                tabIndex={0}
                role="article"
                aria-label={`Workout template: ${template.name}`}
            >
                <div className={`absolute top-0 left-0 w-full h-1 ${colorClass}`} aria-hidden="true"></div>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 p-1.5 rounded-lg">
                                <Dumbbell className="h-4 w-4 text-blue-300" aria-hidden="true" />
                            </div>
                            <CardTitle className="text-base text-white">{template.name}</CardTitle>
                        </div>
                        <Badge
                            variant="outline"
                            className="bg-blue-500/10 text-blue-300 border-blue-500/30 transition-all group-hover:bg-blue-500/20"
                        >
                            {template.exercises.length} {template.exercises.length === 1 ? 'exercise' : 'exercises'}
                        </Badge>
                    </div>
                    {template.description && (
                        <CardDescription className="text-gray-400 text-xs mt-1">{template.description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-1" title="Estimated workout duration">
                            <Clock className="h-3.5 w-3.5 text-blue-300" aria-hidden="true" />
                            <span className="text-white">{formattedTime}</span>
                        </div>
                        {completionPercentage > 0 && (
                            <div className="text-xs text-blue-300">
                                {completionPercentage}% complete
                            </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <Progress
                        value={completionPercentage}
                        className={`h-1.5 mb-3 bg-gray-800/50 bg-gradient-to-r ${progressColor}`}
                        aria-label={`Workout completion: ${completionPercentage}%`}
                    />

                    {/* Preview of first 2 exercises */}
                    <div className="space-y-1.5">
                        {template.exercises.slice(0, 2).map((exercise, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-800/50 rounded-md p-2 border border-gray-700/30 flex justify-between items-center group-hover:border-blue-500/20 transition-colors"
                            >
                                <p className="text-xs text-white">{exercise.name}</p>
                                <span className="text-xs text-gray-400">
                                    {exercise.sets.length} {exercise.sets.length === 1 ? 'set' : 'sets'}
                                </span>
                            </div>
                        ))}
                        {template.exercises.length > 2 && (
                            <div className="text-xs text-center text-blue-300 mt-1">
                                +{template.exercises.length - 2} more exercises
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 rounded-xl"
                        onClick={onViewDetails}
                        aria-label="View workout details"
                    >
                        <Info className="h-4 w-4 mr-2" aria-hidden="true" />
                        Details
                    </Button>
                    <Button
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 rounded-xl text-sm shadow-md shadow-blue-900/10 border-0 relative group"
                        onClick={onStartWorkout}
                        aria-label="Start workout"
                    >
                        <span className="absolute inset-0 rounded-xl bg-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>
                        <PlayIcon className="h-4 w-4 mr-2 relative" aria-hidden="true" />
                        <span className="relative">Start</span>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

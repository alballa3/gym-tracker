"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkoutTemplateCard } from "./workout-template-card"
import { WorkoutDetailModal } from "./workout-detail-modal"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router"
import { WorkoutFormState } from "@/types/workout"
import { EmptyWorkoutState } from "./empty-workout-state"
interface WorkoutTemplatesGridProps {
    templates: WorkoutFormState[]
    templateColors: string[]
}

export function WorkoutTemplatesGrid({ templates, templateColors }: WorkoutTemplatesGridProps) {
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutFormState | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    let navigate = useNavigate();

    const handleViewDetails = (template: WorkoutFormState) => {
        setSelectedWorkout(template)
        setIsModalOpen(true)
    }

    const handleStartWorkout = (template: WorkoutFormState) => {
        navigate(`/workout/${template.id}`)  
    }

    return (
        <section>
            <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Workout Templates
                </h2>
                <Link to="/create">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 rounded-xl"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New
                    </Button>
                </Link>
            </motion.div>

            {templates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template, index) => (
                        <WorkoutTemplateCard
                            key={index}
                            template={template}
                            index={index}
                            templateColors={templateColors}
                            onViewDetails={() => handleViewDetails(template)}
                            onStartWorkout={() => handleStartWorkout(template)}
                        />
                    ))}
                </div>
            ) : (
                <EmptyWorkoutState
                    title="No Workout Templates"
                    description="Create your first workout template to get started"
                    buttonText="Create Template"
                    buttonLink="/create-template"
                />
            )}

            <WorkoutDetailModal workout={selectedWorkout as WorkoutFormState} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}

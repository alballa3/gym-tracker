"use client"

import { Dumbbell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link } from "react-router"

interface EmptyWorkoutStateProps {
    title: string
    description: string
    buttonText: string
    buttonLink: string
}

export function EmptyWorkoutState({ title, description, buttonText, buttonLink }: EmptyWorkoutStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-2xl blur-xl"></div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center backdrop-blur-sm relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-300"></div>

                <motion.div
                    className="relative mb-6"
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, -5, 0, 5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                >
                    <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>
                    <div className="bg-gradient-to-br from-blue-600/80 to-blue-400/80 p-5 rounded-full relative">
                        <Dumbbell className="h-10 w-10 text-white" />
                    </div>
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-6 max-w-xs">{description}</p>

                <Link to={buttonLink}>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 rounded-xl px-6 py-5 text-base shadow-lg shadow-blue-900/20 border-0 relative group">
                        <span className="absolute inset-0 rounded-xl bg-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <Plus className="h-5 w-5 mr-2 relative" />
                        <span className="relative">{buttonText}</span>
                    </Button>
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-500/5 to-transparent rounded-b-2xl"></div>
            </div>
        </motion.div>
    )
}

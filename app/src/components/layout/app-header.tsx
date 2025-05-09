"use client"

import { Dumbbell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function AppHeader() {
    return (
        <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center gap-3">
                <div className="bg-blue-600/30 p-2.5 rounded-xl">
                    <Dumbbell className="h-5 w-5 text-blue-300" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                    GymRat Tracker
                </h1>
            </div>
            <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 rounded-full h-10 w-10 p-0 shadow-md shadow-blue-900/20"
            >
                <Plus className="h-5 w-5" />
            </Button>
        </motion.div>
    )
}

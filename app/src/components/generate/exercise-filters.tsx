"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ExerciseFiltersProps {
  muscleGroups: string[] | null
  activeFilter: string | null
  onFilterChange: (filter: string | null) => void
}

export function ExerciseFilters({ muscleGroups, activeFilter, onFilterChange }: ExerciseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 py-3 px-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Badge
          onClick={() => onFilterChange(null)}
          className={cn(
            "cursor-pointer transition-all duration-200 text-sm py-1.5 px-3",
            !activeFilter
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-900/20"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
          )}
        >
          All
        </Badge>
      </motion.div>

      {muscleGroups?.map((group, index) => (
        <motion.div
          key={group}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.05 * (index + 1) }}
        >
          <Badge
            onClick={() => onFilterChange(group)}
            className={cn(
              "cursor-pointer transition-all duration-200 text-sm py-1.5 px-3",
              activeFilter === group
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-900/20"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
            )}
          >
            {group}
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}

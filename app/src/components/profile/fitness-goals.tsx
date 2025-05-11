"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Save, Target, Trash2, Trophy, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AddGoalModal from "./add-goal-modal"
import { api } from "@/api"
import { Profile } from "@/types/user"

type Goal = {
  id: string
  title: string
  category: string
  target: number
  current: number
  unit: string
  deadline: string
  difficulty?: string
  reminders?: string | null
  isPublic?: boolean
  createdAt?: string
}

export default function FitnessGoals({ profile }: { profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false)
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    setGoals(profile.goals)
  }, [profile.goals])
  
  const handlesave = async () => {
    console.log(goals)
    const client = await api()
    const res = await client.put("/profile/goals", { goals })
    console.log(res)
    setIsEditing(false)
  }
  const handleAddGoal = async (newGoal: Goal) => {
    const updatedGoals = [...goals, newGoal]
    setGoals(updatedGoals)
    console.log(updatedGoals)

    const client = await api()
    const res = await client.put("/profile/goals", { goals: updatedGoals })
    console.log(res)
  }

  const handleDeleteGoal = async (id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
    const client = await api()
    const res = await client.put("/profile/goals", { goals })
    console.log(res)
  }

  const handleUpdateGoal = async (id: string, field: keyof Goal, value: string | number) => {
    setGoals((prev) => prev.map((goal) => (goal.id === id ? { ...goal, [field]: value } : goal)))
    const client = await api()
    const res = await client.put("/profile/goals", { goals })
    console.log(res)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "strength":
        return "from-blue-600 to-blue-400"
      case "cardio":
        return "from-green-600 to-green-400"
      case "body":
        return "from-purple-600 to-purple-400"
      default:
        return "from-gray-600 to-gray-400"
    }
  }

  const getCategoryBgColor = (category: string) => {
    switch (category) {
      case "strength":
        return "bg-blue-500/10"
      case "cardio":
        return "bg-green-500/10"
      case "body":
        return "bg-purple-500/10"
      default:
        return "bg-gray-500/10"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "strength":
        return "💪"
      case "cardio":
        return "🏃"
      case "body":
        return "⚖️"
      case "habit":
        return "📅"
      default:
        return "🎯"
    }
  }

  const calculateProgress = (current: number, target: number, category: string) => {
    // For weight loss goals, reverse the calculation
    if (current > target && category === "body") {
      const max = current * 1.2 // 20% more than current as the starting point
      return 100 - ((current - target) / (max - target)) * 100
    }
    return (current / target) * 100
  }

  const getTimeRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-4 sm:p-6 shadow-xl shadow-black/20"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 mr-3 rounded-full"></div>
          Fitness Goals
        </h2>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <AddGoalModal onAddGoal={handleAddGoal} />

          {isEditing ? (
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-none"
              onClick={handlesave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <AnimatePresence>
          {goals.map((goal, index) => {
            const progress = calculateProgress(goal.current, goal.target, goal.category)
            const daysRemaining = getTimeRemaining(goal.deadline)

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-zinc-800/50 rounded-xl p-3 sm:p-4 bg-zinc-800/20 backdrop-blur-sm hover:bg-zinc-800/30 transition-colors shadow-lg shadow-black/10"
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-2">
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${getCategoryBgColor(goal.category)} flex items-center justify-center text-lg sm:text-xl shadow-inner flex-shrink-0`}
                    >
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-white text-base sm:text-lg">{goal.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <p className="text-xs text-zinc-400">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                        <span
                          className={`text-xs px-3 py-0.5 rounded-full ${daysRemaining > 30
                            ? "bg-green-500/20 text-green-400"
                            : daysRemaining > 7
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-red-500/20 text-red-400"
                            }`}
                        >
                          {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full ml-auto sm:ml-0"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 xs:gap-0 mb-1 text-sm">
                    <span className="text-zinc-300 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-blue-400" />
                      Current:{" "}
                      {isEditing ? (
                        <Input
                          type="number"
                          value={goal.current}
                          onChange={(e) => handleUpdateGoal(goal.id, "current", Number(e.target.value))}
                          className="w-16 sm:w-20 h-6 inline-block px-2 py-0 text-sm bg-zinc-800/70 border-zinc-700/50 text-white rounded-md"
                        />
                      ) : (
                        goal.current
                      )}{" "}
                      {goal.unit}
                    </span>
                    <span className="text-zinc-300 flex items-center gap-1">
                      <Target className="h-3 w-3 text-green-400" />
                      Target:{" "}
                      {isEditing ? (
                        <Input
                          type="number"
                          value={goal.target}
                          onChange={(e) => handleUpdateGoal(goal.id, "target", Number(e.target.value))}
                          className="w-16 sm:w-20 h-6 inline-block px-2 py-0 text-sm bg-zinc-800/70 border-zinc-700/50 text-white rounded-md"
                        />
                      ) : (
                        goal.target
                      )}{" "}
                      {goal.unit}
                    </span>
                  </div>
                  <div className="relative mt-2">
                    <div className="h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r ${getCategoryColor(goal.category)}`}
                      />
                    </div>
                    {progress >= 100 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              className="absolute -right-1 -top-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 10 }}
                            >
                              <Trophy className="h-5 w-5 text-amber-400" />
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Goal achieved!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-8 sm:py-12 text-center text-zinc-400 border border-dashed border-zinc-700/50 rounded-xl"
          >
            <Target className="h-12 w-12 sm:h-16 sm:w-16 mb-4 opacity-20" />
            <h3 className="text-lg font-medium mb-1 text-white">No Goals Set</h3>
            <p className="text-sm max-w-md px-4">
              Set fitness goals to track your progress and stay motivated on your fitness journey.
            </p>
            <div className="mt-4">
              <AddGoalModal onAddGoal={handleAddGoal} />
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

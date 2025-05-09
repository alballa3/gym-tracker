"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Award,
  Calendar,
  Clock,
  Dumbbell,
  HelpCircle,
  Layers,
  Plus,
  MonitorIcon as Running,
  Save,
  Scale,
  Target,
  TrendingUp,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"

type GoalType = "strength" | "cardio" | "body" | "habit" | "custom"
type GoalDifficulty = "easy" | "moderate" | "challenging" | "advanced"

interface GoalTemplate {
  id: string
  title: string
  type: GoalType
  description: string
  target: number
  unit: string
  timeframe: number // in days
  icon: React.ReactNode
}

const goalTemplates: GoalTemplate[] = [
  {
    id: "bench-press",
    title: "Bench Press PR",
    type: "strength",
    description: "Increase your bench press max weight",
    target: 100,
    unit: "kg",
    timeframe: 90,
    icon: <Dumbbell className="h-5 w-5" />,
  },
  {
    id: "5k-run",
    title: "5K Run Time",
    type: "cardio",
    description: "Improve your 5K running time",
    target: 25,
    unit: "min",
    timeframe: 60,
    icon: <Running className="h-5 w-5" />,
  },
  {
    id: "weight-loss",
    title: "Weight Loss",
    type: "body",
    description: "Reach your target body weight",
    target: 70,
    unit: "kg",
    timeframe: 120,
    icon: <Scale className="h-5 w-5" />,
  },
  {
    id: "workout-streak",
    title: "Workout Streak",
    type: "habit",
    description: "Maintain a consistent workout schedule",
    target: 30,
    unit: "days",
    timeframe: 30,
    icon: <Calendar className="h-5 w-5" />,
  },
]

interface AddGoalModalProps {
  onAddGoal: (goal: any) => void
}

export default function AddGoalModal({ onAddGoal }: AddGoalModalProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("create")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const [goalType, setGoalType] = useState<GoalType>("strength")
  const [goalTitle, setGoalTitle] = useState("")
  const [goalTarget, setGoalTarget] = useState(0)
  const [goalCurrent, setGoalCurrent] = useState(0)
  const [goalUnit, setGoalUnit] = useState("kg")
  const [goalDeadline, setGoalDeadline] = useState("")
  const [goalDifficulty, setGoalDifficulty] = useState<GoalDifficulty>("moderate")
  const [enableReminders, setEnableReminders] = useState(false)
  const [reminderFrequency, setReminderFrequency] = useState("weekly")
  const [isPublic, setIsPublic] = useState(false)

  // Calculate a suggested deadline based on goal difficulty and type
  useEffect(() => {
    const today = new Date()
    let daysToAdd = 30 // default

    // Adjust based on difficulty
    switch (goalDifficulty) {
      case "easy":
        daysToAdd = 30
        break
      case "moderate":
        daysToAdd = 60
        break
      case "challenging":
        daysToAdd = 90
        break
      case "advanced":
        daysToAdd = 120
        break
    }

    // Adjust based on type
    if (goalType === "body") daysToAdd *= 1.5 // Body composition changes take longer
    if (goalType === "habit") daysToAdd = 30 // Habits are typically 30 days to form

    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + daysToAdd)
    setGoalDeadline(futureDate.toISOString().split("T")[0])
  }, [goalDifficulty, goalType])

  // Apply template when selected
  useEffect(() => {
    if (selectedTemplate) {
      const template = goalTemplates.find((t) => t.id === selectedTemplate)
      if (template) {
        setGoalType(template.type)
        setGoalTitle(template.title)
        setGoalTarget(template.target)
        setGoalUnit(template.unit)

        // Set a deadline based on the template timeframe
        const today = new Date()
        const futureDate = new Date(today)
        futureDate.setDate(today.getDate() + template.timeframe)
        setGoalDeadline(futureDate.toISOString().split("T")[0])
      }
    }
  }, [selectedTemplate])

  const handleAddGoal = () => {
    if (!goalTitle || goalTarget === 0) return

    const newGoal = {
      id: Date.now().toString(),
      title: goalTitle,
      category: goalType,
      target: goalTarget,
      current: goalCurrent,
      unit: goalUnit,
      deadline: goalDeadline,
      difficulty: goalDifficulty,
      reminders: enableReminders ? reminderFrequency : null,
      isPublic,
      createdAt: new Date().toISOString(),
    }

    onAddGoal(newGoal)
    resetForm()
    setIsOpen(false)
  }

  const resetForm = () => {
    setGoalTitle("")
    setGoalType("strength")
    setGoalTarget(0)
    setGoalCurrent(0)
    setGoalUnit("kg")
    setGoalDeadline("")
    setGoalDifficulty("moderate")
    setEnableReminders(false)
    setReminderFrequency("weekly")
    setIsPublic(false)
    setSelectedTemplate(null)
    setActiveTab("create")
  }

  const getTypeIcon = (type: GoalType) => {
    switch (type) {
      case "strength":
        return <Dumbbell className="h-5 w-5" />
      case "cardio":
        return <Running className="h-5 w-5" />
      case "body":
        return <Scale className="h-5 w-5" />
      case "habit":
        return <Calendar className="h-5 w-5" />
      case "custom":
        return <Target className="h-5 w-5" />
    }
  }


  const getDifficultyLabel = (difficulty: GoalDifficulty) => {
    switch (difficulty) {
      case "easy":
        return "Easy"
      case "moderate":
        return "Moderate"
      case "challenging":
        return "Challenging"
      case "advanced":
        return "Advanced"
    }
  }

  const getUnitOptions = (type: GoalType) => {
    switch (type) {
      case "strength":
        return ["kg", "lbs", "reps"]
      case "cardio":
        return ["min", "km", "miles", "steps"]
      case "body":
        return ["kg", "lbs", "%", "cm", "in"]
      case "habit":
        return ["days", "sessions", "weeks"]
      case "custom":
        return ["kg", "lbs", "reps", "min", "km", "miles", "days", "sessions", "%", "points"]
    }
  }

  const calculateProgress = (current: number, target: number, type: GoalType) => {
    // For weight loss goals, reverse the calculation
    if (current > target && type === "body") {
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-none"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "bg-zinc-900/95 border-zinc-700/50 text-white backdrop-blur-xl",
          "max-w-3xl w-[95vw] p-0 overflow-hidden rounded-xl",
          isMobile ? "h-[90vh]" : "max-h-[85vh]",
        )}
      >
        <div className="relative">
          {/* Header with gradient bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>

          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
                Create New Goal
              </DialogTitle>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-8 w-8 absolute right-4 top-4 text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-zinc-400 text-sm mt-1">Set a new fitness goal to track your progress</p>
          </DialogHeader>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6">
              <TabsList className="w-full bg-zinc-800/50 p-1 rounded-lg">
                <TabsTrigger
                  value="create"
                  className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-md"
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Create Custom
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-md"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Use Template
                </TabsTrigger>
              </TabsList>
            </div>

            <div
              className="mt-4 overflow-y-auto"
              style={{ maxHeight: isMobile ? "calc(90vh - 180px)" : "calc(85vh - 180px)" }}
            >
              <TabsContent value="create" className="px-6 pb-6 space-y-6 mt-0">
                {/* Goal Type Selection */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-zinc-300">Goal Type</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            Select the type of goal you want to track. This will determine the available units and
                            tracking methods.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {(["strength", "cardio", "body", "habit", "custom"] as GoalType[]).map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        className={cn(
                          "flex flex-col items-center justify-center h-20 border-zinc-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all",
                          goalType === type && "border-blue-500 bg-blue-500/10 text-blue-400",
                        )}
                        onClick={() => setGoalType(type)}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                            goalType === type ? "bg-blue-500/20" : "bg-zinc-800",
                          )}
                        >
                          {getTypeIcon(type)}
                        </div>
                        <span className="text-xs capitalize">{type}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Goal Details */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-300">Goal Title</Label>
                    <Input
                      value={goalTitle}
                      onChange={(e) => setGoalTitle(e.target.value)}
                      placeholder="e.g., Bench Press PR, 5K Run Time"
                      className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">Current Value</Label>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          value={goalCurrent}
                          onChange={(e) => setGoalCurrent(Number(e.target.value))}
                          className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-l-lg rounded-r-none flex-1"
                        />
                        <Select value={goalUnit} onValueChange={setGoalUnit}>
                          <SelectTrigger className="w-20 bg-zinc-800/70 border-zinc-700/50 text-white rounded-l-none rounded-r-lg border-l-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                            {getUnitOptions(goalType).map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-zinc-300">Target Value</Label>
                      <div className="flex items-center">
                        <Input
                          type="number"
                          value={goalTarget}
                          onChange={(e) => setGoalTarget(Number(e.target.value))}
                          className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-l-lg rounded-r-none flex-1"
                        />
                        <div className="w-20 h-10 bg-zinc-800/70 border border-zinc-700/50 border-l-0 rounded-r-lg flex items-center justify-center text-zinc-300">
                          {goalUnit}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-zinc-300">Deadline</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={goalDeadline}
                        onChange={(e) => setGoalDeadline(e.target.value)}
                        className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-lg pl-10"
                      />
                      <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-zinc-300">Goal Difficulty</Label>
                      <span className="text-xs text-zinc-400">{getDifficultyLabel(goalDifficulty)}</span>
                    </div>
                    <div className="pt-2">
                      <Slider
                        defaultValue={[2]}
                        max={4}
                        min={1}
                        step={1}
                        onValueChange={(value) => {
                          const difficultyMap: Record<number, GoalDifficulty> = {
                            1: "easy",
                            2: "moderate",
                            3: "challenging",
                            4: "advanced",
                          }
                          setGoalDifficulty(difficultyMap[value[0]])
                        }}
                        className="w-full"
                      />
                      <div className="flex justify-between mt-1 text-xs text-zinc-500">
                        <span>Easy</span>
                        <span>Moderate</span>
                        <span>Challenging</span>
                        <span>Advanced</span>
                      </div>
                    </div>
                  </div>
                </div>

              
                {/* Goal Preview */}
                {goalTitle && goalTarget > 0 && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                      <Eye className="h-4 w-4 text-zinc-400" />
                      Goal Preview
                    </h3>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-zinc-800/50 rounded-xl p-4 bg-zinc-800/20 backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-lg">
                            {getTypeIcon(goalType)}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{goalTitle}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-xs text-zinc-400">
                                Deadline: {goalDeadline ? new Date(goalDeadline).toLocaleDateString() : "Not set"}
                              </p>
                              {goalDeadline && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                                  {getTimeRemaining(goalDeadline)} days
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span className="text-zinc-300 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-blue-400" />
                            Current: {goalCurrent} {goalUnit}
                          </span>
                          <span className="text-zinc-300 flex items-center gap-1">
                            <Target className="h-3 w-3 text-green-400" />
                            Target: {goalTarget} {goalUnit}
                          </span>
                        </div>
                        <div className="relative mt-1">
                          <div className="h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${Math.min(calculateProgress(goalCurrent, goalTarget, goalType), 100)}%`,
                              }}
                              transition={{ duration: 1 }}
                              className={`h-full bg-gradient-to-r from-blue-600 to-blue-400`}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="templates" className="px-6 pb-6 space-y-4 mt-0">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-300">Choose a Template</Label>
                  <p className="text-xs text-zinc-400">Select a pre-defined goal template to get started quickly</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {goalTemplates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ y: -5 }}
                      className={cn(
                        "border border-zinc-800/50 rounded-xl p-4 cursor-pointer transition-all",
                        selectedTemplate === template.id
                          ? "bg-blue-500/10 border-blue-500/50"
                          : "bg-zinc-800/20 hover:bg-zinc-800/30 hover:border-zinc-700",
                      )}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            selectedTemplate === template.id ? "bg-blue-500/20" : "bg-zinc-800/50",
                          )}
                        >
                          {template.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{template.title}</h3>
                          <p className="text-xs text-zinc-400 mt-0.5">{template.description}</p>

                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs bg-zinc-800/50 px-2 py-0.5 rounded-full text-zinc-300">
                              Target: {template.target} {template.unit}
                            </span>
                            <span className="text-xs bg-zinc-800/50 px-2 py-0.5 rounded-full text-zinc-300 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {template.timeframe} days
                            </span>
                          </div>
                        </div>

                        {selectedTemplate === template.id && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedTemplate && (
                  <div className="pt-4 space-y-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                        <Settings className="h-4 w-4 text-zinc-400" />
                        Customize Template
                      </h3>
                      <p className="text-xs text-zinc-400">Adjust the template to fit your specific needs</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-zinc-300">Goal Title</Label>
                        <Input
                          value={goalTitle}
                          onChange={(e) => setGoalTitle(e.target.value)}
                          className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-zinc-300">Current Value</Label>
                          <div className="flex items-center">
                            <Input
                              type="number"
                              value={goalCurrent}
                              onChange={(e) => setGoalCurrent(Number(e.target.value))}
                              className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-l-lg rounded-r-none flex-1"
                            />
                            <Select value={goalUnit} onValueChange={setGoalUnit}>
                              <SelectTrigger className="w-20 bg-zinc-800/70 border-zinc-700/50 text-white rounded-l-none rounded-r-lg border-l-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                {getUnitOptions(goalType).map((unit) => (
                                  <SelectItem key={unit} value={unit}>
                                    {unit}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-zinc-300">Target Value</Label>
                          <div className="flex items-center">
                            <Input
                              type="number"
                              value={goalTarget}
                              onChange={(e) => setGoalTarget(Number(e.target.value))}
                              className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-l-lg rounded-r-none flex-1"
                            />
                            <div className="w-20 h-10 bg-zinc-800/70 border border-zinc-700/50 border-l-0 rounded-r-lg flex items-center justify-center text-zinc-300">
                              {goalUnit}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-zinc-300">Deadline</Label>
                        <div className="relative">
                          <Input
                            type="date"
                            value={goalDeadline}
                            onChange={(e) => setGoalDeadline(e.target.value)}
                            className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 rounded-lg pl-10"
                          />
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>

          {/* Footer with actions */}
          <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/80 backdrop-blur-sm flex justify-end gap-2 sticky bottom-0">
            <Button
              variant="outline"
              className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800"
              onClick={() => {
                resetForm()
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-none"
              onClick={handleAddGoal}
              disabled={!goalTitle || goalTarget === 0}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Goal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

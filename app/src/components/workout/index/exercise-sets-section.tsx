"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronUp, ChevronDown, PlusCircle, CheckCircle2, Dumbbell, ArrowUp, TrendingUp, BarChart3, Timer, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import type { Set } from "@/types/workout"
import { ExerciseSetRow } from "../create/exercise-set-row"

interface ExerciseSetsProps {
  exerciseId: number
  sets: Set[]
  restTime: number
  isExpanded: boolean
  onToggleExpand: () => void
  onAddSet: () => void
  onRemoveSet: (setId: number) => void
  onUpdateSet: (setId: number, field: "weight" | "reps", value: number) => void
  onToggleSetCompletion: (setId: number) => void
  previousSessionMaxWeight?: number
  defaultRestTime?: number
}

export function ExerciseSetsSection({
  sets,
  isExpanded,
  onToggleExpand,
  onAddSet,
  onRemoveSet,
  onUpdateSet,
  onToggleSetCompletion,
  previousSessionMaxWeight,
  restTime,
}: ExerciseSetsProps) {
  // Rest timer state
  const [showRestTimer, setShowRestTimer] = useState(false)
  const [restTimeRemaining, setRestTimeRemaining] = useState(restTime)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [lastCompletedSetId, setLastCompletedSetId] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate completion stats
  const completedSets = sets.filter((set) => set.isCompleted).length
  const completionPercentage = sets.length > 0 ? (completedSets / sets.length) * 100 : 0
  const isAllCompleted = sets.length > 0 && completedSets === sets.length

  // Get current max weight and last set weight and reps
  const currentMaxWeight = sets.length > 0 ? Math.max(...sets.map(set => set.weight)) : 0
  const lastSet = sets.length > 0 ? sets[sets.length - 1] : null
  const lastCompletedSet = lastCompletedSetId ? sets.find(set => set.id === lastCompletedSetId) : null

  // Calculate weight improvement from previous session
  const [weightImprovement, setWeightImprovement] = useState<number | null>(null)
  const [improvementPercentage, setImprovementPercentage] = useState<number | null>(null)

  useEffect(() => {
    if (previousSessionMaxWeight && currentMaxWeight > 0) {
      const improvement = currentMaxWeight - previousSessionMaxWeight
      setWeightImprovement(improvement)
      setImprovementPercentage((improvement / previousSessionMaxWeight) * 100)
    }
  }, [currentMaxWeight, previousSessionMaxWeight])

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle rest timer
  const startRestTimer = (setId: number) => {
    setLastCompletedSetId(setId)
    setRestTimeRemaining(restTime)
    setShowRestTimer(true)
    setIsTimerRunning(true)
  }

  const toggleTimer = () => {
    setIsTimerRunning(prev => !prev)
  }

  const resetTimer = () => {
    setRestTimeRemaining(restTime)
    setIsTimerRunning(true)
  }

  const dismissTimer = () => {
    setShowRestTimer(false)
    setIsTimerRunning(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && showRestTimer) {
      timerRef.current = setInterval(() => {
        setRestTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            if (timerRef.current) clearInterval(timerRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isTimerRunning, showRestTimer])

  // Custom toggle set completion that triggers rest timer
  const handleToggleSetCompletion = (setId: number) => {
    const set = sets.find(s => s.id === setId)
    if (set && !set.isCompleted) {
      startRestTimer(setId)
    }
    onToggleSetCompletion(setId)
  }

  // Calculate total volume (weight × reps)
  const totalVolume = sets.reduce((total, set) => {
    return total + (set.weight * set.reps)
  }, 0)

  return (
    <TooltipProvider>
      <motion.div
        className="flex flex-col gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md border border-gray-800/50 shadow-lg relative"
        initial={{ opacity: 0.9, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Rest Timer Overlay */}
        <AnimatePresence>
          {showRestTimer && (
            <motion.div
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-md rounded-2xl z-10 flex flex-col items-center justify-center px-3 sm:px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Timer className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Rest Timer</h3>
                </div>

                <div className="w-32 h-32 sm:w-40 sm:h-40">
                  <CircularProgressbar
                    value={(restTimeRemaining / restTime) * 100}
                    text={formatTime(restTimeRemaining)}
                    styles={buildStyles({
                      textSize: '16px',
                      textColor: '#fff',
                      pathColor: restTimeRemaining > 0 ? '#06b6d4' : '#10b981',
                      trailColor: 'rgba(255, 255, 255, 0.1)',
                    })}
                  />
                </div>

                {lastCompletedSet && (
                  <div className="bg-gray-800/70 rounded-xl p-3 sm:p-4 w-full">
                    <h4 className="text-gray-400 text-xs sm:text-sm font-medium mb-2">Last Completed Set</h4>
                    <div className="flex justify-between text-white">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Dumbbell className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" />
                        <span className="font-semibold text-sm sm:text-base">{lastCompletedSet.weight} kg</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" />
                        <span className="font-semibold text-sm sm:text-base">{lastCompletedSet.reps} reps</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 sm:gap-3 w-full">
                  <Button
                    onClick={toggleTimer}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50"
                  >
                    {isTimerRunning ? (
                      <Pause className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    ) : (
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    )}
                  </Button>

                  <Button
                    onClick={resetTimer}
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50"
                  >
                    <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </Button>

                  <Button
                    onClick={dismissTimer}
                    variant="default"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-sm sm:text-base"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl font-semibold text-white">Sets</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-md shadow-cyan-500/20">
                {sets.length}
              </span>

              {/* Weight stats badges - Wrap in a scrollable container on mobile */}
              <div className="flex flex-nowrap overflow-x-auto max-w-[150px] sm:max-w-none gap-1.5 sm:gap-2 hide-scrollbar">
                {lastSet && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-cyan-100 bg-cyan-800/40 border border-cyan-600/30 rounded-full flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                        <Dumbbell className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {lastSet.weight}kg × {lastSet.reps}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Last set: {lastSet.weight}kg × {lastSet.reps} reps</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {currentMaxWeight > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-amber-100 bg-amber-800/30 border border-amber-600/30 rounded-full flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                        <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        {currentMaxWeight}kg
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Max weight this session</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {weightImprovement !== null && weightImprovement > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-green-100 bg-green-800/30 border border-green-600/30 rounded-full flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                        <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        +{weightImprovement}kg
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>+{improvementPercentage?.toFixed(1)}% from last session</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={onToggleExpand}
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-3 sm:px-4 text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all rounded-full text-xs sm:text-sm"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
            <span className="font-medium">{isExpanded ? "Collapse" : "Expand"}</span>
          </Button>
        </div>

        {/* Session stats */}
        {totalVolume > 0 && (
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm bg-gray-800/50 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-700/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400" />
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div>
                <span className="text-gray-400">Volume:</span>{" "}
                <span className="font-semibold text-white">{totalVolume.toLocaleString()} kg</span>
              </div>
              <div>
                <span className="text-gray-400">Sets:</span>{" "}
                <span className="font-semibold text-white">{completedSets}/{sets.length}</span>
              </div>
              {currentMaxWeight > 0 && (
                <div>
                  <span className="text-gray-400">Max:</span>{" "}
                  <span className="font-semibold text-white">{currentMaxWeight} kg</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Progress tracking */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-gray-400 font-medium">Progress</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {isAllCompleted ? (
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
              ) : (
                <div className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
              <span
                className={`font-semibold ${isAllCompleted
                  ? "text-green-400"
                  : "text-cyan-300"
                  }`}
              >
                {completedSets}/{sets.length} sets completed
              </span>
            </div>
          </div>
          <Progress
            value={completionPercentage}
            className={`h-2.5 sm:h-3 rounded-full transition-all duration-500 ${isAllCompleted
              ? "bg-green-950/30"
              : "bg-cyan-950/30"
              }`}
          />
        </div>

        <Collapsible open={isExpanded} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-12 gap-2 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <div className="col-span-1">#</div>
            <div className="col-span-4 sm:col-span-3">Weight (kg)</div>
            <div className="col-span-4 sm:col-span-3">Reps</div>
            <div className="col-span-3 sm:col-span-5"></div>
          </div>

          <CollapsibleContent className="space-y-2 sm:space-y-3">
            <AnimatePresence initial={false}>
              {sets.map((set, setIndex) => (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExerciseSetRow
                    setIndex={setIndex}
                    weight={set.weight == 0 ? 1 : set.weight}
                    reps={set.reps}
                    isCompleted={set.isCompleted}
                    onWeightChange={(value) => onUpdateSet(set.id, "weight", value)}
                    onRepsChange={(value) => onUpdateSet(set.id, "reps", value)}
                    onRemove={() => onRemoveSet(set.id)}
                    onComplete={() => handleToggleSetCompletion(set.id)}
                    canRemove={sets.length > 1}
                  // isMaxWeight={set.weight === currentMaxWeight && currentMaxWeight > 0}
                  // isLastSet={setIndex === sets.length - 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <motion.div
              className="flex justify-center pt-2 sm:pt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={onAddSet}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-xl transition-all shadow-sm shadow-cyan-500/10"
              >
                <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                Add Set
              </Button>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </motion.div>
    </TooltipProvider>
  )
}
"use client"

import { useState } from "react"
import { MinusCircle, CheckCircle, Circle, ChevronUp, ChevronDown, Medal, Timer, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

interface ExerciseSetRowProps {
  setIndex: number
  weight: number
  reps: number
  isCompleted?: boolean
  onWeightChange: (value: number) => void
  onRepsChange: (value: number) => void
  onRemove: () => void
  onComplete: () => void
  canRemove: boolean
  isMaxWeight?: boolean
  isLastSet?: boolean
  prevSetWeight?: number
  prevSetReps?: number
}

export function ExerciseSetRow({
  setIndex,
  weight,
  reps,
  isCompleted = false,
  onWeightChange,
  onRepsChange,
  onRemove,
  onComplete,
  canRemove,
  isMaxWeight = false,
  isLastSet = false,
  prevSetWeight,
  prevSetReps,
}: ExerciseSetRowProps) {
  const [hasFocus, setHasFocus] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Calculate if this set is an improvement over the previous one
  const weightChange = prevSetWeight ? weight - prevSetWeight : 0
  const repsChange = prevSetReps ? reps - prevSetReps : 0
  const isImprovement = weightChange > 0 || repsChange > 0

  // Calculate volume (weight × reps)
  const volume = weight * reps

  return (
    <TooltipProvider>
      <motion.div
        className={`grid grid-cols-12 gap-1.5 sm:gap-2 rounded-xl p-2 sm:p-3 items-center border transition-all duration-300 relative ${isCompleted
          ? "bg-gradient-to-r from-green-800/30 to-green-700/20 border-green-500/30 shadow-sm shadow-green-500/10"
          : hasFocus
            ? "bg-gradient-to-r from-cyan-800/30 to-blue-700/20 border-cyan-500/30 shadow-sm shadow-cyan-500/10"
            : isHovering
              ? "bg-gradient-to-r from-indigo-700/30 to-blue-600/20 border-indigo-500/30"
              : "bg-gradient-to-r from-gray-800/50 to-gray-800/30 border-gray-700/30"
          }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Set number badge */}
        <div className="col-span-1 flex justify-center">
          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-medium text-xs
            ${isCompleted
              ? "bg-green-500/30 text-green-300"
              : "bg-cyan-800/30 text-cyan-300"
            }`}
          >
            {setIndex + 1}
          </div>
        </div>

        {/* Weight input field */}
        <div className="col-span-4 sm:col-span-3">
          <div className="relative flex items-center group">
            <Input
              type="number"
              inputMode="decimal"
              value={weight === 1 ? '' : weight}
              onChange={(e) => {
                onWeightChange(Number(e.target.value))
              }}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              step="0.5"
              min="0"
              placeholder={weight.toLocaleString()}
              className="bg-gray-800/70 border-gray-700/50 focus:border-cyan-500/80 text-white h-8 sm:h-10 pl-6 sm:pl-7 pr-5 sm:pr-6 text-sm rounded-lg transition-all"
            />
            <span className="absolute left-2 sm:left-2.5 text-cyan-400 text-xs font-medium">kg</span>

            {/* Weight change indicators */}
            {prevSetWeight && (
              <AnimatePresence>
                {weightChange !== 0 && (
                  <motion.div
                    className={`absolute right-1.5 sm:right-2 flex items-center gap-0.5 text-xs font-medium ${
                      weightChange > 0 ? "text-green-400" : "text-amber-400"
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {weightChange > 0 ? (
                      <>
                        +{weightChange.toFixed(2)}
                        <ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </>
                    ) : (
                      <>
                        {weightChange.toFixed(2)}
                        <ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Reps input field */}
        <div className="col-span-4 sm:col-span-3">
          <div className="relative flex items-center">
            <Input
              type="number"
              inputMode="numeric"
              value={reps.toString() == '0' ? '' : reps}
              onChange={(e) => onRepsChange(Number(e.target.value))}
              onFocus={() => setHasFocus(true)}
              onBlur={() => setHasFocus(false)}
              className="bg-gray-800/70 border-gray-700/50 focus:border-cyan-500/80 text-white h-8 sm:h-10 pl-6 sm:pl-7 pr-5 sm:pr-6 text-sm rounded-lg transition-all"
            />
            {/* <span className="absolute left-2 sm:left-2.5 text-cyan-400 text-xs font-medium">reps</span> */}

            {/* Reps change indicators */}
            {prevSetReps && (
              <AnimatePresence>
                {repsChange !== 0 && (
                  <motion.div
                    className={`absolute right-1.5 sm:right-2 flex items-center gap-0.5 text-xs font-medium
                      ${repsChange > 0 ? "text-green-400" : "text-amber-400"}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {repsChange > 0 ? (
                      <>+{repsChange}<ChevronUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /></>
                    ) : (
                      <>{repsChange}<ChevronDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" /></>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Action buttons and indicators */}
        <div className="col-span-3 sm:col-span-5 flex justify-end gap-1 sm:gap-1.5 items-center">
          {/* Set volume - Hide on very small screens */}
          <div className="hidden xs:flex">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs font-medium text-gray-400 bg-gray-800/70 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-0.5 sm:gap-1 mr-0.5 sm:mr-1">
                  <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-400" />
                  {volume}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Set Volume (weight × reps)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Set badges - Conditionally show based on screen size */}
          <div className="hidden xs:flex gap-1 mr-0.5 sm:mr-1">
            {/* Max weight badge */}
            {isMaxWeight && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Medal className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Max Weight</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Last set badge */}
            {isLastSet && !isMaxWeight && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Timer className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Latest Set</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Complete button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onComplete}
            className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full ${isCompleted
              ? "bg-green-500/20 text-green-400 hover:text-green-300 hover:bg-green-500/30"
              : "bg-gray-800/70 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20"
              }`}
          >
            {isCompleted ? <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Circle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          </Button>

          {/* Remove button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
            disabled={!canRemove}
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gray-800/70 text-gray-400 hover:text-red-400 hover:bg-red-500/20 disabled:opacity-30"
          >
            <MinusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Improvement indicator */}
        {isImprovement && !isCompleted && (
          <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-2/3 bg-gradient-to-b from-green-500 to-green-400 rounded-r-full" />
        )}
      </motion.div>
    </TooltipProvider>
  )
}
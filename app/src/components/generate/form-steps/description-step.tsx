"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Brain, ChevronRight, Clock, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface DescriptionStepProps {
  description: string
  setDescription: (value: string) => void
  duration: number
  setDuration: (value: number) => void
  onNext: () => void
}

export function DescriptionStep({ description, setDescription, duration, setDuration, onNext }: DescriptionStepProps) {
  const [charCount, setCharCount] = useState(0)

  // Update character count
  useEffect(() => {
    setCharCount(description.length)
  }, [description])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center gap-2 text-violet-300">
          <div className="p-2 bg-violet-500/10 rounded-lg">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-lg">Describe Your Ideal Workout</h3>
          <Badge variant="outline" className="text-xs font-normal bg-zinc-800/50 text-zinc-400 border-zinc-700">
            Optional
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-zinc-500 hover:text-zinc-400 transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Describe your workout goals, preferences, and any specific focus areas. The more details you provide,
                  the better your workout will be. This field is optional, but recommended for personalized results.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you want in your workout... (e.g., 'A challenging upper body workout focusing on chest and shoulders with dumbbells only')"
            className="w-full h-36 p-4 bg-zinc-800/40 border border-zinc-700/50 rounded-xl text-zinc-200 placeholder-zinc-500 focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/30 transition-all duration-200"
          ></textarea>
          <div className={`absolute bottom-3 right-3 text-xs ${charCount > 0 ? "text-zinc-400" : "text-zinc-600"}`}>
            {charCount} characters
          </div>
        </div>

        {description.trim().length > 0 && description.trim().length < 10 && (
          <p className="text-amber-400 text-sm flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            Consider providing a more detailed description for better results
          </p>
        )}
      </motion.div>

      {/* Duration */}
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-300">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-lg">Workout Duration</h3>
          <Badge variant="outline" className="text-xs font-normal bg-zinc-800/50 text-zinc-400 border-zinc-700">
            Optional
          </Badge>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={duration}
              onChange={(e) => setDuration(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-700/50 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500">Quick</span>
              <span className="text-sm text-zinc-400">15 min</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-cyan-300">{duration} minutes</span>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-6 mx-0.5 rounded-full ${
                      duration >= 15 + i * 25 ? "bg-gradient-to-t from-cyan-500 to-blue-500" : "bg-zinc-700"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500">Extended</span>
              <span className="text-sm text-zinc-400">120 min</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="flex justify-between mt-8">
        <p className="text-zinc-400 text-sm italic">
          All fields are optional. You can proceed without filling them.
        </p>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 shadow-violet-900/20"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info, Sparkles, Brain } from "lucide-react"

export function AIExplanationModal() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Info className="h-4 w-4 mr-1" />
          How it works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
            AI Workout Generation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="bg-purple-900/30 p-2 rounded-full">
              <Brain className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">Smart Analysis</h3>
              <p className="text-sm text-gray-400">
                Our AI analyzes your workout history, progress, and preferences to create personalized workout plans.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-900/30 p-2 rounded-full">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">Progressive Overload</h3>
              <p className="text-sm text-gray-400">
                The AI ensures your workouts follow progressive overload principles, gradually increasing intensity for
                optimal results.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-900/30 p-2 rounded-full">
              <Info className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">Exercise Selection</h3>
              <p className="text-sm text-gray-400">
                Exercises are selected based on your goals, available equipment, and target muscle groups to create
                balanced, effective workouts.
              </p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Note: The AI workout generator uses your previous workout data to optimize your training. Make sure to log
            your workouts regularly for the best results.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

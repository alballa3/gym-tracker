import type React from "react"
import { AIExplanationModal } from "@/components/generate/ai-explanation-modal"
import { WorkoutHistoryInsights } from "@/components/generate/workout-history-insights"

export default function GenerateWorkoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="absolute top-4 right-4 z-10">
        <AIExplanationModal />
      </div>
      {children}
      <div className="fixed bottom-20 right-4 w-80 hidden lg:block">
        <WorkoutHistoryInsights />
      </div>
    </div>
  )
}

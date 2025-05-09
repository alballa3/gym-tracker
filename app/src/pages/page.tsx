"use client"

import { useState, useCallback } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { cn } from "@/lib/utils"
import { WorkoutGeneratorForm } from "@/components/generate/workout-generator-form"
import { GeneratedWorkoutPreview } from "@/components/generate/generated-workout-preview"
import { generateWorkoutBasedOnInputs } from "@/lib/workout-generator"
import type { Equipment, GeneratedWorkout, MuscleGroup } from "@/types/workout"

export default function GenerateWorkoutPage() {
  const [activeTab, setActiveTab] = useState<"customize" | "generated">("customize")
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"enter" | "exit">("enter")
  const [visibleTab, setVisibleTab] = useState<"customize" | "generated">("customize")
  const [generatedWorkout, setGeneratedWorkout] = useState<GeneratedWorkout | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [showContinueButton, setShowContinueButton] = useState(false)

  const handleTabChange = useCallback(
    (tab: "customize" | "generated") => {
      if (tab === activeTab || isAnimating) return

      setIsAnimating(true)
      setDirection("exit")

      // After exit animation completes, change the visible content and start enter animation
      setTimeout(() => {
        setVisibleTab(tab)
        setActiveTab(tab)
        setDirection("enter")

        // Animation complete
        setTimeout(() => {
          setIsAnimating(false)
        }, 300) // Match this with the CSS transition duration
      }, 300) // Match this with the CSS transition duration
    },
    [activeTab, isAnimating],
  )

  const generateWorkout = useCallback(
    async (
      description: string,
      _duration: number,
      selectedEquipment: Equipment[],
      selectedMuscleGroups: MuscleGroup[],
    ) => {
      setIsGenerating(true)
      setGenerationProgress(0)
      setGenerationStep("Analyzing your preferences...")
      setGenerationError(null)

      try {
        // // Simulate AI processing with progress updates
        setGenerationProgress(15)
        setGenerationStep("Selecting optimal exercises...")

        setGenerationProgress(35)
        setGenerationStep("Calculating sets and reps...")

        setGenerationProgress(60)
        setGenerationStep("Optimizing workout structure...")

        setGenerationProgress(85)

        setGenerationProgress(100)
        setGenerationStep("Workout generated successfully!")

        // Generate workout based on inputs
        const workout =await generateWorkoutBasedOnInputs(description,  selectedEquipment, selectedMuscleGroups)
        setGeneratedWorkout(workout as unknown as GeneratedWorkout)

        // Wait for progress bar to complete

        // Show continue button
        setShowContinueButton(true)
      } catch (error) {
        console.error("Error generating workout:", error)
        setGenerationError("Failed to generate workout. Please try again.")
        setIsGenerating(false)
      }
    },
    [],
  )

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0a0a18] via-[#141428] to-[#0a0a18] text-zinc-100 overflow-x-hidden">
      {/* Animated background elements */}

      <AppHeader />

      <main className="flex-1 p-4 md:p-6 pb-20 relative z-10">
        {/* Animated background elements - positioned to cover the entire page */}
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full filter blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-[20%] w-[700px] h-[700px] bg-blue-600/10 rounded-full filter blur-[120px] animate-pulse-slow animation-delay-1000"></div>
          <div className="absolute top-[30%] right-[5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full filter blur-[120px] animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-violet-600/10 rounded-full filter blur-[120px] animate-pulse-slow animation-delay-3000"></div>
        </div>

        <div className="mx-auto max-w-5xl relative z-10">
          <div className="mb-6 md:mb-8 flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Workout Generator
            </h1>
            <p className="text-zinc-400 md:text-lg">Describe your preferences for a personalized workout plan</p>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-zinc-800/50 relative">
              <button
                onClick={() => handleTabChange("customize")}
                className={cn(
                  "px-4 py-3 font-medium text-sm md:text-base transition-all duration-300 relative",
                  activeTab === "customize" ? "text-violet-300" : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                Customize Workout
                {activeTab === "customize" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => handleTabChange("generated")}
                disabled={!generatedWorkout}
                className={cn(
                  "px-4 py-3 font-medium text-sm md:text-base transition-all duration-300 relative",
                  !generatedWorkout && "opacity-50 cursor-not-allowed",
                  activeTab === "generated" ? "text-blue-300" : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                Generated Workout
                {activeTab === "generated" && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></span>
                )}
              </button>
            </div>
          </div>

          <div className="relative min-h-[600px]">
            <div
              className={cn(
                "absolute w-full transition-all duration-300 ease-in-out",
                direction === "enter" ? "opacity-100 transform translate-x-0" : "opacity-0 transform translate-x-8",
                visibleTab === "customize" ? "block" : "hidden",
              )}
            >
              <WorkoutGeneratorForm
                onGenerate={generateWorkout}
                isGenerating={isGenerating}
                generationProgress={generationProgress}
                generationStep={generationStep}
                generationError={generationError}
                showContinueButton={showContinueButton}
                onContinue={() => handleTabChange("generated")}
              />
            </div>

            <div
              className={cn(
                "absolute w-full transition-all duration-300 ease-in-out",
                direction === "enter" ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-8",
                visibleTab === "generated" ? "block" : "hidden",
              )}
            >
              {generatedWorkout && (
                <GeneratedWorkoutPreview
                  workout={generatedWorkout}
                  onBack={() => handleTabChange("customize")}
                  onRegenerate={() => {
                    handleTabChange("customize")
                    // Wait for animation to complete before focusing
                    setTimeout(() => {
                      const textarea = document.querySelector("textarea")
                      if (textarea) textarea.focus()
                    }, 600)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      
    </div>
  )
}

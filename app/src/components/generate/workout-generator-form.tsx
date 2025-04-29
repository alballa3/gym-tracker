"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { DescriptionStep } from "./form-steps/description-step"
import { EquipmentStep } from "./form-steps/equipment-step"
import { MuscleGroupStep } from "./form-steps/muscle-group-step"
import { GenerationProgress } from "./generation-progress"
import { StepIndicator } from "./step-indicator"
import type { Equipment, MuscleGroup } from "@/types/workout"

interface WorkoutGeneratorFormProps {
  onGenerate: (description: string, duration: number, equipment: Equipment[], muscleGroups: MuscleGroup[]) => void
  isGenerating: boolean
  generationProgress: number
  generationStep: string
  generationError: string | null
  showContinueButton: boolean
  onContinue: () => void
}

export function WorkoutGeneratorForm({
  onGenerate,
  isGenerating,
  generationProgress,
  generationStep,
  generationError,
  showContinueButton,
  onContinue,
}: WorkoutGeneratorFormProps) {
  const [duration, setDuration] = useState(45)
  const [description, setDescription] = useState("")
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<MuscleGroup[]>([])
  const [customEquipment, setCustomEquipment] = useState("")
  const [formStep, setFormStep] = useState(1)
  const formRef = useRef<HTMLDivElement>(null)

  const toggleEquipment = (equipment: Equipment) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment) ? prev.filter((e) => e !== equipment) : [...prev, equipment],
    )
  }

  const toggleMuscleGroup = (muscleGroup: MuscleGroup) => {
    setSelectedMuscleGroups((prev) =>
      prev.includes(muscleGroup) ? prev.filter((m) => m !== muscleGroup) : [...prev, muscleGroup],
    )
  }

  const handleGenerate = () => {
    // Add custom equipment if provided
    const equipment = [...selectedEquipment]
    if (customEquipment.trim()) {
      // In a real app, you'd validate this against allowed types
      equipment.push(customEquipment as Equipment)
    }

    onGenerate(description, duration, equipment, selectedMuscleGroups)
  }

  const nextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1)
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      handleGenerate()
    }
  }

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1)
      // Scroll to top of form
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <Card
      className="p-6 md:p-8 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border-zinc-800/40 shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm relative"
      ref={formRef}
    >
      {isGenerating ? (
        <GenerationProgress
          generationProgress={generationProgress}
          generationStep={generationStep}
          generationError={generationError}
          showContinueButton={showContinueButton}
          onContinue={onContinue}
        />
      ) : (
        <div className="space-y-8">
          {/* Progress indicator */}
          <StepIndicator currentStep={formStep} totalSteps={3} />

          {/* Step 1: Description */}
          {formStep === 1 && (
            <DescriptionStep
              description={description}
              setDescription={setDescription}
              duration={duration}
              setDuration={setDuration}
              onNext={nextStep}
            />
          )}

          {/* Step 2: Equipment */}
          {formStep === 2 && (
            <EquipmentStep
              selectedEquipment={selectedEquipment}
              toggleEquipment={toggleEquipment}
              customEquipment={customEquipment}
              setCustomEquipment={setCustomEquipment}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {/* Step 3: Target Muscle Groups */}
          {formStep === 3 && (
            <MuscleGroupStep
              selectedMuscleGroups={selectedMuscleGroups}
              toggleMuscleGroup={toggleMuscleGroup}
              onGenerate={handleGenerate}
              onPrev={prevStep}
              isGenerating={isGenerating}
            />
          )}
        </div>
      )}
    </Card>
  )
}

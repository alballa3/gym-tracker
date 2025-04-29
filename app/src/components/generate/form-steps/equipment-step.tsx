"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Dumbbell, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Equipment } from "@/types/workout"

interface EquipmentStepProps {
  selectedEquipment: Equipment[]
  toggleEquipment: (equipment: Equipment) => void
  customEquipment: string
  setCustomEquipment: (value: string) => void
  onNext: () => void
  onPrev: () => void
}

export function EquipmentStep({
  selectedEquipment,
  toggleEquipment,
  customEquipment,
  setCustomEquipment,
  onNext,
  onPrev,
}: EquipmentStepProps) {
  const equipmentOptions: Equipment[] = [
    "Full Gym",
    "Home Gym",
    "Dumbbells Only",
    "Bodyweight",
    "Resistance Bands",
    "Kettlebells",
    "Cables",
    "Machines",
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-300">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Dumbbell className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-lg">Available Equipment</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {equipmentOptions.map((equipment) => (
            <motion.div
              key={equipment}
              variants={item}
              onClick={() => toggleEquipment(equipment)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 border",
                selectedEquipment.includes(equipment)
                  ? "bg-emerald-900/30 border-emerald-700/50 text-emerald-200 shadow-md shadow-emerald-900/10"
                  : "bg-zinc-800/40 border-zinc-700/30 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-700/50",
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                  selectedEquipment.includes(equipment) ? "border-emerald-400 bg-emerald-500" : "border-zinc-600",
                )}
              >
                {selectedEquipment.includes(equipment) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="h-3 w-3 text-zinc-900" />
                  </motion.div>
                )}
              </div>
              <span className="text-sm">{equipment}</span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item}>
          <div className="relative mt-4">
            <input
              type="text"
              value={customEquipment}
              onChange={(e) => setCustomEquipment(e.target.value)}
              placeholder="Other equipment you have access to..."
              className="w-full p-3 bg-zinc-800/40 border border-zinc-700/50 rounded-xl text-zinc-200 placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all duration-200"
            />
            {customEquipment.length > 0 && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-400">
                <Info className="h-4 w-4" />
              </div>
            )}
          </div>

          {customEquipment.length > 0 && (
            <p className="text-xs text-zinc-500 mt-2 ml-1">
              Custom equipment will be considered when generating your workout
            </p>
          )}
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="flex justify-between mt-8">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 font-medium py-2.5 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium py-2.5 px-6 rounded-xl shadow-lg shadow-violet-900/20 transition-all duration-300 flex items-center gap-2"
        >
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

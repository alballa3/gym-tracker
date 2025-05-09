"use client"

import { motion } from "framer-motion"
import { Ruler, Weight, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StepTwoProps {
  userData: {
    height: string
    heightUnit: string
    weight: string
    weightUnit: string
  }
  updateUserData: (data: Partial<StepTwoProps["userData"]>) => void
  onNext: () => void
  onPrev: () => void
}

export default function StepTwo({ userData, updateUserData, onNext, onPrev }: StepTwoProps) {
  const handleNext = () => {
    // Basic validation
    if (!userData.height || !userData.weight) {
      alert("Please enter both height and weight")
      return
    }
    onNext()
  }

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center flex flex-col h-full">
      <motion.h2
        className="text-xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Physical Info
      </motion.h2>

      <motion.p
        className="text-sm text-gray-300 mb-4 sm:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Help us personalize your fitness journey
      </motion.p>

    
      <motion.div
        className="space-y-4 sm:space-y-6 mb-4 sm:mb-6 flex-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="bg-blue-900/30 p-2 rounded-full mr-2 sm:mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
              <Ruler className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <label htmlFor="height" className="text-white font-medium text-base sm:text-lg">
              Height
            </label>
          </div>
          <div className="flex space-x-2 sm:space-x-3">
            <div className="relative flex-1">
              <input
                id="height"
                type="number"
                inputMode="decimal"
                value={userData.height}
                onChange={(e) => updateUserData({ height: e.target.value })}
                placeholder="Enter your height"
                className="w-full bg-gray-900/70 border border-blue-500/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <Select 
              value={userData.heightUnit} 
              onValueChange={(value) => updateUserData({ heightUnit: value })}
              defaultValue="cm"
            >
              <SelectTrigger 
                className="w-20 sm:w-28 bg-gray-900/70 border border-blue-500/20 text-white h-[42px] sm:h-[50px] 
                hover:bg-gray-800/70 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/10
                focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60
                transition-all duration-300 ease-in-out"
              >
                <SelectValue placeholder="Unit" className="font-medium" />
              </SelectTrigger>
              <SelectContent 
                className="bg-gray-900/95 backdrop-blur-lg border border-blue-500/20 
                shadow-lg shadow-blue-500/10 animate-in fade-in-0 zoom-in-95"
              >
                <SelectItem 
                  value="cm" 
                  className="text-white hover:bg-blue-900/30 focus:bg-blue-900/40 
                  data-[state=checked]:bg-blue-900/50 data-[state=checked]:text-blue-200
                  transition-colors duration-200"
                >
                  cm
                </SelectItem>
                <SelectItem 
                  value="ft" 
                  className="text-white hover:bg-blue-900/30 focus:bg-blue-900/40
                  data-[state=checked]:bg-blue-900/50 data-[state=checked]:text-blue-200
                  transition-colors duration-200"
                >
                  ft
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
          whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="bg-blue-900/30 p-2 rounded-full mr-2 sm:mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
              <Weight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <label htmlFor="weight" className="text-white font-medium text-base sm:text-lg">
              Weight
            </label>
          </div>
          <div className="flex space-x-2 sm:space-x-3">
            <div className="relative flex-1">
              <input
                id="weight"
                type="number"
                inputMode="decimal"
                value={userData.weight}
                onChange={(e) => updateUserData({ weight: e.target.value })}
                placeholder="Enter your weight"
                className="w-full bg-gray-900/70 border border-blue-500/20 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500/50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <Select 
              value={userData.weightUnit} 
              onValueChange={(value) => updateUserData({ weightUnit: value })}
              defaultValue="kg"
            >
              <SelectTrigger 
                className="w-20 sm:w-28 bg-gray-900/70 border border-blue-500/20 text-white h-[42px] sm:h-[50px] 
                hover:bg-gray-800/70 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/10
                focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60
                transition-all duration-300 ease-in-out"
              >
                <SelectValue placeholder="Unit" className="font-medium" />
              </SelectTrigger>
              <SelectContent 
                className="bg-gray-900/95 backdrop-blur-lg border border-blue-500/20 
                shadow-lg shadow-blue-500/10 animate-in fade-in-0 zoom-in-95"
              >
                <SelectItem 
                  value="kg" 
                  className="text-white hover:bg-blue-900/30 focus:bg-blue-900/40 
                  data-[state=checked]:bg-blue-900/50 data-[state=checked]:text-blue-200
                  transition-colors duration-200"
                >
                  kg
                </SelectItem>
                <SelectItem 
                  value="lbs" 
                  className="text-white hover:bg-blue-900/30 focus:bg-blue-900/40
                  data-[state=checked]:bg-blue-900/50 data-[state=checked]:text-blue-200
                  transition-colors duration-200"
                >
                  lbs
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex space-x-3 mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={onPrev}
          variant="outline"
          className="flex-1 border-blue-500/20 text-white hover:bg-blue-900/20 hover:border-blue-500/40 py-2.5 sm:py-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-2.5 sm:py-3 shadow-lg shadow-blue-500/20 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center">
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

          {/* Mobile tap effect */}
          <motion.span
            className="absolute inset-0 bg-white rounded-lg pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Button>
      </motion.div>
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Calendar, Activity, Target, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useRef } from "react"

interface StepThreeProps {
  userData: {
    day: string
    month: string
    year: string
    gender: string
    fitnessGoal: string
    activityLevel: string
  }
  updateUserData: (data: Partial<StepThreeProps["userData"]>) => void
  onNext: () => void
  onPrev: () => void
}

export default function StepThree({ userData, updateUserData, onNext, onPrev }: StepThreeProps) {
  const [, setActiveField] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate arrays for day, month, and year options
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString())
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString())

  const fitnessGoals = [
    "Weight Loss",
    "Muscle Gain",
    "Endurance",
    "Strength",
    "General Fitness",
    "Athletic Performance",
  ]

  const activityLevels = [
    "Sedentary (little to no exercise)",
    "Light (exercise 1-3 days/week)",
    "Moderate (exercise 3-5 days/week)",
    "Active (exercise 6-7 days/week)",
    "Very Active (intense exercise daily)",
  ]

  const handleNext = () => {
    // Basic validation
    if (
      !userData.day ||
      !userData.month ||
      !userData.year ||
      !userData.gender ||
      !userData.fitnessGoal ||
      !userData.activityLevel
    ) {
      alert("Please complete all fields")
      return
    }
    onNext()
  }

  // Simplified animation variants to reduce layout shifts
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center flex flex-col h-full"
      ref={containerRef}
    >
      <motion.h2
        className="text-xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Your Fitness Profile
      </motion.h2>

      <motion.p
        className="text-sm text-gray-300 mb-4 sm:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        Help us personalize your workout experience
      </motion.p>

      <motion.div
        className="space-y-4 sm:space-y-6 mb-4 sm:mb-6 flex-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Date of Birth Field */}
        <motion.div
          variants={item}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onMouseEnter={() => setActiveField("dob")}
          onMouseLeave={() => setActiveField(null)}
          layout
        >
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="bg-blue-900/30 p-2 rounded-full mr-2 sm:mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <label className="text-white font-medium text-base sm:text-lg">Date of Birth</label>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Day Select */}
            <div className="flex-1 min-w-[80px]">
              <Select 
                value={userData.day} 
                onValueChange={(value) => updateUserData({ day: value })}
              >
                <SelectTrigger 
                  className="bg-gray-900/70 border border-blue-500/20 text-white h-[42px] sm:h-[50px] 
                    hover:bg-gray-800/90 hover:border-blue-500/40 transition-all duration-300
                    focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                >
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-gray-900/95 border border-blue-500/30 backdrop-blur-lg">
                  {days.map((day) => (
                    <SelectItem 
                      key={day} 
                      value={day}
                      className="text-white hover:bg-blue-600/20 focus:bg-blue-600/30 
                        cursor-pointer transition-colors duration-200"
                    >
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Month Select */}
            <div className="flex-[2] min-w-[120px]">
              <Select 
                value={userData.month} 
                onValueChange={(value) => updateUserData({ month: value })}
              >
                <SelectTrigger 
                  className="bg-gray-900/70 border border-blue-500/20 text-white h-[42px] sm:h-[50px]
                    hover:bg-gray-800/90 hover:border-blue-500/40 transition-all duration-300
                    focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                >
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-gray-900/95 border border-blue-500/30 backdrop-blur-lg">
                  {months.map((month, index) => (
                    <SelectItem 
                      key={month} 
                      value={(index + 1).toString()}
                      className="text-white hover:bg-blue-600/20 focus:bg-blue-600/30 
                        cursor-pointer transition-colors duration-200"
                    >
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year Select */}
            <div className="flex-1 min-w-[90px]">
              <Select 
                value={userData.year} 
                onValueChange={(value) => updateUserData({ year: value })}
              >
                <SelectTrigger 
                  className="bg-gray-900/70 border border-blue-500/20 text-white h-[42px] sm:h-[50px]
                    hover:bg-gray-800/90 hover:border-blue-500/40 transition-all duration-300
                    focus:ring-2 focus:ring-blue-500/40 focus:outline-none"
                >
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-gray-900/95 border border-blue-500/30 backdrop-blur-lg">
                  {years.map((year) => (
                    <SelectItem 
                      key={year} 
                      value={year}
                      className="text-white hover:bg-blue-600/20 focus:bg-blue-600/30 
                        cursor-pointer transition-colors duration-200"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Gender Field */}
        <motion.div
          variants={item}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onMouseEnter={() => setActiveField("gender")}
          onMouseLeave={() => setActiveField(null)}
          layout
        >
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="bg-blue-900/30 p-2 rounded-full mr-2 sm:mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
              </svg>
            </div>
            <label className="text-white font-medium text-base sm:text-lg">Gender</label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
            {["Male", "Female"].map((gender) => (
              <motion.button
                key={gender}
                type="button"
                onClick={() => updateUserData({ gender })}
                className={`py-2 px-3 rounded-lg border transition-all duration-300 ${
                  userData.gender === gender
                    ? "bg-blue-600/30 border-blue-500 text-white"
                    : "bg-gray-900/70 border-blue-500/20 text-gray-300 hover:border-blue-500/40"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                {gender}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Fitness Goal Field */}
        <motion.div
          variants={item}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onMouseEnter={() => setActiveField("goal")}
          onMouseLeave={() => setActiveField(null)}
          layout
        >
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="bg-blue-900/30 p-2 rounded-full mr-2 sm:mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <label className="text-white font-medium text-base sm:text-lg">Fitness Goal</label>
          </div>

          <Select value={userData.fitnessGoal} onValueChange={(value) => updateUserData({ fitnessGoal: value })}>
            <SelectTrigger className="bg-gray-900/70 border border-blue-500/20 text-white h-[42px] sm:h-[50px] hover:bg-gray-800/90 transition-colors duration-300">
              <SelectValue placeholder="Select your primary fitness goal" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-blue-500/20">
              {fitnessGoals.map((goal) => (
                <SelectItem 
                  key={goal} 
                  value={goal}
                  className="text-white hover:bg-blue-600/20 focus:bg-blue-600/30 cursor-pointer transition-colors duration-200"
                >
                  {goal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Activity Level Field */}
        <motion.div
          variants={item}
          className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          onMouseEnter={() => setActiveField("activity")}
          onMouseLeave={() => setActiveField(null)}
          layout
        >
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="bg-blue-900/30 p-2 rounded-full mr-2 sm:mr-3 group-hover:bg-blue-800/40 transition-colors duration-300">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            </div>
            <label className="text-white font-medium text-base sm:text-lg">Activity Level</label>
          </div>

          <Select value={userData.activityLevel} onValueChange={(value) => updateUserData({ activityLevel: value })}>
            <SelectTrigger className="bg-gray-900/70 border border-blue-500/20 text-white h-[42px] sm:h-[50px] hover:bg-gray-800/90 transition-colors duration-300">
              <SelectValue placeholder="Select your activity level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border border-blue-500/20">
              {activityLevels.map((level) => (
                <SelectItem 
                  key={level} 
                  value={level}
                  className="text-white hover:bg-blue-600/20 focus:bg-blue-600/30 cursor-pointer transition-colors duration-200"
                >
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex space-x-3 mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
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

          {/* Mobile tap effect - simplified for better performance */}
          <span className="absolute inset-0 bg-white rounded-lg pointer-events-none opacity-0 scale-0 group-active:opacity-10 group-active:scale-100 transition-all duration-300" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

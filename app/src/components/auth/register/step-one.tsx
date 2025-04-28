"use client"

import { motion } from "framer-motion"
import { Dumbbell, Heart, LineChart, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import image2 from "@/assets/Tracking Progress at the Gym.png"
interface StepOneProps {
  onNext: () => void
}

export default function StepOne({ onNext }: StepOneProps) {
  const features = [
    {
      icon: <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />,
      title: "Workout Tracking",
      description: "Log and track your exercises, sets, and reps and even there is rest Timer",
    },
    {
      icon: <LineChart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />,
      title: "Progress Analytics",
      description: "Visualize your fitness journey with detailed charts",
    },
    {
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />,
      title: "AI Powered Progression",
      description: "Get personalized workout recommendations based on your goals.",
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />,
      title: "Rest Timer",
      description: "Optimize recovery between sets with built-in timers",
    },
  ]

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
      <div className="mb-4 sm:mb-6">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <div className="relative">
            {/* Animated rings */}
            <motion.div
              className="absolute -inset-3 sm:-inset-4 rounded-full bg-blue-500/10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-6 sm:-inset-8 rounded-full bg-blue-500/5"
              animate={{ scale: [1.1, 1, 1.1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Icon container */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30 relative z-10">
              <Dumbbell className="h-10 w-10 sm:h-14 sm:w-14 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to FitTrack Pro
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your personal fitness companion for achieving your workout goals
        </motion.p>
      </div>

      <motion.div
        className="relative mb-4 sm:mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >

      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 flex-1"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center">
              <div className="mb-2 sm:mb-3 bg-blue-900/30 p-2 sm:p-3 rounded-full group-hover:bg-blue-800/40 transition-colors duration-300">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-white mb-1">{feature.title}</h3>
              <p className="text-[10px] sm:text-xs text-gray-300">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-auto"
      >
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 relative overflow-hidden group"
        >
          <span className="relative z-10">Get Started</span>
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

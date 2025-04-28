"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dumbbell, Apple, Sparkles, BarChart4, Calendar, Clock, Award, Heart } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export default function FeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features: Feature[] = [
    {
      icon: <Dumbbell className="h-6 w-6" />,
      title: "Workout Tracker",
      description:
        "Track your workouts, sets, reps, and weights with our intuitive interface. Monitor your progress and see your strength gains over time.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Apple className="h-6 w-6" />,
      title: "Nutrition Tracking",
      description:
        "Log your meals, track macros, and monitor your calorie intake. Our nutrition tracker helps you stay on top of your diet goals.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI Personal Assistant",
      description:
        "Get personalized workout and nutrition recommendations from our AI assistant. It learns your preferences and adapts to your progress.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description:
        "Visualize your fitness journey with detailed charts and insights. Identify trends and optimize your training for better results.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Workout Planning",
      description:
        "Plan your workouts in advance with our easy-to-use calendar. Set goals and create custom workout routines.",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Rest Timer",
      description:
        "Optimize your rest periods between sets with our customizable timer. Maximize your workout efficiency and results.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Achievements & Badges",
      description:
        "Earn badges and unlock achievements as you reach fitness milestones. Stay motivated and celebrate your progress.",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health Metrics",
      description:
        "Track important health metrics like heart rate, sleep quality, and recovery. Ensure you're training at optimal levels.",
      color: "from-pink-500 to-pink-600",
    },
  ]

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
        GymRat Features
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-blue-500/20 cursor-pointer transition-all duration-300 ${
              activeFeature === index ? "ring-2 ring-blue-500 border-blue-500/50" : ""
            }`}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
            onClick={() => setActiveFeature(index)}
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 mx-auto`}
            >
              {feature.icon}
            </div>
            <h3 className="text-sm font-medium text-center text-white mb-1">{feature.title}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div
        key={activeFeature}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-6 bg-gray-800/30 backdrop-blur-sm p-5 rounded-xl border border-blue-500/20"
      >
        <div className="flex items-center mb-3">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${features[activeFeature].color} flex items-center justify-center mr-3`}
          >
            {features[activeFeature].icon}
          </div>
          <h3 className="text-lg font-bold text-white">{features[activeFeature].title}</h3>
        </div>
        <p className="text-gray-300">{features[activeFeature].description}</p>
      </motion.div>
    </div>
  )
}

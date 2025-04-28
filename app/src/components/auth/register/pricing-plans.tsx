"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
  Check,
  X,
  Star,
  Zap,
  Flame,
  Crown,
  Dumbbell,
  LayoutTemplate,
  Library,
  TrendingUp,
  Apple,
  Sparkles,
  BarChart4,
  Award,
  HeadphonesIcon,
  CheckCircle2,
  Users,
  Utensils,
  Brain,
  UsersRound,
  HeartHandshake,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingPlanFeature {
  text: string
  icon: React.ReactNode
}

interface PricingPlan {
  name: string
  price: string
  period: string
  features: PricingPlanFeature[]
  notIncluded: PricingPlanFeature[]
  color: string
  bgGradient: string
  recommended: boolean
}

interface PricingPlansProps {
  onBack: () => void
  onSelectPlan: (plan: string) => void
}

export default function PricingPlans({ onBack, onSelectPlan }: PricingPlansProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const pricingPlans: PricingPlan[] = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        { text: "Basic Workout Tracking", icon: <Dumbbell className="h-4 w-4" /> },
        { text: "3 Workout Templates", icon: <LayoutTemplate className="h-4 w-4" /> },
        { text: "Exercise Library", icon: <Library className="h-4 w-4" /> },
        { text: "Progress Tracking", icon: <TrendingUp className="h-4 w-4" /> },
      ],
      notIncluded: [
        { text: "Nutrition Tracking", icon: <Apple className="h-4 w-4" /> },
        { text: "AI Personal Assistant", icon: <Sparkles className="h-4 w-4" /> },
        { text: "Advanced Analytics", icon: <BarChart4 className="h-4 w-4" /> },
        { text: "Premium Workouts", icon: <Award className="h-4 w-4" /> },
      ],
      color: "from-gray-600 to-gray-500",
      bgGradient: "from-gray-800/40 to-gray-700/40",
      recommended: false,
    },
    {
      name: "GymRat Pro",
      price: "$9.99",
      period: "per month",
      features: [
        { text: "Advanced Workout Tracking", icon: <Dumbbell className="h-4 w-4" /> },
        { text: "Unlimited Templates", icon: <LayoutTemplate className="h-4 w-4" /> },
        { text: "Nutrition Tracking", icon: <Apple className="h-4 w-4" /> },
        { text: "AI Personal Assistant", icon: <Sparkles className="h-4 w-4" /> },
        { text: "Advanced Analytics", icon: <BarChart4 className="h-4 w-4" /> },
        { text: "Premium Workouts", icon: <Award className="h-4 w-4" /> },
        { text: "Priority Support", icon: <HeadphonesIcon className="h-4 w-4" /> },
      ],
      notIncluded: [],
      color: "from-blue-600 to-blue-500",
      bgGradient: "from-blue-900/30 to-blue-800/30",
      recommended: true,
    },
    {
      name: "GymRat Elite",
      price: "$19.99",
      period: "per month",
      features: [
        { text: "Everything in Pro", icon: <CheckCircle2 className="h-4 w-4" /> },
        { text: "1-on-1 Coaching", icon: <Users className="h-4 w-4" /> },
        { text: "Custom Meal Plans", icon: <Utensils className="h-4 w-4" /> },
        { text: "Advanced AI Features", icon: <Brain className="h-4 w-4" /> },
        { text: "Exclusive Content", icon: <Crown className="h-4 w-4" /> },
        { text: "Family Sharing (up to 5)", icon: <UsersRound className="h-4 w-4" /> },
        { text: "White Glove Support", icon: <HeartHandshake className="h-4 w-4" /> },
      ],
      notIncluded: [],
      color: "from-purple-600 to-blue-500",
      bgGradient: "from-purple-900/30 to-blue-800/30",
      recommended: false,
    },
  ]

  return (
    <motion.div
      key="pricing"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="text-center flex flex-col h-full"
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <motion.h2
        className="text-xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose Your Plan
      </motion.h2>

      <motion.p
        className="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Select the plan that fits your fitness journey
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 flex-1 overflow-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            variants={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-gradient-to-br ${plan.bgGradient} backdrop-blur-sm p-5 rounded-xl border transition-all duration-300 group overflow-hidden ${
              plan.recommended
                ? "border-blue-500/50 shadow-lg shadow-blue-500/10 scale-105 z-10"
                : "border-blue-500/20 hover:border-blue-500/30 hover:scale-[1.02]"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-1 -right-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 blur-sm opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-xs font-bold py-1 px-3 rounded-bl-lg">
                    <Star className="h-3 w-3 inline-block mr-1" />
                    RECOMMENDED
                  </div>
                </div>
              </div>
            )}

            <div className="relative z-10">
              <div
                className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}
              >
                {index === 0 ? (
                  <Zap className="h-6 w-6 text-white" />
                ) : index === 1 ? (
                  <Flame className="h-6 w-6 text-white" />
                ) : (
                  <Crown className="h-6 w-6 text-white" />
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>

              <div className="flex items-end justify-center mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 ml-1">/{plan.period}</span>
              </div>

              <motion.div
                className="h-px w-full my-4 relative overflow-hidden"
                style={{ background: "rgba(59, 130, 246, 0.2)" }}
              >
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${plan.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                />
              </motion.div>

              <div className="text-left mb-4">
                <p className="text-sm text-gray-300 mb-2 flex items-center">
                  <Check className="h-4 w-4 text-green-400 mr-1" /> Includes:
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center text-sm group"
                    >
                      <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2 flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                        {feature.icon}
                      </div>
                      <span className="text-gray-200">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {plan.notIncluded.length > 0 && (
                <div className="text-left mb-4">
                  <p className="text-sm text-gray-400 mb-2 flex items-center">
                    <X className="h-4 w-4 text-gray-500 mr-1" /> Not included:
                  </p>
                  <ul className="space-y-2">
                    {plan.notIncluded.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center text-sm"
                      >
                        <div className="h-5 w-5 rounded-full bg-gray-700/50 flex items-center justify-center mr-2 flex-shrink-0">
                          {feature.icon}
                        </div>
                        <span className="text-gray-400">{feature.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className={`w-full mt-4 bg-gradient-to-r ${plan.color} hover:opacity-90 text-white relative overflow-hidden group`}
                onClick={() => onSelectPlan(plan.name)}
              >
                <span className="relative z-10">{plan.recommended ? "Select Plan" : "Choose Plan"}</span>

                {/* Button hover effect */}
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                </span>
              </Button>
            </div>

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 rounded-xl"></div>

            {/* Animated background dots */}
            {plan.recommended && (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-20 h-20 rounded-full bg-blue-500/10"
                    initial={{
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                      scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                      x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
                      y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div className="mt-auto">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-blue-500/20 text-white hover:bg-blue-900/20 hover:border-blue-500/40 flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Registration
        </Button>
      </motion.div>
    </motion.div>
  )
}

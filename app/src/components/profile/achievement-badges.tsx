"use client"

import { motion } from "framer-motion"
import { Award, Medal, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Achievement = {
  id: string
  title: string
  description: string
  icon: "trophy" | "medal" | "award"
  date: string
  category: "milestone" | "streak" | "personal" | "challenge"
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

export default function AchievementBadges() {
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Century Club",
      description: "Completed 100 workouts",
      icon: "trophy",
      date: "2023-05-15",
      category: "milestone",
      rarity: "rare",
    },
    {
      id: "2",
      title: "Iron Will",
      description: "Worked out for 30 days in a row",
      icon: "medal",
      date: "2023-04-22",
      category: "streak",
      rarity: "epic",
    },
    {
      id: "3",
      title: "Strength Master",
      description: "Reached advanced level in strength training",
      icon: "award",
      date: "2023-03-10",
      category: "personal",
      rarity: "rare",
    },
    {
      id: "4",
      title: "Early Bird",
      description: "Completed 10 workouts before 7 AM",
      icon: "medal",
      date: "2023-02-28",
      category: "challenge",
      rarity: "uncommon",
    },
    {
      id: "5",
      title: "Consistency King",
      description: "Worked out at least 3 times a week for 3 months",
      icon: "trophy",
      date: "2023-01-15",
      category: "streak",
      rarity: "legendary",
    },
  ]

  const getIconComponent = (icon: string, rarity: string) => {
    const colorClass = getRarityColor(rarity)
    const className = `h-6 w-6 ${colorClass}`

    if (icon === "trophy") return <Trophy className={className} />
    if (icon === "medal") return <Medal className={className} />
    if (icon === "award") return <Award className={className} />
    return <Trophy className={className} />
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400"
      case "uncommon":
        return "text-green-500"
      case "rare":
        return "text-blue-500"
      case "epic":
        return "text-purple-500"
      case "legendary":
        return "text-amber-500"
      default:
        return "text-gray-400"
    }
  }

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-zinc-600 to-zinc-400"
      case "uncommon":
        return "from-green-600 to-green-400"
      case "rare":
        return "from-blue-600 to-blue-400"
      case "epic":
        return "from-purple-600 to-purple-400"
      case "legendary":
        return "from-amber-600 to-amber-400"
      default:
        return "from-zinc-600 to-zinc-400"
    }
  }

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-zinc-800/50"
      case "uncommon":
        return "bg-green-900/30"
      case "rare":
        return "bg-blue-900/30"
      case "epic":
        return "bg-purple-900/30"
      case "legendary":
        return "bg-amber-900/30"
      default:
        return "bg-zinc-800/50"
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-6 shadow-xl shadow-black/20"
    >
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 mr-3 rounded-full"></div>
        Achievements
      </h2>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl border border-zinc-800/50 bg-zinc-800/20 hover:bg-zinc-800/30 transition-colors backdrop-blur-sm shadow-lg shadow-black/10"
            whileHover={{ x: 5 }}
          >
            <div
              className={`w-12 h-12 rounded-full ${getRarityBg(achievement.rarity)} flex items-center justify-center bg-gradient-to-br ${getRarityGradient(achievement.rarity)} bg-opacity-20 shadow-inner`}
            >
              {getIconComponent(achievement.icon, achievement.rarity)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium truncate text-white">{achievement.title}</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant="outline"
                        className={`${getRarityColor(achievement.rarity)} border-current text-xs capitalize bg-gradient-to-r ${getRarityGradient(achievement.rarity)} bg-clip-text text-transparent border-none`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)} Achievement
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-zinc-400 truncate">{achievement.description}</p>
              <p className="text-xs text-zinc-500 mt-1">Earned on {new Date(achievement.date).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

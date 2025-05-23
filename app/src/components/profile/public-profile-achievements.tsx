"use client"

import { Trophy, Zap, Target, Flame } from "lucide-react"
import { Badge } from "@/components/ui/badge"


export default function PublicProfileAchievements() {
  // Mock data - in a real app, you would fetch this based on userId
  const achievements = [
    {
      id: 1,
      title: "100 Workouts",
      description: "Completed 100 workouts",
      icon: <Trophy className="h-4 w-4 text-amber-400" />,
      date: "Mar 15, 2023",
      rarity: "common",
    },
    {
      id: 2,
      title: "30-Day Streak",
      description: "Worked out 30 days in a row",
      icon: <Flame className="h-4 w-4 text-orange-500" />,
      date: "Apr 22, 2023",
      rarity: "rare",
    },
    {
      id: 3,
      title: "10,000kg Lifted",
      description: "Lifted 10,000 kg in a month",
      icon: <Zap className="h-4 w-4 text-yellow-400" />,
      date: "May 10, 2023",
      rarity: "epic",
    },
    {
      id: 4,
      title: "Marathon Completed",
      description: "Ran 42.2 km in one session",
      icon: <Target className="h-4 w-4 text-green-400" />,
      date: "Jun 5, 2023",
      rarity: "legendary",
    },
  ]

  const rarityColors = {
    common: {
      bg: "bg-gradient-to-br from-zinc-600 to-zinc-700",
      text: "text-zinc-300",
      border: "border-zinc-500/30",
      badge: "bg-zinc-700 text-zinc-300",
    },
    rare: {
      bg: "bg-gradient-to-br from-blue-600 to-blue-700",
      text: "text-blue-200",
      border: "border-blue-500/30",
      badge: "bg-blue-700 text-blue-200",
    },
    epic: {
      bg: "bg-gradient-to-br from-purple-600 to-purple-700",
      text: "text-purple-200",
      border: "border-purple-500/30",
      badge: "bg-purple-700 text-purple-200",
    },
    legendary: {
      bg: "bg-gradient-to-br from-amber-500 to-amber-600",
      text: "text-amber-100",
      border: "border-amber-500/30",
      badge: "bg-amber-600 text-amber-100",
    },
  }

  return (
    <section className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800/50 p-5 shadow-lg">
      <h2 className="text-base font-semibold text-white mb-4">Achievements</h2>

      <div className="grid grid-cols-1 gap-3">
        {achievements.map((achievement) => {
          const colors = rarityColors[achievement.rarity as keyof typeof rarityColors]

          return (
            <div
              key={achievement.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/30 shadow-sm hover:bg-zinc-800/70 transition-colors"
            >
              <div className={`${colors.bg} p-2.5 rounded-lg shadow-lg ${colors.border} border`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{achievement.title}</h3>
                  <Badge className={colors.badge}>
                    {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{achievement.description}</p>
                <p className="text-xs text-zinc-500 mt-1">Earned on {achievement.date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

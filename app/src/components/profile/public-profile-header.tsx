"use client"

import { useState, useEffect } from "react"
import { Dumbbell, Medal, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserResponse } from "@/pages/[id]/profile"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PublicProfileHeader({ user }: { user: UserResponse }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowActions(true)
    }, 300)

    // Add a loaded state for fade-in animations
    setIsLoaded(true)

    return () => clearTimeout(timer)
  }, [])

  // Generate gradient based on name (for consistent but unique colors)
  const getGradient = (name: string) => {
    const charCode = name.charCodeAt(0) % 5
    const gradients = [
      "from-indigo-600 to-purple-600",
      "from-blue-600 to-cyan-600",
      "from-emerald-600 to-teal-600",
      "from-rose-600 to-pink-600",
      "from-amber-500 to-orange-600"
    ]
    return gradients[charCode]
  }

  const nameGradient = getGradient(user.name)
  const initials = user.name.split(" ").map(n => n[0]).join("")
  
  // Calculate member since date
  const memberSince = new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })

  return (
    <div className={`relative transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background header pattern */}
      <div className="absolute inset-0 bg-zinc-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 to-zinc-900/80 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      <section className="relative rounded-xl overflow-hidden border border-zinc-800/50 shadow-xl backdrop-blur-sm">
        {/* Hero banner area - animated gradient with personalized pattern */}
        <div className="h-24 md:h-32 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgb(59,130,246,0.1)_15%,transparent_30%)] animate-shimmer" />
          
          {/* Personalized pattern based on user */}
          <div className={`absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${nameGradient}`}></div>
          
          {/* Subtle user name watermark */}
          <div className="absolute right-8 bottom-2 text-4xl font-bold text-white/5 select-none">
            {user.name.split(' ')[0]}
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 md:flex md:gap-6">
          {/* Avatar - positioned to overlap the hero banner */}
          <div className="relative -mt-12 mb-4 md:mb-0 flex justify-center md:block">
            <div className={`absolute inset-0 rounded-full blur-xl opacity-70 bg-gradient-to-br ${nameGradient}`}></div>
            <div className="relative group">
              <Avatar className="h-24 w-24 border-4 border-zinc-900 relative shadow-lg shadow-blue-500/10 transition-transform duration-300 group-hover:scale-105">
                <AvatarFallback className={`text-2xl bg-gradient-to-br ${nameGradient} text-white`}>
                  {initials}
                </AvatarFallback>
                {/* Online status indicator with pulse animation */}
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-zinc-900">
                  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
                </span>
              </Avatar>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                Member since {memberSince}
              </span>
            </div>

            <p className="text-zinc-300 mb-4 text-sm leading-relaxed">{user.profile.bio}</p>

            {/* Stats cards with hover effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div className="bg-zinc-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-zinc-700/30 shadow-sm hover:bg-zinc-700/50 transition-colors group">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded bg-gradient-to-br ${nameGradient} bg-opacity-20 group-hover:scale-110 transition-transform`}>
                    <Dumbbell className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">Workouts</p>
                    <p className="font-semibold text-white">{user.workouts_count}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-zinc-700/30 shadow-sm hover:bg-zinc-700/50 transition-colors group">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded bg-gradient-to-br ${nameGradient} bg-opacity-20 group-hover:scale-110 transition-transform`}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">Followers</p>
                    <p className="font-semibold text-white">{user.profile.followers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-zinc-700/30 shadow-sm hover:bg-zinc-700/50 transition-colors group">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded bg-gradient-to-br ${nameGradient} bg-opacity-20 group-hover:scale-110 transition-transform`}>
                    <Medal className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">Following</p>
                    <p className="font-semibold text-white">{user.profile.following}</p>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Action buttons with animated entrance */}
            <div className={`flex flex-wrap gap-3 transition-all duration-500 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      className={
                        isFollowing
                          ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                          : `bg-gradient-to-r ${nameGradient} hover:opacity-90 text-white`
                      }
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFollowing ? "Unfollow" : "Follow"} {user.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
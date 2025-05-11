"use client"

import { useState } from "react"
import { UserPlus, ExternalLink, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"
// Mock data for demonstration
const mockSuggestions = [
  {
    id: "1",
    name: "Jessica Lee",
    username: "jessfit",
    avatar: "/placeholder.svg?height=100&width=100",
    reason: "Similar workout interests",
    interests: ["Strength Training", "HIIT"],
    isFollowing: false,
  },
  {
    id: "2",
    name: "Ryan Thompson",
    username: "ryanfitness",
    avatar: "/placeholder.svg?height=100&width=100",
    reason: "Popular in your area",
    interests: ["Running", "Cycling"],
    isFollowing: false,
  },
  {
    id: "3",
    name: "Olivia Martinez",
    username: "oliviafit",
    avatar: "/placeholder.svg?height=100&width=100",
    reason: "Followed by your connections",
    interests: ["Yoga", "Pilates"],
    isFollowing: false,
  },
]

export default function SuggestedUsers() {
  const [suggestions, setSuggestions] = useState(mockSuggestions)

  const toggleFollow = (userId: string) => {
    setSuggestions(suggestions.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)))
  }

  return (
    <div>
      {suggestions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <User className="h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-white">No suggestions available</h3>
          <p className="text-zinc-400 mt-2 max-w-md">We'll suggest users based on your activity and interests.</p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          <div className="p-4">
            <h3 className="font-medium text-white">Suggested For You</h3>
            <p className="text-sm text-zinc-400 mt-1">Based on your activity and interests</p>
          </div>

          {suggestions.map((user) => (
            <div key={user.id} className="p-4 hover:bg-white/5 transition-all duration-200 group">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-xl border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} className="rounded-xl" />
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate text-white group-hover:text-purple-300 transition-colors duration-200">
                      {user.name}
                    </h4>
                    <span className="text-sm text-zinc-500">@{user.username}</span>
                  </div>

                  <p className="text-sm text-zinc-400 mt-0.5 group-hover:text-zinc-300 transition-colors duration-200">
                    {user.reason}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {user.interests.map((interest, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-zinc-800/50 border border-white/5 text-zinc-300 text-xs hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-200"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant={user.isFollowing ? "secondary" : "default"}
                    size="sm"
                    className={
                      user.isFollowing
                        ? "bg-zinc-800/80 hover:bg-zinc-700/80 text-white border border-white/10"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-900/20"
                    }
                    onClick={() => toggleFollow(user.id)}
                  >
                    {user.isFollowing ? (
                      "Following"
                    ) : (
                      <>
                        <UserPlus className="h-3.5 w-3.5 mr-1" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-zinc-800/50 hover:bg-zinc-700/50 border-white/5 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Link to={`/profile/${user.id}`}>
                      <ExternalLink className="h-3.5 w-3.5 mr-1" />
                      Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

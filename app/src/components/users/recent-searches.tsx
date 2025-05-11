"use client"

import { X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router"
// Mock data for demonstration
const recentSearches = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexfit",
    avatar: "/placeholder.svg?height=100&width=100",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    name: "Sarah Williams",
    username: "sarahfitpro",
    avatar: "/placeholder.svg?height=100&width=100",
    timestamp: "1 week ago",
  },
  {
    id: "3",
    name: "Michael Chen",
    username: "mikefitness",
    avatar: "/placeholder.svg?height=100&width=100",
    timestamp: "2 weeks ago",
  },
]

export default function RecentSearches() {
  return (
    <div>
      {recentSearches.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <Clock className="h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-lg font-medium text-white">No recent searches</h3>
          <p className="text-zinc-400 mt-2 max-w-md">Your recent user searches will appear here.</p>
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-medium text-white">Recent Searches</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Clear All
            </Button>
          </div>

          {recentSearches.map((user) => (
            <div key={user.id} className="p-4 hover:bg-white/5 transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <Link
                  to={`/profile/${user.id}`}
                  className="flex items-center gap-3 flex-1 min-w-0 group-hover:scale-[1.01] transition-transform duration-200"
                >
                  <Avatar className="h-10 w-10 rounded-xl border border-white/10 group-hover:border-purple-500/30 transition-all duration-300">
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
                    <p className="text-sm text-zinc-400 flex items-center gap-1 group-hover:text-zinc-300 transition-colors duration-200">
                      <Clock className="h-3 w-3 text-purple-400" />
                      {user.timestamp}
                    </p>
                  </div>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Users, UserPlus, UserCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"



export default function PublicProfileSocial() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app, you would fetch this based on userId
  const connections = [
    {
      id: 1,
      name: "Sarah Miller",
      username: "sarahfit",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      level: "Intermediate",
      isFollowing: true,
    },
    {
      id: 2,
      name: "Mike Johnson",
      username: "mikej",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      level: "Advanced",
      isFollowing: true,
    },
    {
      id: 3,
      name: "Emma Wilson",
      username: "emmaw",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      level: "Expert",
      isFollowing: true,
    },
    {
      id: 4,
      name: "David Chen",
      username: "davidc",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      level: "Beginner",
      isFollowing: true,
    },
  ]

  const suggestions = [
    {
      id: 5,
      name: "Jessica Taylor",
      username: "jesst",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      level: "Intermediate",
      isFollowing: false,
    },
    {
      id: 6,
      name: "Ryan Garcia",
      username: "ryang",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      level: "Advanced",
      isFollowing: false,
    },
    {
      id: 7,
      name: "Olivia Smith",
      username: "olivias",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      level: "Beginner",
      isFollowing: false,
    },
  ]

  const levelColors = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    Expert: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  }

  const filteredConnections = connections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-6 shadow-xl shadow-black/20"
    >
      <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 mr-3 rounded-full"></div>
        Connections
      </h2>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Search connections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Following ({connections.length})
        </h3>

        <ScrollArea className="h-[200px]">
          <div className="space-y-3 pr-4">
            {filteredConnections.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.05 * index }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={connection.avatarUrl || "/placeholder.svg"} alt={connection.name} />
                      <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {connection.isOnline && (
                      <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-zinc-900"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{connection.name}</div>
                    <div className="text-xs text-zinc-500">@{connection.username}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={levelColors[connection.level as keyof typeof levelColors]}>
                    {connection.level}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-full"
                  >
                    <UserCheck className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-400 mb-3 flex items-center">
          <UserPlus className="h-4 w-4 mr-2" />
          Suggested Connections
        </h3>

        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 * index }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={suggestion.avatarUrl || "/placeholder.svg"} alt={suggestion.name} />
                    <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {suggestion.isOnline && (
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-zinc-900"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium text-white">{suggestion.name}</div>
                  <div className="text-xs text-zinc-500">@{suggestion.username}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={levelColors[suggestion.level as keyof typeof levelColors]}>{suggestion.level}</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                >
                  <UserPlus className="h-3 w-3 mr-1" />
                  Follow
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

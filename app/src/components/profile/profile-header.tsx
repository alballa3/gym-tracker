"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Check, Edit,  X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Profile, User } from "@/types/user"
import { api } from "@/api"

export default function ProfileHeader({user, setUser}:{user: Profile, setUser: (user: User) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempUsername, setTempUsername] = useState(user.user.name)
  const [isUploading, setIsUploading] = useState(false)
  const handleSave = async() => {
    const client = await api()
    const res = await client.put("/profile/name", {
      name: tempUsername,
    })
    console.log(res)
    setUser({ ...user.user, name: tempUsername })

    
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempUsername(user.user.name)
    setIsEditing(false)
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => setIsUploading(false), 1500)
  }



  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden"
    >
      {/* Cover Photo */}
      <div className="h-56 md:h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=480&width=1200')] bg-center bg-cover opacity-30 mix-blend-overlay" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-blue-400/30"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* <div className="absolute bottom-4 right-4 flex gap-2">
          <TooltipProvider>
            <Tooltip open={showShareTooltip}>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile link copied!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white"
            onClick={simulateUpload}
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div> */}
      </div>

      {/* Profile Info */}
      <div className="bg-zinc-900/80 backdrop-blur-xl rounded-b-xl border border-zinc-800/50 px-6 py-6 flex flex-col md:flex-row gap-6 items-start md:items-center relative">
        {/* Avatar */}
        <div className="absolute -top-16 left-6 md:relative md:top-0 md:left-0">
          <div className="relative group">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
              <Avatar className="h-32 w-32 border-4 border-zinc-900 ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/20">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={user.user.name} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
                  {user.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={simulateUpload}
            >
              <Camera className="h-8 w-8 text-white" />
            </button>
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                <div className="h-8 w-8 border-4 border-t-blue-500 border-blue-200/20 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="mt-16 md:mt-0 flex-1">
          <div className="flex flex-col gap-4 mb-2 w-full sm:flex-row sm:items-center sm:justify-between">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <input
                    type="text"
                    value={tempUsername}
                    onChange={(e) => setTempUsername(e.target.value)}
                    className="text-xl sm:text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none px-1 text-white w-full sm:w-auto"
                    autoFocus
                    maxLength={30}
                    placeholder="Enter username"
                  />
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-green-500 hover:text-green-400 hover:bg-green-500/10 rounded-full transition-colors"
                      onClick={handleSave}
                      aria-label="Save changes"
                    >
                      <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                      onClick={handleCancel}
                      aria-label="Cancel editing"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="display"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <h1 className="text-xl sm:text-2xl font-bold text-white break-all">{user.user.name}</h1>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full h-8 w-8 transition-colors"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit username"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-none px-2 py-0.5 sm:px-3 sm:py-1 text-sm">
                Beta Tester
              </Badge>
              <Badge className="bg-gradient-to-r from-amber-600 to-amber-400 text-white border-none px-2 py-0.5 sm:px-3 sm:py-1 text-sm">
                Admin User
              </Badge>
            </div>
          </div>
          <p className="text-zinc-400">{ user.bio}</p>

          <div className="flex gap-6 mt-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700/50 shadow-lg shadow-black/20"
            >
              <p className="text-sm text-zinc-400">Workouts</p>
              <p className="font-semibold text-white">{user.workout}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700/50 shadow-lg shadow-black/20"
            >
              <p className="text-sm text-zinc-400">Following</p>
              <p className="font-semibold text-white">{user.following}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700/50 shadow-lg shadow-black/20"
            >
              <p className="text-sm text-zinc-400">Followers</p>
              <p className="font-semibold text-white">{ user.following}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

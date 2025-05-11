"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Check, Edit, X, LogOut, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Profile, User } from "@/types/user"
import { api } from "@/api"
import { useNavigate } from "react-router"
import { delete_token } from "@/capacitor/auth"

export default function ProfileHeader({ user, setUser }: { user: Profile, setUser: (user: User) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  let router=useNavigate()
  const [tempUsername, setTempUsername] = useState(user.user.name)
  const [isUploading, setIsUploading] = useState(false)
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  const handleSave = async () => {
    try {
      const client = await api()
       await client.put("/profile/name", {
        name: tempUsername,
      })
      setUser({ ...user.user, name: tempUsername })
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update username:", error)
    }
  }

  const handleCancel = () => {
    setTempUsername(user.user.name)
    setIsEditing(false)
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setTimeout(() => setIsUploading(false), 1500)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/profile/${user.user.id}`)
    setShowShareTooltip(true)
    setTimeout(() => setShowShareTooltip(false), 2000)
  }

  const handleLogout = async () => {
    try {
      const client = await api()
      await client.post("/logout")
      await delete_token()
      router("/auth/login")
    } catch (error) {
      console.error("Failed to logout:", error)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }


  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative rounded-xl overflow-hidden shadow-2xl"
    >
      {/* Cover Photo with modern gradient */}
      <div className="h-56 md:h-64 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=480&width=1200')] bg-center bg-cover opacity-30 mix-blend-overlay" />

        {/* Dynamic mesh gradient overlay */}
        <div className="absolute inset-0 opacity-60">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#meshGradient)" />
          </svg>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-white"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.3,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.5 + 0.5, Math.random() * 0.3 + 0.2],
                scale: [0.5, Math.random() * 0.5 + 0.7, 0.5]
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Cover photo actions */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-lg transition-all"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-lg transition-all"
            onClick={simulateUpload}
          >
            <Camera className="h-4 w-4 mr-2" />
            Cover
          </Button>
          {showShareTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-10 right-0 bg-black/80 text-white text-sm px-3 py-1 rounded-md shadow-lg"
            >
              Profile link copied!
            </motion.div>
          )}
        </div>
      </div>

      {/* Profile Info with glass morphism effect */}
      <div className="bg-zinc-900/70 backdrop-blur-xl rounded-b-xl border border-zinc-800/50 px-6 py-6 flex flex-col md:flex-row gap-6 items-start md:items-center relative">
        {/* Avatar with improved animations */}
        <div className="absolute -top-16 left-6 md:relative md:top-0 md:left-0">
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Avatar className="h-32 w-32 border-4 border-zinc-900 ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/20">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={user.user.name} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
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

        {/* User Info with improved layout */}
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
              <Badge className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-none px-2 py-0.5 sm:px-3 sm:py-1 text-sm shadow-lg shadow-blue-500/20">
                Beta Tester
              </Badge>
              <Badge className="bg-gradient-to-r from-amber-600 to-amber-400 text-white border-none px-2 py-0.5 sm:px-3 sm:py-1 text-sm shadow-lg shadow-amber-500/20">
                Admin User
              </Badge>
            </div>
          </div>
          <p className="text-zinc-300 text-sm md:text-base">{user.bio || "No bio yet. Click edit to add one."}</p>

          {/* Stats with improved animations */}
          <div className="flex flex-wrap gap-4 mt-4">
            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700/50 shadow-lg shadow-black/20 flex-1 min-w-24"
            >
              <p className="text-sm text-zinc-400">Workouts</p>
              <p className="font-semibold text-white">{user.workout || 0}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700/50 shadow-lg shadow-black/20 flex-1 min-w-24"
            >
              <p className="text-sm text-zinc-400">Following</p>
              <p className="font-semibold text-white">{user.following || 0}</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-zinc-700/50 shadow-lg shadow-black/20 flex-1 min-w-24"
            >
              <p className="text-sm text-zinc-400">Followers</p>
              <p className="font-semibold text-white">{user.followers || user.following || 0}</p>
            </motion.div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 md:static md:flex md:flex-col md:gap-2 md:self-start">
          
          <Button
            variant="ghost"
            size="icon"
            className="mt-2 md:mt-0 bg-zinc-800/50 hover:bg-red-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-full text-zinc-300 hover:text-red-400 shadow-lg"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
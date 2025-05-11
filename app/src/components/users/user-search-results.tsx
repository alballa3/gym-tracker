"use client"

import { useState } from "react"
import { Dumbbell, Calendar, ExternalLink, Users, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { UserWithProfile } from "@/pages/search"
import moment from "moment"




export default function UserSearchResults({ users }: { users: UserWithProfile[], setUsers: (users: UserWithProfile[]) => void }) {
  const [isLoading, setIsLoading] = useState(false)

  // const toggleFollow = (userId: string) => {
  //   setUsers(users.map((user) => (user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user)))
  // }

  return (
    <div className="space-y-6">
      {users.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 px-4 text-center bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800/50"
        >
          <Search className="h-16 w-16 text-zinc-600 mb-4 opacity-30" />
          <h3 className="text-xl font-medium text-white">No users found</h3>
          <p className="text-zinc-400 mt-2 max-w-md">Try adjusting your search or filter criteria to find users.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-5 bg-zinc-900/60 backdrop-blur-sm rounded-xl border border-zinc-800/50 hover:border-purple-500/30 transition-all duration-300 group shadow-lg hover:shadow-purple-900/10 relative overflow-hidden"
            >
              {/* Decorative gradient background */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-600/10 to-indigo-600/5 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

              <div className="flex items-start gap-4 relative">
                {/* Avatar with follower count */}
                <div className="relative flex-shrink-0">
                  <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-white/10 group-hover:border-purple-500/30 transition-all duration-300 rounded-xl shadow-lg">
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 text-white text-lg">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30, delay: index * 0.1 + 0.3 }}
                    className="absolute -bottom-2 -right-2 bg-zinc-800 rounded-full px-2 py-0.5 text-xs font-medium border border-zinc-700 flex items-center gap-1 shadow-md"
                  >
                    <Users className="h-3 w-3 text-purple-400" />
                    <span className="text-white">{user.profile?.followers}</span>
                  </motion.div>
                </div>

                {/* User Info Section */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate text-white group-hover:text-purple-300 transition-colors duration-200">
                    {user.name}
                  </h3>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-zinc-400 mt-1">
                    <div className="flex items-center gap-1 group-hover:text-zinc-300 transition-colors duration-200">
                      <Dumbbell className="h-3 w-3 text-purple-400" />
                      <span>{user.workouts_count} workouts</span>
                    </div>

                    <div className="flex items-center gap-1 group-hover:text-zinc-300 transition-colors duration-200">
                      <Calendar className="h-3 w-3 text-purple-400" />
                      <span>Since {moment(user.created_at).fromNow()}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="text-zinc-300 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 mt-2">
                    {user.profile?.bio}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-4">
                {/* <Button
                  variant={user.isFollowing ? "secondary" : "default"}
                  size="sm"
                  className={`
                    relative flex-1 transition-all duration-300 overflow-hidden
                    ${user.isFollowing 
                      ? "bg-zinc-800/80 hover:bg-zinc-700/80 text-white border border-white/10"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                    }
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent 
                    before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-500
                    shadow-[0_4px_20px_-4px_rgba(147,51,234,0.3)] hover:shadow-[0_4px_24px_-4px_rgba(147,51,234,0.4)]
                  `}
                  onClick={() => toggleFollow(user.id)}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center"
                  >
                    {user.isFollowing ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                        <span>Follow</span>
                      </>
                    )}
                  </motion.div>
                </Button> */}

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className={`
                    relative flex-1 overflow-hidden
                    bg-zinc-800/50 hover:bg-zinc-700/50 border-white/5 
                    text-zinc-300 hover:text-white transition-all duration-300
                    before:absolute before:inset-0 before:bg-gradient-to-r 
                    before:from-purple-500/10 before:to-indigo-500/10
                    before:translate-x-[-100%] hover:before:translate-x-[100%] 
                    before:transition-transform before:duration-500
                  `}
                >
                  <Link to={`/profile/${user.id}`}>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                      <span>Profile</span>
                    </motion.div>
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {users.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-4 flex justify-center"
        >
          <Button
            variant="outline"
            className="bg-zinc-800/50 hover:bg-zinc-700/50 border-white/5 text-zinc-300 hover:text-white transition-colors relative overflow-hidden group"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1500);
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              <>
                <span className="relative z-10">Coming soon</span>
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 transition-all duration-300 group-hover:w-full"></span>
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  )
}

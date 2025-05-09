"use client"


import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Profile, User } from "@/types/user"
import { api } from "@/api"
export default function ProfileDetails({ user, setUser, setProfile, profile }: { user: User, setUser: (user: User) => void, setProfile: (profile: Profile) => void, profile: Profile }) {
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit =async () => {
    setIsEditing(false)
    const client = await api()
    const res = await client.put("/profile/bio", {
      bio: profile.bio,
    })
    console.log(res)
  }


  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-6 shadow-xl shadow-black/20"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 mr-3 rounded-full"></div>
          Personal Information
        </h2>
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex gap-2"
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-none"
                onClick={handleSubmit}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="display"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                size="sm"
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-zinc-400">
              userName
            </Label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Input
                    id="firstName"
                    name="firstName"
                    disabled={true}
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm py-2 text-white bg-zinc-800/30 rounded-lg px-3 border border-zinc-700/30"
                >
                  {user.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>



          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-400">
              Email
            </Label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    disabled={true}
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm py-2 text-white bg-zinc-800/30 rounded-lg px-3 border border-zinc-700/30"
                >
                  {user.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-zinc-400">
              Date of Birth
            </Label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    disabled={true}
                    value={user.user_data.birth_date}
                    onChange={(e) => setUser({ ...user, user_data: { ...user.user_data, birth_date: e.target.value } })}
                    className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm py-2 text-white bg-zinc-800/30 rounded-lg px-3 border border-zinc-700/30"
                >
                  {(user.user_data.birth_date)}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-zinc-400">
              Gender
            </Label>
            <AnimatePresence mode="wait">
              <motion.p
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm py-2 text-white bg-zinc-800/30 rounded-lg px-3 border border-zinc-700/30 capitalize"
              >
                {user.user_data.gender}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height" className="text-zinc-400">
              Height {user.user_data.height_unit}
            </Label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    disabled={true}
                    value={user.user_data.height}
                    onChange={(e) => setUser({ ...user, user_data: { ...user.user_data, height: e.target.value } })}
                    className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    
                  className="text-sm py-2 text-white bg-zinc-800/30 rounded-lg px-3 border border-zinc-700/30"
                >
                  {user.user_data.height} {user.user_data.height_unit}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-zinc-400">
              Weight {user.user_data.weight_unit}
            </Label>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    disabled={true}
                    value={user.user_data.weight}
                    onChange={(e) => setUser({ ...user, user_data: { ...user.user_data, weight: e.target.value } })}
                    className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.p
                  key="display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm py-2 text-white bg-zinc-800/30 rounded-lg px-3 border border-zinc-700/30"
                >
                  {user.user_data.weight} {user.user_data.weight_unit}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio" className="text-zinc-400">
            Bio
          </Label>
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div key="editing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={4}
                  className="bg-zinc-800/70 border-zinc-700/50 text-white focus:border-blue-500 focus:ring-blue-500/20 rounded-lg"
                />
              </motion.div>
            ) : (
              <motion.p
                key="display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm py-2 text-white bg-zinc-800/30 rounded-lg px-3 border border-zinc-700/30"
              >
                {profile.bio}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* <div className="flex items-center space-x-2 bg-zinc-800/30 p-3 rounded-lg border border-zinc-700/30">
          <Switch
            id="publicProfile"
            checked={formData.publicProfile}
            onCheckedChange={(checked) => handleSwitchChange("publicProfile", checked)}
            disabled={!isEditing}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-blue-400"
          />
          <Label htmlFor="publicProfile" className="text-zinc-300">
            Public Profile
          </Label>
        </div> */}

      </div>
    </motion.section>
  )
}

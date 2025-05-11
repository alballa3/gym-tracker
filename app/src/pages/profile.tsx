import ProfileHeader from "@/components/profile/profile-header"
import ProfileDetails from "@/components/profile/profile-details"
import FitnessGoals from "@/components/profile/fitness-goals"
// import AchievementBadges from "@/components/profile/achievement-badges"
// import ProfileSettings from "@/components/profile/profile-settings"
import { useEffect, useState } from "react"
import { api } from "@/api"
import { Profile, User } from "@/types/user"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { AppHeader } from "@/components/layout/app-header"


export default function ProfilePage() {
  const [user, setUser] = useState<User>()
  const [profile, setProfile] = useState<Profile>()
  useEffect(() => {
    const fetchUser = async () => {
      const client = await api()
      const user = await client.get("/profile")
      setProfile(user.data)
      setUser(user.data.user)
    }
    fetchUser()
  },[])
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white pb-20 pt-4 md:pt-8 px-4">
      <AppHeader/>
      <div className="max-w-5xl mx-auto space-y-8">
        {profile && <ProfileHeader user={profile} setUser={setUser} />}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {user && <ProfileDetails 
              user={user} 
              setUser={setUser} 
              setProfile={(profile: Profile) => setProfile(profile)}
              profile={profile!}
            />}
            {profile && <FitnessGoals profile={profile} />}
            {/* <WorkoutStats /> */}
          </div>

          <div className="space-y-6">
            {/* <AchievementBadges /> */}
            {/* <ProfileSettings /> */}
          </div>
        </div>
      </div>
      <MobileNavigation activeTab={"profile"}/>
    </main>
  )
}

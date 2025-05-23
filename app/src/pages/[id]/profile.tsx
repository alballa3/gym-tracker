import PublicProfileHeader from "@/components/profile/public-profile-header"
import PublicProfileWorkouts from "@/components/profile/public-profile-workouts"
import { useParams } from "react-router"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { AppHeader } from "@/components/layout/app-header"
import { useEffect, useState } from "react"
import { api } from "@/api"
import PublicProfileGoals, { Goal } from "@/components/profile/publicProfilegoals"

interface UserProfile {
  id: number;
  user_id: number;
  bio: string;
  goals: Goal[];
  following: number;
  followers: number;
}

interface Workout {
  id: number;
  name: string;
  created_at: string; // You could use Date if you're converting it later
  user_id: number;
  exercises: string[]; // An array of exercise names
}

export interface UserResponse {
  id: number;
  name: string;
  created_at: string; // You could use Date if you're converting it later
  workouts_count: number;
  workouts: Workout[]; // An array of Workout objects
  profile: UserProfile; // A single UserProfile object
}

export default function PublicProfilePage() {
  // In a real app, you would fetch the user data based on the ID
  const { id } = useParams()
  const [user, setUser] = useState<UserResponse | null>(null)
  useEffect(() => {
    const fetchUser = async () => {
      const client = await api()
      const response = await client.get(`/profile/${id}`)
      setUser(response.data)

      console.log(response.data)
    }
    fetchUser()
  }, [id])
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">
      <AppHeader />
      <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        {user && <PublicProfileHeader user={user} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <PublicProfileStats userId={id as string} /> */}
          {/* <PublicProfileAchievements userId={id as string} /> */}
        </div>
        {user?.profile.goals && <PublicProfileGoals goals={user.profile.goals} />}
        {user && <PublicProfileWorkouts user={user} />}
        <MobileNavigation />
      </main>
    </div>
  )
}

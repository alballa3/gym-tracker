import { Suspense, useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import UserSearchResults from "@/components/users/user-search-results"
import UserSearchSkeleton from "@/components/users/user-search-skeleton"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { AppHeader } from "@/components/layout/app-header"
import { api } from "@/api"
export type UserProfile = {
  user_id: number;
  bio: string;
  followers: number;
};

export type UserWithProfile = {
  id: number;
  name: string;
  workouts_count: number;
  created_at: string;
  profile: UserProfile | null;
};

export default function SearchUsersPage() {
  const [name, setName] = useState("")
  const [users, setUsers] = useState<UserWithProfile[]>([])
  useEffect(() => {
    let handle = async () => {
      const client = await api()
      const res = await client.get("/profile/search", { params: { search: name } });
      setUsers(res.data)
    }
    handle()
  }, [name])
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 px-4 py-6">
      <AppHeader />
      <div className="container max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Find Users</h1>
          <p className="text-zinc-400">Connect with other fitness enthusiasts and track their progress</p>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 border border-white/5 shadow-xl">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
                className="pl-10 bg-zinc-800/50 border-zinc-700/30 rounded-xl h-12 text-white placeholder:text-zinc-500 focus-visible:ring-purple-500/50 focus-visible:border-purple-500/50 transition-all"
              />
            </div>


          </div>
        </div>

        <Tabs defaultValue="results" className="w-full">
          <TabsContent value="results" className="mt-0">
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-xl overflow-hidden">
              <Suspense fallback={<UserSearchSkeleton />}>
                <UserSearchResults users={users} setUsers={setUsers} />
              </Suspense>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <MobileNavigation />
    </main>
  )
}

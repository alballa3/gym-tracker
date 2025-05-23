"use client"

import { Calendar, Dumbbell } from "lucide-react"
import { UserResponse } from "@/pages/[id]/profile"
import moment from "moment"

interface PublicProfileWorkoutsProps {
  user: UserResponse
}


export default function PublicProfileWorkouts({ user }: PublicProfileWorkoutsProps) {
  return (
    <section className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800/50 p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-white">Recent Workouts</h2>
      </div>
      <div className="space-y-4">
        {user.workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-700/30 shadow-sm hover:bg-zinc-800/70 transition-colors cursor-pointer group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{workout.name}</h3>
                <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{moment(workout.created_at).fromNow()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {workout.exercises.map((exercise, i) => (
                <div
                  key={i}
                  className="bg-zinc-700/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-zinc-300 flex items-center gap-1 border border-zinc-600/20"
                >
                  <Dumbbell className="h-3 w-3 text-zinc-400" />
                  {exercise}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

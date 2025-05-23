"use client"

import { Calendar, Target, Dumbbell, Heart, Salad } from "lucide-react"
import moment from "moment"

export interface Goal {
  id: string;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  difficulty: string;
  reminders: null | any;
  isPublic: boolean;
  createdAt: string;
}

interface PublicProfileGoalsProps {
  goals: Goal[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'strength':
      return <Dumbbell className="h-3 w-3 text-zinc-400" />;
    case 'cardio':
      return <Heart className="h-3 w-3 text-zinc-400" />;
    case 'nutrition':
      return <Salad className="h-3 w-3 text-zinc-400" />;
    default:
      return <Target className="h-3 w-3 text-zinc-400" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return "bg-green-500/20 text-green-300 border-green-500/30";
    case 'moderate':
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case 'hard':
      return "bg-red-500/20 text-red-300 border-red-500/30";
    default:
      return "bg-blue-500/20 text-blue-300 border-blue-500/30";
  }
};

export default function PublicProfileGoals({ goals }: PublicProfileGoalsProps) {
  // Filter only public goals if needed in the future
  // const publicGoals = goals.filter(goal => goal.isPublic);
    console.log(goals)
  return (
    <section className="bg-zinc-900/60 backdrop-blur-md rounded-xl border border-zinc-800/50 p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-white">Fitness Goals</h2>
      </div>
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = Math.min(100, (goal.current / goal.target) * 100);
          
          return (
            <div
              key={goal.id}
              className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-4 border border-zinc-700/30 shadow-sm hover:bg-zinc-800/70 transition-colors cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">{goal.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Deadline: {moment(goal.deadline).format('MMM DD, YYYY')}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(goal.difficulty)} border`}>
                  {goal.difficulty}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 mb-4">
                <div className="flex justify-between text-xs text-zinc-400 mb-1">
                  <span>Progress</span>
                  <span>{goal.current} / {goal.target} {goal.unit}</span>
                </div>
                <div className="w-full bg-zinc-700/50 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div
                  className="bg-zinc-700/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-zinc-300 flex items-center gap-1 border border-zinc-600/20"
                >
                  {getCategoryIcon(goal.category)}
                  {goal.category}
                </div>
                <div className="text-xs text-zinc-400">
                  Created {moment(goal.createdAt).fromNow()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
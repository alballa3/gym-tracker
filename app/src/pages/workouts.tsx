"use client"

import { useState, useEffect } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkoutDetailView } from "@/components/history/workout-detail-view"
import { Progress } from "@/components/ui/progress"
import type { HistoryWorkout } from "@/types/history"
import moment from "moment";
import {
  Search,
  Grid3x3Icon as Grid3,
  List,
  CalendarDays,
  Dumbbell,
  Clock,
  BarChart3,
  ChevronRight,
  Filter,
  ArrowUpDown,
  X,
  Flame,
  Calendar,
  Activity,
  Sparkles,
  Zap,
} from "lucide-react"
import { api } from "@/api"

export default function AllWorkoutsPage() {
  const [workouts, setWorkouts] = useState<HistoryWorkout[]>([])
  const [filteredWorkouts, setFilteredWorkouts] = useState<HistoryWorkout[]>([])
  const [selectedWorkout, setSelectedWorkout] = useState<HistoryWorkout | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "calendar">("grid")
  const [sortBy, setSortBy] = useState<"date" | "name" | "timer" | "volume">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterIntensity, setFilterIntensity] = useState<"All" | "Low" | "Medium" | "High">("All")
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)

  // Stats
  const [totalWorkouts, setTotalWorkouts] = useState(0)
  const [totaltimer, setTotaltimer] = useState(0)
  const [totalVolume, setTotalVolume] = useState(0)

  // Load workout data
  useEffect(() => {
    const timer = setTimeout(async() => {
      const client = await api()
      const res = await client.get("/workouts")
      let workoutData = res.data
      setWorkouts(workoutData)

      
      console.log(workouts)
      // setFilteredWorkouts(res.data)
      // setWorkouts(mockWorkoutHistory)
      // setFilteredWorkouts(mockWorkoutHistory)
      
      // Calculate stats
      const total = workouts.length
      const timer = workouts.reduce((acc, workout) => acc + workout.timer, 0)
      // const volume = workouts.reduce((acc, workout) => acc +, 0)

      setTotalWorkouts(total)
      setTotaltimer(timer)
      setTotalVolume(0)

      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Count active filters
  useEffect(() => {
    let count = 0
    if (searchQuery) count++
    if (filterIntensity !== "All") count++
    setActiveFilters(count)
  }, [searchQuery, filterIntensity])

  // Filter and sort workouts
  useEffect(() => {
    let result = [...workouts]

    

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (workout) =>
          workout.name.toLowerCase().includes(query) ||
          workout.exercises.some((ex) => ex.name.toLowerCase().includes(query)),
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "timer":
          comparison = a.timer - b.timer
          break
       
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredWorkouts(result)
  }, [workouts, searchQuery, sortBy, sortOrder, filterIntensity])

  // Handle workout selection
  const handleWorkoutClick = (workout: HistoryWorkout) => {
    setSelectedWorkout(workout)
    setIsDetailOpen(true)
  }


  // Format timer from seconds to minutes
  const formattimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  // Format total timer for stats
  const formatTotaltimer = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setFilterIntensity("All")
    setSortBy("date")
    setSortOrder("desc")
  }




  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="fixed top-0 left-[5%] w-[800px] h-[800px] bg-purple-600/5 rounded-full filter blur-[150px] animate-pulse-slow"></div>
        <div className="fixed bottom-0 right-[10%] w-[900px] h-[900px] bg-blue-600/5 rounded-full filter blur-[150px] animate-pulse-slow animation-delay-1000"></div>
        <div className="fixed top-[40%] right-[5%] w-[700px] h-[700px] bg-cyan-600/5 rounded-full filter blur-[150px] animate-pulse-slow animation-delay-2000"></div>
        <div className="fixed bottom-[10%] left-[15%] w-[600px] h-[600px] bg-violet-600/5 rounded-full filter blur-[150px] animate-pulse-slow animation-delay-3000"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTEyMjciIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjMjAyMjM4IiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.03]"></div>
      </div>

      <AppHeader />

      <main className="flex-1 p-4 md:p-6 pb-20 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 md:mb-8 flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-fadeIn">
              Workout Library
            </h1>
            <p className="text-gray-400 animate-fadeIn animation-delay-150">
              Browse, filter and manage all your workout sessions
            </p>
          </div>

          {/* Stats cards */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fadeIn animation-delay-150">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/70 border border-gray-800/50 rounded-xl p-4 flex items-center group hover:border-violet-900/30 transition-all timer-300 hover:shadow-lg hover:shadow-violet-900/5">
                <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Activity className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Workouts</p>
                  <p className="text-2xl font-bold text-gray-100">{totalWorkouts}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/70 border border-gray-800/50 rounded-xl p-4 flex items-center group hover:border-blue-900/30 transition-all timer-300 hover:shadow-lg hover:shadow-blue-900/5">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Time</p>
                  <p className="text-2xl font-bold text-gray-100">{formatTotaltimer(totaltimer)}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/70 border border-gray-800/50 rounded-xl p-4 flex items-center group hover:border-cyan-900/30 transition-all timer-300 hover:shadow-lg hover:shadow-cyan-900/5">
                <div className="h-12 w-12 rounded-full bg-cyan-500/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Volume</p>
                  <p className="text-2xl font-bold text-gray-100">{totalVolume.toLocaleString()} kg</p>
                </div>
              </div>
            </div>
          )}

          {/* View tabs */}
          <Tabs
            defaultValue="grid"
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list" | "calendar")}
            className="mb-6 animate-fadeIn animation-delay-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <TabsList className="bg-gray-900/50 border border-gray-800 p-1 h-auto">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 px-4 py-2"
                >
                  <Grid3 className="h-4 w-4 mr-2" />
                  Grid
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 px-4 py-2"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
                <TabsTrigger
                  value="calendar"
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400 px-4 py-2"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Calendar
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`bg-gray-900/50 border-gray-800 text-gray-100 hover:bg-gray-800 ${showFilters ? "bg-gray-800 text-cyan-400" : ""}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilters > 0 && (
                    <span className="ml-2 bg-cyan-500 text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                      {activeFilters}
                    </span>
                  )}
                </Button>

                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [newSortBy, newSortOrder] = value.split("-") as [
                      "date" | "name" | "timer" | "volume",
                      "asc" | "desc",
                    ]
                    setSortBy(newSortBy)
                    setSortOrder(newSortOrder)
                  }}
                >
                  <SelectTrigger className="w-[170px] bg-gray-900/50 border-gray-800 text-gray-100">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-gray-100">
                    <SelectItem value="date-desc">Newest first</SelectItem>
                    <SelectItem value="date-asc">Oldest first</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="timer-desc">Longest first</SelectItem>
                    <SelectItem value="timer-asc">Shortest first</SelectItem>
                    <SelectItem value="volume-desc">Highest volume</SelectItem>
                    <SelectItem value="volume-asc">Lowest volume</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter section */}
            {showFilters && (
              <div className="bg-gray-900/70 border border-gray-800/50 rounded-xl p-4 mb-4 animate-fadeIn">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-400 mb-1.5 block">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search workouts or exercises..."
                        className="pl-9 bg-gray-800/50 border-gray-700 text-gray-100 placeholder:text-gray-500 focus-visible:ring-cyan-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-[200px]">
                    <label className="text-sm text-gray-400 mb-1.5 block">Intensity</label>
                    <Select value={filterIntensity} onValueChange={(value) => setFilterIntensity(value as any)}>
                      <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 text-gray-100">
                        <Flame className="h-4 w-4 mr-2 text-amber-500" />
                        <SelectValue placeholder="Intensity" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800 text-gray-100">
                        <SelectItem value="All">All Intensities</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {activeFilters > 0 && (
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-300"
                        onClick={clearFilters}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Results count */}
            <div className="mb-4 text-gray-400 text-sm animate-fadeIn animation-delay-300 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-cyan-400" />
              Showing {filteredWorkouts.length} {filteredWorkouts.length === 1 ? "workout" : "workouts"}
            </div>

            {/* Grid View */}
            <TabsContent value="grid" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-[250px] rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-900/60 border border-gray-800/50 
                      animate-pulse overflow-hidden relative"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-700"></div>
                      <div className="p-4 space-y-4">
                        <div className="h-6 w-2/3 bg-gray-800 rounded-md"></div>
                        <div className="h-4 w-1/3 bg-gray-800 rounded-md"></div>
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((j) => (
                            <div key={j} className="h-16 bg-gray-800/50 rounded-lg"></div>
                          ))}
                        </div>
                        <div className="h-4 w-full bg-gray-800 rounded-md"></div>
                        <div className="h-10 w-full bg-gray-800 rounded-md mt-4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredWorkouts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorkouts.map((workout, index) => {
                    // Calculate completion percentage
                    {console.log(workout)}
                    const completionPercentage = Math.round(((workout.completedSets ?? 0) / (workout.totalSets ?? 1)) * 100)

                    // Determine if this workout has any personal records

                    return (
                      <div
                        key={workout.id}
                        className="bg-gradient-to-br from-gray-900/90 to-gray-950/95 border border-gray-800/50 rounded-xl overflow-hidden 
                        hover:border-cyan-900/50 transition-all timer-300 cursor-pointer group hover:shadow-cyan-900/5 hover:shadow-2xl
                        animate-fadeIn relative"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => handleWorkoutClick(workout)}
                      >
                        <div
                          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r  opacity-80`}
                        ></div>

                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-gray-100 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                {workout.name}
                              </h3>
                              <div className="flex items-center text-gray-400 text-sm mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                <span>{moment(workout.created_at).fromNow()}</span>
                              </div>
                            </div>

                            {/* <Badge className={getIntensityBadgeStyle(workout.intensity)}>
                              {workout.intensity} Intensity
                            </Badge> */}
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-gray-900/70 rounded-lg p-2.5 flex flex-col items-center justify-center border border-gray-800/30 group-hover:border-gray-700/50 transition-colors">
                              <div className="flex items-center text-cyan-400 mb-1">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">timer</span>
                              </div>
                              <span className="font-medium text-gray-200">{formattimer(workout.timer)}</span>
                            </div>

                            <div className="bg-gray-900/70 rounded-lg p-2.5 flex flex-col items-center justify-center border border-gray-800/30 group-hover:border-gray-700/50 transition-colors">
                              <div className="flex items-center text-cyan-400 mb-1">
                                <Dumbbell className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">Exercises</span>
                              </div>
                              <span className="font-medium text-gray-200">{workout.exercises.length}</span>
                            </div>

                            <div className="bg-gray-900/70 rounded-lg p-2.5 flex flex-col items-center justify-center border border-gray-800/30 group-hover:border-gray-700/50 transition-colors">
                              <div className="flex items-center text-cyan-400 mb-1">
                                <BarChart3 className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">Volume</span>
                              </div>
                              <span className="font-medium text-gray-200">{workout.totalVolume} kg</span>
                            </div>
                          </div>

                          <div className="space-y-1.5 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Completion</span>
                              <span
                                className={`font-medium ${completionPercentage === 100 ? "text-green-400" : "text-cyan-400"}`}
                              >
                                {completionPercentage}%
                              </span>
                            </div>
                            <Progress
                              value={completionPercentage}
                              className={
                                completionPercentage === 100
                                  ? "bg-gradient-to-r from-green-500 to-green-400 h-1.5 bg-gray-800/70"
                                  : "bg-gradient-to-r from-cyan-500 to-blue-400 h-1.5 bg-gray-800/70"
                              }
                            />
                          </div>

                          <Button
                            variant="ghost"
                            className="w-full justify-between text-cyan-400 hover:bg-gray-800/70 hover:text-cyan-300 p-2.5 h-auto group-hover:bg-gray-800/50 transition-colors"
                          >
                            <span>View Details</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-900/30 rounded-xl border border-gray-800/30">
                  <div className="bg-gray-800/50 rounded-full p-5 mb-4 border border-gray-700/30">
                    <Dumbbell className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No workouts found</h3>
                  <p className="text-gray-400 max-w-md mb-6">
                    We couldn't find any workouts matching your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-700 hover:text-cyan-300"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* List View */}
            <TabsContent value="list" className="mt-0">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="h-[80px] md:h-[70px] rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-900/60 border border-gray-800/50 
                      animate-pulse overflow-hidden relative p-4"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 to-gray-700"></div>
                      <div className="flex justify-between items-center h-full">
                        <div className="flex-1">
                          <div className="h-5 w-1/3 bg-gray-800 rounded-md mb-2"></div>
                          <div className="h-4 w-1/4 bg-gray-800 rounded-md"></div>
                        </div>
                        <div className="flex gap-3">
                          <div className="h-8 w-20 bg-gray-800 rounded-md"></div>
                          <div className="h-8 w-8 bg-gray-800 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredWorkouts.length > 0 ? (
                <div className="space-y-3">
                  {filteredWorkouts.map((workout, index) => {
                    // const completionPercentage = Math.round((workout.completedSets / workout.totalSets) * 100)


                    return (
                      <div
                        key={workout.id}
                        className="bg-gradient-to-br from-gray-900/90 to-gray-950/95 border border-gray-800/50 rounded-xl overflow-hidden 
                        hover:border-cyan-900/50 transition-all timer-300 cursor-pointer group hover:shadow-cyan-900/5 hover:shadow-xl
                        animate-fadeIn flex flex-col md:flex-row md:items-center p-4 gap-4 relative"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => handleWorkoutClick(workout)}
                      >
                        <div
                          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r  opacity-80`}
                        ></div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg text-gray-100 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                              {workout.name}
                              {/* {hasPersonalRecord && <Trophy className="h-4 w-4 text-amber-400" />} */}
                            </h3>

                            {/* <Badge className={getIntensityBadgeStyle(workout.intensity)}>
                              {workout.intensity} Intensity
                            </Badge> */}
                          </div>

                          <div className="flex items-center text-gray-400 text-sm mb-2">
                            <Calendar className="h-3.5 w-3.5 mr-1.5" />
                            {/* <span>{formatDate(workout.date)}</span> */}
                          </div>

                          <div className="text-sm text-gray-400 hidden md:block">
                            {workout.exercises.slice(0, 3).map((ex, i) => (
                              <span key={ex.id}>
                                {ex.name}
                                {i < Math.min(workout.exercises.length, 3) - 1 ? ", " : ""}
                              </span>
                            ))}
                            {workout.exercises.length > 3 && ` +${workout.exercises.length - 3} more`}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-1 md:mt-0">
                          <div className="flex items-center gap-1 text-gray-300">
                            <Clock className="h-4 w-4 text-cyan-400" />
                            <span>{formattimer(workout.timer)}</span>
                          </div>

                          <div className="flex items-center gap-1 text-gray-300">
                            <Dumbbell className="h-4 w-4 text-cyan-400" />
                            <span>{workout.exercises.length}</span>
                          </div>

                          <div className="flex items-center gap-1 text-gray-300">
                            <BarChart3 className="h-4 w-4 text-cyan-400" />
                            <span>{workout.totalVolume} kg</span>
                          </div>

                          <div className="hidden md:flex items-center gap-1 text-gray-300">
                            <Zap className="h-4 w-4 text-cyan-400" />
                            {/* <span>{completionPercentage}%</span> */}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-cyan-400 hover:bg-gray-800/70 hover:text-cyan-300"
                          >
                            <span className="sr-only md:not-sr-only md:mr-2">Details</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-900/30 rounded-xl border border-gray-800/30">
                  <div className="bg-gray-800/50 rounded-full p-5 mb-4 border border-gray-700/30">
                    <Dumbbell className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No workouts found</h3>
                  <p className="text-gray-400 max-w-md mb-6">
                    We couldn't find any workouts matching your current filters. Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    className="bg-gray-800/50 border-gray-700 text-gray-100 hover:bg-gray-700 hover:text-cyan-300"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Calendar View */}
            <TabsContent value="calendar" className="mt-0">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/95 border border-gray-800/50 rounded-xl p-5">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Calendar View</h3>
                  <p className="text-gray-400">
                    This view is coming soon! You'll be able to see your workouts organized by date.
                  </p>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-gray-400 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const hasWorkout = i % 7 === 2 || i % 7 === 5 || i === 15 || i === 22
                    const isToday = i === 17

                    return (
                      <div
                        key={i}
                        className={`
                          aspect-square rounded-lg border flex items-center justify-center relative
                          ${isToday ? "border-cyan-500 bg-cyan-500/10" : "border-gray-800/50 hover:border-gray-700/70 hover:bg-gray-900/50"}
                          ${hasWorkout ? "cursor-pointer" : ""}
                          transition-colors
                        `}
                      >
                        <span className={`text-sm ${isToday ? "font-bold text-cyan-400" : "text-gray-300"}`}>
                          {i + 1}
                        </span>
                        {hasWorkout && (
                          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex gap-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Workout detail dialog */}
      {selectedWorkout && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-gray-100 max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                {selectedWorkout.name}
                
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(90vh-120px)]">
              <WorkoutDetailView workout={selectedWorkout} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      <MobileNavigation activeTab={"workouts"}  />
    </div>
  )
}

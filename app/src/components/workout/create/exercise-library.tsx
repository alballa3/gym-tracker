"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, Plus, Dumbbell, BarChart, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExerciseDetailModal } from "./exercise-detail-modal"
import { level, type Exercise, type ExerciseLibraryProps } from "@/types/exercise"

// import workout from "../../assets/exercises.json";
// let data: Exercise[] = ;
type PaginationData = {
  total: number
  page: number
  limit: number
  totalPages: number
}
// interface Pagination {
//   data: Exercise[]
//   current_page: number
//   total_pages: number
//   total_items: number
// }

export function ExerciseLibrary({ onSelectExercise }: ExerciseLibraryProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<level | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedForce, setSelectedForce] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 0,
  })
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch exercises from API with pagination and filters
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true)

        // Build query parameters
        const params = new URLSearchParams()
        params.append("page", pagination.page.toString())
        params.append("limit", pagination.limit.toString())

        if (debouncedSearch) params.append("search", debouncedSearch)
        let response = await fetch("/exercises.json")
        let data = await response.json() as Exercise[];
        console.log(response);
        let filteredExercises = data.filter((exercises) => {
          return exercises.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        }).slice(0, pagination.limit)
        setExercises(filteredExercises);


      } catch (err) {
        setError("Failed to load exercises. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExercises()
  }, [debouncedSearch, selectedMuscle, selectedCategory, selectedLevel, pagination.page, pagination.limit])

  // Open exercise detail modal
  const openExerciseModal = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setIsModalOpen(true)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setDebouncedSearch("")
    setSelectedMuscle(null)
    setSelectedLevel(null)
    setSelectedCategory(null)
    setSelectedForce(null)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }))
    }
  }

  // Get unique muscle groups, levels, and categories from exercises




  // Generate placeholder image URL based on exercise name


  if (isLoading && exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-purple-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-blue-400 animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-t-2 border-b-2 border-cyan-300 animate-spin animation-delay-300"></div>
        </div>
        <p className="text-gray-300 mt-4 font-medium">Loading exercise library...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64 text-red-400">
        <p>{error}</p>
        <Button
          variant="outline"
          className="mt-4 border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
          onClick={() => setPagination((prev) => ({ ...prev, page: 1 }))}
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/95 to-gray-950 border-gray-800/50 shadow-xl rounded-2xl overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-blue-400 to-cyan-400"></div>
      <div className="p-4">
        <div className="flex flex-col space-y-4">
          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-4 backdrop-blur-sm">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-hover:text-purple-400" />
              <Input
                placeholder="Search exercises..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white transition-all 
                hover:bg-gray-800/70 focus:ring-2 focus:ring-purple-500/20 rounded-xl"
              />
            </div>
            <Select
              value={pagination.limit.toString()}
              onValueChange={(value) => setPagination((prev) => ({ ...prev, page: 1, limit: Number.parseInt(value) }))}
            >
              <SelectTrigger className="w-[130px] bg-gray-800/50 border-gray-700/50 focus:border-purple-500/50 text-white 
              hover:bg-gray-800/70 transition-all rounded-xl focus:ring-2 focus:ring-purple-500/20">
                <SelectValue placeholder="Per page" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800/90 border-gray-700 text-white backdrop-blur-lg rounded-xl">
                {[3, 6, 9, 12, 24].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="hover:bg-purple-500/20 focus:bg-purple-500/20 transition-colors"
                  >
                    {num} per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={clearFilters}
              disabled={!searchQuery && !selectedMuscle && !selectedLevel && !selectedCategory && !selectedForce}
              className="h-10 w-10 border-gray-700 bg-gray-800/30 text-gray-400 
              hover:bg-gray-800 hover:text-purple-400 disabled:opacity-30 transition-all
              rounded-xl focus:ring-2 focus:ring-purple-500/20"
            >
              <Filter className="h-4 w-4 transition-transform hover:scale-110" />
            </Button>
          </div>

          {/* Exercise list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.length > 0 ? (
              exercises.map((exercise) => (
                <Card
                  key={exercise.id}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/80 border-gray-800/50 hover:border-purple-500/30 transition-all shadow-md overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-400 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white text-lg flex items-center gap-2 truncate">
                          {exercise.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-1">{exercise.instructions?.[0]}</CardDescription>
                      </div>
                      <Button
                        onClick={() => onSelectExercise(exercise)}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl text-sm shadow-md shadow-purple-900/20 border-0 whitespace-nowrap"
                      >
                        <Plus className="h-4 w-4 mr-1.5" />
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exercise.primaryMuscles?.map((muscle) => (
                        <Badge
                          key={muscle}
                          variant="outline"
                          className="bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
                        >
                          {muscle}
                        </Badge>
                      ))}
                      <Badge
                        variant="outline"
                        className={`
      ${exercise.level === level.beginner
                            ? "bg-green-500/10 text-green-300 border-green-500/30"
                            : ""
                          }
      ${exercise.level === level.intermediate
                            ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                            : ""
                          }
      ${exercise.level === level.advanced      // ← added the missing “?”
                            ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                            : ""
                          }
                          }
  `}
                      >
                        {exercise.level}
                      </Badge>

                    </div>
                  </CardHeader>

                  <div className="px-6 pb-1">
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Dumbbell className="h-3.5 w-3.5 text-purple-400" />
                        <span>{exercise.equipment}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BarChart className="h-3.5 w-3.5 text-purple-400" />
                        <span>{exercise.mechanic || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <CardFooter className="pt-2 pb-4 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-300 hover:text-purple-200 hover:bg-gray-800/70"
                      onClick={() => openExerciseModal(exercise)}
                    >
                      <Info className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl text-sm shadow-md shadow-purple-900/20 border-0"
                      onClick={() => onSelectExercise(exercise)}
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      Add to Workout
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-gray-400 col-span-2">
                <div className="bg-gray-800/30 p-4 rounded-full mb-4">
                  <Dumbbell className="h-8 w-8 text-purple-300 opacity-50" />
                </div>
                <p className="text-center">No exercises found matching your criteria.</p>
                <Button variant="link" className="text-purple-300 hover:text-purple-200 mt-2" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="border-gray-700 bg-gray-800/30 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {(() => {
                  const pageNumbers = [];
                  const currentPage = pagination.page;
                  const totalPages = pagination.totalPages;

                  // Always show first page
                  if (currentPage > 3) {
                    pageNumbers.push(1);
                    if (currentPage > 4) pageNumbers.push('...');
                  }

                  // Calculate range around current page
                  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                    pageNumbers.push(i);
                  }

                  // Always show last page
                  if (currentPage < totalPages - 2) {
                    if (currentPage < totalPages - 3) pageNumbers.push('...');
                    pageNumbers.push(totalPages);
                  }

                  return pageNumbers.map((page, index) =>
                    typeof page === 'number' ? (
                      <Button
                        key={index}
                        variant={pagination.page === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={
                          pagination.page === page
                            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 h-8 w-8 p-0"
                            : "border-gray-700 bg-gray-800/30 text-gray-300 hover:bg-gray-800 hover:text-white h-8 w-8 p-0"
                        }
                      >
                        {page}
                      </Button>
                    ) : (
                      <span key={index} className="text-gray-500 px-1">
                        {page}
                      </span>
                    )
                  );
                })()}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="border-gray-700 bg-gray-800/30 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExercise={onSelectExercise}
      />
    </div >
  )
}

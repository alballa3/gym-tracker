"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft, Sparkles, Target, Check, Dumbbell, Heart, Shield,
  Flame, ArrowDown, Search, X, ChevronDown,
  RotateCcw, Zap, Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MuscleGroup } from "@/types/workout"

interface MuscleGroupStepProps {
  selectedMuscleGroups: MuscleGroup[]
  toggleMuscleGroup: (muscleGroup: MuscleGroup) => void
  onGenerate: () => void
  onPrev: () => void
  isGenerating: boolean
}

export function MuscleGroupStep({
  selectedMuscleGroups,
  toggleMuscleGroup,
  onGenerate,
  onPrev,
  isGenerating,
}: MuscleGroupStepProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoverEffect, setHoverEffect] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  // Enhanced muscle group options with categories
  const muscleGroupData = useMemo(() => [
    { name: "Full Body", category: "Complete" },
    { name: "Upper Body", category: "Complete" },
    { name: "Lower Body", category: "Complete" },
    { name: "Push", category: "Training Split" },
    { name: "Pull", category: "Training Split" },
    { name: "Legs", category: "Complete" },
    { name: "Core", category: "Specific" },
    { name: "Back", category: "Specific" },
    { name: "Chest", category: "Specific" },
    { name: "Arms", category: "Specific" },
    { name: "Shoulders", category: "Specific" },
    { name: "Biceps", category: "Detailed" },
    { name: "Triceps", category: "Detailed" },
    { name: "Forearms", category: "Detailed" },
    { name: "Traps", category: "Detailed" },
    { name: "Lats", category: "Detailed" },
    { name: "Abs", category: "Detailed" },
    { name: "Obliques", category: "Detailed" },
    { name: "Lower Back", category: "Detailed" },
    { name: "Quads", category: "Detailed" },
    { name: "Hamstrings", category: "Detailed" },
    { name: "Glutes", category: "Detailed" },
    { name: "Calves", category: "Detailed" },
  ] as const, [])

  // Get unique categories
  const categories = useMemo(() =>
    Array.from(new Set(muscleGroupData.map(item => item.category))),
    [muscleGroupData])

  // Filter muscle groups based on search and category
  const filteredMuscleGroups = useMemo(() => {
    let filtered = muscleGroupData.map(item => item.name) as MuscleGroup[]

    if (searchQuery) {
      filtered = filtered.filter(muscle =>
        muscle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (activeCategory) {
      filtered = muscleGroupData
        .filter(item => item.category === activeCategory)
        .map(item => item.name) as MuscleGroup[]
    }

    return filtered
  }, [muscleGroupData, searchQuery, activeCategory])

  useEffect(() => {
    setIsLoaded(true)

    // Auto-scroll to bring generate button into view after selections
    if (selectedMuscleGroups.length > 0) {
      const timer = setTimeout(() => {
        document.getElementById('generate-button')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [selectedMuscleGroups])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
  }

  const muscleGroupIcons: Record<string, React.ReactNode> = {
    "Full Body": <Flame className="h-4 w-4" />,
    "Upper Body": <Dumbbell className="h-4 w-4" />,
    "Lower Body": <ArrowDown className="h-4 w-4" />,
    "Core": <Shield className="h-4 w-4" />,
    "Back": <Dumbbell className="h-4 w-4 rotate-45" />,
    "Chest": <Heart className="h-4 w-4" />,
    "Arms": <Dumbbell className="h-4 w-4" />,
    "Shoulders": <Dumbbell className="h-4 w-4 -rotate-45" />,
    "Legs": <ArrowDown className="h-4 w-4" />,
    "Push": <Zap className="h-4 w-4" />,
    "Pull": <RotateCcw className="h-4 w-4" />,
    "Biceps": <Dumbbell className="h-4 w-4" />,
    "Triceps": <Dumbbell className="h-4 w-4 rotate-90" />,
    "Forearms": <Dumbbell className="h-4 w-4 rotate-45" />,
    "Traps": <Layers className="h-4 w-4" />,
    "Lats": <Layers className="h-4 w-4 rotate-90" />,
    "Abs": <Shield className="h-4 w-4" />,
    "Obliques": <Shield className="h-4 w-4 rotate-45" />,
    "Lower Back": <Shield className="h-4 w-4 rotate-180" />,
    "Quads": <ArrowDown className="h-4 w-4" />,
    "Hamstrings": <ArrowDown className="h-4 w-4 rotate-180" />,
    "Glutes": <Shield className="h-4 w-4 rotate-180" />,
    "Calves": <ArrowDown className="h-4 w-4" />,
  }

  const handleSelection = (muscle: MuscleGroup) => {
    toggleMuscleGroup(muscle)

    // If selecting Full Body, clear other selections
    if (muscle === "Full Body" && !selectedMuscleGroups.includes("Full Body")) {
      filteredMuscleGroups.forEach(group => {
        if (group !== "Full Body" && selectedMuscleGroups.includes(group)) {
          toggleMuscleGroup(group)
        }
      })
    }

    // If selecting anything else while Full Body is selected, remove Full Body
    if (muscle !== "Full Body" && selectedMuscleGroups.includes("Full Body")) {
      toggleMuscleGroup("Full Body")
    }
  }

  const clearSelections = () => {
    selectedMuscleGroups.forEach(group => {
      toggleMuscleGroup(group)
    })
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 w-full max-w-3xl mx-auto px-3 sm:px-0"
    >
      <motion.div variants={item} className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
              className="p-3 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 rounded-2xl shadow-lg shadow-fuchsia-900/10"
            >
              <Target className="h-6 w-6 text-fuchsia-300" />
            </motion.div>
            <div>
              <h3 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                Target Muscle Groups
              </h3>
              <p className="text-zinc-400 text-sm md:text-base">Select areas you want to focus on</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search muscles..."
                    className="bg-zinc-800/70 border border-zinc-700/50 rounded-xl py-2 px-3 text-sm text-zinc-200 w-full focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 placeholder:text-zinc-500"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-xl bg-zinc-800/70 border-zinc-700/50 hover:bg-zinc-700/70"
            >
              <Search className="h-4 w-4 text-zinc-400" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setActiveCategory(null)
                setSearchQuery("")
              }}
              disabled={!activeCategory && !searchQuery}
              className={cn(
                "rounded-xl bg-zinc-800/70 border-zinc-700/50 hover:bg-zinc-700/70",
                (!activeCategory && !searchQuery) && "opacity-50 cursor-not-allowed"
              )}
            >
              <RotateCcw className="h-4 w-4 text-zinc-400" />
            </Button>
          </div>
        </div>

        {/* Category filters */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-2"
        >
          {categories.map(category => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
              className={cn(
                "rounded-xl text-xs font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-gradient-to-r from-fuchsia-600/30 to-violet-600/30 border-fuchsia-500/50 text-fuchsia-200"
                  : "bg-zinc-800/40 border-zinc-700/30 text-zinc-400 hover:text-zinc-200"
              )}
            >
              {category}
              {activeCategory === category ? (
                <X className="ml-1 h-3 w-3" />
              ) : (
                <ChevronDown className="ml-1 h-3 w-3" />
              )}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 perspective-1000">
          {filteredMuscleGroups.map((muscle, index) => (
            <motion.div
              key={muscle}
              variants={item}
              onClick={() => handleSelection(muscle)}
              onMouseEnter={() => setHoverEffect(muscle)}
              onMouseLeave={() => setHoverEffect(null)}
              className={cn(
                "relative overflow-hidden flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm",
                selectedMuscleGroups.includes(muscle)
                  ? "bg-gradient-to-br from-fuchsia-900/40 to-violet-900/40 border-fuchsia-700/50 text-fuchsia-200 shadow-lg shadow-fuchsia-900/30"
                  : "bg-zinc-800/40 border-zinc-700/30 text-zinc-300 hover:bg-zinc-800/70 hover:border-zinc-600/50 hover:shadow-md hover:shadow-zinc-900/10",
              )}
              whileHover={{
                scale: 1.03,
                rotateY: muscle === hoverEffect ? [0, 2, -2, 0] : 0,
                transition: { rotateY: { repeat: 0, duration: 0.5 } }
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {selectedMuscleGroups.includes(muscle) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layoutId={`bg-${muscle}`}
                />
              )}
              <div
                className={cn(
                  "min-w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300",
                  selectedMuscleGroups.includes(muscle)
                    ? "border-fuchsia-400 bg-gradient-to-br from-fuchsia-500 to-violet-500"
                    : "border-zinc-600 bg-zinc-800/70",
                )}
              >
                {selectedMuscleGroups.includes(muscle) ? (
                  <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Check className="h-5 w-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{
                      scale: hoverEffect === muscle ? [1, 1.2, 1] : 1,
                      rotate: isLoaded ? [0, muscle === hoverEffect ? 5 : 0, muscle === hoverEffect ? -5 : 0, 0] : 0
                    }}
                    transition={{
                      scale: { duration: 0.3 },
                      rotate: { delay: index * 0.1 + 0.5, duration: 0.5 }
                    }}
                  >
                    {muscleGroupIcons[muscle] || <Dumbbell className="h-4 w-4" />}
                  </motion.div>
                )}
              </div>
              <span className="text-sm font-medium">{muscle}</span>

              {/* Selection sparkle effect */}
              <AnimatePresence>
                {selectedMuscleGroups.includes(muscle) && (
                  <motion.div
                    className="absolute top-0 right-0 p-1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Sparkles className="h-3 w-3 text-fuchsia-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {filteredMuscleGroups.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-800/40 border border-zinc-700/30 rounded-xl p-4 text-center"
          >
            <p className="text-zinc-400">No muscle groups match your search</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory(null)
              }}
              className="text-fuchsia-300 hover:text-fuchsia-200 mt-1"
            >
              Clear filters
            </Button>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedMuscleGroups.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-2 mt-2"
            >
              <div className="p-1 bg-amber-500/20 rounded-lg">
                <Target className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-amber-300 text-sm">
                Select at least one muscle group to target
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedMuscleGroups.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2"
            >
              <motion.div
                className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-xl p-4"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", damping: 20 }}
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-zinc-200">
                    <span className="font-semibold text-fuchsia-300">Selected: </span>
                    <span className="bg-gradient-to-r from-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                      {selectedMuscleGroups.join(", ")}
                    </span>
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSelections}
                    className="h-7 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/70"
                  >
                    Clear all
                  </Button>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {selectedMuscleGroups.includes("Full Body")
                    ? "This will create a comprehensive workout routine targeting all major muscle groups."
                    : `This will create a specialized routine focusing on your selected ${selectedMuscleGroups.length > 1 ? 'areas' : 'area'}.`
                  }
                </p>

                {/* Muscle group chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedMuscleGroups.map(muscle => (
                    <motion.div
                      key={`chip-${muscle}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="bg-fuchsia-500/20 border border-fuchsia-500/30 rounded-full px-3 py-1 flex items-center gap-1"
                    >
                      <span className="text-xs text-fuchsia-200">{muscle}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelection(muscle)
                        }}
                        className="text-fuchsia-300 hover:text-fuchsia-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        variants={item}
        className="flex flex-col sm:flex-row justify-between gap-3 pt-4 sticky bottom-0 pb-6 bg-gradient-to-t from-black to-transparent"
      >
        <Button
          onClick={onPrev}
          variant="outline"
          className="order-2 sm:order-1 relative overflow-hidden group border-zinc-700 bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
        >
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.span>
          <span>Back</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-zinc-700/0 via-zinc-700/10 to-zinc-700/0"
            initial={{ x: "100%" }}
            whileHover={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </Button>

        <Button
          id="generate-button"
          onClick={onGenerate}
          disabled={isGenerating || selectedMuscleGroups.length === 0}
          className={`order-1 sm:order-2 relative overflow-hidden bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 h-12 text-base font-medium rounded-xl shadow-lg transition-all duration-300 group flex items-center gap-3 px-6 ${isGenerating || selectedMuscleGroups.length === 0 ? "opacity-50 cursor-not-allowed" : "shadow-violet-900/30 hover:shadow-violet-900/50"
            }`}
        >
          <motion.div
            animate={isGenerating
              ? { rotate: 360 }
              : selectedMuscleGroups.length > 0
                ? { scale: [1, 1.1, 1], transition: { repeat: Infinity, repeatType: "reverse", duration: 1.5 } }
                : {}
            }
            transition={isGenerating ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
            className="relative"
          >
            <Sparkles className="h-5 w-5" />
            {isGenerating && (
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>

          <span className="font-semibold group-hover:tracking-wide transition-all duration-300 z-10">
            {isGenerating ? "Creating Workout..." : "Generate My Workout"}
          </span>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-white/20 to-blue-600/0"
            initial={{ x: "100%" }}
            whileHover={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Pulsing border animation when selections are made */}
          {selectedMuscleGroups.length > 0 && !isGenerating && (
            <motion.div
              className="absolute -inset-[1px] rounded-xl z-0"
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #8b5cf6)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "200% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          )}
        </Button>
      </motion.div>
    </motion.div>
  )
}
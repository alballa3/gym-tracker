"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  Eye,
  Globe,
  Lock,
  Users,
  UserX,
  Shield,
  CheckCircle2,
  X,
  Info,
  Search,
  RotateCcw,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Bell,
  User,
  FileText,
  Database,
  ChevronDown,
  Smartphone,
  Laptop,
  Tablet,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

interface PrivacySettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type PrivacyOption = {
  key: string
  label: string
  description: string
  category: "visibility" | "data" | "social"
  recommended?: boolean
  icon: React.ReactNode
}

export default function PrivacySettingsModal({ open, onOpenChange }: PrivacySettingsModalProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [profileVisibility, setProfileVisibility] = useState<"public" | "friends" | "private">("friends")
  const [searchQuery, setSearchQuery] = useState("")
  const [completionPercentage, setCompletionPercentage] = useState(65)
  const [showRecommended, setShowRecommended] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  // Device preview state
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet" | "desktop">("desktop")

  const privacyOptions: PrivacyOption[] = [
    {
      key: "showWorkoutHistory",
      label: "Show workout history",
      description: "Allow others to view your past workouts and achievements",
      category: "visibility",
      recommended: true,
      icon: <FileText className="h-4 w-4 text-blue-400" />,
    },
    {
      key: "showAchievements",
      label: "Display achievements",
      description: "Show your badges and accomplishments on your profile",
      category: "visibility",
      recommended: true,
      icon: <Sparkles className="h-4 w-4 text-amber-400" />,
    },
    {
      key: "showStats",
      label: "Share workout statistics",
      description: "Display your workout stats and progress metrics",
      category: "visibility",
      recommended: true,
      icon: <ChevronRight className="h-4 w-4 text-green-400" />,
    },
    {
      key: "allowDataCollection",
      label: "Allow anonymous data collection",
      description: "Help improve the app by sharing anonymous usage data",
      category: "data",
      recommended: false,
      icon: <Database className="h-4 w-4 text-purple-400" />,
    },
    {
      key: "showRealName",
      label: "Show real name instead of username",
      description: "Display your full name on your profile instead of username",
      category: "social",
      recommended: false,
      icon: <User className="h-4 w-4 text-indigo-400" />,
    },
    {
      key: "allowTagging",
      label: "Allow others to tag you",
      description: "Let friends tag you in workouts and achievements",
      category: "social",
      recommended: true,
      icon: <Bell className="h-4 w-4 text-red-400" />,
    },
  ]

  const [settings, setSettings] = useState<Record<string, boolean>>({
    showWorkoutHistory: true,
    showAchievements: true,
    showStats: true,
    allowDataCollection: false,
    showRealName: false,
    allowTagging: true,
  })

  // Calculate completion percentage based on settings configured
  useEffect(() => {
    const totalOptions = privacyOptions.length + 1 // +1 for profile visibility
    const configuredOptions = Object.values(settings).filter(Boolean).length + 1 // +1 for profile visibility
    setCompletionPercentage(Math.round((configuredOptions / totalOptions) * 100))
  }, [settings, privacyOptions.length])

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleResetToDefaults = () => {
    setProfileVisibility("friends")
    setSettings({
      showWorkoutHistory: true,
      showAchievements: true,
      showStats: true,
      allowDataCollection: false,
      showRealName: false,
      allowTagging: true,
    })
  }

  const handleSave = () => {
    console.log("Saving privacy settings:", { profileVisibility, settings })
    // Here you would save the settings to your backend
    onOpenChange(false)
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Filter options based on search query
  const filteredOptions = privacyOptions
    .filter((option) => {
      if (searchQuery === "") return true
      return (
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
    .filter((option) => {
      if (activeTab === "general") return true
      if (activeTab === "visibility") return option.category === "visibility"
      if (activeTab === "social") return option.category === "social"
      if (activeTab === "data") return option.category === "data"
      if (activeTab === "recommended" && showRecommended) return option.recommended
      return true
    })

  // Group options by category for mobile view
  const groupedOptions = {
    visibility: filteredOptions.filter((option) => option.category === "visibility"),
    social: filteredOptions.filter((option) => option.category === "social"),
    data: filteredOptions.filter((option) => option.category === "data"),
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0.1 } : { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  // Determine modal width based on preview device
  const getModalWidth = () => {
    switch (previewDevice) {
      case "mobile":
        return "sm:max-w-[350px]"
      case "tablet":
        return "sm:max-w-[450px]"
      case "desktop":
      default:
        return "sm:max-w-[550px]"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={modalRef}
        className={cn(
          getModalWidth(),
          "bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/50 text-white backdrop-blur-xl shadow-xl rounded-xl overflow-hidden max-h-[85vh] flex flex-col",
        )}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] opacity-20" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-[0.15] blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-[0.15] blur-[100px]" />
        </div>

        {/* Device preview controls (only visible in desktop) */}
        {!isMobile && !isTablet && (
          <div className="absolute top-3 right-12 flex items-center gap-1 z-20">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full h-6 w-6 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white",
                      previewDevice === "mobile" && "text-blue-400 bg-blue-900/20",
                    )}
                    onClick={() => setPreviewDevice("mobile")}
                  >
                    <Smartphone className="h-3 w-3" />
                    <span className="sr-only">Mobile view</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Mobile preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full h-6 w-6 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white",
                      previewDevice === "tablet" && "text-blue-400 bg-blue-900/20",
                    )}
                    onClick={() => setPreviewDevice("tablet")}
                  >
                    <Tablet className="h-3 w-3" />
                    <span className="sr-only">Tablet view</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tablet preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full h-6 w-6 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white",
                      previewDevice === "desktop" && "text-blue-400 bg-blue-900/20",
                    )}
                    onClick={() => setPreviewDevice("desktop")}
                  >
                    <Laptop className="h-3 w-3" />
                    <span className="sr-only">Desktop view</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Desktop preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <DialogHeader className="relative z-10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-80" />

          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-blue-400" />
              Privacy Settings
            </DialogTitle>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Close dialog</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <DialogDescription className="text-zinc-400">
            Control how your profile information is shared and used
          </DialogDescription>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 relative h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs text-zinc-400">{completionPercentage}% Complete</span>
          </div>
        </DialogHeader>

        <div className="relative z-10 flex-1 overflow-auto">
          {/* Desktop/Tablet Navigation */}
          {!isMobile && (
            <div className="p-1 sticky top-0 z-20 backdrop-blur-md bg-zinc-900/80 border-b border-zinc-800/50 mb-4">
              <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className={cn("grid bg-zinc-800/50 p-1", isTablet ? "grid-cols-3" : "grid-cols-5")}>
                  <TabsTrigger
                    value="general"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="visibility"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Visibility
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                  >
                    Social
                  </TabsTrigger>
                  {!isTablet && (
                    <>
                      <TabsTrigger
                        value="data"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                      >
                        Data
                      </TabsTrigger>
                      <TabsTrigger
                        value="recommended"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                        onClick={() => setShowRecommended(true)}
                      >
                        <Sparkles className="h-3 w-3 mr-1" />
                        Recommended
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>
                {isTablet && (
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    <TabsTrigger
                      value="data"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                    >
                      Data
                    </TabsTrigger>
                    <TabsTrigger
                      value="recommended"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                      onClick={() => setShowRecommended(true)}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      Recommended
                    </TabsTrigger>
                  </div>
                )}
              </Tabs>

              <div className="mt-3 px-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    placeholder="Search privacy settings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-zinc-800/50 border-zinc-700/50 text-zinc-300 placeholder:text-zinc-500 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500 hover:text-zinc-300"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <div className="p-2 sticky top-0 z-20 backdrop-blur-md bg-zinc-900/80 border-b border-zinc-800/50 mb-4 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Search privacy settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-zinc-800/50 border-zinc-700/50 text-zinc-300 placeholder:text-zinc-500 focus:ring-blue-500 focus:border-blue-500"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500 hover:text-zinc-300"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Clear search</span>
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-1">
                <Button
                  variant={activeTab === "general" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs h-8",
                    activeTab === "general"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400",
                  )}
                  onClick={() => setActiveTab("general")}
                >
                  All Settings
                </Button>
                <Button
                  variant={activeTab === "recommended" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs h-8",
                    activeTab === "recommended"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400",
                  )}
                  onClick={() => {
                    setActiveTab("recommended")
                    setShowRecommended(true)
                  }}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Recommended
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-1">
                <Button
                  variant={activeTab === "visibility" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs h-8",
                    activeTab === "visibility"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400",
                  )}
                  onClick={() => setActiveTab("visibility")}
                >
                  Visibility
                </Button>
                <Button
                  variant={activeTab === "social" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs h-8",
                    activeTab === "social"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400",
                  )}
                  onClick={() => setActiveTab("social")}
                >
                  Social
                </Button>
                <Button
                  variant={activeTab === "data" ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs h-8",
                    activeTab === "data"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400",
                  )}
                  onClick={() => setActiveTab("data")}
                >
                  Data
                </Button>
              </div>
            </div>
          )}

          <div className={cn("space-y-6", isMobile ? "px-3" : "px-6")}>
            {/* Profile Visibility Section */}
            {(activeTab === "general" ||
              activeTab === "visibility" ||
              (activeTab === "recommended" && showRecommended)) && (
              <motion.div className="space-y-3" initial="hidden" animate="visible" variants={containerVariants}>
                <motion.h3
                  className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                  variants={itemVariants}
                >
                  <Eye className="h-4 w-4 text-blue-500" />
                  Profile Visibility
                  {activeTab === "recommended" && (
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">
                      Recommended
                    </span>
                  )}
                </motion.h3>

                <RadioGroup
                  value={profileVisibility}
                  onValueChange={(value) => setProfileVisibility(value as "public" | "friends" | "private")}
                  className={cn("grid gap-2", isMobile ? "grid-cols-1" : "grid-cols-3")}
                >
                  <motion.div variants={itemVariants}>
                    <RadioGroupItem value="public" id="public" className="peer sr-only" />
                    <Label
                      htmlFor="public"
                      className={cn(
                        "flex items-center justify-between rounded-lg border-2 border-zinc-800 bg-zinc-900/50 p-3 hover:bg-zinc-800/50 hover:border-blue-600/50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-600/10 [&:has([data-state=checked])]:border-blue-600 cursor-pointer transition-all",
                        isMobile && "flex-row",
                      )}
                    >
                      <div className={cn("flex items-center gap-3", isMobile ? "flex-row" : "flex-col")}>
                        <Globe
                          className={cn(
                            "text-zinc-400 peer-data-[state=checked]:text-blue-600",
                            isMobile ? "h-5 w-5" : "h-5 w-5 mb-2",
                          )}
                        />
                        <span className="text-sm font-medium">Public</span>
                      </div>
                      {isMobile && (
                        <div className="h-4 w-4 rounded-full border-2 border-zinc-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500 flex items-center justify-center">
                          {profileVisibility === "public" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      )}
                    </Label>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <RadioGroupItem value="friends" id="friends" className="peer sr-only" />
                    <Label
                      htmlFor="friends"
                      className={cn(
                        "flex items-center justify-between rounded-lg border-2 border-zinc-800 bg-zinc-900/50 p-3 hover:bg-zinc-800/50 hover:border-blue-600/50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-600/10 [&:has([data-state=checked])]:border-blue-600 cursor-pointer transition-all",
                        isMobile && "flex-row",
                      )}
                    >
                      <div className={cn("flex items-center gap-3", isMobile ? "flex-row" : "flex-col")}>
                        <Users
                          className={cn(
                            "text-zinc-400 peer-data-[state=checked]:text-blue-600",
                            isMobile ? "h-5 w-5" : "h-5 w-5 mb-2",
                          )}
                        />
                        <span className="text-sm font-medium">Friends</span>
                      </div>
                      {isMobile && (
                        <div className="h-4 w-4 rounded-full border-2 border-zinc-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500 flex items-center justify-center">
                          {profileVisibility === "friends" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      )}
                    </Label>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <RadioGroupItem value="private" id="private" className="peer sr-only" />
                    <Label
                      htmlFor="private"
                      className={cn(
                        "flex items-center justify-between rounded-lg border-2 border-zinc-800 bg-zinc-900/50 p-3 hover:bg-zinc-800/50 hover:border-blue-600/50 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-600/10 [&:has([data-state=checked])]:border-blue-600 cursor-pointer transition-all",
                        isMobile && "flex-row",
                      )}
                    >
                      <div className={cn("flex items-center gap-3", isMobile ? "flex-row" : "flex-col")}>
                        <Lock
                          className={cn(
                            "text-zinc-400 peer-data-[state=checked]:text-blue-600",
                            isMobile ? "h-5 w-5" : "h-5 w-5 mb-2",
                          )}
                        />
                        <span className="text-sm font-medium">Private</span>
                      </div>
                      {isMobile && (
                        <div className="h-4 w-4 rounded-full border-2 border-zinc-600 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-500 flex items-center justify-center">
                          {profileVisibility === "private" && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      )}
                    </Label>
                  </motion.div>
                </RadioGroup>
              </motion.div>
            )}

            {/* Privacy Options */}
            <motion.div className="space-y-3" initial="hidden" animate="visible" variants={containerVariants}>
              {filteredOptions.length > 0 ? (
                <>
                  <motion.h3
                    className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                    variants={itemVariants}
                  >
                    <Shield className="h-4 w-4 text-blue-500" />
                    Privacy Options
                  </motion.h3>

                  {/* Mobile Collapsible Sections */}
                  {isMobile && activeTab === "general" && (
                    <div className="space-y-2">
                      {Object.entries(groupedOptions).map(
                        ([category, options]) =>
                          options.length > 0 && (
                            <Collapsible
                              key={category}
                              open={expandedSection === category}
                              onOpenChange={() => toggleSection(category)}
                              className="border border-zinc-800/50 rounded-lg overflow-hidden"
                            >
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-zinc-900/70 hover:bg-zinc-800/50 transition-colors">
                                <div className="flex items-center gap-2">
                                  {category === "visibility" && <Eye className="h-4 w-4 text-blue-400" />}
                                  {category === "social" && <Users className="h-4 w-4 text-indigo-400" />}
                                  {category === "data" && <Database className="h-4 w-4 text-purple-400" />}
                                  <span className="text-sm font-medium capitalize">{category}</span>
                                  <span className="text-xs text-zinc-500">({options.length})</span>
                                </div>
                                <ChevronDown
                                  className={cn(
                                    "h-4 w-4 text-zinc-500 transition-transform",
                                    expandedSection === category && "transform rotate-180",
                                  )}
                                />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="bg-zinc-900/30 border-t border-zinc-800/50">
                                <div className="p-2 space-y-2">
                                  {options.map((option, index) => (
                                    <PrivacyOptionCard
                                      key={option.key}
                                      option={option}
                                      checked={settings[option.key] || false}
                                      onToggle={() => handleToggle(option.key)}
                                      isMobile={isMobile}
                                      index={index}
                                    />
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ),
                      )}
                    </div>
                  )}

                  {/* Desktop/Tablet or Filtered View */}
                  {(!isMobile || activeTab !== "general") && (
                    <div className="space-y-3">
                      <AnimatePresence>
                        {filteredOptions.map((option, index) => (
                          <PrivacyOptionCard
                            key={option.key}
                            option={option}
                            checked={settings[option.key] || false}
                            onToggle={() => handleToggle(option.key)}
                            isMobile={isMobile}
                            index={index}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  className="flex flex-col items-center justify-center py-8 text-center"
                  variants={itemVariants}
                >
                  <Search className="h-10 w-10 text-zinc-700 mb-3" />
                  <h3 className="text-zinc-400 font-medium">No settings match your search</h3>
                  <p className="text-zinc-600 text-sm mt-1">Try a different search term or category</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-zinc-800 text-zinc-400 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear search
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Data Management */}
            {(activeTab === "general" || activeTab === "data") && (
              <motion.div className="space-y-3" initial="hidden" animate="visible" variants={containerVariants}>
                <motion.h3
                  className="text-sm font-medium text-zinc-300 flex items-center gap-2"
                  variants={itemVariants}
                >
                  <UserX className="h-4 w-4 text-blue-500" />
                  Data Management
                </motion.h3>

                <motion.div
                  className={cn("grid gap-2", isMobile ? "grid-cols-1" : "grid-cols-2")}
                  variants={itemVariants}
                >
                  <Button
                    variant="outline"
                    className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2"
                  >
                    <Database className="h-4 w-4" />
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-900/30 bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 flex items-center gap-2"
                  >
                    <UserX className="h-4 w-4" />
                    Delete Account
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Help Section */}
            {activeTab === "general" && !isMobile && (
              <motion.div
                className="mt-6 p-4 rounded-lg border border-blue-900/30 bg-blue-950/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-400">Privacy Help</h4>
                    <p className="text-xs text-blue-300/70 mt-1">
                      Your privacy is important to us. These settings control who can see your profile information and
                      how your data is used.
                      <a href="#" className="text-blue-400 hover:text-blue-300 ml-1 inline-flex items-center">
                        Learn more
                        <ChevronRight className="h-3 w-3 ml-0.5" />
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <DialogFooter
          className={cn(
            "flex justify-between sm:justify-between border-t border-zinc-800/50 pt-4 bg-zinc-900/80 backdrop-blur-sm relative z-10",
            isMobile ? "px-3 pb-3 flex-col gap-2" : "px-6 pb-2",
          )}
        >
          <div className={cn("flex gap-2", isMobile && "w-full justify-between")}>
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className={cn("text-zinc-400 hover:text-white hover:bg-zinc-800", isMobile && "flex-1")}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleResetToDefaults}
                    className={cn(
                      "text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-700",
                      isMobile && "flex-1",
                    )}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Reset to default settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Button
            onClick={handleSave}
            className={cn(
              "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white",
              isMobile && "w-full",
            )}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Extracted component for privacy option card
function PrivacyOptionCard({
  option,
  checked,
  onToggle,
  isMobile,
  index,
}: {
  option: PrivacyOption
  checked: boolean
  onToggle: () => void
  isMobile: boolean
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      key={option.key}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-800/20 relative overflow-hidden group",
        checked && "bg-blue-900/10 border-blue-800/30",
      )}
    >
      {option.recommended && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-bl-md border-l border-b border-blue-500/30">
            Recommended
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 flex-1">
        <div className={cn("p-1.5 rounded-md", checked ? "bg-blue-900/30" : "bg-zinc-800/70")}>{option.icon}</div>
        <div className="flex-1">
          <div className="flex items-center">
            <div className="text-sm font-medium text-zinc-200">{option.label}</div>
            {!isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 text-zinc-500 hover:text-zinc-300 ml-1">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">More info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>{option.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className={cn("text-zinc-400 mt-0.5 pr-4", isMobile ? "text-[11px]" : "text-xs")}>{option.description}</p>
        </div>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        className={cn(
          "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-blue-400",
          isMobile && "scale-90",
        )}
      />

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-lg pointer-events-none transition-all duration-300" />
    </motion.div>
  )
}

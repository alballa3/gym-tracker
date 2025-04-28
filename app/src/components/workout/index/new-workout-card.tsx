"use client"

import { Dumbbell, MoreVertical, Share, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { Link } from "react-router"
export function NewWorkoutCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="relative"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-400/10 rounded-2xl blur-xl"></div>
            <Card className="bg-gradient-to-br from-indigo-600/30 via-blue-600/25 to-cyan-500/20 border-cyan-500/30 shadow-lg rounded-2xl overflow-hidden hover:shadow-blue-900/20 hover:border-cyan-400/40 transition-all group backdrop-blur-sm relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 via-blue-300 to-cyan-400"></div>
                <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
                                <div className="bg-gradient-to-br from-indigo-500/30 to-blue-500/30 p-2.5 sm:p-3 rounded-full group-hover:from-indigo-500/40 group-hover:to-blue-500/40 transition-colors shadow-inner relative">
                                    <Dumbbell className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-0.5 sm:mb-1 text-white group-hover:text-cyan-50 transition-colors">
                                    Track New Workout
                                </h3>
                                <p className="text-cyan-200/80 text-xs sm:text-sm">Start a fresh workout session now</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 mt-2 sm:mt-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 sm:h-9 sm:w-9 text-cyan-300 hover:text-white hover:bg-indigo-500/20 rounded-xl"
                                    >
                                        <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                                    <DropdownMenuItem className="hover:bg-gray-700/70 cursor-pointer flex items-center gap-2">
                                        <Share className="h-4 w-4 text-cyan-300" />
                                        <span>Share</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-700/70 cursor-pointer flex items-center gap-2">
                                        <Edit className="h-4 w-4 text-cyan-300" />
                                        <span>Options</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Link to="/create" className="flex-1 sm:flex-none">
                                <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-xl shadow-md shadow-indigo-900/20 px-4 sm:px-5 py-2 sm:py-2.5 h-auto text-sm sm:text-base border-0 relative group">
                                    <span className="absolute inset-0 rounded-xl bg-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 relative" />
                                    <span className="relative">Start Workout</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}

"use client"

import { CalendarDays, Clock, BarChart, MoreVertical, Share, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface LastWorkoutCardProps {
    title: string
    date: string
    duration: string
    exerciseCount: number
    volume: string
    onViewDetails: () => void
}

export function LastWorkoutCard({ title, date, duration, exerciseCount, volume, onViewDetails }: LastWorkoutCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -5 }}
            className="relative"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-2xl blur-xl"></div>
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/90 border-gray-800/50 shadow-xl hover:shadow-blue-900/10 transition-all rounded-2xl overflow-hidden backdrop-blur-sm relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-300"></div>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            {title}
                        </CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800/70"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-800/90 backdrop-blur-md border-gray-700 text-white">
                                <DropdownMenuItem className="hover:bg-gray-700/70 cursor-pointer flex items-center gap-2">
                                    <Share className="h-4 w-4 text-blue-300" />
                                    <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gray-700/70 cursor-pointer flex items-center gap-2">
                                    <Edit className="h-4 w-4 text-blue-300" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gray-700/70 cursor-pointer flex items-center gap-2 text-red-400">
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <CardDescription className="flex items-center gap-2 text-gray-400">
                        <CalendarDays className="h-4 w-4" />
                        {date}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-blue-600/30 to-blue-500/20 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                            <p className="text-gray-300 text-xs mb-1">Duration</p>
                            <div className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-blue-300" />
                                <p className="font-medium text-white">{duration}</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600/30 to-blue-500/20 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                            <p className="text-gray-300 text-xs mb-1">Exercises</p>
                            <p className="font-medium text-white">{exerciseCount} total</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600/30 to-blue-500/20 backdrop-blur-sm p-3 rounded-xl border border-blue-500/20 shadow-sm">
                            <p className="text-gray-300 text-xs mb-1">Volume</p>
                            <p className="font-medium text-white">{volume}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="outline"
                        className="w-full border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 rounded-xl"
                        onClick={onViewDetails}
                    >
                        <BarChart className="h-4 w-4 mr-2" />
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Dumbbell, Plus, ClipboardList, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !(menuRef.current as Node).contains(event.target as Node)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isMenuOpen])

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-6 px-1 py-4">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600/20 p-2.5 rounded-xl">
                        <Dumbbell className="h-5 w-5 text-indigo-400" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">
                        GymRat Tracker
                    </h1>
                </div>
                <Button
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    size="sm"
                    className={`relative z-20 transition-all duration-300 rounded-full h-10 w-10 p-0 shadow-lg ${isMenuOpen
                            ? "bg-rose-500 hover:bg-rose-600 rotate-45"
                            : "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600"
                        }`}
                >
                    {isMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Plus className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 top-16 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg shadow-indigo-500/10 border border-indigo-100 dark:border-indigo-900/30 w-60 overflow-hidden transform-gpu animate-in fade-in-0 slide-in-from-top-2 duration-200"
                >
                    <div className="p-1.5 space-y-1">
                        <Link
                            to="/create"
                            className="flex items-center px-3 py-2.5 rounded-xl transition-colors duration-200 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-300 group"
                        >
                            <ClipboardList className="h-4.5 w-4.5 text-indigo-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors" />
                            <span className="ml-2.5 font-medium">Create Workout</span>
                        </Link>
                        <Link
                            to="/workout/ai"
                            className="flex items-center px-3 py-2.5 rounded-xl transition-colors duration-200 text-gray-700 dark:text-gray-200 hover:bg-violet-50 dark:hover:bg-violet-900/30 hover:text-violet-600 dark:hover:text-violet-300 group"
                        >
                            <Sparkles className="h-4.5 w-4.5 text-violet-500 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors" />
                            <span className="ml-2.5 font-medium">Generate Workout</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
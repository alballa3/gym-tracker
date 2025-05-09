"use client"

import { Dumbbell, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Link } from "react-router"

export function NewWorkoutCard() {
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive detection
    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

 
    return (
        <div
            className={`relative w-full transform transition-transform duration-300 ${isHovering && !isMobile ? 'translate-y-[-5px]' : ''}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
                opacity: isMounted ? 1 : 0,
                transform: `translateY(${isMounted ? '0px' : '20px'})`,
                transition: 'opacity 0.4s ease, transform 0.4s ease'
            }}
        >
            {/* Background glow effect */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-400/10 rounded-2xl blur-xl"
                style={{
                    transform: `scale(${isHovering ? 1.05 : 1})`,
                    opacity: isHovering ? 0.8 : 0.6,
                    transition: 'transform 0.3s ease, opacity 0.3s ease'
                }}
            ></div>

            <Card className="bg-gradient-to-br from-indigo-600/30 via-blue-600/25 to-cyan-500/20 border-cyan-500/30 shadow-lg rounded-2xl overflow-hidden hover:shadow-blue-900/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm relative">
                {/* Animated top border */}
                <div
                    className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 via-blue-300 to-cyan-400"
                    style={{
                        backgroundSize: "200% 100%",
                        backgroundPosition: isHovering ? "100% 0%" : "0% 0%",
                        transition: "background-position 2s linear"
                    }}
                ></div>

                <CardContent className="p-3 sm:p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        {/* Icon and Title Section */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
                                <div
                                    className="bg-gradient-to-br from-indigo-500/30 to-blue-500/30 p-2.5 rounded-full hover:from-indigo-500/40 hover:to-blue-500/40 transition-colors shadow-inner relative"
                                    style={{
                                        transform: isHovering ? 'rotate(10deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                >
                                    <Dumbbell className="h-5 w-5 text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-base font-medium mb-0.5 text-white group-hover:text-cyan-50 transition-colors">
                                    Track New Workout
                                </h3>
                                <p className="text-cyan-200/80 text-xs">Start a fresh workout session now</p>
                            </div>
                        </div>

                        {/* Actions Container */}
                        <div className="flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center justify-between sm:justify-end w-full sm:w-auto gap-2 mt-3 sm:mt-0">
                            {/* AI Generate Button */}
                            <div className="flex-shrink-0 transform transition-transform duration-200 hover:scale-105 active:scale-98">
                                <Link to='/workout/ai' className="block">
                                    <Button
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl shadow-md shadow-purple-900/20 px-3 py-2 h-9 text-sm border-0 relative overflow-hidden whitespace-nowrap w-full xs:w-auto"
                                    >
                                        <span className="absolute inset-0 rounded-xl bg-pink-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/30 to-purple-400/0"></span>
                                        <Sparkles className="h-4 w-4 mr-1.5 text-pink-200 relative" />
                                        <span className="relative">AI Workout</span>
                                    </Button>
                                </Link>
                            </div>

                            {/* Start Workout Button */}
                            <Link to="/create" className="block w-full xs:w-auto">
                                <div className="transform transition-transform duration-200 hover:scale-105 active:scale-98 w-full">
                                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-xl shadow-md shadow-indigo-900/20 px-4 py-2 h-9 text-sm border-0 relative overflow-hidden">
                                        <span className="absolute inset-0 rounded-xl bg-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0"></span>
                                        <Zap className="h-4 w-4 mr-1.5 relative text-blue-200" />
                                        <span className="relative">Start Workout</span>
                                    </Button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
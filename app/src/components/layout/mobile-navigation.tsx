"use client"

import { Home, Dumbbell, User } from "lucide-react"
import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
interface MobileNavigationProps {
    activeTab?: string
}

export function MobileNavigation({ activeTab: propActiveTab }: MobileNavigationProps) {
    const pathname = useLocation().pathname
    const [activeTab, setActiveTab] = useState(propActiveTab || getActiveTabFromPath(pathname))

    useEffect(() => {
        if (propActiveTab) {
            setActiveTab(propActiveTab)
        } else {
            setActiveTab(getActiveTabFromPath(pathname))
        }
    }, [pathname, propActiveTab])

    function getActiveTabFromPath(path: string) {
        if (path === "/") return "home"
        if (path.includes("/workouts")) return "workouts"
        if (path.includes("/profile")) return "profile"
        return ""
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-10">
            {/* Backdrop blur effect */}
            <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-lg border-t border-gray-800/50" />

            {/* Actual navigation */}
            <nav className="relative px-6 py-3">
                <div className="flex items-center justify-around">
                    <NavItem
                        icon={<Home />}
                        label="Home"
                        to="/"
                        isActive={activeTab === "home"}
                        onClick={() => setActiveTab("home")}
                    />
                    <NavItem
                        icon={<Dumbbell />}
                        label="Workouts"
                        to="/workouts"
                        isActive={activeTab === "workouts"}
                        onClick={() => setActiveTab("workouts")}
                    />
                    <NavItem
                        icon={<User />}
                        label="Profile"
                        to="/profile"
                        isActive={activeTab === "profile"}
                        onClick={() => setActiveTab("profile")}
                    />
                </div>
            </nav>
        </div>
    )
}

interface NavItemProps {
    icon: React.ReactNode
    label: string
    isActive: boolean
    to: string
    onClick: () => void
}

function NavItem({ icon, label, isActive, to, onClick }: NavItemProps) {
    return (
        <Link to={to} onClick={onClick} className="group">
            <div className="flex flex-col items-center">
                {/* Indicator line */}
                <div className={`h-0.5 w-8 mb-2 transition-all duration-300 rounded-full ${isActive ? "bg-blue-500" : "bg-transparent"
                    }`} />

                {/* Icon with animated background */}
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800/50 text-gray-400 group-hover:bg-gray-800 group-hover:text-gray-200"
                    }`}>
                    {React.cloneElement(icon as React.ReactElement, {
                        className: "h-5 w-5",
                        strokeWidth: isActive ? 2.5 : 2
                    })}
                </div>

                {/* Label */}
                <span className={`text-xs mt-1.5 font-medium transition-colors duration-300 ${isActive ? "text-gray-100" : "text-gray-400 group-hover:text-gray-300"
                    }`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}
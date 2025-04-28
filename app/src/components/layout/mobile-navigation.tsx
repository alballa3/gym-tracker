"use client"

import { Home, Dumbbell, TrendingUp, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface MobileNavigationProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

export function MobileNavigation({ activeTab, setActiveTab }: MobileNavigationProps) {
    return (
        <motion.nav
            className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800/50 px-6 py-2 shadow-lg z-10"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
        >
            <div className="flex items-center justify-around">
                <NavItem
                    icon={<Home className="h-5 w-5" />}
                    label="Home"
                    isActive={activeTab === "home"}
                    onClick={() => setActiveTab("home")}
                />
                <NavItem
                    icon={<Dumbbell className="h-5 w-5" />}
                    label="Workouts"
                    isActive={activeTab === "workouts"}
                    onClick={() => setActiveTab("workouts")}
                />
                <NavItem
                    icon={<TrendingUp className="h-5 w-5" />}
                    label="Progress"
                    isActive={activeTab === "progress"}
                    onClick={() => setActiveTab("progress")}
                />
                <NavItem
                    icon={<Settings className="h-5 w-5" />}
                    label="Settings"
                    isActive={activeTab === "settings"}
                    onClick={() => setActiveTab("settings")}
                />
            </div>
        </motion.nav>
    )
}

function NavItem({ 
    icon, 
    label, 
    isActive, 
    onClick 
}: {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${isActive ? "text-blue-300 bg-blue-500/20" : "text-gray-400 hover:text-gray-300"
                }`}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
            <span className="text-xs mt-1">{label}</span>
        </motion.button>
    )
}

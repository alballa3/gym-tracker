"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Globe, Lock, LogOut, Moon, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import PrivacySettingsModal from "./privacy-settings-modal"

type SettingItem = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  toggle?: boolean
  action?: "link" | "button" | "modal"
  href?: string
  modalType?: "privacy" | "security" | "account"
}

export default function ProfileSettings() {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: "darkMode",
      title: "Dark Mode",
      description: "Use dark theme throughout the app",
      icon: <Moon className="h-5 w-5 text-blue-500" />,
      toggle: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Receive workout reminders and updates",
      icon: <Bell className="h-5 w-5 text-amber-500" />,
      toggle: true,
    },
    {
      id: "privacy",
      title: "Privacy Settings",
      description: "Manage your data and privacy options",
      icon: <Shield className="h-5 w-5 text-green-500" />,
      action: "modal",
      modalType: "privacy",
    },
    {
      id: "security",
      title: "Security",
      description: "Update password and security settings",
      icon: <Lock className="h-5 w-5 text-purple-500" />,
      action: "link",
      href: "/settings/security",
    },
    {
      id: "language",
      title: "Language",
      description: "Change app language (Current: English)",
      icon: <Globe className="h-5 w-5 text-cyan-500" />,
      action: "link",
      href: "/settings/language",
    },
    {
      id: "account",
      title: "Account Settings",
      description: "Manage your account details",
      icon: <User className="h-5 w-5 text-indigo-500" />,
      action: "link",
      href: "/settings/account",
    },
    {
      id: "logout",
      title: "Log Out",
      description: "Sign out of your account",
      icon: <LogOut className="h-5 w-5 text-red-500" />,
      action: "button",
    },
  ])

  const handleToggle = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, toggle: !setting.toggle } : setting)),
    )
  }

  const handleSettingAction = (setting: SettingItem) => {
    if (setting.action === "modal") {
      if (setting.modalType === "privacy") {
        setPrivacyModalOpen(true)
      }
      // Add other modal types here as needed
    } else if (setting.action === "button" && setting.id === "logout") {
      handleLogout()
    }
  }

  const handleLogout = () => {
    console.log("Logging out...")
    // Implement logout functionality
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-zinc-900/60 backdrop-blur-xl rounded-xl border border-zinc-800/50 p-6 shadow-xl shadow-black/20"
    >
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 mr-3 rounded-full"></div>
        Settings
      </h2>

      <div className="space-y-4">
        {settings.map((setting, index) => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="flex items-center justify-between p-3 rounded-xl border border-zinc-800/50 bg-zinc-800/20 hover:bg-zinc-800/30 transition-colors shadow-lg shadow-black/10"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-center gap-3">
              <div className="bg-zinc-800/70 p-2 rounded-lg shadow-inner">{setting.icon}</div>
              <div>
                <h3 className="font-medium text-white">{setting.title}</h3>
                <p className="text-xs text-zinc-400">{setting.description}</p>
              </div>
            </div>

            <div>
              {setting.toggle !== undefined ? (
                <Switch
                  checked={setting.toggle}
                  onCheckedChange={() => handleToggle(setting.id)}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-blue-400"
                />
              ) : setting.action === "link" ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-full"
                  asChild
                >
                  <a href={setting.href}>Manage</a>
                </Button>
              ) : setting.action === "modal" ? (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-full"
                  onClick={() => handleSettingAction(setting)}
                >
                  Configure
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Privacy Settings Modal */}
      <PrivacySettingsModal open={privacyModalOpen} onOpenChange={setPrivacyModalOpen} />
    </motion.section>
  )
}

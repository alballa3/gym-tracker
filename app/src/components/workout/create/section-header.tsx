import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface SectionHeaderProps {
  title: string
  count?: number
  action?: {
    label: string
    icon: ReactNode
    onClick: () => void
    description?: string
  }
}

export function SectionHeader({ title, count, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <span>{title}</span>
        {count !== undefined && (
          <span className="text-sm text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full">{count}</span>
        )}
      </h2>
      {action && (
        <div className="flex flex-col items-end">
          <Button
            onClick={action.onClick}
            variant="outline"
            size="sm"
            className="border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 rounded-xl"
          >
            {action.icon}
            {action.label}
          </Button>
          {action.description && <span className="text-xs text-gray-400 mt-1">{action.description}</span>}
        </div>
      )}
    </div>
  )
}

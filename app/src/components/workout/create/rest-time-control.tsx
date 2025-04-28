import { Timer } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface RestTimeControlProps {
  restTime: number
  onChange: (value: number) => void
}

export function RestTimeControl({ restTime, onChange }: RestTimeControlProps) {
  return (
    <div className="bg-gradient-to-br from-violet-600/20 via-indigo-500/15 to-blue-500/10 rounded-2xl p-4 border border-violet-500/30 backdrop-blur-sm shadow-lg hover:shadow-violet-500/10 transition-all">
      <div className="flex items-center justify-between mb-3">
        <Label className="text-white flex items-center gap-3 text-sm font-medium">
          <Timer className="h-5 w-5 text-violet-300" />
          <span>Rest Between Sets</span>
        </Label>
        <span className="text-violet-300 font-semibold bg-violet-500/10 px-3 py-1 rounded-full text-sm">
          {(restTime / 60).toFixed(1)} min
        </span>
      </div>
      <div className="px-2">
        <Slider
          value={[restTime]}
          min={0}
          max={180}
          step={5}
          onValueChange={(value) => onChange(value[0])}
          className="[&_[role=slider]]:bg-violet-500 [&_[role=slider]]:border-violet-400 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-violet-900/30 [&_[role=slider]]:hover:bg-violet-400 [&_[role=slider]]:transition-all [&_[role=track]]:bg-violet-500/20"
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2 px-2 font-medium">
        <span className="hover:text-violet-300 transition-colors cursor-default">0s</span>
        <span className="hover:text-violet-300 transition-colors cursor-default">60s</span>
        <span className="hover:text-violet-300 transition-colors cursor-default">120s</span>
        <span className="hover:text-violet-300 transition-colors cursor-default">180s</span>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export function WorkoutHistoryFilters() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [muscleGroups, setMuscleGroups] = useState<string[]>([])
  const [intensity, setIntensity] = useState<string>("all")
  const [durationRange, setDurationRange] = useState<[number, number]>([0, 120])
  const [equipment, setEquipment] = useState<string>("all")

  const handleMuscleGroupChange = (value: string) => {
    setMuscleGroups((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <div className="space-y-6">
      {/* Date range */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-200">Date Range</Label>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-900/50 border-gray-800 text-gray-100 w-[150px] justify-start"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? format(dateRange.from, "PPP") : "From date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                initialFocus
                className="bg-gray-900 text-gray-100"
                classNames={{
                  day_selected: "bg-cyan-500 text-white hover:bg-cyan-600",
                  day_today: "bg-gray-800 text-cyan-400",
                  day: "text-gray-100 hover:bg-gray-800",
                }}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-900/50 border-gray-800 text-gray-100 w-[150px] justify-start"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.to ? format(dateRange.to, "PPP") : "To date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                initialFocus
                className="bg-gray-900 text-gray-100"
                classNames={{
                  day_selected: "bg-cyan-500 text-white hover:bg-cyan-600",
                  day_today: "bg-gray-800 text-cyan-400",
                  day: "text-gray-100 hover:bg-gray-800",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Muscle groups */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-200">Muscle Groups</Label>
        <div className="grid grid-cols-2 gap-2">
          {["Chest", "Back", "Legs", "Arms", "Shoulders", "Core", "Full Body", "Upper Body", "Lower Body"].map(
            (group) => (
              <div key={group} className="flex items-center space-x-2">
                <Checkbox
                  id={`muscle-${group}`}
                  checked={muscleGroups.includes(group)}
                  onCheckedChange={() => handleMuscleGroupChange(group)}
                  className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                />
                <Label htmlFor={`muscle-${group}`} className="text-sm cursor-pointer text-gray-200">
                  {group}
                </Label>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Intensity */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-200">Intensity</Label>
        <RadioGroup value={intensity} onValueChange={setIntensity} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="intensity-all" className="text-cyan-500" />
            <Label htmlFor="intensity-all" className="text-sm cursor-pointer text-gray-200">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="intensity-low" className="text-cyan-500" />
            <Label htmlFor="intensity-low" className="text-sm cursor-pointer text-gray-200">
              Low
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="intensity-medium" className="text-cyan-500" />
            <Label htmlFor="intensity-medium" className="text-sm cursor-pointer text-gray-200">
              Medium
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="intensity-high" className="text-cyan-500" />
            <Label htmlFor="intensity-high" className="text-sm cursor-pointer text-gray-200">
              High
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Duration range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-200">Duration (minutes)</Label>
          <span className="text-sm text-gray-400">
            {durationRange[0]} - {durationRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={durationRange}
          min={0}
          max={180}
          step={5}
          onValueChange={(value) => setDurationRange(value as [number, number])}
          className="py-4"
        />
      </div>

      {/* Equipment */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-200">Equipment</Label>
        <Select value={equipment} onValueChange={setEquipment}>
          <SelectTrigger className="w-full bg-gray-900/50 border-gray-800 text-gray-100">
            <SelectValue placeholder="Select equipment" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800 text-gray-100">
            <SelectItem value="all">All Equipment</SelectItem>
            <SelectItem value="full-gym">Full Gym</SelectItem>
            <SelectItem value="home-gym">Home Gym</SelectItem>
            <SelectItem value="dumbbells">Dumbbells Only</SelectItem>
            <SelectItem value="bodyweight">Bodyweight</SelectItem>
            <SelectItem value="bands">Resistance Bands</SelectItem>
            <SelectItem value="kettlebells">Kettlebells</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" className="bg-gray-900/50 border-gray-800 text-gray-100 hover:bg-gray-800">
          Reset
        </Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

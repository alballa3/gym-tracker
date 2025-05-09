"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative", className)} {...props} />
})
Chart.displayName = "Chart"

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("relative", className)} {...props} />
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
})
ChartTooltip.displayName = "ChartTooltip"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {children}
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative flex items-center gap-4", className)} {...props}>
      {children}
    </div>
  )
})
ChartLegend.displayName = "ChartLegend"

interface ChartLegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  color: string
}

const ChartLegendItem = React.forwardRef<HTMLDivElement, ChartLegendItemProps>(
  ({ className, name, color, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-2 text-sm", className)} {...props}>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        <span>{name}</span>
      </div>
    )
  },
)
ChartLegendItem.displayName = "ChartLegendItem"

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative", className)} {...props} />
})
AreaChart.displayName = "AreaChart"

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative", className)} {...props} />
})
BarChart.displayName = "BarChart"

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative", className)} {...props} />
})
LineChart.displayName = "LineChart"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  AreaChart,
  BarChart,
  LineChart,
}

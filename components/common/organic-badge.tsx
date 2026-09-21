import React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface OrganicBadgeProps {
  text: string
  variant?: "amber" | "green" | "emerald" | "secondary" | string
  className?: string
}

export function OrganicBadge({ text, variant = "amber", className = "" }: OrganicBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "amber":
      case "tertiary":
        return "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800"
      case "green":
      case "emerald":
        return "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800"
      case "secondary":
        return "bg-secondary text-secondary-foreground border-border"
      default:
        return "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800"
    }
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-xs transition-colors",
        getVariantStyles(),
        className
      )}
    >
      {text}
    </Badge>
  )
}


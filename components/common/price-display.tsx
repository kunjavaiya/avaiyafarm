import React from "react"

interface PriceDisplayProps {
  price: number
  mrp?: number
  unit?: string
  size?: "sm" | "md" | "lg"
  showSavings?: boolean
  className?: string
}

export function PriceDisplay({
  price,
  mrp,
  unit,
  size = "md",
  showSavings = true,
  className = "",
}: PriceDisplayProps) {
  const hasDiscount = mrp && mrp > price
  const savingsPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0

  const priceSizes = {
    sm: "text-base font-bold",
    md: "text-lg font-bold sm:text-xl",
    lg: "text-2xl font-black sm:text-3xl",
  }

  const mrpSizes = {
    sm: "text-xs",
    md: "text-xs sm:text-sm",
    lg: "text-base",
  }

  return (
    <div className={`flex flex-wrap items-baseline gap-1.5 ${className}`}>
      <span className={`${priceSizes[size]} text-foreground tracking-tight`}>
        ₹{price}
      </span>

      {hasDiscount && (
        <span className={`${mrpSizes[size]} text-muted-foreground line-through font-normal`}>
          ₹{mrp}
        </span>
      )}

      {unit && (
        <span className="text-xs font-medium text-muted-foreground">
          / {unit}
        </span>
      )}

      {showSavings && hasDiscount && savingsPercent > 0 && (
        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-sm">
          {savingsPercent}% OFF
        </span>
      )}
    </div>
  )
}

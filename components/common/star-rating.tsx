import React from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  reviewsCount?: number
  size?: "sm" | "md"
  showCount?: boolean
}

export function StarRating({
  rating,
  reviewsCount,
  size = "sm",
  showCount = true,
}: StarRatingProps) {
  const iconSize = size === "sm" ? "size-3.5" : "size-4"

  return (
    <div className="flex items-center gap-1.5 text-amber-500">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(rating)
          const isPartial = !isFilled && star - 0.5 <= rating

          return (
            <Star
              key={star}
              className={`${iconSize} ${
                isFilled
                  ? "fill-amber-400 text-amber-400"
                  : isPartial
                  ? "fill-amber-400/50 text-amber-400"
                  : "text-muted-foreground/30 fill-transparent"
              }`}
            />
          )
        })}
      </div>
      {showCount && (
        <span className="text-xs font-semibold text-muted-foreground">
          {rating.toFixed(1)} {reviewsCount ? `(${reviewsCount})` : ""}
        </span>
      )}
    </div>
  )
}

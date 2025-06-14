"use client"

import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  max?: number
  size?: "sm" | "md" | "lg"
}

export default function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const starSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const sizeClass = starSizes[size]

  return (
    <div className="flex">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  )
}

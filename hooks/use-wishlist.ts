"use client"

import { useState, useEffect } from "react"

const WISHLIST_KEY = "avaiya_farm_wishlist_v1"

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    try {
      const stored = localStorage.getItem(WISHLIST_KEY)
      if (stored) {
        setWishlist(JSON.parse(stored))
      }
    } catch (e) {
      console.warn("Failed to load wishlist:", e)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
    } catch (e) {
      console.warn("Failed to save wishlist:", e)
    }
  }, [wishlist, isMounted])

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const isWishlisted = (productId: string) => wishlist.includes(productId)

  return {
    wishlist,
    toggleWishlist,
    isWishlisted,
  }
}

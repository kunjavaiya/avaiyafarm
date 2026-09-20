"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, Sprout, ShieldCheck, Sun, MessageCircle } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/hooks/use-wishlist"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function Header() {
  const { totalCount, setIsCartOpen } = useCart()
  const { wishlist } = useWishlist()

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative size-12 sm:size-14 rounded-full overflow-hidden border-2 border-primary/20 bg-emerald-50 dark:bg-emerald-950/40 p-0.5 group-hover:scale-105 transition-transform">
            <Image
              src="/logo.png"
              alt="Avaiya Farm Logo"
              width={56}
              height={56}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-foreground group-hover:text-primary transition-colors font-heading">
              Avaiya Farm
            </span>
            <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-400 tracking-wider uppercase">
              100% Pure & Vedic Produce
            </span>
          </div>
        </Link>

        {/* Center Badges (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border border-border">
            <Sprout className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Gir Eco-Soils</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border border-border">
            <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Chemical-Free</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border border-border">
            <Sun className="size-3.5 text-amber-500" />
            <span>Vedic Chakki Milled</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent("नमस्ते Avaiya Farm! I would like to know more about today's fresh harvest.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors shadow-xs"
          >
            <MessageCircle className="size-3.5 fill-current" />
            <span>Order on WhatsApp</span>
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Wishlist Indicator */}
          {wishlist.length > 0 && (
            <button
              onClick={() => {
                const catalogEl = document.getElementById("harvest-catalog")
                catalogEl?.scrollIntoView({ behavior: "smooth" })
              }}
              className="relative p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              title="Saved items"
              aria-label="Wishlist"
            >
              <Heart className="size-5 fill-rose-500 text-rose-500" />
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            </button>
          )}

          {/* Cart Trigger */}
          <Button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 py-2 text-sm font-semibold shadow-xs"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="size-4" />
            <span className="hidden xs:inline">Cart</span>
            <span className="bg-amber-400 text-amber-950 font-bold text-xs size-5 rounded-full flex items-center justify-center -mr-1">
              {totalCount}
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

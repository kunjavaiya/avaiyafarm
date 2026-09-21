"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ShoppingBag,
  Heart,
  Menu,
  Sprout,
  ShieldCheck,
  Sun,
  MessageCircle,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/hooks/use-wishlist"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { FARM_DISPLAY_PHONE, FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function Header() {
  const { totalCount, setIsCartOpen } = useCart()
  const { wishlist } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border/80 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Logo and Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0">
            <div className="relative size-10 sm:size-13 rounded-full overflow-hidden border-emerald-600/30 bg-white p-0.5 group-hover:scale-105 transition-transform shrink-0 shadow-xs">
              <Image
                src="/logo.png"
                alt="Avaiya Farm Logo"
                width={52}
                height={52}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-heading leading-tight">
                Avaiya Farm
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                FARM से KITCHEN तक
              </span>
            </div>
          </Link>

          {/* Center Badges (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-3">
            <Badge
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border-border"
            >
              <Sprout className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Gir Eco-Soils</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border-border"
            >
              <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Chemical-Free</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border-border"
            >
              <Sun className="size-3.5 text-amber-500" />
              <span>Vedic Chakki Milled</span>
            </Badge>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Desktop WhatsApp Direct */}
            <a
              href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "नमस्ते Avaiya Farm! I would like to know more about today's fresh harvest."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 bg-[#00703c] hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors shadow-xs"
            >
              <MessageCircle className="size-3.5 fill-current" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Desktop Theme Toggle */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* Wishlist Indicator Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                const catalogEl = document.getElementById("harvest-catalog")
                catalogEl?.scrollIntoView({ behavior: "smooth" })
              }}
              className="relative p-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-muted transition-colors shrink-0 size-9"
              title="Saved items"
              aria-label="Wishlist"
            >
              <Heart
                className={`size-5 transition-transform active:scale-125 ${
                  wishlist.length > 0 ? "fill-rose-500 text-rose-500" : "text-foreground/70"
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {wishlist.length}
                </span>
              )}
            </Button>

            {/* Cart Trigger Button */}
            <Button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center bg-[#00703c] text-white hover:bg-emerald-800 rounded-full h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 shrink-0 gap-1.5"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="size-4 shrink-0" />
              <Badge className="bg-amber-400 hover:bg-amber-400 text-amber-950 font-extrabold text-[11px] size-4.5 sm:size-5 rounded-full flex items-center justify-center shrink-0 border-0 p-0">
                {totalCount}
              </Badge>
            </Button>

            {/* Mobile Hamburger Menu Toggle Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors md:hidden shrink-0 size-9"
              aria-label="Open Navigation Menu"
            >
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[82vw] max-w-xs p-5 flex flex-col bg-card text-card-foreground border-l border-border">
          {/* Drawer Header */}
          <SheetHeader className="pb-4 border-b border-border flex flex-row items-center gap-2.5 space-y-0 text-left">
            <div className="relative size-10 rounded-full overflow-hidden border border-emerald-600/30 bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="Avaiya Farm"
                width={40}
                height={40}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <SheetTitle className="font-extrabold text-base text-foreground font-heading leading-none">
                Avaiya Farm
              </SheetTitle>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 pt-0.5">
                FARM से KITCHEN तक
              </span>
            </div>
          </SheetHeader>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-4 space-y-2 text-sm font-medium">
            <button
              type="button"
              onClick={() => scrollToSection("harvest-catalog")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/70 text-left transition-colors"
            >
              <span className="flex items-center gap-2.5 text-foreground">
                <Sprout className="size-4 text-emerald-600" />
                Fresh Farm Harvest
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("farm-story")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/70 text-left transition-colors"
            >
              <span className="flex items-center gap-2.5 text-foreground">
                <ShieldCheck className="size-4 text-emerald-600" />
                Our Gir Farm Story
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("harvest-catalog")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/70 text-left transition-colors"
            >
              <span className="flex items-center gap-2.5 text-foreground">
                <Heart className="size-4 text-rose-500" />
                Saved Wishlist ({wishlist.length})
              </span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>

            <div className="pt-4 space-y-3">
              <Separator />
              <div className="flex items-center justify-between px-2.5">
                <span className="text-xs text-muted-foreground">Dark / Light Mode</span>
                <ThemeToggle />
              </div>

              <a
                href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "नमस्ते Avaiya Farm! I would like to order fresh farm produce."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#00703c] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-xs"
              >
                <MessageCircle className="size-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${FARM_DISPLAY_PHONE.replace(/\s+/g, "")}`}
                className="w-full flex items-center justify-center gap-2 border border-border bg-secondary/50 hover:bg-secondary text-foreground font-semibold py-2 px-4 rounded-xl text-xs transition-colors"
              >
                <Phone className="size-3.5 text-emerald-600" />
                <span>Call {FARM_DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Footer info in mobile drawer */}
          <div className="pt-3 border-t border-border text-[11px] text-muted-foreground flex items-center gap-1.5 mt-auto">
            <MapPin className="size-3.5 text-amber-500 shrink-0" />
            <span>Saurashtra / Gir Somnath, Gujarat</span>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}


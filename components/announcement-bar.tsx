import React from "react"
import { Sparkles, Truck, Phone, ShieldCheck } from "lucide-react"
import { FARM_DISPLAY_PHONE, FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function AnnouncementBar() {
  return (
    <div className="bg-primary text-primary-foreground text-xs py-2 px-4 border-b border-primary/20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
        {/* Left announcement */}
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center gap-1 bg-emerald-700/80 dark:bg-emerald-800/80 px-2 py-0.5 rounded-full text-[10px] tracking-wider uppercase">
            <Sparkles className="size-3 text-amber-300 animate-pulse" />
            100% Pure Harvest
          </span>
          <span className="hidden sm:inline text-primary-foreground/90">
            Directly from Saurashtra & Gir Farmlands to Your Kitchen
          </span>
        </div>

        {/* Center / Right highlights */}
        <div className="flex items-center gap-4 sm:gap-6 font-medium text-primary-foreground/90">
          <div className="flex items-center gap-1.5">
            <Truck className="size-3.5 text-amber-300" />
            <span>Free Delivery On Orders Above ₹499</span>
          </div>

          <a
            href={`https://wa.me/${FARM_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Phone className="size-3.5 text-amber-300" />
            <span>{FARM_DISPLAY_PHONE}</span>
          </a>

          <div className="hidden md:flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-amber-300" />
            <span>Chemical-Free Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  )
}

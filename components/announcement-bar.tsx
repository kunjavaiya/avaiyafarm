import React from "react"
import { Sparkles, Phone, MapPin, Truck, ShieldCheck } from "lucide-react"
import { FARM_DISPLAY_PHONE, FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function AnnouncementBar() {
  return (
    <div className="bg-[#00703c] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-emerald-800/30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto scrollbar-none">
        {/* Left: Pure & Natural Tag */}
        <div className="flex items-center gap-1.5 shrink-0 font-medium">
          <Sparkles className="size-3 text-amber-300 animate-pulse shrink-0" />
          <span className="truncate">100% Pure & Natural ...</span>
        </div>

        {/* Center: Farm Location */}
        <a
          href="#farm-story"
          className="flex items-center gap-1 hover:text-amber-300 transition-colors shrink-0 font-medium"
        >
          <MapPin className="size-3 text-amber-300 shrink-0" />
          <span>Farm Location</span>
        </a>

        {/* Separator on mobile */}
        <span className="text-emerald-300/60 hidden xs:inline">|</span>

        {/* Right: Phone / WhatsApp Direct */}
        <a
          href={`https://wa.me/${FARM_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-amber-300 transition-colors shrink-0 font-bold"
        >
          <Phone className="size-3 text-amber-300 shrink-0" />
          <span>{FARM_DISPLAY_PHONE}</span>
        </a>

        {/* Extra desktop badges */}
        <div className="hidden lg:flex items-center gap-4 text-emerald-100 font-medium">
          <div className="flex items-center gap-1">
            <Truck className="size-3.5 text-amber-300" />
            <span>Free Delivery &gt; ₹499</span>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="size-3.5 text-amber-300" />
            <span>Chemical-Free</span>
          </div>
        </div>
      </div>
    </div>
  )
}

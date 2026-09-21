"use client"

import React from "react"
import Image from "next/image"
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
  Wheat,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FARM_DISPLAY_PHONE, FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function HeroSection() {
  const scrollToCatalog = () => {
    const el = document.getElementById("harvest-catalog")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-[#00703c] via-emerald-950 to-emerald-900 text-white py-8 sm:py-14 lg:py-18">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 size-72 sm:size-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-5 size-60 sm:size-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/90 border border-emerald-600/50 text-emerald-200 text-[11px] sm:text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="size-3 text-amber-400" />
              <span>100% PURE — ORGANIC DESI HARVEST</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] font-heading">
              Farm से <span className="text-amber-400">Kitchen</span> तक
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
              <span className="font-bold text-white">Avaiya Farm</span> — Bringing authentic stone-ground flours, wood-pressed oils, and sun-dried spices directly to your family&apos;s dining table.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-white">
                <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-400" />
                <span>Chemical-Free</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-white">
                <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-400" />
                <span>Natural Sun Curing</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-white">
                <CheckCircle2 className="size-3.5 sm:size-4 text-emerald-400" />
                <span>Pure Seasonality</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1 sm:pt-2 w-full sm:w-auto">
              <Button
                onClick={scrollToCatalog}
                size="lg"
                className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <span>Shop Harvest</span>
                <ArrowRight className="size-3.5 sm:size-4 ml-1" />
              </Button>

              <a
                href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "नमस्ते Avaiya Farm! I would like to place an order directly from your farm catalog."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-emerald-950 hover:bg-emerald-50 font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition-colors shadow-md"
              >
                <MessageCircle className="size-4 text-emerald-700 fill-emerald-700" />
                <span>Order ({FARM_DISPLAY_PHONE})</span>
              </a>
            </div>

            {/* Small reassurance note */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-emerald-200/90 pt-0.5">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>Fresh stone-ground batch milling & same-day farm dispatch active</span>
            </div>
          </div>

          {/* Right Column: Visual Feature Card */}
          <div className="lg:col-span-5 relative w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-xl bg-emerald-950/80 backdrop-blur-md">
              {/* Farm Image Banner */}
              <div className="relative aspect-16/10 w-full overflow-hidden">
                <Image
                  src="/hero-farm.jpg"
                  alt="Avaiya Farm Village Landscape"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/30 to-transparent" />

                <div className="absolute top-2.5 right-2.5 bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase shadow-xs">
                  Heritage Vedic Produce
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Gir Somnath Farmlands
                  </p>
                  <p className="text-xs sm:text-sm font-semibold truncate">Natural Stone Milling Under 40 RPM</p>
                </div>
              </div>

              {/* Sub-card highlights */}
              <div className="p-3 sm:p-4 grid grid-cols-2 gap-2.5 bg-emerald-950/90 text-white">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-amber-400 text-[11px] sm:text-xs font-bold">
                    <Wheat className="size-3.5 shrink-0" />
                    <span>Gir Eco-Soils</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-emerald-100/80 leading-snug">
                    Cultivated naturally in mineral-rich red Saurashtra soil.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-emerald-400 text-[11px] sm:text-xs font-bold">
                    <Clock className="size-3.5 shrink-0" />
                    <span>24h Dispatch</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-emerald-100/80 leading-snug">
                    Ground fresh after order placement to retain natural oils.
                  </p>
                </div>
              </div>

              {/* Quick Contact Footer Strip */}
              <div className="px-3.5 py-2 bg-emerald-900/90 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-emerald-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-amber-400 shrink-0" />
                  <span>NPOP Certified Farming</span>
                </div>
                <span className="font-semibold text-white">Guaranteed Purity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

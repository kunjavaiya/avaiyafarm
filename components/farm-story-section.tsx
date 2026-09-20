"use client"

import React from "react"
import Image from "next/image"
import { Sprout, CheckCircle, ArrowRight, MessageCircle, ShieldCheck, HeartHandshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FARM_DISPLAY_PHONE, FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function FarmStorySection() {
  const scrollToCatalog = () => {
    const el = document.getElementById("harvest-catalog")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 sm:py-24 bg-secondary/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Story Banner */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-border/80 shadow-2xl bg-card">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/story-harvest.jpg"
                  alt="Avaiya Farm Farmers and Harvest"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating quality chips */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                    <CheckCircle className="size-3.5 text-emerald-400" />
                    <span>Pure Organic</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                    <CheckCircle className="size-3.5 text-amber-400" />
                    <span>Vedic Slow Milling</span>
                  </div>
                </div>

                {/* Bottom Story Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-card/90 backdrop-blur-md border border-border text-card-foreground flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
                      AF
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm">Gir & Saurashtra Heritage</h4>
                      <p className="text-[11px] text-muted-foreground">Authentic Native Seed Cultivation</p>
                    </div>
                  </div>
                  <ShieldCheck className="size-6 text-emerald-600 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative and Stats */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-300 dark:border-emerald-800 w-fit">
              <Sprout className="size-3.5 text-emerald-600" />
              <span>TRACEABLE PURITY • SUNLIT FIELDS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading leading-tight">
              Our Journey: Directly from our sunlit fields to your family&apos;s table.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Avaiya Farm</strong> is rooted in traditional natural agriculture in Gujarat. Every grain is grown with regenerative natural cow-based composting (Jeevamrut), nourished by pure well-water, and sun-cured naturally on cotton sheets under open Gujarat skies.
              </p>
              <p>
                We never use high-speed roller mills or chemical refining. Our stone-chakki runs at ultra-low speeds (&lt;40 RPM) and oils are pressed in wooden kolhu ghanis so delicate natural enzymes, vitamins, and authentic aromas remain completely alive.
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-card border border-border flex flex-col gap-1 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                  100%
                </span>
                <span className="text-xs font-bold text-foreground">Traceable Harvest</span>
                <span className="text-[11px] text-muted-foreground">
                  Gir Somnath single-origin farmlands.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border flex flex-col gap-1 shadow-2xs">
                <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                  24 Hrs
                </span>
                <span className="text-xs font-bold text-foreground">Fresh Milling Cycle</span>
                <span className="text-[11px] text-muted-foreground">
                  Slow-ground and dispatched fresh.
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                <span>Explore Farm Catalog</span>
                <ArrowRight className="size-4" />
              </button>

              <a
                href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "नमस्ते Avaiya Farm! I would like to learn more about your farm story and order farm produce."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm transition-colors shadow-xs"
              >
                <MessageCircle className="size-4 fill-white" />
                <span>Order on WhatsApp ({FARM_DISPLAY_PHONE})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

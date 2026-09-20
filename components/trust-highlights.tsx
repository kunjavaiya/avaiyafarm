import React from "react"
import { ShieldCheck, Truck, Sprout, Sparkles } from "lucide-react"

export function TrustHighlights() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Secure Payment & COD",
      description: "Pay via UPI, NetBanking or Cash on Delivery after farm dispatch.",
      iconBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300",
    },
    {
      icon: Sprout,
      title: "Direct from Farmers",
      description: "Cultivated in Saurashtra organic plots with zero middleman markup.",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
    },
    {
      icon: Sparkles,
      title: "Traditional Stone Milling",
      description: "Cold Vedic chakki & wood kolhu press to preserve vital germ vitamins.",
      iconBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300",
    },
    {
      icon: Truck,
      title: "Safe & Fresh Delivery",
      description: "Airtight eco-packaging with door delivery across cities and towns.",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((item, index) => {
          const Icon = item.icon
          return (
            <div
              key={index}
              className="bg-card text-card-foreground p-4 sm:p-5 rounded-xl border border-border shadow-md hover:shadow-lg transition-all flex items-start gap-3.5 group"
            >
              <div
                className={`size-10 sm:size-11 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${item.iconBg}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

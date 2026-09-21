import React from "react"
import { ShieldCheck, Truck, Sprout, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
    <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-4 sm:-mt-8 relative z-20 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {highlights.map((item, index) => {
          const Icon = item.icon
          return (
            <Card
              key={index}
              className="bg-card text-card-foreground p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-border shadow-md hover:shadow-lg transition-all group py-3.5"
            >
              <CardContent className="p-0 flex items-start gap-3">
                <div
                  className={`size-9 sm:size-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${item.iconBg}`}
                >
                  <Icon className="size-4 sm:size-5" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}


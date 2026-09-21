import React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, MessageCircle, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FARM_DISPLAY_PHONE, FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900/60 pt-12 sm:pt-16 pb-10 sm:pb-12 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative size-12 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-white p-0.5">
                <Image
                  src="/logo.png"
                  alt="Avaiya Farm"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white font-heading tracking-tight block">
                  Avaiya Farm
                </span>
                <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase">
                  Vedic & Pure Produce
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed max-w-sm">
              Authentic slow-milled stone-ground flours, wood kolhu virgin oils, and pure unadulterated spices delivered straight from our Gujarat family farmlands to your dining table.
            </p>

            <div className="flex flex-col gap-2 pt-1 text-xs text-emerald-300">
              <a
                href="https://maps.app.goo.gl/AqFZFA1Ccs8mSNqJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <MapPin className="size-4 text-amber-400 shrink-0" />
                <span>Avaiya Agro Farmlands, Saurashtra / Gir Somnath, Gujarat</span>
              </a>
              <a
                href={`https://wa.me/${FARM_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <Phone className="size-4 text-emerald-400 shrink-0" />
                <span>{FARM_DISPLAY_PHONE} (WhatsApp & Call)</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <Link href="#harvest-catalog" className="hover:text-amber-400 transition-colors">
                  Fresh Farm Harvest
                </Link>
              </li>
              <li>
                <Link href="#harvest-catalog" className="hover:text-amber-400 transition-colors">
                  100% Pure Chakki Atta
                </Link>
              </li>
              <li>
                <Link href="#harvest-catalog" className="hover:text-amber-400 transition-colors">
                  Wood-Pressed Kachi Ghani Oils
                </Link>
              </li>
              <li>
                <Link href="#harvest-catalog" className="hover:text-amber-400 transition-colors">
                  Vedic A2 Gir Cow Ghee
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${FARM_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Direct WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Farm Produce Categories */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Farm Produce
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <span className="text-emerald-100 font-medium">Stone-Ground Desi Atta</span>
                <p className="text-[11px] text-emerald-300/70">Kathiya Wheat, Desi Bajra, Sattu</p>
              </li>
              <li>
                <span className="text-emerald-100 font-medium">Wood-Pressed Kolhu Oils</span>
                <p className="text-[11px] text-emerald-300/70">Mustard Oil, Groundnut Oil, Black Sesame</p>
              </li>
              <li>
                <span className="text-emerald-100 font-medium">Vedic Superfoods & Sweeteners</span>
                <p className="text-[11px] text-emerald-300/70">A2 Bilona Ghee, Raw Forest Honey, Iron Gud</p>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Order Card */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Fast Order
            </h4>
            <Card className="p-3.5 rounded-xl bg-emerald-900/60 border border-emerald-800 text-card-foreground gap-2.5 py-3.5">
              <CardContent className="p-0 flex flex-col gap-2.5">
                <p className="text-xs text-emerald-200">
                  Need customized quantities or immediate dispatch?
                </p>
                <a
                  href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "नमस्ते Avaiya Farm! I would like to order produce directly."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold py-2 px-3 rounded-lg text-xs transition-colors shadow-sm"
                >
                  <MessageCircle className="size-3.5 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="bg-emerald-900/80" />

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>© {new Date().getFullYear()} Avaiya Farm. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              100% Guaranteed Pure
            </span>
            <span>Direct Saurashtra Village Harvest</span>
          </div>
        </div>
      </div>
    </footer>
  )
}


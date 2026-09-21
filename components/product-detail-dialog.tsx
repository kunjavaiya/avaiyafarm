"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck, MapPin, Calendar, Activity } from "lucide-react"
import { Product, ProductVariant } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { OrganicBadge } from "@/components/common/organic-badge"
import { StarRating } from "@/components/common/star-rating"
import { PriceDisplay } from "@/components/common/price-display"
import { createSingleProductWhatsAppOrderAction } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface ProductDetailDialogProps {
  product: Product | null
  onClose: () => void
}

export function ProductDetailDialog({ product, onClose }: ProductDetailDialogProps) {
  const { addItem, items, updateQuantity } = useCart()

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [isOrderingWhatsApp, setIsOrderingWhatsApp] = useState(false)

  useEffect(() => {
    if (product) {
      setSelectedVariant(
        product.variants?.[0] || {
          size: product.unit || "1 pc",
          price: product.price || 0,
          mrp: product.mrp || 0,
        }
      )
    }
  }, [product])

  if (!product || !selectedVariant) return null

  const cartItemId = `${product.id}-${selectedVariant.size}`
  const existingCartItem = items.find((i) => i.id === cartItemId)
  const inCartQty = existingCartItem ? existingCartItem.quantity : 0

  const handleAddToCart = () => {
    addItem(product, selectedVariant, 1)
  }

  const handleWhatsAppOrder = async () => {
    setIsOrderingWhatsApp(true)
    try {
      const res = await createSingleProductWhatsAppOrderAction(
        product,
        selectedVariant,
        inCartQty > 0 ? inCartQty : 1
      )
      if (res.success && res.whatsAppUrl) {
        window.open(res.whatsAppUrl, "_blank", "noopener,noreferrer")
      }
    } catch (err) {
      console.error("Direct order WhatsApp error:", err)
    } finally {
      setIsOrderingWhatsApp(false)
    }
  }

  return (
    <Dialog
      open={!!product}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent className="w-[95vw] sm:w-[92vw] md:w-[88vw] lg:w-full sm:max-w-3xl lg:max-w-4xl max-h-[92vh] overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8 bg-card text-card-foreground rounded-2xl border-border shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.shortDescription}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start pt-1">
          {/* Media Column */}
          <div className="md:col-span-5 flex flex-col gap-3 w-full max-w-md md:max-w-none mx-auto md:mx-0">
            <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-muted border border-border/80">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <OrganicBadge
                  text={product.badge || "100% Pure"}
                  variant={product.badgeColor || "amber"}
                />
              </div>
            </div>

            {/* Farm Highlights Pill */}
            <div className="p-3 rounded-xl bg-secondary/50 border border-border/80 flex flex-col gap-2 text-xs">
              {product.origin && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3.5 text-emerald-600 shrink-0" />
                  <span>{product.origin}</span>
                </div>
              )}
              {product.harvestDate && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5 text-amber-600 shrink-0" />
                  <span>{product.harvestDate}</span>
                </div>
              )}
              {product.millingMethod && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Activity className="size-3.5 text-emerald-600 shrink-0" />
                  <span>{product.millingMethod}</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 flex flex-col gap-3.5 sm:gap-4 w-full min-w-0">
            <div>
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground mt-1 font-heading leading-tight">
                {product.name}
              </h2>
              {product.hindiName && (
                <p className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-400 mt-0.5">
                  {product.hindiName}
                </p>
              )}
            </div>

            {/* Full description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.certifications.map((c, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80"
                  >
                    <ShieldCheck className="size-3" />
                    <span>{c}</span>
                  </Badge>
                ))}
              </div>
            )}

            {/* Variant / Size Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Pack Size:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.size === v.size
                    return (
                      <Button
                        key={v.size}
                        type="button"
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => setSelectedVariant(v)}
                        className={`text-xs font-bold transition-all h-8 px-3 ${
                          isSelected
                            ? "bg-[#00703c] hover:bg-emerald-800 text-white shadow-xs"
                            : "bg-muted/40 text-foreground hover:bg-muted border-border"
                        }`}
                      >
                        {v.size} — ₹{v.price}
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Nutrition facts snippet if available */}
            {product.nutrition && (
              <div className="pt-2">
                <Separator className="mb-3" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Nutritional Values (per {product.nutrition.servingSize || "100g"}):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-center text-xs">
                  {Object.entries(product.nutrition)
                    .filter(([key]) => key !== "servingSize")
                    .slice(0, 4)
                    .map(([key, val]) => (
                      <div
                        key={key}
                        className="p-2 rounded-lg bg-secondary/40 border border-border"
                      >
                        <span className="text-[10px] text-muted-foreground capitalize block truncate">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="font-bold text-foreground">{val}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <Separator className="my-1" />

            {/* Price & Actions */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
              <PriceDisplay
                price={selectedVariant.price}
                mrp={selectedVariant.mrp}
                unit={selectedVariant.size}
                size="lg"
              />

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {inCartQty > 0 ? (
                  <div className="flex items-center rounded-lg border border-primary/40 bg-secondary/50 p-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => updateQuantity(cartItemId, inCartQty - 1)}
                      className="size-8 rounded-md hover:bg-background text-foreground p-0"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-8 text-center text-sm font-bold text-foreground">
                      {inCartQty}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => updateQuantity(cartItemId, inCartQty + 1)}
                      className="size-8 rounded-md hover:bg-background text-foreground p-0"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={handleAddToCart}
                    size="default"
                    className="gap-1.5 font-bold bg-[#00703c] hover:bg-emerald-800 text-white shrink-0"
                  >
                    <ShoppingBag className="size-4" />
                    <span>Add to Cart</span>
                  </Button>
                )}

                <Button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  disabled={isOrderingWhatsApp}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold gap-1.5 shrink-0"
                >
                  <MessageCircle className="size-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


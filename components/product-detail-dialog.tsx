"use client"

import React, { useState } from "react"
import Image from "next/image"
import { X, Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck, MapPin, Calendar, Activity } from "lucide-react"
import { Product, ProductVariant } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { OrganicBadge } from "@/components/common/organic-badge"
import { StarRating } from "@/components/common/star-rating"
import { PriceDisplay } from "@/components/common/price-display"
import { createSingleProductWhatsAppOrderAction } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"

interface ProductDetailDialogProps {
  product: Product | null
  onClose: () => void
}

export function ProductDetailDialog({ product, onClose }: ProductDetailDialogProps) {
  const { addItem, items, updateQuantity } = useCart()

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product?.variants?.[0] || {
      size: product?.unit || "1 pc",
      price: product?.price || 0,
      mrp: product?.mrp || 0,
    }
  )
  const [isOrderingWhatsApp, setIsOrderingWhatsApp] = useState(false)

  if (!product) return null

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground rounded-2xl border border-border shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Media Column */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-muted border border-border/80">
              <Image
                src={product.image}
                alt={product.name}
                fill
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
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
              <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1 font-heading">
                {product.name}
              </h2>
              {product.hindiName && (
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
                  {product.hindiName}
                </p>
              )}
            </div>

            {/* Full description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description || product.shortDescription}
            </p>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.certifications.map((c, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80"
                  >
                    <ShieldCheck className="size-3" />
                    {c}
                  </span>
                ))}
              </div>
            )}

            {/* Variant / Size Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Select Pack Size:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.size === v.size
                    return (
                      <button
                        key={v.size}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-xs"
                            : "bg-muted/40 text-foreground hover:bg-muted border-border"
                        }`}
                      >
                        {v.size} — ₹{v.price}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Nutrition facts snippet if available */}
            {product.nutrition && (
              <div className="pt-2 border-t border-border/80">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
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

            {/* Price & Actions */}
            <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 mt-auto">
              <PriceDisplay
                price={selectedVariant.price}
                mrp={selectedVariant.mrp}
                unit={selectedVariant.size}
                size="lg"
              />

              <div className="flex items-center gap-2">
                {inCartQty > 0 ? (
                  <div className="flex items-center rounded-lg border border-primary/40 bg-secondary/50 p-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(cartItemId, inCartQty - 1)}
                      className="size-8 flex items-center justify-center rounded-md hover:bg-background text-foreground"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-foreground">
                      {inCartQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(cartItemId, inCartQty + 1)}
                      className="size-8 flex items-center justify-center rounded-md hover:bg-background text-foreground"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={handleAddToCart}
                    size="default"
                    className="gap-1.5 font-bold"
                  >
                    <ShoppingBag className="size-4" />
                    <span>Add to Cart</span>
                  </Button>
                )}

                <Button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  disabled={isOrderingWhatsApp}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold gap-1.5"
                >
                  <MessageCircle className="size-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

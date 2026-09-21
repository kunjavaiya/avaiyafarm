"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Heart, Plus, Minus, Check, MessageCircle, ShoppingBag, Eye } from "lucide-react"
import { Product, ProductVariant } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/hooks/use-wishlist"
import { StarRating } from "@/components/common/star-rating"
import { createSingleProductWhatsAppOrderAction } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants?.[0] || {
      size: product.unit,
      price: product.price,
      mrp: product.mrp,
    }
  )
  const [isOrderingWhatsApp, setIsOrderingWhatsApp] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const cartItemId = `${product.id}-${selectedVariant.size}`
  const existingCartItem = items.find((i) => i.id === cartItemId)
  const inCartQty = existingCartItem ? existingCartItem.quantity : 0

  const handleAddToCart = () => {
    addItem(product, selectedVariant, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  const handleQuickWhatsAppOrder = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOrderingWhatsApp(true)
    try {
      const res = await createSingleProductWhatsAppOrderAction(
        product,
        selectedVariant,
        1
      )
      if (res.success && res.whatsAppUrl) {
        window.open(res.whatsAppUrl, "_blank", "noopener,noreferrer")
      }
    } catch (err) {
      console.error("Single order WhatsApp error:", err)
    } finally {
      setIsOrderingWhatsApp(false)
    }
  }

  const isFavorite = isWishlisted(product.id)

  return (
    <Card className="group relative rounded-2xl sm:rounded-3xl border border-border/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden p-3 sm:p-4 hover:-translate-y-0.5 bg-card text-card-foreground">
      {/* Product Image Box */}
      <div
        className="relative w-full aspect-square sm:aspect-square rounded-xl sm:rounded-2xl bg-muted/40 overflow-hidden cursor-pointer"
        onClick={() => onQuickView?.(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Organic Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <Badge className="bg-amber-400 hover:bg-amber-400 text-amber-950 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-xs border-0 px-2.5 py-1 rounded-md">
            {product.badge || "100% ORGANIC"}
          </Badge>
        </div>

        {/* Top-Right Wishlist & Quick View */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product.id)
            }}
            aria-label="Add to Wishlist"
            className="size-8 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md flex items-center justify-center text-foreground/80 hover:text-foreground transition-all shadow-xs active:scale-110 p-0"
          >
            <Heart
              className={`size-4 transition-transform ${
                isFavorite ? "fill-rose-500 text-rose-500" : "text-foreground/70"
              }`}
            />
          </Button>

          {onQuickView && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation()
                onQuickView(product)
              }}
              aria-label="Quick View Details"
              className="size-8 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-md items-center justify-center text-foreground/80 hover:text-foreground transition-all opacity-0 group-hover:opacity-100 shadow-xs hidden sm:flex p-0"
              title="View product details"
            >
              <Eye className="size-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <CardContent className="pt-3 p-0 flex flex-col flex-1 gap-1.5">
        {/* Rating Row */}
        <div className="flex items-center gap-1">
          <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size="sm" />
        </div>

        {/* Product Title */}
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => onQuickView?.(product)}
        >
          <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            {product.hindiName || product.category.replace(/-/g, " ")}
          </p>
        </div>

        {/* Short Description */}
        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1 leading-snug">
          {product.shortDescription}
        </p>

        {/* Variant Pills if any */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex flex-wrap items-center gap-1 pt-1">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.size === v.size
              return (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                    isSelected
                      ? "bg-[#00703c] text-white border-emerald-700"
                      : "bg-muted/50 text-muted-foreground hover:text-foreground border-border"
                  }`}
                >
                  {v.size}
                </button>
              )
            })}
          </div>
        )}

        {/* Price & Action Row */}
        <div className="pt-2 mt-auto flex items-end justify-between gap-2 border-t border-border/60">
          {/* Price side */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-emerald-800 dark:text-emerald-400 tracking-tight">
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
                <span className="text-[11px] sm:text-xs text-muted-foreground line-through">
                  ₹{selectedVariant.mrp}
                </span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">
              / {selectedVariant.size}
            </span>
          </div>

          {/* Action side */}
          <div className="flex items-center gap-1.5">
            {inCartQty > 0 ? (
              <div className="flex items-center rounded-lg border border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/40 p-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => updateQuantity(cartItemId, inCartQty - 1)}
                  className="size-6 rounded-md hover:bg-background text-foreground transition-colors p-0"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3" />
                </Button>
                <span className="w-5 text-center text-xs font-bold text-foreground">
                  {inCartQty}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => updateQuantity(cartItemId, inCartQty + 1)}
                  className="size-6 rounded-md hover:bg-background text-foreground transition-colors p-0"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={handleAddToCart}
                size="sm"
                className={`rounded-lg font-bold px-3 py-1.5 text-xs transition-all shadow-xs gap-1.5 ${
                  justAdded
                    ? "bg-emerald-700 text-white"
                    : "bg-[#00703c] hover:bg-emerald-800 text-white"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="size-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-3.5" />
                    <span>Add</span>
                  </>
                )}
              </Button>
            )}

            {/* Quick WhatsApp single order icon */}
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={handleQuickWhatsAppOrder}
              disabled={isOrderingWhatsApp}
              title="Order this produce directly on WhatsApp"
              aria-label="Order on WhatsApp"
              className="size-8 rounded-lg border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 dark:text-emerald-300 transition-colors shadow-xs p-0"
            >
              <MessageCircle className="size-3.5 fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Heart, Plus, Minus, Check, MessageCircle, Eye } from "lucide-react"
import { Product, ProductVariant } from "@/types/product"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/hooks/use-wishlist"
import { OrganicBadge } from "@/components/common/organic-badge"
import { StarRating } from "@/components/common/star-rating"
import { PriceDisplay } from "@/components/common/price-display"
import { createSingleProductWhatsAppOrderAction } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"

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
    <div className="group relative bg-card text-card-foreground rounded-2xl border border-border/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1">
      {/* Card Header Media & Badges */}
      <div className="relative w-full aspect-square bg-muted/40 overflow-hidden cursor-pointer">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onClick={() => onQuickView?.(product)}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-10">
          <OrganicBadge
            text={product.badge || "100% Organic"}
            variant={product.badgeColor || "amber"}
          />
        </div>

        {/* Top Right Wishlist & Quick View */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleWishlist(product.id)
            }}
            aria-label="Add to Wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
              isFavorite
                ? "bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400"
                : "bg-background/80 text-muted-foreground hover:text-foreground hover:bg-background"
            }`}
          >
            <Heart
              className={`size-4 transition-transform active:scale-125 ${
                isFavorite ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onQuickView(product)
              }}
              aria-label="Quick View Details"
              className="p-2 rounded-full bg-background/80 text-muted-foreground hover:text-foreground hover:bg-background backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-xs"
              title="View product details"
            >
              <Eye className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
        {/* Ratings */}
        <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />

        {/* Titles */}
        <div className="flex flex-col gap-0.5 cursor-pointer" onClick={() => onQuickView?.(product)}>
          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-xs font-medium text-emerald-800 dark:text-emerald-400 line-clamp-1">
              {product.hindiName}
            </p>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Variant / Pack Size Selector */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {product.variants.map((v) => {
              const isSelected = selectedVariant.size === v.size
              return (
                <button
                  key={v.size}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-xs"
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
        <div className="pt-2 mt-auto border-t border-border/60 flex items-center justify-between gap-2">
          {/* Price */}
          <PriceDisplay
            price={selectedVariant.price}
            mrp={selectedVariant.mrp}
            unit={product.variants.length > 1 ? undefined : selectedVariant.size}
            size="md"
          />

          {/* Add / Quantity Button Controls */}
          <div className="flex items-center gap-1.5">
            {inCartQty > 0 ? (
              <div className="flex items-center rounded-lg border border-primary/40 bg-secondary/50 p-0.5">
                <button
                  type="button"
                  onClick={() => updateQuantity(cartItemId, inCartQty - 1)}
                  className="size-7 flex items-center justify-center rounded-md hover:bg-background text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-foreground">
                  {inCartQty}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(cartItemId, inCartQty + 1)}
                  className="size-7 flex items-center justify-center rounded-md hover:bg-background text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={handleAddToCart}
                size="sm"
                className={`rounded-lg font-bold px-3 py-1.5 text-xs transition-all shadow-xs ${
                  justAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="size-3.5 mr-1" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="size-3.5 mr-1" />
                    <span>Add</span>
                  </>
                )}
              </Button>
            )}

            {/* Quick WhatsApp single order icon */}
            <button
              type="button"
              onClick={handleQuickWhatsAppOrder}
              disabled={isOrderingWhatsApp}
              title="Order this product directly on WhatsApp"
              aria-label="Order on WhatsApp"
              className="p-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/80 dark:text-emerald-300 transition-colors shadow-xs"
            >
              <MessageCircle className="size-4 fill-emerald-600 dark:fill-emerald-400 text-emerald-600 dark:text-emerald-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

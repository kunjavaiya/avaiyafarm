"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  MessageCircle,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { FARM_DISPLAY_PHONE } from "@/lib/whatsapp"

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    totalSavings,
    isCartOpen,
    setIsCartOpen,
    customer,
    setCustomer,
    checkoutWithWhatsApp,
    isCheckingOut,
  } = useCart()

  const [customNote, setCustomNote] = useState("")
  const [showAddressForm, setShowAddressForm] = useState(false)

  if (!isCartOpen) return null

  const freeDeliveryThreshold = 499
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal)
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100)

  const handleCheckout = async () => {
    await checkoutWithWhatsApp(customNote)
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-md bg-card text-card-foreground h-full flex flex-col shadow-2xl border-l border-border animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShoppingBag className="size-4" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg font-heading">
                Your Farm Basket
              </h2>
              <p className="text-xs text-muted-foreground">
                {totalCount} {totalCount === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-5 py-3 bg-secondary/60 border-b border-border text-xs">
          <div className="flex items-center justify-between font-medium mb-1.5">
            <span className="flex items-center gap-1.5 text-foreground">
              <Truck className="size-3.5 text-emerald-600" />
              {amountNeeded > 0 ? (
                <>Add <strong>₹{amountNeeded}</strong> more for Free Delivery</>
              ) : (
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="size-3.5" /> FREE Farm Delivery Unlocked!
                </span>
              )}
            </span>
            <span className="text-[11px] font-bold text-muted-foreground">
              {Math.round(deliveryProgress)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${deliveryProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-border">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                {/* Image */}
                <div className="relative size-18 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-foreground line-clamp-1">
                      {item.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-rose-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-secondary px-2 py-0.5 rounded-md w-fit">
                    Pack: {item.selectedVariant.size}
                  </span>

                  <div className="flex items-center justify-between pt-1 mt-auto">
                    <span className="font-bold text-sm text-foreground">
                      ₹{item.selectedVariant.price * item.quantity}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center rounded-lg border border-border bg-background p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="size-6 flex items-center justify-center rounded-md hover:bg-muted text-foreground"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="size-6 flex items-center justify-center rounded-md hover:bg-muted text-foreground"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
              <div className="size-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="size-8" />
              </div>
              <h3 className="font-bold text-base">Your cart is empty</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                Browse our fresh stone-ground flours, Vedic spices, and oils to fill your basket.
              </p>
              <Button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs font-bold rounded-full"
              >
                Start Shopping
              </Button>
            </div>
          )}

          {/* Optional Delivery Address Form Accordion */}
          {items.length > 0 && (
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline flex items-center justify-between w-full py-1"
              >
                <span>+ Add Delivery Address & Note (Optional)</span>
                <span>{showAddressForm ? "▲" : "▼"}</span>
              </button>

              {showAddressForm && (
                <div className="mt-3 space-y-2.5 bg-secondary/40 p-3.5 rounded-xl border border-border text-xs">
                  <div>
                    <label className="block font-medium text-muted-foreground mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      value={customer.name || ""}
                      onChange={(e) =>
                        setCustomer((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-muted-foreground mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={customer.phone || ""}
                        onChange={(e) =>
                          setCustomer((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-muted-foreground mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 380015"
                        value={customer.pincode || ""}
                        onChange={(e) =>
                          setCustomer((prev) => ({ ...prev, pincode: e.target.value }))
                        }
                        className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-muted-foreground mb-1">
                      Delivery Address & City
                    </label>
                    <input
                      type="text"
                      placeholder="Flat, building, locality, city"
                      value={customer.address || ""}
                      onChange={(e) =>
                        setCustomer((prev) => ({ ...prev, address: e.target.value }))
                      }
                      className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-muted-foreground mb-1">
                      Special Note for Dispatch
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Please grind coarse / pack in separate boxes"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full px-3 py-1.5 bg-background border border-border rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-border bg-card flex flex-col gap-3">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">₹{subtotal}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Savings on MRP</span>
                  <span>-₹{totalSavings}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {amountNeeded === 0 ? "FREE" : "Standard"}
                </span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between text-base font-extrabold text-foreground">
                <span>Total Amount</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            {/* Primary Order on WhatsApp Action */}
            <Button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              size="lg"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all hover:scale-101"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Preparing Order...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="size-5 fill-white" />
                  <span>Order via WhatsApp ({FARM_DISPLAY_PHONE})</span>
                </>
              )}
            </Button>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                COD & UPI Available
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="hover:text-rose-600 underline font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

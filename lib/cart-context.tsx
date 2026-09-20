"use client"

import React, { createContext, useContext, useEffect, useState, useMemo } from "react"
import { CartItem, CustomerDetails } from "@/types/cart"
import { Product, ProductVariant } from "@/types/product"
import { createWhatsAppOrderAction } from "@/app/actions/orders"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
  totalMrp: number
  totalSavings: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  customer: CustomerDetails
  setCustomer: React.Dispatch<React.SetStateAction<CustomerDetails>>
  checkoutWithWhatsApp: (customNote?: string) => Promise<{ success: boolean; url?: string; error?: string }>
  isCheckingOut: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "avaiya_farm_cart_v1"
const CUSTOMER_STORAGE_KEY = "avaiya_farm_customer_v1"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  })

  // Load cart and customer details from localStorage on client mount
  useEffect(() => {
    setIsMounted(true)
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        setItems(JSON.parse(storedCart))
      }
      const storedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY)
      if (storedCustomer) {
        setCustomer(JSON.parse(storedCustomer))
      }
    } catch (e) {
      console.warn("Failed to read localStorage:", e)
    }
  }, [])

  // Persist cart to localStorage on changes
  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (e) {
      console.warn("Failed to save cart to localStorage:", e)
    }
  }, [items, isMounted])

  // Persist customer to localStorage on changes
  useEffect(() => {
    if (!isMounted) return
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer))
    } catch (e) {
      console.warn("Failed to save customer to localStorage:", e)
    }
  }, [customer, isMounted])

  const addItem = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const selectedVariant = variant || product.variants?.[0] || {
      size: product.unit,
      price: product.price,
      mrp: product.mrp,
    }
    const itemKey = `${product.id}-${selectedVariant.size}`

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === itemKey)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedVariant,
          quantity,
        },
      ]
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.selectedVariant.price * item.quantity,
      0
    )
  }, [items])

  const totalMrp = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.selectedVariant.mrp * item.quantity,
      0
    )
  }, [items])

  const totalSavings = useMemo(() => {
    return Math.max(0, totalMrp - subtotal)
  }, [totalMrp, subtotal])

  /**
   * Triggers Server Action to create the WhatsApp order and redirect the customer.
   */
  const checkoutWithWhatsApp = async (customNote?: string) => {
    if (items.length === 0) {
      return { success: false, error: "Cart is empty" }
    }

    setIsCheckingOut(true)
    try {
      const result = await createWhatsAppOrderAction(items, customer, customNote)
      if (result.success && result.whatsAppUrl) {
        // Open WhatsApp in a new tab or direct window
        window.open(result.whatsAppUrl, "_blank", "noopener,noreferrer")
        return { success: true, url: result.whatsAppUrl }
      }
      return { success: false, error: "Failed to generate order link" }
    } catch (error) {
      console.error("WhatsApp checkout error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error during checkout",
      }
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        totalMrp,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        customer,
        setCustomer,
        checkoutWithWhatsApp,
        isCheckingOut,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

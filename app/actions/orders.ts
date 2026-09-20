"use server"

import fs from "fs/promises"
import path from "path"
import { CartItem, CustomerDetails } from "@/types/cart"
import { Product, ProductVariant } from "@/types/product"
import {
  buildCartOrderMessage,
  buildSingleProductOrderMessage,
  getWhatsAppUrl,
  FARM_WHATSAPP_NUMBER
} from "@/lib/whatsapp"

const ORDERS_FILE = path.join(process.cwd(), "orders.json")

interface RecordedOrder {
  orderId: string
  createdAt: string
  type: "cart" | "single"
  items: Array<{
    productId: string
    name: string
    size: string
    price: number
    quantity: number
  }>
  totalAmount: number
  customer?: CustomerDetails
  whatsAppNumber: string
}

/**
 * Helper to log recorded orders in orders.json database table
 */
async function recordOrderToDb(order: RecordedOrder): Promise<void> {
  try {
    let orders: RecordedOrder[] = []
    try {
      const data = await fs.readFile(ORDERS_FILE, "utf-8")
      orders = JSON.parse(data)
    } catch {
      orders = []
    }
    orders.unshift(order)
    await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8")
  } catch (err) {
    console.error("Failed to record order to orders.json:", err)
  }
}

export interface CartOrderActionResponse {
  success: boolean
  whatsAppUrl: string
  orderId: string
  message: string
}

/**
 * Server action to process cart checkout and generate WhatsApp redirect URL
 */
export async function createWhatsAppOrderAction(
  items: CartItem[],
  customer?: CustomerDetails,
  customNote?: string
): Promise<CartOrderActionResponse> {
  if (!items || items.length === 0) {
    throw new Error("Cart is empty")
  }

  const orderId = `AF-${Date.now().toString().slice(-6)}`
  const message = buildCartOrderMessage(items, customer, customNote)
  const whatsAppUrl = getWhatsAppUrl(message, FARM_WHATSAPP_NUMBER)

  const totalAmount = items.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  )

  // Save order in JSON DB
  await recordOrderToDb({
    orderId,
    createdAt: new Date().toISOString(),
    type: "cart",
    items: items.map((i) => ({
      productId: i.product.id,
      name: i.product.name,
      size: i.selectedVariant.size,
      price: i.selectedVariant.price,
      quantity: i.quantity,
    })),
    totalAmount,
    customer,
    whatsAppNumber: FARM_WHATSAPP_NUMBER,
  })

  return {
    success: true,
    whatsAppUrl,
    orderId,
    message,
  }
}

export interface SingleProductOrderActionResponse {
  success: boolean
  whatsAppUrl: string
  orderId: string
  message: string
}

/**
 * Server action for direct single-product buy via WhatsApp
 */
export async function createSingleProductWhatsAppOrderAction(
  product: Product,
  variant: ProductVariant,
  quantity = 1,
  customer?: CustomerDetails
): Promise<SingleProductOrderActionResponse> {
  const orderId = `AF-${Date.now().toString().slice(-6)}`
  const message = buildSingleProductOrderMessage(product, variant, quantity, customer)
  const whatsAppUrl = getWhatsAppUrl(message, FARM_WHATSAPP_NUMBER)

  // Save order in JSON DB
  await recordOrderToDb({
    orderId,
    createdAt: new Date().toISOString(),
    type: "single",
    items: [
      {
        productId: product.id,
        name: product.name,
        size: variant.size,
        price: variant.price,
        quantity,
      },
    ],
    totalAmount: variant.price * quantity,
    customer,
    whatsAppNumber: FARM_WHATSAPP_NUMBER,
  })

  return {
    success: true,
    whatsAppUrl,
    orderId,
    message,
  }
}

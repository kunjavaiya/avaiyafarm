import { CartItem, CustomerDetails, OrderPayload } from "@/types/cart"
import { Product, ProductVariant } from "@/types/product"

export const FARM_WHATSAPP_NUMBER = "918469826209"
export const FARM_DISPLAY_PHONE = "+91 84698 26209"

/**
 * Builds a structured, beautiful WhatsApp order message for multiple items in cart.
 */
export function buildCartOrderMessage(
  items: CartItem[],
  customer?: CustomerDetails,
  customNote?: string
): string {
  const lines: string[] = []

  lines.push("🌾 *नमस्ते Avaiya Farm!*")
  lines.push("I would like to place a direct farm fresh order:")
  lines.push("──────────────────────")

  let totalAmount = 0
  let totalMrp = 0

  items.forEach((item, index) => {
    const itemTotal = item.selectedVariant.price * item.quantity
    const itemMrpTotal = item.selectedVariant.mrp * item.quantity
    totalAmount += itemTotal
    totalMrp += itemMrpTotal

    lines.push(
      `*${index + 1}. ${item.product.name}*`
    )
    if (item.product.hindiName) {
      lines.push(`   _${item.product.hindiName}_`)
    }
    lines.push(
      `   • Size: *${item.selectedVariant.size}*`
    )
    lines.push(
      `   • Quantity: *${item.quantity}* × ₹${item.selectedVariant.price} = *₹${itemTotal}*`
    )
    lines.push("")
  })

  lines.push("──────────────────────")
  lines.push(`📦 *Items Total:* ₹${totalAmount}`)
  if (totalMrp > totalAmount) {
    lines.push(`💰 *You Saved:* ₹${totalMrp - totalAmount} on MRP`)
  }
  lines.push("🚚 *Delivery:* Free / Standard Farm Dispatch")
  lines.push(`💵 *Final Amount to Pay:* *₹${totalAmount}* (COD / UPI)`)
  lines.push("──────────────────────")

  if (customer && (customer.name || customer.address || customer.city || customer.pincode)) {
    lines.push("📍 *Delivery Details:*")
    if (customer.name) lines.push(`• Name: ${customer.name}`)
    if (customer.phone) lines.push(`• Phone: ${customer.phone}`)
    if (customer.address) lines.push(`• Address: ${customer.address}`)
    if (customer.city) lines.push(`• City/Town: ${customer.city}`)
    if (customer.pincode) lines.push(`• Pincode: ${customer.pincode}`)
    lines.push("──────────────────────")
  }

  if (customNote) {
    lines.push(`📝 *Special Note:* ${customNote}`)
    lines.push("──────────────────────")
  }

  lines.push("Please confirm my order & dispatch time. Dhanyawad! 🙏🌿")

  return lines.join("\n")
}

/**
 * Builds a structured message for direct single product WhatsApp buy.
 */
export function buildSingleProductOrderMessage(
  product: Product,
  variant: ProductVariant,
  quantity = 1,
  customer?: CustomerDetails
): string {
  const itemTotal = variant.price * quantity
  const lines: string[] = []

  lines.push("🌾 *नमस्ते Avaiya Farm!*")
  lines.push("I want to order this pure farm produce directly:")
  lines.push("──────────────────────")
  lines.push(`*Product:* ${product.name}`)
  if (product.hindiName) {
    lines.push(`*हिंदी:* ${product.hindiName}`)
  }
  lines.push(`*Selected Pack:* ${variant.size}`)
  lines.push(`*Quantity:* ${quantity}`)
  lines.push(`*Price:* ₹${variant.price} (MRP: ₹${variant.mrp})`)
  lines.push(`*Total Amount:* *₹${itemTotal}*`)
  lines.push("──────────────────────")

  if (customer && (customer.name || customer.address || customer.pincode)) {
    lines.push("📍 *My Delivery Details:*")
    if (customer.name) lines.push(`• Name: ${customer.name}`)
    if (customer.phone) lines.push(`• Contact: ${customer.phone}`)
    if (customer.address) lines.push(`• Address: ${customer.address}`)
    if (customer.pincode) lines.push(`• Pincode: ${customer.pincode}`)
    lines.push("──────────────────────")
  }

  lines.push("Please share payment details (UPI/COD) and dispatch confirmation. Thank you! 🙏✨")

  return lines.join("\n")
}

/**
 * Generates the full WhatsApp URL with encoded message.
 */
export function getWhatsAppUrl(message: string, phone = FARM_WHATSAPP_NUMBER): string {
  const encodedText = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedText}`
}

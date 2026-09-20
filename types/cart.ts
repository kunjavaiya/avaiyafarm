import { Product, ProductVariant } from "./product"

export interface CartItem {
  id: string // combined unique key: `${productId}-${variantSize}`
  product: Product
  selectedVariant: ProductVariant
  quantity: number
}

export interface CustomerDetails {
  name?: string
  phone?: string
  address?: string
  city?: string
  pincode?: string
  notes?: string
}

export interface OrderPayload {
  items: Array<{
    productId: string
    productName: string
    hindiName?: string
    size: string
    price: number
    quantity: number
    subtotal: number
  }>
  totalAmount: number
  totalSavings: number
  customer?: CustomerDetails
  orderNote?: string
}

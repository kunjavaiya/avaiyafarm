export interface ProductVariant {
  size: string
  price: number
  mrp: number
}

export interface NutritionInfo {
  servingSize?: string
  energy?: string
  protein?: string
  dietaryFiber?: string
  carbohydrates?: string
  fat?: string
  curcumin?: string
  iron?: string
  mufa?: string
  pufa?: string
  transFat?: string
  omega3?: string
  vitaminE?: string
  calcium?: string
  magnesium?: string
  a2Protein?: string
  butyricAcid?: string
  naturalSugars?: string
  pollenContent?: string
  antioxidants?: string
  sesamol?: string
  [key: string]: string | undefined
}

export interface Product {
  id: string
  slug: string
  name: string
  hindiName: string
  category: "desi-flours" | "vedic-spices" | "cold-pressed-oils" | "desi-ghee-honey" | string
  price: number
  mrp: number
  unit: string
  variants: ProductVariant[]
  rating: number
  reviewsCount: number
  badge?: string
  badgeColor?: "primary" | "secondary" | "tertiary" | "accent" | string
  image: string
  shortDescription: string
  description: string
  harvestDate?: string
  origin?: string
  millingMethod?: string
  certifications?: string[]
  nutrition?: NutritionInfo
  inStock: boolean
  featured?: boolean
  tags?: string[]
}

export interface CategoryInfo {
  id: string
  name: string
  hindiName: string
  slug: string
  iconName?: string
  count?: number
}

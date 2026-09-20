"use server"

import { readProductsFromDb, writeProductsToDb } from "@/lib/db"
import { CategoryInfo, Product } from "@/types/product"
import { revalidatePath } from "next/cache"

export interface GetProductsParams {
  category?: string
  query?: string
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "popular"
  featured?: boolean
}

/**
 * Server action to fetch and filter products from the JSON database.
 */
export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  const allProducts = await readProductsFromDb()
  let filtered = [...allProducts]

  // Filter by category
  if (params.category && params.category !== "all") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === params.category?.toLowerCase()
    )
  }

  // Filter by featured
  if (params.featured) {
    filtered = filtered.filter((p) => p.featured === true)
  }

  // Search query (matches english name, hindi name, tags, description)
  if (params.query && params.query.trim() !== "") {
    const q = params.query.toLowerCase().trim()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.hindiName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    )
  }

  // Sorting
  if (params.sort) {
    switch (params.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
        break
      case "popular":
        filtered.sort((a, b) => b.reviewsCount - a.reviewsCount)
        break
      case "featured":
      default:
        // Featured first, then rating
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }
  }

  return filtered
}

/**
 * Server action to get a single product by ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const products = await readProductsFromDb()
  return products.find((p) => p.id === id) || null
}

/**
 * Server action to get all distinct categories and their product counts.
 */
export async function getCategories(): Promise<CategoryInfo[]> {
  const products = await readProductsFromDb()

  const CATEGORY_MAP: Record<string, { name: string; hindiName: string }> = {
    "all": { name: "All Harvest", hindiName: "सभी उत्पाद" },
    "desi-flours": { name: "Desi Flours & Atta", hindiName: "देसी आटा व अनाज" },
    "vedic-spices": { name: "Vedic Spices", hindiName: "शुद्ध मसाले" },
    "cold-pressed-oils": { name: "Cold-Pressed Oils", hindiName: "कच्ची घानी तेल" },
    "desi-ghee-honey": { name: "A2 Ghee & Sweeteners", hindiName: "A2 घी, शहद व गुड़" },
  }

  const counts: Record<string, number> = { all: products.length }

  products.forEach((p) => {
    const cat = p.category
    counts[cat] = (counts[cat] || 0) + 1
  })

  const categories: CategoryInfo[] = [
    {
      id: "all",
      slug: "all",
      name: CATEGORY_MAP["all"].name,
      hindiName: CATEGORY_MAP["all"].hindiName,
      count: counts["all"] || 0,
    },
    ...Object.keys(CATEGORY_MAP)
      .filter((key) => key !== "all")
      .map((key) => ({
        id: key,
        slug: key,
        name: CATEGORY_MAP[key].name,
        hindiName: CATEGORY_MAP[key].hindiName,
        count: counts[key] || 0,
      })),
  ]

  return categories
}

/**
 * Server action to create a new product in the JSON database.
 */
export async function createProductAction(productData: Omit<Product, "id">): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const products = await readProductsFromDb()
    const newId = `prod-${Date.now()}`
    const newProduct: Product = {
      ...productData,
      id: newId,
    }

    products.push(newProduct)
    const saved = await writeProductsToDb(products)

    if (saved) {
      revalidatePath("/")
      return { success: true, product: newProduct }
    }
    return { success: false, error: "Failed to write to database" }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Server action to update an existing product in the JSON database.
 */
export async function updateProductAction(id: string, updates: Partial<Product>): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const products = await readProductsFromDb()
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) {
      return { success: false, error: "Product not found" }
    }

    products[index] = { ...products[index], ...updates }
    const saved = await writeProductsToDb(products)

    if (saved) {
      revalidatePath("/")
      return { success: true, product: products[index] }
    }
    return { success: false, error: "Failed to write updates" }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Server action to delete a product from the JSON database.
 */
export async function deleteProductAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const products = await readProductsFromDb()
    const filtered = products.filter((p) => p.id !== id)
    const saved = await writeProductsToDb(filtered)

    if (saved) {
      revalidatePath("/")
      return { success: true }
    }
    return { success: false, error: "Failed to delete product" }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

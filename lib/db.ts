import fs from "fs/promises"
import path from "path"
import { Product } from "@/types/product"

const PRODUCTS_FILE = path.join(process.cwd(), "products.json")

/**
 * Reads products directly from products.json
 */
export async function readProductsFromDb(): Promise<Product[]> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8")
    return JSON.parse(data) as Product[]
  } catch (error) {
    console.error("Error reading products.json:", error)
    return []
  }
}

/**
 * Writes products back to products.json
 */
export async function writeProductsToDb(products: Product[]): Promise<boolean> {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8")
    return true
  } catch (error) {
    console.error("Error writing products.json:", error)
    return false
  }
}

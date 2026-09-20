import { getProducts, getCategories } from "@/app/actions/products"
import { HeroSection } from "@/components/hero-section"
import { TrustHighlights } from "@/components/trust-highlights"
import { ProductCatalog } from "@/components/product-catalog"
import { FarmStorySection } from "@/components/farm-story-section"

export const dynamic = "force-dynamic"

export default async function Page() {
  const [products, categories] = await Promise.all([
    getProducts({ sort: "featured" }),
    getCategories(),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner with Vedic Highlights */}
      <HeroSection />

      {/* Trust Proposition Highlight Cards */}
      <TrustHighlights />

      {/* Fresh Harvest Product Catalog */}
      <ProductCatalog initialProducts={products} categories={categories} />

      {/* Farm Journey & Traceability Narrative */}
      <FarmStorySection />
    </div>
  )
}

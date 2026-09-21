"use client"

import React, { useState } from "react"
import { Sparkles, Search, SlidersHorizontal, ChevronDown, PlusCircle } from "lucide-react"
import { CategoryInfo, Product } from "@/types/product"
import { useProductsFilter, SortOption } from "@/hooks/use-products-filter"
import { ProductCard } from "@/components/product-card"
import { ProductDetailDialog } from "@/components/product-detail-dialog"
import { FARM_WHATSAPP_NUMBER } from "@/lib/whatsapp"

interface ProductCatalogProps {
  initialProducts: Product[]
  categories: CategoryInfo[]
}

export function ProductCatalog({ initialProducts, categories }: ProductCatalogProps) {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredProducts,
    totalResults,
  } = useProductsFilter(initialProducts)

  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  return (
    <section id="harvest-catalog" className="py-8 sm:py-16 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full">
      {/* Section Header matching image 2 */}
      <div className="flex flex-col items-start gap-2 mb-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
          <span className="text-sm">🚜</span>
          <span>UNPROCESSED & NUTRIENT DENSE</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading leading-tight">
          Fresh from Our Harvest
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Pure, unadulterated & stone-ground nutrition straight from Gujarat soil directly to your home.
        </p>
      </div>

      {/* Control Bar & Filters */}
      <div className="flex flex-col gap-3.5 pb-6 border-b border-border/80 w-full">
        {/* Top Control Badges & Sort Row */}
        <div className="flex items-center justify-between gap-2.5 flex-wrap">
          {/* Available Count Badge */}
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200/80 dark:border-emerald-800">
            <span>{totalResults} Products Available</span>
          </div>

          {/* Sort Dropdown styled as pill */}
          <div className="relative inline-flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none pl-3.5 pr-8 py-1.5 text-xs bg-card text-foreground font-semibold rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured Harvest</option>
              <option value="rating">Top Rated</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-2.5 size-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Add Produce / Direct WhatsApp CTA button */}
        <div>
          <a
            href={`https://wa.me/${FARM_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "नमस्ते Avaiya Farm! I would like to request or inquire about custom farm produce harvest."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#00703c] hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-full shadow-xs transition-colors"
          >
            <PlusCircle className="size-3.5" />
            <span>+ Add Produce</span>
          </a>
        </div>

        {/* Category Pills (horizontally scrollable without page overflow) */}
        <div className="w-full overflow-x-auto pb-1.5 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 ${
                    isSelected
                      ? "bg-[#00703c] text-white border-emerald-700 shadow-xs scale-102"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border-border"
                  }`}
                >
                  {cat.name} {cat.count !== undefined ? `(${cat.count})` : ""}
                </button>
              )
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search atta, ghee, oil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-card text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-bold"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Product Grid: 1 col on mobile, 2 on sm, 3 on md, 4 on xl */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setActiveProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
          <div className="size-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <SlidersHorizontal className="size-8" />
          </div>
          <h3 className="text-base font-bold text-foreground">No harvest items found</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            We couldn&apos;t find any pure produce matching your current search or category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all")
              setSearchQuery("")
            }}
            className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Quick View Product Detail Dialog */}
      <ProductDetailDialog
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </section>
  )
}

"use client"

import React, { useState } from "react"
import { Sparkles, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react"
import { CategoryInfo, Product } from "@/types/product"
import { useProductsFilter, SortOption } from "@/hooks/use-products-filter"
import { ProductCard } from "@/components/product-card"
import { ProductDetailDialog } from "@/components/product-detail-dialog"

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
    <section id="harvest-catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-300 dark:border-emerald-800">
          <Sparkles className="size-3.5 text-amber-500" />
          <span>ALL 100% PURE & UNADULTERATED</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-heading">
          Fresh from Our Harvest
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Hand-harvested in small batches, ground and packed fresh straight from our Saurashtra / Gir farm to your kitchen table.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-border">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-sm scale-102"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border-border"
                }`}
              >
                {cat.name} {cat.count !== undefined ? `(${cat.count})` : ""}
              </button>
            )
          })}
        </div>

        {/* Right Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search atta, ghee, oil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-card text-foreground rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
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

          {/* Results Badge */}
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground text-xs font-semibold border border-border">
            <span>{totalResults} Products</span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <ArrowUpDown className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="pl-8 pr-4 py-1.5 text-xs bg-card text-foreground rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary font-medium cursor-pointer shadow-2xs"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Top Customer Rated</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
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
          <h3 className="text-lg font-bold text-foreground">No harvest items found</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            We couldn&apos;t find any pure produce matching your current search or category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all")
              setSearchQuery("")
            }}
            className="mt-2 text-xs font-bold text-primary hover:underline"
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

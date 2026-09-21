"use client"

import React, { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { CategoryInfo, Product } from "@/types/product"
import { useProductsFilter, SortOption } from "@/hooks/use-products-filter"
import { ProductCard } from "@/components/product-card"
import { ProductDetailDialog } from "@/components/product-detail-dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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
      {/* Section Header */}
      <div className="flex flex-col items-start gap-2 mb-6">
        {/* Pill Badge */}
        <Badge
          variant="outline"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider border-emerald-200 dark:border-emerald-800"
        >
          <span className="text-sm">🚜</span>
          <span>UNPROCESSED & NUTRIENT DENSE</span>
        </Badge>

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
      <div className="flex flex-col gap-3.5 pb-6 w-full">
        {/* Top Control Badges & Sort Row */}
        <div className="flex items-center justify-between gap-2.5 flex-wrap">
          {/* Available Count Badge */}
          <Badge
            variant="outline"
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 text-xs font-bold border-emerald-200/80 dark:border-emerald-800"
          >
            <span>{totalResults} Products Available</span>
          </Badge>

          {/* Sort Select */}
          <Select
            value={sortBy}
            onValueChange={(val) => {
              if (val) setSortBy(val as SortOption)
            }}
          >
            <SelectTrigger className="w-[180px] h-8 text-xs font-semibold rounded-xl bg-card border-border">
              <SelectValue placeholder="Sort Harvest" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="featured">Featured Harvest</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Pills */}
        <div className="w-full overflow-x-auto pb-1.5 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug
              return (
                <Button
                  key={cat.id}
                  type="button"
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`rounded-full text-xs font-bold transition-all shrink-0 h-8 px-3.5 ${
                    isSelected
                      ? "bg-[#00703c] hover:bg-emerald-800 text-white border-emerald-700 shadow-xs"
                      : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border-border"
                  }`}
                >
                  {cat.name} {cat.count !== undefined ? `(${cat.count})` : ""}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search atta, ghee, oil..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 text-xs bg-card text-foreground rounded-xl border border-border focus-visible:ring-emerald-600 shadow-2xs h-8"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-5 rounded-full text-muted-foreground hover:text-foreground p-0"
              aria-label="Clear search"
            >
              <X className="size-3" />
            </Button>
          )}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Product Grid: 1 col on mobile, 2 on sm, 3 on md, 4 on xl */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setSelectedCategory("all")
              setSearchQuery("")
            }}
            className="mt-2 text-xs font-bold text-emerald-700 dark:text-emerald-400"
          >
            Clear All Filters
          </Button>
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


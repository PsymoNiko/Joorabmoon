"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Gem } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/lib/mock-data"

export function ProductGrid({ products }: { products: Product[] }) {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <Link href={`/shop/${product.slug}`}>
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(product.id)
                }}
              >
                <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-accent text-accent" : ""}`} />
              </Button>
              {product.shop && (
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {product.shop.name}
                  </span>
                </div>
              )}
            </div>
          </Link>
          <CardContent className="p-4 space-y-3">
            <div>
              <Link href={`/shop/${product.slug}`}>
                <h3 className="font-semibold text-base hover:text-accent transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground font-mono mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="w-5 h-5 rounded-full border-2 border-border"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div>
                <div className="flex items-center gap-1.5">
                  <Gem className="h-3.5 w-3.5 text-accent" />
                  <span className="font-bold text-sm">{product.price_ton} TON</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">${product.price_usd}</span>
              </div>
              <Link href={`/shop/${product.slug}`}>
                <Button size="sm" className="text-xs">
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  View
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

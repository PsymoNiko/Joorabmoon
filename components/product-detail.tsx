"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Gem, Store, MessageCircle, Minus, Plus, Check } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"
import type { Product } from "@/lib/mock-data"

export function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M")
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [favorite, setFavorite] = useState(false)
  const { addItem } = useCart()

  function handleAddToCart() {
    addItem(product, selectedSize, selectedColor, quantity)
    toast.success(`${product.name} added to cart`, {
      description: `${quantity}x ${selectedSize} / ${selectedColor}`,
    })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Image */}
      <div className="space-y-4">
        <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
          <p className="font-mono text-muted-foreground">{product.description}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-4">
          <div className="flex items-center gap-2">
            <Gem className="h-5 w-5 text-accent" />
            <span className="text-3xl font-bold">{product.price_ton} TON</span>
          </div>
          <span className="font-mono text-lg text-muted-foreground">${product.price_usd} USD</span>
        </div>

        {/* Shop info */}
        {product.shop && (
          <Link
            href={`/shops/${product.shop.slug}`}
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-accent" />
            </div>
            <div>
              <span className="font-semibold text-sm">{product.shop.name}</span>
              <p className="font-mono text-xs text-muted-foreground">
                {product.shop.city}, {product.shop.country}
              </p>
            </div>
          </Link>
        )}

        {/* Size selection */}
        <div>
          <label className="block font-mono text-sm font-medium mb-3">Size</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 font-mono text-sm transition-colors ${
                  selectedSize === size
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color selection */}
        <div>
          <label className="block font-mono text-sm font-medium mb-3">Color</label>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 font-mono text-sm transition-colors ${
                  selectedColor === color
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-muted-foreground"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                {color}
                {selectedColor === color && <Check className="h-3 w-3 text-accent" />}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-mono text-sm font-medium mb-3">Quantity</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-secondary transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-6 py-3 font-mono text-sm font-medium border-x border-border min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-secondary transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              {product.stock} in stock
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button size="lg" className="flex-1 text-base" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`${favorite ? "text-accent border-accent" : ""}`}
            onClick={() => setFavorite(!favorite)}
          >
            <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
          </Button>
          {product.shop && (
            <Link href={`/shops/${product.shop.slug}#chat`}>
              <Button size="lg" variant="outline">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Payment info */}
        <div className="rounded-lg border border-border p-4 bg-secondary/50">
          <p className="font-mono text-sm font-medium mb-2">Accepted Payments</p>
          <div className="flex flex-wrap gap-3">
            {["TonKeeper", "MyTonWallet", "Telegram Stars", "TON Connect"].map((method) => (
              <span key={method} className="px-3 py-1 rounded-full bg-background border border-border font-mono text-xs">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

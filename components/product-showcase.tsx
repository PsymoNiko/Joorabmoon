"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: 1,
    name: "Midnight Pattern",
    price: 24.99,
    image: "/black-patterned-socks-on-pink-background.jpg",
    description: "Elegant black socks with intricate geometric patterns",
    colors: ["Black", "Navy"],
  },
  {
    id: 2,
    name: "Sunset Orange",
    price: 22.99,
    image: "/vibrant-orange-socks-artistic-photo.jpg",
    description: "Bold orange socks that make a statement",
    colors: ["Orange", "Coral"],
  },
  {
    id: 3,
    name: "Electric Blue",
    price: 24.99,
    image: "/bright-blue-patterned-socks-lifestyle.jpg",
    description: "Vibrant blue with playful patterns",
    colors: ["Blue", "Teal"],
  },
  {
    id: 4,
    name: "Cherry Red",
    price: 23.99,
    image: "/red-socks-on-colorful-background.jpg",
    description: "Classic red with modern twist",
    colors: ["Red", "Burgundy"],
  },
  {
    id: 5,
    name: "Forest Green",
    price: 24.99,
    image: "/green-striped-socks-artistic.jpg",
    description: "Nature-inspired green tones",
    colors: ["Green", "Olive"],
  },
  {
    id: 6,
    name: "Lavender Dream",
    price: 25.99,
    image: "/purple-lavender-socks-lifestyle-photo.jpg",
    description: "Soft lavender with delicate details",
    colors: ["Lavender", "Purple"],
  },
]

export function ProductShowcase() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <section id="shop" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Featured Collection</h2>
          <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto text-pretty">
            {
              "Discover our curated selection of artistic socks, each pair designed to add personality to your everyday style."
            }
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-accent text-accent" : ""}`} />
                </Button>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{product.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full border-2 border-border"
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <Button className="group/btn">
                    <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

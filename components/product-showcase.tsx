"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

const products = [
  {
    id: 1,
    name: "Midnight Pattern",
    price: 24.99,
    image: "/black-patterned-socks-on-pink-background.jpg",
    description: "Elegant black socks with intricate geometric patterns",
    colors: ["#000000", "#1a1a2e"],
    bgColor: "from-pink/20 to-red/20",
  },
  {
    id: 2,
    name: "Sunset Orange",
    price: 22.99,
    image: "/vibrant-orange-socks-artistic-photo.jpg",
    description: "Bold orange socks that make a statement",
    colors: ["#ff6b35", "#ff8c42"],
    bgColor: "from-orange/20 to-pink/20",
  },
  {
    id: 3,
    name: "Electric Blue",
    price: 24.99,
    image: "/bright-blue-patterned-socks-lifestyle.jpg",
    description: "Vibrant blue with playful patterns",
    colors: ["#0077b6", "#00b4d8"],
    bgColor: "from-blue/20 to-lime/20",
  },
  {
    id: 4,
    name: "Cherry Red",
    price: 23.99,
    image: "/red-socks-on-colorful-background.jpg",
    description: "Classic red with modern twist",
    colors: ["#d62828", "#f77f00"],
    bgColor: "from-red/20 to-orange/20",
  },
  {
    id: 5,
    name: "Forest Green",
    price: 24.99,
    image: "/green-striped-socks-artistic.jpg",
    description: "Nature-inspired green tones",
    colors: ["#2d6a4f", "#52b788"],
    bgColor: "from-lime/20 to-blue/20",
  },
  {
    id: 6,
    name: "Lavender Dream",
    price: 25.99,
    image: "/purple-lavender-socks-lifestyle-photo.jpg",
    description: "Soft lavender with delicate details",
    colors: ["#b185db", "#e0b0ff"],
    bgColor: "from-pink/20 to-blue/20",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ProductShowcase() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <section id="shop" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-lime/5 to-pink/5 animate-gradient" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Featured{" "}
            <span className="bg-gradient-to-r from-orange via-pink to-lime bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto text-pretty">
            Discover our curated selection of artistic socks, each pair designed to add personality to your everyday
            style.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-lime/50">
                <div className={`relative aspect-square overflow-hidden bg-gradient-to-br ${product.bgColor}`}>
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <motion.div
                      animate={favorites.includes(product.id) ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-red text-red" : ""} transition-colors`}
                      />
                    </motion.div>
                  </Button>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color, index) => (
                      <motion.div
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-border cursor-pointer"
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        custom={index}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <motion.span
                      className="text-2xl font-bold bg-gradient-to-r from-orange to-lime bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ${product.price}
                    </motion.span>
                    <Button className="group/btn bg-lime hover:bg-lime/90 text-foreground">
                      <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

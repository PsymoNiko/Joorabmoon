"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem, Product } from "./mock-data"

type CartContextType = {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalTon: number
  totalUsd: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("jm_cart")
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("jm_cart", JSON.stringify(items))
  }, [items])

  function addItem(product: Product, size: string, color: string, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { product, size, color, quantity }]
    })
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId))
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const totalTon = items.reduce((sum, i) => sum + i.product.price_ton * i.quantity, 0)
  const totalUsd = items.reduce((sum, i) => sum + i.product.price_usd * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalTon, totalUsd, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}

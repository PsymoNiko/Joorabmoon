"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, Gem, ArrowRight, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalTon, totalUsd, itemCount } = useCart()

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="font-mono text-muted-foreground mb-6">
                Discover our collection of artistic socks
              </p>
              <Link href="/shop">
                <Button size="lg">Browse Shop</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 rounded-xl border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary shrink-0">
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/shop/${item.product.slug}`} className="font-semibold hover:text-accent transition-colors">
                            {item.product.name}
                          </Link>
                          <p className="font-mono text-xs text-muted-foreground mt-1">
                            Size: {item.size} / Color: {item.color}
                          </p>
                          {item.product.shop && (
                            <p className="font-mono text-xs text-muted-foreground">
                              by {item.product.shop.name}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-4 font-mono text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-secondary transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Gem className="h-3.5 w-3.5 text-accent" />
                            <span className="font-bold">
                              {(item.product.price_ton * item.quantity).toFixed(1)} TON
                            </span>
                          </div>
                          <span className="font-mono text-xs text-muted-foreground">
                            ${(item.product.price_usd * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="rounded-xl border border-border p-6 sticky top-24 space-y-6">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items ({itemCount})</span>
                      <span>{totalTon.toFixed(1)} TON</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-accent">Free</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-border text-base font-bold">
                      <span>Total</span>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Gem className="h-4 w-4 text-accent" />
                          <span>{totalTon.toFixed(1)} TON</span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground font-normal">
                          ${totalUsd.toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/checkout" className="block">
                    <Button size="lg" className="w-full text-base">
                      Checkout with Crypto
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <div className="rounded-lg border border-border p-3 bg-secondary/50">
                    <p className="font-mono text-[10px] text-muted-foreground text-center">
                      Secure payments via TonKeeper, MyTonWallet, or Telegram Stars
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

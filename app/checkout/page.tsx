"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Gem, Wallet, CheckCircle2, Copy, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const PAYMENT_METHODS = [
  {
    id: "tonkeeper",
    name: "TonKeeper",
    description: "Pay directly from your TonKeeper wallet",
    icon: Wallet,
  },
  {
    id: "mytonwallet",
    name: "My TON Wallet",
    description: "Use My TON Wallet browser extension",
    icon: Wallet,
  },
  {
    id: "telegram-stars",
    name: "Telegram Stars",
    description: "Pay with Telegram Stars",
    icon: Gem,
  },
]

// Mock seller wallet for demo
const SELLER_WALLET = "EQD4FPq-PRDieyQKkizFTRtSDyucUIqrj0v_zXJmqaDp6_0T"

export default function CheckoutPage() {
  const { items, totalTon, totalUsd, itemCount, clearCart } = useCart()
  const { user, profile } = useAuth()
  const [selectedMethod, setSelectedMethod] = useState("")
  const [step, setStep] = useState<"select" | "pay" | "complete">("select")
  const [walletAddress, setWalletAddress] = useState(profile?.wallet_address || "")

  if (items.length === 0 && step !== "complete") {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">No items to checkout</h1>
          <Link href="/shop">
            <Button>Browse Shop</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  function handlePayment() {
    // In production, this would trigger TON Connect or deep-link to TonKeeper
    setStep("complete")
    clearCart()
    toast.success("Order placed successfully!")
  }

  function copyWallet() {
    navigator.clipboard.writeText(SELLER_WALLET)
    toast.success("Wallet address copied!")
  }

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">

          {step === "complete" ? (
            <div className="text-center py-12 space-y-6">
              <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold">Order Confirmed!</h1>
              <p className="font-mono text-muted-foreground">
                Your payment is being processed on the TON network. You will receive a confirmation once the transaction is verified.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/shop">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
                <Link href="/account">
                  <Button>View Orders</Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <Link href="/cart" className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to cart
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

              {/* Order summary */}
              <div className="rounded-xl border border-border p-6 mb-8">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between font-mono text-sm">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span>{(item.product.price_ton * item.quantity).toFixed(1)} TON</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 border-t border-border font-bold">
                    <span>Total ({itemCount} items)</span>
                    <div className="flex items-center gap-1">
                      <Gem className="h-4 w-4 text-accent" />
                      <span>{totalTon.toFixed(1)} TON</span>
                      <span className="font-mono text-xs text-muted-foreground font-normal ml-2">
                        (${totalUsd.toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {step === "select" && (
                <div className="space-y-6">
                  {/* Wallet input */}
                  <div>
                    <label className="block font-mono text-sm font-medium mb-2">
                      Your TON Wallet Address
                    </label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="EQD..."
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  {/* Payment method selection */}
                  <div>
                    <label className="block font-mono text-sm font-medium mb-3">
                      Select Payment Method
                    </label>
                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                            selectedMethod === method.id
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                            selectedMethod === method.id ? "bg-accent/10" : "bg-secondary"
                          }`}>
                            <method.icon className={`h-5 w-5 ${selectedMethod === method.id ? "text-accent" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <span className="font-semibold text-sm">{method.name}</span>
                            <p className="font-mono text-xs text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full text-base"
                    disabled={!selectedMethod || !walletAddress}
                    onClick={() => setStep("pay")}
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {step === "pay" && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 space-y-4">
                    <h2 className="font-semibold text-lg">
                      Send {totalTon.toFixed(1)} TON
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground">
                      Send exactly {totalTon.toFixed(1)} TON to the following wallet address using your {selectedMethod === "tonkeeper" ? "TonKeeper" : selectedMethod === "mytonwallet" ? "My TON Wallet" : "Telegram Stars"} wallet:
                    </p>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-background border border-border">
                      <code className="font-mono text-xs flex-1 truncate">{SELLER_WALLET}</code>
                      <button onClick={copyWallet} className="shrink-0 p-2 hover:bg-secondary rounded transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>

                    {selectedMethod === "tonkeeper" && (
                      <a
                        href={`https://app.tonkeeper.com/transfer/${SELLER_WALLET}?amount=${Math.floor(totalTon * 1e9)}&text=JorabMoon-Order`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-accent text-accent-foreground py-3 font-mono text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Open in TonKeeper <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

                    {selectedMethod === "mytonwallet" && (
                      <a
                        href={`ton://transfer/${SELLER_WALLET}?amount=${Math.floor(totalTon * 1e9)}&text=JorabMoon-Order`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full rounded-lg bg-accent text-accent-foreground py-3 font-mono text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Open TON Link <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <Button size="lg" className="w-full text-base" onClick={handlePayment}>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    {"I've Sent the Payment"}
                  </Button>

                  <button
                    onClick={() => setStep("select")}
                    className="w-full text-center font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Back to payment selection
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

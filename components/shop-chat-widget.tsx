"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { mockMessages } from "@/lib/mock-data"
import type { Shop, Message } from "@/lib/mock-data"
import { Send, MessageCircle, DollarSign, Gem } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ShopChatWidget({ shop }: { shop: Shop }) {
  const { user, profile } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load mock messages for this shop
    const shopMessages = mockMessages.filter(
      (m) =>
        m.conversation_id === "conv-1" &&
        (shop.id === "shop-1")
    )
    setMessages(shopMessages)
  }, [shop.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || !user) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: "conv-new",
      sender_id: user.id,
      content: input.trim(),
      created_at: new Date().toISOString(),
      sender: profile || undefined,
    }
    setMessages((prev) => [...prev, newMsg])
    setInput("")
  }

  function sendCurrencyOffer(currency: string, amount: string) {
    if (!user) return
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: "conv-new",
      sender_id: user.id,
      content: `[Payment Offer] ${amount} ${currency} - Awaiting seller confirmation`,
      created_at: new Date().toISOString(),
      sender: profile || undefined,
    }
    setMessages((prev) => [...prev, newMsg])
    setShowCurrencyMenu(false)
  }

  if (!user) {
    return (
      <div className="text-center py-12 rounded-xl border border-border bg-secondary/50">
        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Live Chat with Seller</h3>
        <p className="font-mono text-sm text-muted-foreground mb-6">
          Sign in to chat directly with {shop.name}
        </p>
        <Link href="/auth/login">
          <Button>Sign In to Chat</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-secondary/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-accent" />
          <div>
            <h3 className="font-semibold text-sm">Chat with {shop.name}</h3>
            <p className="font-mono text-xs text-muted-foreground">
              Live messaging - discuss orders, payments, and shipping
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="font-mono text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="font-mono text-sm text-muted-foreground">
              Start a conversation with {shop.name}
            </p>
          </div>
        )}
        {messages.map((msg) => {
          const isOwn = msg.sender_id === user?.id
          const isPayment = msg.content.startsWith("[Payment Offer]")
          return (
            <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 ${
                  isPayment
                    ? "bg-accent/10 border border-accent/30"
                    : isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                }`}
              >
                {!isOwn && msg.sender && (
                  <p className={`font-mono text-[10px] font-medium mb-1 ${isOwn ? "text-primary-foreground/70" : "text-accent"}`}>
                    {msg.sender.first_name}
                  </p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className={`font-mono text-[10px] mt-1 ${isOwn ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-secondary/50">
        {showCurrencyMenu && (
          <div className="mb-3 p-3 rounded-lg border border-border bg-background">
            <p className="font-mono text-xs font-medium mb-2">Send Payment Offer</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => sendCurrencyOffer("TON", "2.5")}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-secondary font-mono text-xs transition-colors"
              >
                <Gem className="h-3 w-3 text-accent" /> TON
              </button>
              <button
                onClick={() => sendCurrencyOffer("USD", "25.00")}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-secondary font-mono text-xs transition-colors"
              >
                <DollarSign className="h-3 w-3" /> USD
              </button>
              <button
                onClick={() => sendCurrencyOffer("EUR", "23.00")}
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-secondary font-mono text-xs transition-colors"
              >
                <DollarSign className="h-3 w-3" /> EUR
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
            className={`p-2 rounded-lg border transition-colors ${
              showCurrencyMenu ? "border-accent bg-accent/10 text-accent" : "border-border hover:bg-secondary"
            }`}
            title="Send payment offer"
          >
            <DollarSign className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

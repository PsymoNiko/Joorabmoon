"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { useAuth } from "@/lib/auth-context"
import { mockConversations, mockMessages, mockShops, mockUsers } from "@/lib/mock-data"
import type { Conversation, Message } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle, Store, DollarSign, Gem, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ChatPage() {
  const { user, profile } = useAuth()
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get conversations for current user
  const conversations = mockConversations.filter(
    (c) =>
      c.buyer_id === user?.id ||
      mockShops.find((s) => s.id === c.shop_id)?.owner_id === user?.id
  )

  useEffect(() => {
    if (selectedConv) {
      setMessages(mockMessages.filter((m) => m.conversation_id === selectedConv.id))
    }
  }, [selectedConv])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || !user) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversation_id: selectedConv?.id || "conv-new",
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
      conversation_id: selectedConv?.id || "conv-new",
      sender_id: user.id,
      content: `[Payment Offer] ${amount} ${currency} - Awaiting confirmation`,
      created_at: new Date().toISOString(),
      sender: profile || undefined,
    }
    setMessages((prev) => [...prev, newMsg])
    setShowCurrencyMenu(false)
  }

  if (!user) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Messages</h1>
          <p className="font-mono text-muted-foreground mb-6">Sign in to view your messages</p>
          <Link href="/auth/login?redirect=/chat"><Button>Sign In</Button></Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r border-border bg-secondary/30 flex flex-col ${selectedConv ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Messages</h2>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              {conversations.length} conversation{conversations.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-mono text-sm text-muted-foreground">No conversations yet</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  Visit a shop to start chatting
                </p>
              </div>
            ) : (
              conversations.map((conv) => {
                const otherUser = conv.buyer_id === user.id
                  ? mockShops.find((s) => s.id === conv.shop_id)
                  : mockUsers.find((u) => u.id === conv.buyer_id)
                const isShop = conv.buyer_id === user.id
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConv(conv)}
                    className={`w-full p-4 text-left border-b border-border hover:bg-secondary/50 transition-colors ${
                      selectedConv?.id === conv.id ? "bg-secondary" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        {isShop ? <Store className="h-5 w-5 text-accent" /> : <span className="text-sm font-bold text-accent">{(otherUser as any)?.first_name?.[0] || "?"}</span>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm truncate">
                          {isShop ? (otherUser as any)?.name : `${(otherUser as any)?.first_name} ${(otherUser as any)?.last_name}`}
                        </p>
                        {conv.last_message && (
                          <p className="font-mono text-xs text-muted-foreground truncate mt-0.5">
                            {conv.last_message.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!selectedConv ? "hidden md:flex" : "flex"}`}>
          {!selectedConv ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-mono text-muted-foreground">Select a conversation</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-border flex items-center gap-3 bg-background">
                <button onClick={() => setSelectedConv(null)} className="md:hidden p-1">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Store className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{selectedConv.shop?.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="font-mono text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
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
                          <p className="font-mono text-[10px] font-medium mb-1 text-accent">
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
                      <button onClick={() => sendCurrencyOffer("TON", "2.5")} className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-secondary font-mono text-xs transition-colors">
                        <Gem className="h-3 w-3 text-accent" /> TON
                      </button>
                      <button onClick={() => sendCurrencyOffer("USD", "25.00")} className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-secondary font-mono text-xs transition-colors">
                        <DollarSign className="h-3 w-3" /> USD
                      </button>
                      <button onClick={() => sendCurrencyOffer("EUR", "23.00")} className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-secondary font-mono text-xs transition-colors">
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
            </>
          )}
        </div>
      </div>
    </main>
  )
}

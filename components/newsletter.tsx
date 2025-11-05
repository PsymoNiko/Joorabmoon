"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Join the Moon Club</h2>
          <p className="text-lg font-mono text-primary-foreground/80 text-pretty">
            {
              "Be the first to know about new collections, exclusive designs, and special offers. Plus, get 15% off your first order."
            }
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground text-primary flex-1"
            />
            <Button type="submit" variant="secondary" size="lg" className="whitespace-nowrap">
              Subscribe
            </Button>
          </form>
          <p className="text-sm font-mono text-primary-foreground/60">
            {"We respect your privacy. Unsubscribe at any time."}
          </p>
        </div>
      </div>
    </section>
  )
}

"use client"

import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/logo"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount] = useState(0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#shop"
              className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Shop
            </Link>
            <Link
              href="#collections"
              className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Collections
            </Link>
            <Link
              href="#about"
              className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="#shop"
                className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Shop
              </Link>
              <Link
                href="#collections"
                className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Collections
              </Link>
              <Link
                href="#about"
                className="font-mono text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

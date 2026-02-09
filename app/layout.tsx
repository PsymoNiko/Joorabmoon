import type React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "sonner"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jorab Moon - Crypto-Powered Sock Marketplace",
  description:
    "Buy and sell artistic socks with TON cryptocurrency. Premium quality socks with bold designs, powered by blockchain payments.",
  keywords: ["socks", "crypto", "TON", "marketplace", "fashion", "blockchain"],
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster position="bottom-right" />
          </CartProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

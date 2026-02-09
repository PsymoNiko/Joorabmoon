"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { mockOrders } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import {
  User, Wallet, Eye, EyeOff, ShoppingCart, Gem, Edit3, MapPin,
  Calendar, Mail, Shield
} from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const { user, profile, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(profile?.first_name || "")
  const [lastName, setLastName] = useState(profile?.last_name || "")
  const [city, setCity] = useState(profile?.city || "")
  const [country, setCountry] = useState(profile?.country || "")
  const [walletAddress, setWalletAddress] = useState(profile?.wallet_address || "")
  const [showEmail, setShowEmail] = useState(profile?.show_email ?? true)
  const [showBirthdate, setShowBirthdate] = useState(profile?.show_birthdate ?? false)

  const orders = mockOrders.filter((o) => o.buyer_id === user?.id)

  if (!user) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <p className="font-mono text-muted-foreground mb-6">Sign in to view your account</p>
          <Link href="/auth/login?redirect=/account"><Button>Sign In</Button></Link>
        </div>
        <Footer />
      </main>
    )
  }

  async function handleSave() {
    await updateProfile({
      first_name: firstName,
      last_name: lastName,
      city,
      country,
      wallet_address: walletAddress,
      show_email: showEmail,
      show_birthdate: showBirthdate,
    })
    setEditing(false)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Profile header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">
                  {profile?.first_name?.[0] || "U"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {profile?.first_name} {profile?.last_name}
                </h1>
                <p className="font-mono text-sm text-muted-foreground">{user.email}</p>
                <span className="inline-block mt-1 font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent uppercase tracking-wider">
                  {profile?.role || "buyer"}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
              <Edit3 className="mr-2 h-4 w-4" /> {editing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {/* Profile details */}
          <div className="rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" /> Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!editing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm disabled:opacity-60 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block font-mono text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!editing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm disabled:opacity-60 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block font-mono text-sm font-medium mb-2">
                  <MapPin className="inline h-3.5 w-3.5 mr-1" /> City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!editing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm disabled:opacity-60 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block font-mono text-sm font-medium mb-2">
                  <MapPin className="inline h-3.5 w-3.5 mr-1" /> Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={!editing}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm disabled:opacity-60 outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-sm font-medium mb-2">
                <Wallet className="inline h-3.5 w-3.5 mr-1" /> TON Wallet Address
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                disabled={!editing}
                placeholder="EQD..."
                className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm disabled:opacity-60 outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {editing && (
              <Button onClick={handleSave}>Save Changes</Button>
            )}
          </div>

          {/* Privacy settings */}
          <div className="rounded-xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5" /> Privacy Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Show Email</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      Make your email visible to other users
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => editing && setShowEmail(!showEmail)}
                  disabled={!editing}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs transition-colors disabled:opacity-60 ${
                    showEmail
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {showEmail ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {showEmail ? "Visible" : "Hidden"}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Show Birthdate</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      Make your birthdate visible to other users
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => editing && setShowBirthdate(!showBirthdate)}
                  disabled={!editing}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs transition-colors disabled:opacity-60 ${
                    showBirthdate
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {showBirthdate ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {showBirthdate ? "Visible" : "Hidden"}
                </button>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" /> My Orders
              </h2>
            </div>
            {orders.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-sm text-muted-foreground mb-4">No orders yet</p>
                <Link href="/shop">
                  <Button variant="outline" size="sm">Browse Shop</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-mono text-sm font-medium">Order #{order.id.slice(-6)}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()} - {order.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Gem className="h-3.5 w-3.5 text-accent" />
                        <span className="font-bold text-sm">{order.total_ton} TON</span>
                      </div>
                      <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                        order.status === "shipped" ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

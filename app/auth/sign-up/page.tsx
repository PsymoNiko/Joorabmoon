"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Logo } from "@/components/logo"
import { ArrowLeft, Eye, EyeOff, User, Store } from "lucide-react"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<"buyer" | "seller">("buyer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [gender, setGender] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signUp, isMockMode } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const { error: err } = await signUp({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      role,
      gender,
      city,
      country,
      wallet_address: walletAddress,
    })
    if (err) {
      setError(err)
      setLoading(false)
    } else {
      if (isMockMode) {
        router.push(role === "seller" ? "/dashboard" : "/shop")
      } else {
        router.push("/auth/sign-up-success")
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-mono text-sm mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to store
          </Link>
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-balance">Create Your Account</h1>
          <p className="font-mono text-sm text-muted-foreground mt-2">
            Join the Jorab Moon marketplace
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <p className="text-center font-mono text-sm text-muted-foreground">
              How do you want to use Jorab Moon?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => { setRole("buyer"); setStep(2) }}
                className={`p-6 rounded-xl border-2 text-center transition-all hover:border-accent hover:shadow-lg ${
                  role === "buyer" ? "border-accent bg-accent/5" : "border-border"
                }`}
              >
                <User className="h-10 w-10 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-1">Buyer</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Browse and buy socks with crypto
                </p>
              </button>
              <button
                type="button"
                onClick={() => { setRole("seller"); setStep(2) }}
                className={`p-6 rounded-xl border-2 text-center transition-all hover:border-accent hover:shadow-lg ${
                  role === "seller" ? "border-accent bg-accent/5" : "border-border"
                }`}
              >
                <Store className="h-10 w-10 mx-auto mb-3 text-accent" />
                <h3 className="font-semibold mb-1">Seller</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Set up a shop and sell socks
                </p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <p className="font-mono text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
              <button type="button" onClick={() => setStep(1)} className="text-accent hover:underline">
                Role: {role}
              </button>
              <span>/</span>
              <span className="text-foreground">Details</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block font-mono text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="First name"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-mono text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Last name"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signupEmail" className="block font-mono text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="signupEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="signupPassword" className="block font-mono text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="Min 6 characters"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block font-mono text-sm font-medium mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block font-mono text-sm font-medium mb-2">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Your city"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label htmlFor="country" className="block font-mono text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Your country"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label htmlFor="wallet" className="block font-mono text-sm font-medium mb-2">
                TON Wallet Address
                <span className="text-muted-foreground font-normal ml-1">(optional)</span>
              </label>
              <input
                id="wallet"
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="EQD..."
                className="w-full rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="font-mono text-xs text-muted-foreground mt-1">
                TonKeeper, MyTonWallet, or any TON-compatible wallet
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary text-primary-foreground py-3 font-mono text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creating account..." : `Create ${role === "seller" ? "Seller" : "Buyer"} Account`}
            </button>
          </form>
        )}

        <p className="text-center font-mono text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}

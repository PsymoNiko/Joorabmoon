"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Profile } from "./mock-data"
import { mockUsers } from "./mock-data"

type AuthUser = {
  id: string
  email: string
}

type AuthContextType = {
  user: AuthUser | null
  profile: Profile | null
  isLoading: boolean
  isMockMode: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (data: SignUpData) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<{ error?: string }>
  setMockUser: (userId: string | null) => void
}

type SignUpData = {
  email: string
  password: string
  first_name: string
  last_name: string
  role: "buyer" | "seller"
  gender?: string
  city?: string
  country?: string
  wallet_address?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMockMode, setIsMockMode] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        setUser({ id: authUser.id, email: authUser.email || "" })
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single()
        if (prof) setProfile(prof)
      }
      setIsMockMode(false)
    } catch {
      // Supabase not configured, use mock mode
      setIsMockMode(true)
      // Check localStorage for mock session
      const mockId = localStorage.getItem("jm_mock_user")
      if (mockId) {
        const mockUser = mockUsers.find((u) => u.id === mockId)
        if (mockUser) {
          setUser({ id: mockUser.id, email: mockUser.email })
          setProfile(mockUser)
        }
      }
    }
    setIsLoading(false)
  }

  async function signIn(email: string, _password: string) {
    if (isMockMode) {
      const mockUser = mockUsers.find((u) => u.email === email)
      if (mockUser) {
        setUser({ id: mockUser.id, email: mockUser.email })
        setProfile(mockUser)
        localStorage.setItem("jm_mock_user", mockUser.id)
        return {}
      }
      return { error: "Invalid email or password" }
    }

    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password: _password })
      if (error) return { error: error.message }
      await checkAuth()
      return {}
    } catch {
      return { error: "Authentication service unavailable" }
    }
  }

  async function signUp(data: SignUpData) {
    if (isMockMode) {
      const newUser: Profile = {
        id: `mock-${Date.now()}`,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender || "",
        birthdate: "",
        city: data.city || "",
        country: data.country || "",
        wallet_address: data.wallet_address || "",
        role: data.role,
        avatar_url: null,
        show_email: true,
        show_birthdate: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockUsers.push(newUser)
      setUser({ id: newUser.id, email: newUser.email })
      setProfile(newUser)
      localStorage.setItem("jm_mock_user", newUser.id)
      return {}
    }

    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/account`,
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
          },
        },
      })
      if (error) return { error: error.message }
      return {}
    } catch {
      return { error: "Authentication service unavailable" }
    }
  }

  async function signOut() {
    if (isMockMode) {
      setUser(null)
      setProfile(null)
      localStorage.removeItem("jm_mock_user")
      return
    }

    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {
      // ignore
    }
    setUser(null)
    setProfile(null)
  }

  async function updateProfile(data: Partial<Profile>) {
    if (isMockMode && profile) {
      const updated = { ...profile, ...data, updated_at: new Date().toISOString() }
      setProfile(updated)
      return {}
    }

    if (!user) return { error: "Not authenticated" }

    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()
      const { error } = await supabase
        .from("profiles")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", user.id)
      if (error) return { error: error.message }
      setProfile((prev) => (prev ? { ...prev, ...data } : null))
      return {}
    } catch {
      return { error: "Database service unavailable" }
    }
  }

  function setMockUser(userId: string | null) {
    if (userId === null) {
      setUser(null)
      setProfile(null)
      localStorage.removeItem("jm_mock_user")
      return
    }
    const mockUser = mockUsers.find((u) => u.id === userId)
    if (mockUser) {
      setUser({ id: mockUser.id, email: mockUser.email })
      setProfile(mockUser)
      localStorage.setItem("jm_mock_user", mockUser.id)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, profile, isLoading, isMockMode, signIn, signUp, signOut, updateProfile, setMockUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

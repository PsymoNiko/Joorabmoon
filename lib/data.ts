// Data access layer with mock fallback
// When Supabase is connected and active, it uses real DB
// Otherwise, falls back to mock data

import {
  mockProducts,
  mockShops,
  mockUsers,
  mockConversations,
  mockMessages,
  mockOrders,
  type Product,
  type Shop,
  type Profile,
  type Conversation,
  type Message,
  type Order,
} from "./mock-data"

const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// --- Products ---
export async function getProducts(category?: string): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      let query = supabase.from("products").select("*, shop:shops(*)")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
      if (category) query = query.eq("category", category)
      const { data } = await query
      if (data && data.length > 0) return data as Product[]
    } catch {
      // fallback to mock
    }
  }
  if (category) return mockProducts.filter((p) => p.category === category)
  return mockProducts
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("products")
        .select("*, shop:shops(*, owner:profiles(*))")
        .eq("slug", slug)
        .single()
      if (data) return data as Product
    } catch {
      // fallback
    }
  }
  return mockProducts.find((p) => p.slug === slug) || null
}

export async function getProductsByShop(shopId: string): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("products")
        .select("*, shop:shops(*)")
        .eq("shop_id", shopId)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
      if (data && data.length > 0) return data as Product[]
    } catch {
      // fallback
    }
  }
  return mockProducts.filter((p) => p.shop_id === shopId)
}

// --- Shops ---
export async function getShops(): Promise<Shop[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("shops")
        .select("*, owner:profiles(*)")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
      if (data && data.length > 0) return data as Shop[]
    } catch {
      // fallback
    }
  }
  return mockShops
}

export async function getShopBySlug(slug: string): Promise<Shop | null> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("shops")
        .select("*, owner:profiles(*)")
        .eq("slug", slug)
        .single()
      if (data) return data as Shop
    } catch {
      // fallback
    }
  }
  return mockShops.find((s) => s.slug === slug) || null
}

// --- Profiles ---
export async function getProfile(userId: string): Promise<Profile | null> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()
      if (data) return data as Profile
    } catch {
      // fallback
    }
  }
  return mockUsers.find((u) => u.id === userId) || null
}

// --- Conversations ---
export async function getConversations(userId: string): Promise<Conversation[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("conversations")
        .select("*, shop:shops(*), buyer:profiles(*)")
        .or(`buyer_id.eq.${userId},shop_id.in.(select id from shops where owner_id='${userId}')`)
        .order("updated_at", { ascending: false })
      if (data && data.length > 0) return data as Conversation[]
    } catch {
      // fallback
    }
  }
  return mockConversations.filter(
    (c) => c.buyer_id === userId || mockShops.find((s) => s.id === c.shop_id)?.owner_id === userId
  )
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("messages")
        .select("*, sender:profiles(*)")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
      if (data && data.length > 0) return data as Message[]
    } catch {
      // fallback
    }
  }
  return mockMessages.filter((m) => m.conversation_id === conversationId)
}

// --- Orders ---
export async function getOrders(userId: string): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("orders")
        .select("*, items:order_items(*, product:products(*))")
        .eq("buyer_id", userId)
        .order("created_at", { ascending: false })
      if (data && data.length > 0) return data as Order[]
    } catch {
      // fallback
    }
  }
  return mockOrders.filter((o) => o.buyer_id === userId)
}

export async function getShopOrders(shopId: string): Promise<Order[]> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      const { data } = await supabase
        .from("orders")
        .select("*, items:order_items(*, product:products(*))")
        .eq("shop_id", shopId)
        .order("created_at", { ascending: false })
      if (data && data.length > 0) return data as Order[]
    } catch {
      // fallback
    }
  }
  return mockOrders.filter((o) => o.shop_id === shopId)
}

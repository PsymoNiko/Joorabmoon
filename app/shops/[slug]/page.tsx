import { getShopBySlug, getProductsByShop } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ShopChatWidget } from "@/components/shop-chat-widget"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Store, MapPin, Phone, PhoneOff, Gem } from "lucide-react"

export default async function ShopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const shop = await getShopBySlug(slug)
  if (!shop) notFound()

  const products = await getProductsByShop(shop.id)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Shop Banner */}
      <section className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <nav className="flex items-center gap-2 font-mono text-sm text-muted-foreground mb-8">
            <Link href="/shops" className="hover:text-foreground transition-colors">Sellers</Link>
            <span>/</span>
            <span className="text-foreground">{shop.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="h-24 w-24 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
              <Store className="h-12 w-12 text-accent" />
            </div>
            <div className="space-y-4 flex-1">
              <h1 className="text-3xl md:text-5xl font-bold">{shop.name}</h1>
              <p className="font-mono text-muted-foreground max-w-2xl text-pretty">
                {shop.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 font-mono text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {shop.city}, {shop.country}
                </div>
                {shop.show_contact && shop.contact_number ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {shop.contact_number}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PhoneOff className="h-3 w-3" />
                    <span className="text-xs">Contact hidden</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-accent">
                  <Gem className="h-4 w-4" />
                  Accepts TON
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">
            Products <span className="text-muted-foreground font-mono text-lg">({products.length})</span>
          </h2>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20">
              <p className="font-mono text-muted-foreground">No products listed yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Live Chat Section */}
      <section id="chat" className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ShopChatWidget shop={shop} />
        </div>
      </section>

      <Footer />
    </main>
  )
}

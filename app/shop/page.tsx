import { getProducts } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"

export default async function ShopPage() {
  const products = await getProducts()
  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
              The Sock Shop
            </h1>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto text-pretty">
              Browse our curated marketplace of artistic socks. Pay with TON crypto or Telegram Stars.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-mono text-sm cursor-pointer">
              All
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full border border-border hover:bg-secondary font-mono text-sm cursor-pointer transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>

          <ProductGrid products={products} />
        </div>
      </section>
      <Footer />
    </main>
  )
}

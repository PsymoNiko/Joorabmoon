import { getProductBySlug, getProductsByShop } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { ProductGrid } from "@/components/product-grid"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const relatedProducts = (await getProductsByShop(product.shop_id)).filter(
    (p) => p.id !== product.id
  )

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-sm text-muted-foreground mb-8">
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            {product.shop && (
              <>
                <Link href={`/shops/${product.shop.slug}`} className="hover:text-foreground transition-colors">
                  {product.shop.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <ProductDetail product={product} />

          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-8">More from this shop</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}

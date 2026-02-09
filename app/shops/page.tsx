import { getShops } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Store, MapPin, MessageCircle } from "lucide-react"

export default async function ShopsPage() {
  const shops = await getShops()

  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Our Sellers</h1>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto text-pretty">
              Discover talented sock artisans from around the world
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.map((shop) => (
              <Link
                key={shop.id}
                href={`/shops/${shop.slug}`}
                className="group block rounded-xl border border-border p-6 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Store className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {shop.name}
                    </h3>
                    <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {shop.city}, {shop.country}
                    </div>
                  </div>
                </div>
                <p className="font-mono text-sm text-muted-foreground line-clamp-3 mb-4">
                  {shop.description}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  {shop.show_contact && shop.contact_number && (
                    <span className="font-mono text-xs text-muted-foreground">
                      {shop.contact_number}
                    </span>
                  )}
                  <div className="flex items-center gap-1 font-mono text-xs text-accent ml-auto">
                    <MessageCircle className="h-3 w-3" />
                    Chat
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

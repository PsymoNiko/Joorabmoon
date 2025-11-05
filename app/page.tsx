import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductShowcase } from "@/components/product-showcase"
import { FeaturedCollection } from "@/components/featured-collection"
import { AboutSection } from "@/components/about-section"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProductShowcase />
      <FeaturedCollection />
      <AboutSection />
      <Newsletter />
      <Footer />
    </main>
  )
}

export function FeaturedCollection() {
  return (
    <section id="collections" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">The Artist Collection</h2>
            <p className="text-lg text-muted-foreground font-mono text-pretty">
              {
                "Our signature collection celebrates creativity and self-expression. Each pair is crafted with premium materials and features unique designs inspired by contemporary art and culture."
              }
            </p>
            <ul className="space-y-3 font-mono">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Premium combed cotton blend for ultimate comfort</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Reinforced heel and toe for durability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Unique designs you won&apos;t find anywhere else</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span>Sustainable production practices</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/colorful-patterned-socks-close-up.jpg"
                  alt="Sock detail 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/artistic-socks-on-feet-lifestyle.jpg"
                  alt="Sock detail 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/vibrant-socks-product-photography.jpg"
                  alt="Sock detail 3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/colorful-socks-flat-lay.jpg"
                  alt="Sock detail 4"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

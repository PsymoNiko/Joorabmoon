export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Socks as Art, Comfort as Priority</h2>
          <p className="text-xl text-muted-foreground font-mono text-pretty leading-relaxed">
            {
              "At Jorab Moon, we believe that every detail matters. Our socks are more than just accessories—they're a canvas for self-expression, a conversation starter, and a daily reminder to embrace color and creativity."
            }
          </p>
          <p className="text-lg text-muted-foreground font-mono text-pretty leading-relaxed">
            {
              "Founded by artists and designers who were tired of boring basics, we set out to create socks that combine premium comfort with bold, artistic designs. Each collection is carefully curated to bring joy to your everyday wardrobe."
            }
          </p>
          <div className="grid sm:grid-cols-3 gap-8 pt-12">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">10k+</div>
              <div className="font-mono text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">50+</div>
              <div className="font-mono text-sm text-muted-foreground">Unique Designs</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">100%</div>
              <div className="font-mono text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

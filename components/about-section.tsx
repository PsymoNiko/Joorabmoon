"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-pink/5 to-orange/5" />
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-lime/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Socks as{" "}
            <span className="bg-gradient-to-r from-orange via-pink to-blue bg-clip-text text-transparent">Art</span>,
            Comfort as Priority
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground font-mono text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            At Jorab Moon, we believe that every detail matters. Our socks are more than just accessories—they're a
            canvas for self-expression, a conversation starter, and a daily reminder to embrace color and creativity.
          </motion.p>
          <motion.p
            className="text-lg text-muted-foreground font-mono text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Founded by artists and designers who were tired of boring basics, we set out to create socks that combine
            premium comfort with bold, artistic designs. Each collection is carefully curated to bring joy to your
            everyday wardrobe.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-8 pt-12">
            {[
              { value: "10k+", label: "Happy Customers", color: "from-orange to-pink" },
              { value: "50+", label: "Unique Designs", color: "from-pink to-blue" },
              { value: "100%", label: "Satisfaction Rate", color: "from-blue to-lime" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="space-y-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="font-mono text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"

export function FeaturedCollection() {
  return (
    <section
      id="collections"
      className="py-20 md:py-32 bg-gradient-to-br from-pink/10 via-orange/10 to-lime/10 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
              The{" "}
              <span className="bg-gradient-to-r from-orange via-pink to-blue bg-clip-text text-transparent">
                Artist
              </span>{" "}
              Collection
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground font-mono text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Our signature collection celebrates creativity and self-expression. Each pair is crafted with premium
              materials and features unique designs inspired by contemporary art and culture.
            </motion.p>
            <motion.ul
              className="space-y-3 font-mono"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {[
                "Premium combed cotton blend for ultimate comfort",
                "Reinforced heel and toe for durability",
                "Unique designs you won't find anywhere else",
                "Sustainable production practices",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.span
                    className="text-lime text-xl font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                    }}
                  >
                    ✓
                  </motion.span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-4">
              <motion.div
                className="aspect-square rounded-lg overflow-hidden border-4 border-orange/50 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/colorful-patterned-socks-close-up.jpg" alt="Sock detail 1" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="aspect-square rounded-lg overflow-hidden border-4 border-pink/50 shadow-lg"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/artistic-socks-on-feet-lifestyle.jpg" alt="Sock detail 2" className="w-full h-full object-cover" />
              </motion.div>
            </div>
            <div className="space-y-4 pt-8">
              <motion.div
                className="aspect-square rounded-lg overflow-hidden border-4 border-lime/50 shadow-lg"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/vibrant-socks-product-photography.jpg" alt="Sock detail 3" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                className="aspect-square rounded-lg overflow-hidden border-4 border-blue/50 shadow-lg"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/colorful-socks-flat-lay.jpg" alt="Sock detail 4" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

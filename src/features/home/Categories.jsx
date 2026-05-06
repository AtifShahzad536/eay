import { motion } from 'framer-motion'

const categories = [
  {
    name: 'Jerseys',
    count: '50+ Designs',
    // blue/teal gradient - exactly matching Figma
    gradient: 'from-[#0EA5E9]/70 via-[#0284C7]/60 to-[#1D4ED8]/80',
    image: 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?w=600&h=700&fit=crop&q=80',
  },
  {
    name: 'T-Shirts',
    count: '40+ Styles',
    // pink/purple gradient - exactly matching Figma
    gradient: 'from-[#EC4899]/70 via-[#C026D3]/60 to-[#9333EA]/80',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop&q=80',
  },
  {
    name: 'Hoodies',
    count: '30+ Options',
    // emerald/teal green gradient - exactly matching Figma
    gradient: 'from-[#10B981]/70 via-[#059669]/60 to-[#047857]/80',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=700&fit=crop&q=80',
  },
  {
    name: 'Shorts',
    count: '25+ Variants',
    // orange/coral gradient - exactly matching Figma
    gradient: 'from-[#FB923C]/70 via-[#F97316]/60 to-[#DC2626]/80',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&h=700&fit=crop&q=80',
  },
]

export const Categories = () => {
  return (
    <section className="py-24 bg-[#F8F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black text-slate-800 mb-4"
        >
          Shop by Category
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-500 mb-16"
        >
          Find your perfect sportswear style
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="relative h-[380px] rounded-xl overflow-hidden cursor-pointer group shadow-xl shadow-gray-200/60"
            >
              {/* Real Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Colored Gradient Overlay - exactly like Figma */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} transition-opacity duration-300 group-hover:opacity-90`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-4xl font-black mb-4 tracking-tight drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                  {cat.name}
                </h3>
                <div className="bg-white/25 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm border border-white/30">
                  {cat.count}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

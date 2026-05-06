import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart } from 'lucide-react'

export const StarRow = ({ rating, reviews }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} size={13}
          className={s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
    <span className="text-xs text-slate-400 font-medium">({reviews})</span>
  </div>
)

export const ProductCard = ({ product, index = 0, view = 'grid' }) => {
  const [wished, setWished] = useState(false)
  const isList = view === 'list'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={`bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-indigo-50/80 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer ${
        isList ? 'flex flex-col sm:flex-row h-auto sm:h-48' : 'flex flex-col'
      }`}
    >
      <div className={`relative overflow-hidden bg-gray-50 flex-shrink-0 ${isList ? 'h-52 sm:h-full sm:w-48 border-b sm:border-b-0 sm:border-r border-gray-100' : 'h-52 w-full'}`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black text-white shadow-lg ${
              product.badge === 'Best Seller' ? 'bg-amber-500' :
              product.badge === 'Premium'     ? 'bg-[#7C3AED]' :
              'bg-emerald-500'
            }`}>{product.badge}</span>
          )}
          {product.customizable && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black text-white bg-[#4F46E5] shadow-lg">Customizable</span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={e => { e.stopPropagation(); setWished(!wished) }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart size={15} className={wished ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      <div className={`p-4 flex-1 flex flex-col ${isList ? 'justify-center sm:p-6' : ''}`}>
        <p className="font-bold text-slate-800 text-sm leading-snug mb-1.5">{product.name}</p>
        <StarRow rating={product.rating} reviews={product.reviews} />
        <div className="flex gap-1.5 mt-2.5">
          {product.colors.map(c => (
            <span key={c} className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-xl font-black text-[#4F46E5]">${product.price}</span>
          <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-indigo-200 hover:scale-110 transition-transform">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

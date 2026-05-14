import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, Truck, RefreshCcw, ShieldCheck, ChevronRight, Check } from 'lucide-react'
import { COLORS, TEXT, BG, SPACING, GRADIENTS, BTN } from '../config/theme'
import { ProductCard } from '../components/common/ProductCard/ProductCard'

const IMAGES = [
  'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&h=1000&fit=crop&q=80',
]

const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL']
const COLOR_OPTIONS = [
  { name: 'Blue', hex: '#1D4ED8' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Black', hex: '#1e293b' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Green', hex: '#16A34A' },
]

const RELATED_PRODUCTS = [
  { id: 2,  name: 'Elite Training T-Shirt', price: 29.99,  rating: 4.3, reviews: 189, colors: ['#FFFFFF','#1e293b','#DC2626'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80' },
  { id: 4,  name: 'Athletic Performance Shorts', price: 34.99,  rating: 4.3, reviews: 298, colors: ['#1D4ED8','#1e293b','#DC2626'], image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&h=400&fit=crop&q=80' },
  { id: 11, name: 'Pro Goalkeeper Gloves', price: 44.99,  rating: 4.5, reviews: 89, colors: ['#1e293b','#DC2626'], image: 'https://images.unsplash.com/photo-1529904898663-e9ae7c3d0a94?w=400&h=400&fit=crop&q=80' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export const ProductDetails = ({ onNavigate }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Blue')
  const [qty, setQty] = useState(1)
  const [customName, setCustomName] = useState('')
  const [customNumber, setCustomNumber] = useState('')

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`pt-28 pb-20 min-h-screen ${BG.section}`}
    >
      <div className={SPACING.container}>
        
        {/* Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-slate-400 mb-8"
        >
          <button onClick={() => onNavigate('home')} className="hover:text-indigo-600 transition-colors">Home</button>
          <ChevronRight size={14} />
          <button onClick={() => onNavigate('products')} className="hover:text-indigo-600 transition-colors">Products</button>
          <ChevronRight size={14} />
          <span className={TEXT.dark}>{id ? id.replace(/-/g, ' ').toUpperCase() : 'Pro Performance Jersey'}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* ─── LEFT: Images ──────────────────────── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 flex flex-col gap-4 lg:sticky lg:top-28"
          >
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-lg shadow-indigo-100/50 border border-slate-100 group relative cursor-crosshair">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={IMAGES[activeImage]} 
                  alt="Product" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {IMAGES.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === idx ? `border-[${COLORS.primary}] shadow-lg ring-4 ring-indigo-50` : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ─── RIGHT: Details ────────────────────── */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <motion.h1 variants={fadeUp} className={`text-4xl md:text-5xl ${TEXT.dark} mb-4 tracking-tight`}>
              Pro Performance Jersey
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
              </div>
              <span className={TEXT.mid}>4.8 (234 reviews)</span>
            </motion.div>

            {/* Price */}
            <motion.div variants={fadeUp} className={`text-4xl text-[${COLORS.primary}] mb-6 tracking-tight`}>$49.99</motion.div>

            {/* Description */}
            <motion.p variants={fadeUp} className={`${TEXT.mid} leading-relaxed mb-8 text-lg`}>
              Our premium Pro Performance Jersey is designed for athletes who demand the best. Made with advanced moisture-wicking fabric, this jersey keeps you cool and dry during intense activity. Features include reinforced stitching, lightweight construction, and a comfortable athletic fit.
            </motion.p>

            {/* Select Size */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`${TEXT.dark} font-medium`}>Select Size</h3>
                <button className={`text-[${COLORS.primary}] text-sm hover:underline`}>Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SIZES.map(sz => (
                  <button 
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-14 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                      selectedSize === sz 
                        ? `bg-[${COLORS.primary}] border-[${COLORS.primary}] text-white shadow-lg shadow-indigo-200/50 scale-105` 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Select Color */}
            <motion.div variants={fadeUp} className="mb-8">
              <h3 className={`${TEXT.dark} font-medium mb-3`}>Select Color <span className="text-slate-400 font-normal ml-1">({selectedColor})</span></h3>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map(c => (
                  <button 
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      selectedColor === c.name 
                        ? `border-[${COLORS.primary}] scale-110 shadow-md` 
                        : 'border-transparent hover:scale-110 shadow-sm'
                    }`}
                    style={{ backgroundColor: c.hex === '#ffffff' ? '#F8fafc' : c.hex }}
                    title={c.name}
                  >
                    {c.hex === '#ffffff' && <span className="absolute inset-0 border border-gray-200 rounded-full" />}
                    {selectedColor === c.name && (
                      <Check size={16} className={c.hex === '#ffffff' ? 'text-slate-800' : 'text-white'} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quantity */}
            <motion.div variants={fadeUp} className="mb-10">
              <h3 className={`${TEXT.dark} font-medium mb-3`}>Quantity</h3>
              <div className="inline-flex items-center bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">-</button>
                <span className={`w-14 text-center ${TEXT.dark} font-medium text-lg`}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">+</button>
              </div>
            </motion.div>

            {/* Personalization Section */}
            <motion.div variants={fadeUp} className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={18} className={`text-[${COLORS.primary}]`} />
                <h3 className={`${TEXT.dark} font-semibold`}>Personalize Your Jersey</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">Name on Back</label>
                  <input 
                    type="text" 
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    placeholder="Enter Name" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1.5">Number</label>
                  <input 
                    type="text" 
                    maxLength={2}
                    value={customNumber}
                    onChange={e => setCustomNumber(e.target.value)}
                    placeholder="00" 
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5">●</span> Customization may add 2-3 business days to shipping time.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <button className={`${BTN.primary} flex-1 w-full !py-4 rounded-xl shadow-xl shadow-indigo-200/50 flex items-center justify-center gap-2 text-[15px]`}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="w-full sm:w-16 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors shadow-sm hover:shadow-md">
                <Heart size={22} className="hover:fill-red-500 transition-colors" />
              </button>
            </motion.div>
            
            <motion.button 
              variants={fadeUp} 
              onClick={() => navigate('/builder', { state: { from: `/product-details/${id || '1'}` } })}
              className={`${BTN.outline} w-full !py-4 rounded-xl flex items-center justify-center gap-2 hover:border-indigo-200 transition-colors`}
            >
              <span className="text-indigo-500"><ShieldCheck size={20} /></span> Customize This Product
            </motion.button>

            {/* Info Cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 mt-12 mb-12">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
                { icon: RefreshCcw, title: 'Easy Returns', desc: '30-day return policy' },
                { icon: ShieldCheck, title: 'Quality Guarantee', desc: 'Premium materials' },
              ].map((info, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 text-center shadow-sm">
                  <info.icon size={24} className={`mx-auto mb-2 text-[${COLORS.primary}]`} />
                  <h4 className={`${TEXT.dark} text-sm font-medium mb-1`}>{info.title}</h4>
                  <p className="text-[11px] text-slate-400">{info.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Product Features */}
            <motion.div variants={fadeUp}>
              <h3 className={`${TEXT.dark} font-medium mb-5 text-lg border-b border-slate-100 pb-3`}>Product Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {[
                  'Moisture-wicking fabric',
                  'Breathable mesh panels',
                  'Reinforced stitching',
                  'Athletic fit',
                  'Quick-dry technology',
                  'Fully customizable',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full bg-[${COLORS.primary}] mt-2 flex-shrink-0 shadow-sm`} />
                    <span className="text-slate-600 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </motion.div>
        </div>

        {/* ─── RELATED PRODUCTS ──────────────────────── */}
        <div className="mt-32 pt-16 border-t border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-slate-800 mb-2 tracking-tight">You Might Also Like</h2>
            <p className="text-slate-500">Customers who viewed this item also viewed these</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED_PRODUCTS.map((product, i) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={i} 
                view="grid" 
                onNavigate={onNavigate} 
              />
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

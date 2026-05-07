import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pagination } from '../components/common/Pagination/Pagination'
import { ProductCard } from '../components/common/ProductCard/ProductCard'
import {
  Star, Heart, ShoppingCart, SlidersHorizontal,
  ChevronDown, Sparkles, Search, Grid3x3, List
} from 'lucide-react'

/* ─── DATA ─────────────────────────────────── */
const ALL_PRODUCTS = [
  { id: 1,  name: 'Pro Performance Jersey',     category: 'Jerseys',     price: 49.99,  rating: 4.4, reviews: 234, badge: 'Best Seller', customizable: true,  colors: ['#1D4ED8','#DC2626','#16A34A'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?w=400&h=400&fit=crop&q=80' },
  { id: 2,  name: 'Elite Training T-Shirt',     category: 'T-Shirts',   price: 29.99,  rating: 4.3, reviews: 189, badge: null,           customizable: true,  colors: ['#FFFFFF','#1e293b','#DC2626'], sizes: ['S','M','L','XL','XXL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80' },
  { id: 3,  name: 'Premium Team Hoodie',        category: 'Hoodies',    price: 79.99,  rating: 4.3, reviews: 156, badge: null,           customizable: true,  colors: ['#374151','#4F46E5','#16A34A'], sizes: ['M','L','XL'], image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop&q=80' },
  { id: 4,  name: 'Athletic Performance Shorts',category: 'Shorts',     price: 34.99,  rating: 4.3, reviews: 298, badge: null,           customizable: true,  colors: ['#1D4ED8','#1e293b','#DC2626'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&h=400&fit=crop&q=80' },
  { id: 5,  name: 'Complete Tracksuit Set',     category: 'Tracksuits', price: 129.99, rating: 4.3, reviews: 167, badge: 'Premium',      customizable: true,  colors: ['#1e293b','#4F46E5'], sizes: ['S','M','L','XL','XXL'], image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop&q=80' },
  { id: 6,  name: 'Sports Cap Collection',      category: 'Accessories',price: 19.99,  rating: 4.3, reviews: 421, badge: null,           customizable: false, colors: ['#FFFFFF','#1e293b','#DC2626'], sizes: ['One Size'], image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop&q=80' },
  { id: 7,  name: 'Classic Sports Jersey',      category: 'Jerseys',    price: 54.99,  rating: 4.3, reviews: 312, badge: null,           customizable: true,  colors: ['#1D4ED8','#DC2626'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1529904898663-e9ae7c3d0a94?w=400&h=400&fit=crop&q=80' },
  { id: 8,  name: 'Compression Training Shirt', category: 'T-Shirts',   price: 39.99,  rating: 4.3, reviews: 245, badge: null,           customizable: true,  colors: ['#1e293b','#374151'], sizes: ['S','M','L','XL','XXL'], image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop&q=80' },
  { id: 9,  name: 'Custom Zip Hoodie',          category: 'Hoodies',    price: 89.99,  rating: 4.7, reviews: 98,  badge: 'New',          customizable: true,  colors: ['#374151','#DC2626','#FFFFFF'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop&q=80' },
  { id: 10, name: 'Football Training Shorts',   category: 'Shorts',     price: 24.99,  rating: 4.1, reviews: 178, badge: null,           customizable: false, colors: ['#1D4ED8','#16A34A','#1e293b'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop&q=80' },
  { id: 11, name: 'Pro Goalkeeper Gloves',      category: 'Accessories',price: 44.99,  rating: 4.5, reviews: 89,  badge: 'Best Seller',  customizable: false, colors: ['#1e293b','#DC2626'], sizes: ['S','M','L','XL'], image: 'https://images.unsplash.com/photo-1529904898663-e9ae7c3d0a94?w=400&h=400&fit=crop&q=80' },
  { id: 12, name: 'Team Training Top',          category: 'T-Shirts',   price: 34.99,  rating: 4.2, reviews: 203, badge: null,           customizable: true,  colors: ['#4F46E5','#DC2626','#16A34A'], sizes: ['S','M','L','XL','XXL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80' },
]

const CATEGORIES   = ['All', 'Jerseys', 'T-Shirts', 'Hoodies', 'Shorts', 'Tracksuits', 'Accessories']
const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Most Reviews']


/* ─── FILTER SIDEBAR ────────────────────── */
const FilterSidebar = ({
  priceRange, setPriceRange, minRating, setMinRating, 
  onlyCustomizable, setOnlyCustomizable,
  selectedColor, setSelectedColor, selectedSize, setSelectedSize
}) => {
  const [openSections, setOpenSections] = useState(['price','rating','colors','size','options'])
  const toggle = (s) => setOpenSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const Section = ({ id, title, children }) => (
    <div className="border-b border-slate-100 pb-5 mb-5 last:border-0 last:mb-0">
      <button onClick={() => toggle(id)} className="flex items-center justify-between w-full mb-4 group">
        <span className="text-[12px] uppercase tracking-[0.15em] text-slate-500 group-hover:text-[#4F46E5] transition-colors">{title}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${openSections.includes(id) ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {openSections.includes(id) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const AVAILABLE_COLORS = ['#1D4ED8', '#DC2626', '#16A34A', '#FFFFFF', '#1e293b', '#374151', '#4F46E5']
  const AVAILABLE_SIZES  = ['XS','S','M','L','XL','XXL', 'One Size']

  return (
    <aside className="w-[280px] min-w-[280px]">
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xl shadow-slate-200/20 sticky top-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center">
              <SlidersHorizontal size={14} className="text-[#4F46E5]" />
            </div>
            <span className="text-slate-600 text-base">Filters</span>
          </div>
          <button
            onClick={() => { setPriceRange(200); setMinRating(0); setOnlyCustomizable(false); setSelectedColor(null); setSelectedSize(null); }}
            className="text-xs text-slate-400 hover:text-[#4F46E5] transition-colors"
          >
            Clear all
          </button>
        </div>

        {/* Price Range */}
        <Section id="price" title="Price">
          <div className="px-1 pt-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-slate-400">$0</span>
              <span className="text-sm text-[#4F46E5] bg-[#4F46E5]/10 px-3 py-1 rounded-lg">${priceRange}</span>
            </div>
            <input
              type="range" min={0} max={200} value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#4F46E5] cursor-pointer h-1.5 bg-slate-200 rounded-full appearance-none"
            />
          </div>
        </Section>

        {/* Colors */}
        <Section id="colors" title="Colors">
          <div className="flex flex-wrap gap-2 pt-1">
            {AVAILABLE_COLORS.map(c => (
              <button
                key={c}
                onClick={() => setSelectedColor(selectedColor === c ? null : c)}
                className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === c ? 'border-[#4F46E5] scale-110 shadow-md' : 'border-transparent hover:scale-110 shadow-sm'}`}
                style={{ backgroundColor: c === '#FFFFFF' ? '#F8fafc' : c }}
                title={c}
              >
                {c === '#FFFFFF' && <span className="w-full h-full border border-gray-200 rounded-full block" />}
              </button>
            ))}
          </div>
        </Section>

        {/* Size */}
        <Section id="size" title="Size">
          <div className="flex flex-wrap gap-2 pt-1">
            {AVAILABLE_SIZES.map(sz => (
              <button
                key={sz}
                onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                  selectedSize === sz 
                    ? 'border-[#4F46E5] bg-[#4F46E5] text-white shadow-md' 
                    : 'border-slate-200 text-slate-500 hover:border-[#4F46E5] hover:text-[#4F46E5]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </Section>

        {/* Rating */}
        <Section id="rating" title="Rating">
          <div className="space-y-1">
            {[4, 3, 2, 0].map(r => (
              <label
                key={r}
                className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition-all ${minRating === r ? 'bg-[#4F46E5]/5 text-[#4F46E5]' : 'hover:bg-slate-50 text-slate-500'}`}
              >
                <input type="radio" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-[#4F46E5] w-3.5 h-3.5" />
                {r > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={12} className={s <= r ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
                      ))}
                    </div>
                    <span className="text-xs ml-1">& up</span>
                  </div>
                ) : (
                  <span className="text-xs">All Ratings</span>
                )}
              </label>
            ))}
          </div>
        </Section>

        {/* Options */}
        <Section id="options" title="Options">
          <label className="flex items-center justify-between cursor-pointer px-1 py-1 group">
            <span className="text-sm text-slate-500 group-hover:text-[#4F46E5] transition-colors">Customizable Only</span>
            <button
              onClick={() => setOnlyCustomizable(!onlyCustomizable)}
              className={`relative w-10 h-5 rounded-full transition-all duration-300 ${onlyCustomizable ? 'bg-[#4F46E5]' : 'bg-slate-200'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${onlyCustomizable ? 'left-5' : 'left-1'}`} />
            </button>
          </label>
        </Section>
      </div>
    </aside>
  )
}


/* ─── MAIN EXPORT (page content only) ────── */
export const Products = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery]       = useState('')
  const [priceRange, setPriceRange]         = useState(200)
  const [minRating, setMinRating]           = useState(0)
  const [onlyCustomizable, setOnlyCustomizable] = useState(false)
  const [sortBy, setSortBy]                 = useState('Featured')
  const [view, setView]                     = useState('grid')
  const [selectedColor, setSelectedColor]   = useState(null)
  const [selectedSize, setSelectedSize]     = useState(null)
  
  const [currentPage, setCurrentPage]       = useState(1)
  const ITEMS_PER_PAGE = 10

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory)
    if (searchQuery.trim())       list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    list = list.filter(p => p.price <= priceRange)
    if (minRating > 0)            list = list.filter(p => p.rating >= minRating)
    if (onlyCustomizable)         list = list.filter(p => p.customizable)
    if (selectedColor)            list = list.filter(p => p.colors && p.colors.includes(selectedColor))
    if (selectedSize)             list = list.filter(p => p.sizes && p.sizes.includes(selectedSize))
    if (sortBy === 'Price: Low to High')  list = [...list].sort((a,b) => a.price - b.price)
    if (sortBy === 'Price: High to Low')  list = [...list].sort((a,b) => b.price - a.price)
    if (sortBy === 'Top Rated')           list = [...list].sort((a,b) => b.rating - a.rating)
    if (sortBy === 'Most Reviews')        list = [...list].sort((a,b) => b.reviews - a.reviews)
    return list
  }, [activeCategory, searchQuery, priceRange, minRating, onlyCustomizable, sortBy, selectedColor, selectedSize])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, searchQuery, priceRange, minRating, onlyCustomizable, sortBy, selectedColor, selectedSize])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedProducts = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-20 min-h-screen bg-[#F8F9FF]"
    >
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-indigo-100 shadow-sm text-sm text-indigo-500 mb-5">
            <Sparkles size={15} className="text-yellow-500" />
            {filtered.length} Premium Products
          </span>
          <h1 className="text-5xl md:text-6xl text-slate-600 mb-3">Our Collection</h1>
          <p className="text-xl text-slate-500">Discover premium custom sportswear</p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="flex-1 w-full flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-5 py-3.5 focus-within:border-[#4F46E5] transition-colors shadow-sm">
            <Search size={18} className="text-[#4F46E5] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-slate-600 text-sm placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-slate-600 focus:outline-none focus:border-[#4F46E5] shadow-sm cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <button onClick={() => setView('grid')} className={`p-2.5 rounded-xl transition-all ${view==='grid' ? 'bg-[#4F46E5] text-white shadow' : 'text-gray-400 hover:text-gray-600'}`}><Grid3x3 size={16}/></button>
              <button onClick={() => setView('list')} className={`p-2.5 rounded-xl transition-all ${view==='list' ? 'bg-[#4F46E5] text-white shadow' : 'text-gray-400 hover:text-gray-600'}`}><List size={16}/></button>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-indigo-200'
                  : 'bg-white border border-gray-200 text-slate-600 hover:border-indigo-200 hover:text-[#4F46E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          <FilterSidebar
            priceRange={priceRange} setPriceRange={setPriceRange}
            minRating={minRating}   setMinRating={setMinRating}
            onlyCustomizable={onlyCustomizable} setOnlyCustomizable={setOnlyCustomizable}
            selectedColor={selectedColor} setSelectedColor={setSelectedColor}
            selectedSize={selectedSize} setSelectedSize={setSelectedSize}
          />

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-xl border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-300" />
                </div>
                <p className="text-slate-500 text-lg">No products found</p>
                <p className="text-slate-400 text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className={view === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                  : 'flex flex-col gap-4'
                }>
                  {paginatedProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} view={view} onNavigate={onNavigate} />
                  ))}
                </div>
                
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search as SearchIcon, X, TrendingUp, Clock, ArrowRight, Star } from 'lucide-react'

const ALL_PRODUCTS = [
  { id: 1, name: 'Pro Performance Jersey',  category: 'Jerseys',  price: 54.99,  rating: 4.8, image: 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?w=80&h=80&fit=crop' },
  { id: 2, name: 'Classic Football Jersey', category: 'Jerseys',  price: 44.99,  rating: 4.6, image: 'https://images.unsplash.com/photo-1529904898663-e9ae7c3d0a94?w=80&h=80&fit=crop' },
  { id: 3, name: 'Graphic Tee Sport',       category: 'T-Shirts', price: 29.99,  rating: 4.5, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop' },
  { id: 4, name: 'Premium Cotton T-Shirt',  category: 'T-Shirts', price: 24.99,  rating: 4.3, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=80&h=80&fit=crop' },
  { id: 5, name: 'Team Hoodie Pro',         category: 'Hoodies',  price: 79.99,  rating: 4.9, image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=80&h=80&fit=crop' },
  { id: 6, name: 'Custom Zip Hoodie',       category: 'Hoodies',  price: 89.99,  rating: 4.7, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=80&h=80&fit=crop' },
  { id: 7, name: 'Training Shorts Elite',   category: 'Shorts',   price: 34.99,  rating: 4.4, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=80&h=80&fit=crop' },
  { id: 8, name: 'Compression Shorts',      category: 'Shorts',   price: 39.99,  rating: 4.6, image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=80&h=80&fit=crop' },
]

const TRENDING = ['Jersey 2024', 'Custom Hoodie', 'Team Kit', 'Football Shorts']
const RECENT   = ['Pro Jersey', 'Cotton T-Shirt', 'Training Shorts']

export const Search = ({ isOpen, onClose }) => {
  const [query, setQuery]     = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  // Focus input when overlay opens & lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('lenis-stopped')
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery('')
      setResults([])
    } else {
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
    }
    return () => {
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Filter products
  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(ALL_PRODUCTS.filter(
      p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    ))
  }, [query])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleChip = (term) => setQuery(term)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full-screen backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-md z-[105]"
          />

          {/* Search Panel — slides down from top */}
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed top-0 left-0 right-0 z-[110] bg-white shadow-2xl shadow-indigo-100/50"
          >
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex items-center gap-2 sm:gap-4 bg-gray-50 border-2 border-gray-100 focus-within:border-[#4F46E5] focus-within:bg-white rounded-lg px-3 sm:px-5 py-2.5 sm:py-4 transition-all shadow-sm">
                <SearchIcon size={20} className="text-[#4F46E5] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jerseys..."
                  className="flex-1 bg-transparent text-slate-800 font-semibold text-sm sm:text-lg placeholder:text-slate-400 focus:outline-none"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500 transition-all"
                  >
                    <X size={12} />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-2 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Cancel
                </button>
              </div>

              {/* ── RESULTS ── */}
              <AnimatePresence mode="wait">
                {query.trim().length >= 2 ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 pb-6 overflow-y-auto max-h-[60vh] custom-scrollbar"
                    data-lenis-prevent
                  >
                    {results.length > 0 ? (
                      <>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                          {results.length} result{results.length !== 1 ? 's' : ''} found
                        </p>
                        <div className="space-y-2">
                          {results.map((product, i) => (
                            <motion.div
                              key={product.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-indigo-50 cursor-pointer group transition-colors"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-800 text-sm truncate">{product.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 group-hover:bg-white px-2 py-0.5 rounded-full transition-colors">
                                    {product.category}
                                  </span>
                                  <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                    <Star size={11} fill="currentColor" />
                                    {product.rating}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-black text-[#4F46E5] text-base">${product.price}</span>
                                <ArrowRight size={16} className="text-gray-300 group-hover:text-[#4F46E5] transition-colors" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <SearchIcon size={28} className="text-gray-300" />
                        </div>
                        <p className="font-bold text-slate-500">No results for "<span className="text-slate-800">{query}</span>"</p>
                        <p className="text-sm text-slate-400 mt-1">Try searching jerseys, hoodies, or shorts</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  /* ── DEFAULT STATE: Trending + Recent ── */
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-8"
                  >
                    {/* Trending */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp size={16} className="text-[#4F46E5]" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trending</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {TRENDING.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleChip(term)}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-sm font-semibold text-indigo-600 hover:from-[#4F46E5] hover:to-[#7C3AED] hover:text-white hover:border-transparent transition-all"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock size={16} className="text-slate-400" />
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Searches</span>
                      </div>
                      <div className="space-y-1">
                        {RECENT.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleChip(term)}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-50 hover:text-[#4F46E5] transition-colors text-left group"
                          >
                            <Clock size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

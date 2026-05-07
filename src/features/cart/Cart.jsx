import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { COLORS, BTN, GRADIENTS } from '../../config/theme'

const DUMMY_ITEMS = [
  {
    id: 1,
    name: 'Pro Performance Jersey',
    image: 'https://images.unsplash.com/photo-1529904898663-e9ae7c3d0a94?w=120&h=120&fit=crop&q=80',
    price: 54.99,
    qty: 2,
    tags: [{ label: 'color: Blue' }, { label: 'size: M' }, { label: 'number: 10' }, { label: 'name: PLAYER' }],
  },
  {
    id: 2,
    name: 'Premium Team Hoodie',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=120&h=120&fit=crop&q=80',
    price: 79.99,
    qty: 1,
    tags: [{ label: 'color: Black' }, { label: 'size: L' }],
  },
]

export const Cart = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('lenis-stopped')
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
    }
    return () => {
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const subtotal = DUMMY_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = 15.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Slide-in Panel */}
          <motion.aside
            key="cart-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white z-50 flex flex-col shadow-2xl shadow-indigo-100/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#4F46E5]/5 to-[#7C3AED]/5">
              <div>
                <h2 className="text-2xl text-slate-800">Shopping Cart</h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  {DUMMY_ITEMS.length} items in your cart
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div 
              className="flex-1 overflow-y-auto px-6 py-4 space-y-4 overscroll-contain custom-scrollbar"
              data-lenis-prevent
            >
              {DUMMY_ITEMS.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="bg-gray-50/80 rounded-lg p-4 border border-gray-100 hover:border-indigo-100 transition-colors"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-800 text-[15px]">{item.name}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.tags.map((t) => (
                          <span
                            key={t.label}
                            className="text-[11px] px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full"
                          >
                            {t.label}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Qty */}
                        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-2 py-1">
                          <button className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm text-slate-800">{item.qty}</span>
                          <button className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-[${COLORS.primary}] text-lg`}>
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                          <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="px-6 py-5 border-t border-gray-100 bg-white">
              <h3 className="text-lg text-slate-800 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-700">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (8%)</span>
                  <span className="font-semibold text-slate-700">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base text-slate-800 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className={`text-[${COLORS.primary}]`}>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <button className={`${BTN.primary} w-full !py-4 rounded-lg text-[15px] flex items-center justify-center gap-2`}>
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-lg text-[15px] text-slate-600 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Continue Shopping
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

import { useHeader } from './useHeader'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Header = ({ onCartOpen, onProfileOpen, onSearchOpen, onProductsOpen, onHomeOpen }) => {
  const { activeTab, setActiveTab, navLinks, isMenuOpen, toggleMenu } = useHeader()

  const handleNavClick = (linkName) => {
    setActiveTab(linkName)
    if (linkName === 'Products') onProductsOpen?.()
    if (linkName === 'Home') onHomeOpen?.()
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('Home')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#DB2777] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-200">
              ES
            </div>
            <span className="text-2xl font-black tracking-tight text-[#4F46E5]">
              EAY SPORTS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-gray-50/80 p-1.5 rounded-full border border-gray-100">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  activeTab === link.name
                    ? 'bg-[#4F46E5] text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Icons & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-5 text-gray-500">
              <button onClick={onSearchOpen} className="hover:text-[#4F46E5] transition-colors"><Search size={22} /></button>
              <button onClick={onCartOpen} className="relative hover:text-[#4F46E5] transition-colors">
                <ShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">3</span>
              </button>
              <button onClick={onProfileOpen} className="hover:text-[#4F46E5] transition-colors"><User size={22} /></button>
            </div>
            <button className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-7 py-3 rounded-full font-bold text-[13px] shadow-lg shadow-blue-100 hover:scale-105 transition-transform">
              Dealer Portal
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 rounded-xl text-lg font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#4F46E5]"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 flex gap-6 px-4">
                <Search size={24} className="text-gray-500" />
                <button onClick={onCartOpen}><ShoppingCart size={24} className="text-gray-500 hover:text-[#4F46E5] transition-colors" /></button>
                <User size={24} className="text-gray-500" />
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white py-4 rounded-xl font-bold shadow-lg">
                Dealer Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

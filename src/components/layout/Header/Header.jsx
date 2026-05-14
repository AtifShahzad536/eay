import { useHeader } from './useHeader'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { HEADER, BTN, GRADIENTS, SPACING } from '../../../config/theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Header = ({ onCartOpen, onProfileOpen, onSearchOpen, onProductsOpen, onHomeOpen, onAboutOpen, onContactOpen, onBuilderOpen }) => {
  const { activeTab, setActiveTab, navLinks, isMenuOpen, toggleMenu } = useHeader()
  const location = useLocation()
  const navigate = useNavigate()

  // Sync active tab with URL (including nested routes like product details)
  useEffect(() => {
    const currentPath = location.pathname
    let foundTab = ''

    if (currentPath === '/') {
      foundTab = 'Home'
    } else if (currentPath.startsWith('/product-details') || currentPath.startsWith('/products')) {
      foundTab = 'Products'
    } else if (currentPath.startsWith('/builder')) {
      foundTab = 'Custom Builder'
    } else {
      const activeLink = navLinks.find(link => currentPath.startsWith(link.href) && link.href !== '/')
      if (activeLink) foundTab = activeLink.name
    }

    setActiveTab(foundTab)
  }, [location.pathname, navLinks, setActiveTab])

  const handleNavClick = (linkName) => {
    setActiveTab(linkName)
    if (linkName === 'Products') onProductsOpen?.()
    if (linkName === 'Home') onHomeOpen?.()
    if (linkName === 'About') onAboutOpen?.()
    if (linkName === 'Contact') onContactOpen?.()
    if (linkName === 'Custom Builder') onBuilderOpen?.()
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] ${HEADER.bg} backdrop-blur-md border-b ${HEADER.border} shadow-lg shadow-indigo-900/30`}>
      <div className={`${SPACING.container}`}>
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white font-[600] text-lg shadow-md">
              ES
            </div>
            <span className="text-xl font-[500] tracking-tight text-white">
              EAY SPORTS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center bg-white/10 p-2 rounded-full border border-white/15">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.name)}
                className={`px-5 py-2 rounded-xl text-[13px] font-medium transition-all duration-300 ${activeTab === link.name
                  ? 'bg-white text-[#4F46E5] shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Icons & CTA */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-4 text-white/75">
              <button onClick={onSearchOpen} className="hover:text-white transition-colors"><Search size={21} /></button>
              <button onClick={onCartOpen} className="relative hover:text-white transition-colors">
                <ShoppingCart size={21} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4.5 h-4.5 w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#4F46E5]">3</span>
              </button>
              <button onClick={onProfileOpen} className="hover:text-white transition-colors"><User size={21} /></button>
            </div>
            <button className="bg-white text-[#4F46E5] px-6 py-2.5 rounded-full font-medium text-[13px] shadow-md hover:bg-indigo-50 hover:scale-105 transition-all">
              Dealer Portal
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
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
            className="md:hidden bg-[#4338CA] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleNavClick(link.name)
                    toggleMenu()
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 flex gap-6 px-4">
                <button onClick={() => { onSearchOpen?.(); toggleMenu(); }}><Search size={22} className="text-white/70 hover:text-white transition-colors" /></button>
                <button onClick={() => { onCartOpen?.(); toggleMenu(); }}><ShoppingCart size={22} className="text-white/70 hover:text-white transition-colors" /></button>
                <button onClick={() => { onProfileOpen?.(); toggleMenu(); }}><User size={22} className="text-white/70 hover:text-white transition-colors" /></button>
              </div>
              <button className="w-full mt-3 bg-white text-[#4F46E5] py-3 rounded-xl font-medium shadow-md hover:bg-indigo-50 transition-all text-sm">
                Dealer Portal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

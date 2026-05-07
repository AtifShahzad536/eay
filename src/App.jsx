import { useState } from 'react'
import { Header } from './components/layout/Header/Header'
import { Footer } from './components/layout/Footer/Footer'
import SmoothScroll from './components/common/SmoothScroll/SmoothScroll'

// Pages
import { Home }    from './pages/Home'
import { Products } from './pages/Products'
import { About }   from './pages/About'
import { Contact } from './pages/Contact'
import { ProductDetails } from './pages/ProductDetails'

// Overlays (Features)
import { Cart }    from './features/cart/Cart'
import { Profile } from './features/profile/Profile'
import { Search }  from './features/search/Search'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isCartOpen, setIsCartOpen]     = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen]   = useState(false)

  const navigateTo = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen antialiased bg-white">

        <Header
          onCartOpen={() => setIsCartOpen(true)}
          onProfileOpen={() => setIsProfileOpen(true)}
          onSearchOpen={() => setIsSearchOpen(true)}
          onProductsOpen={() => navigateTo('products')}
          onHomeOpen={() => navigateTo('home')}
          onAboutOpen={() => navigateTo('about')}
          onContactOpen={() => navigateTo('contact')}
        />

        {/* Overlay Pages */}
        <Cart    isOpen={isCartOpen}    onClose={() => setIsCartOpen(false)} />
        <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        <Search  isOpen={isSearchOpen}  onClose={() => setIsSearchOpen(false)} />

        {/* Routed Pages */}
        <main>
          {currentPage === 'home'     && <Home />}
          {currentPage === 'products' && <Products onNavigate={navigateTo} />}
          {currentPage === 'about'    && <About />}
          {currentPage === 'contact'  && <Contact />}
          {currentPage === 'product-details' && <ProductDetails onNavigate={navigateTo} />}
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App

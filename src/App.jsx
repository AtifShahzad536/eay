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
import { BuilderPage } from './pages/BuilderPage'

// Overlays (Features)
import { Cart }    from './features/cart/Cart'
import { Profile } from './features/profile/Profile'
import { Search }  from './features/search/Search'
import { Auth } from './pages/Auth'

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const [isCartOpen, setIsCartOpen]     = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen]   = useState(false)
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Sync scroll on route change
  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname])

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileOpen(true)
    } else {
      navigate('/auth')
    }
  }

  const navigateTo = (page) => {
    // Legacy support for any internal calls, though Routes handles it now
    if (page === 'home') navigate('/')
    else navigate(`/${page}`)
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen antialiased bg-white">

        {!location.pathname.startsWith('/builder') && (
          <Header
            onCartOpen={() => setIsCartOpen(true)}
            onProfileOpen={handleProfileClick}
            onSearchOpen={() => setIsSearchOpen(true)}
            onProductsOpen={() => navigate('/products')}
            onHomeOpen={() => navigate('/')}
            onAboutOpen={() => navigate('/about')}
            onContactOpen={() => navigate('/contact')}
            onBuilderOpen={() => navigate('/builder', { state: { from: location.pathname } })}
          />
        )}

        {/* Overlay Pages */}
        <Cart    isOpen={isCartOpen}    onClose={() => setIsCartOpen(false)} />
        <Profile 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          onLogout={() => { setIsAuthenticated(false); setIsProfileOpen(false); }}
        />
        <Search  isOpen={isSearchOpen}  onClose={() => setIsSearchOpen(false)} />

        {/* Routed Pages */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products onNavigate={navigateTo} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product-details/:id" element={<ProductDetails onNavigate={navigateTo} />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/builder/:id" element={<BuilderPage />} />
            <Route path="/auth" element={<Auth onLoginSuccess={() => { setIsAuthenticated(true); navigate('/') }} />} />
          </Routes>
        </main>

        {!location.pathname.startsWith('/builder') && <Footer />}
      </div>
    </SmoothScroll>
  )
}

export default App

import { useState } from 'react'

export const useHeader = () => {
  const [activeTab, setActiveTab] = useState('Home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Custom Builder', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return {
    activeTab,
    setActiveTab,
    isMenuOpen,
    toggleMenu,
    navLinks
  }
}

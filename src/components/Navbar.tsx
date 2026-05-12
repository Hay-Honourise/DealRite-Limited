'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo1.png" 
            alt="DealRite Realty Limited" 
            width={400} 
            height={1200} 
            className="w-48 md:w-64 lg:w-72 h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 relative py-2 ${
                  isActive 
                    ? 'text-orange-600' 
                    : scrolled ? 'text-slate-600 hover:text-orange-600' : 'text-slate-800 hover:text-orange-600'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            )
          })}
          <Link
            href="https://surveyheart.com/form/69e462b8001e39939dc2b237"
            className="bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/30"
          >
            Book Inspection
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
            <Link
              href="https://surveyheart.com/form/69e462b8001e39939dc2b237"
              onClick={() => setIsOpen(false)}
              className="bg-orange-600 text-white text-center px-5 py-3 rounded-lg font-semibold hover:bg-orange-700 mt-2"
            >
              Book Inspection
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

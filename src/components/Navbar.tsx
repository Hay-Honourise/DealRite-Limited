'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    // Projects is handled separately as a dropdown
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Join DealRite Limited', href: 'https://chat.whatsapp.com/JWVirRoM0SeLbEmOZaY5Qy?s=sh&p=i&mlu=2' },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/80 backdrop-blur-md shadow-sm py-3'
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
            className="w-36 md:w-48 lg:w-56 h-auto object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center lg:gap-8 gap-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-all duration-300 relative py-2 ${
              pathname === '/' ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
            }`}
          >
            Home
            {pathname === '/' && (
              <motion.div
                layoutId="navbar-active-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>

          <Link
            href="/about"
            className={`text-sm font-medium transition-all duration-300 relative py-2 ${
              pathname === '/about' ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
            }`}
          >
            About Us
            {pathname === '/about' && (
              <motion.div
                layoutId="navbar-active-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>

          {/* Projects Dropdown Container */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              className={`text-sm font-medium transition-all duration-300 py-2 flex items-center gap-1 cursor-pointer focus:outline-none ${
                pathname.startsWith('/projects') ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              Projects <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-50"
                >
                  <Link
                    href="/projects?status=selling"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    Currently Selling
                  </Link>
                  <Link
                    href="/projects?status=sold"
                    className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    Sold Out
                  </Link>
                  <div className="border-t border-slate-100 my-1"></div>
                  <Link
                    href="/projects"
                    className="block px-4 py-2.5 text-xs text-slate-400 hover:text-orange-600 transition font-medium"
                    onClick={() => setShowDropdown(false)}
                  >
                    View All Projects
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/blog"
            className={`text-sm font-medium transition-all duration-300 relative py-2 ${
              pathname === '/blog' ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
            }`}
          >
            Blog
            {pathname === '/blog' && (
              <motion.div
                layoutId="navbar-active-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>

          <Link
            href="/contact"
            className={`text-sm font-medium transition-all duration-300 relative py-2 ${
              pathname === '/contact' ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
            }`}
          >
            Contact Us
            {pathname === '/contact' && (
              <motion.div
                layoutId="navbar-active-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>

          <Link
            href="/faqs"
            className={`text-sm font-medium transition-all duration-300 relative py-2 ${
              pathname === '/faqs' ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
            }`}
          >
            FAQs
            {pathname === '/faqs' && (
              <motion.div
                layoutId="navbar-active-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>

          <a
            href="https://chat.whatsapp.com/JWVirRoM0SeLbEmOZaY5Qy?s=sh&p=i&mlu=2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold transition-all duration-300 relative py-2 px-3 bg-orange-50 text-orange-600 hover:text-orange-700 hover:bg-orange-100/30 rounded-xl"
          >
            Join DealRite Limited
          </a>

          <Link
            href="https://surveyheart.com/form/69e462b8001e39939dc2b237"
            target="_blank"
            className="bg-orange-600 text-white lg:px-5 lg:py-2.5 px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/30 whitespace-nowrap"
          >
            Book Inspection
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-800 focus:outline-none"
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
            className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-2 md:hidden max-h-[85vh] overflow-y-auto"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`font-medium px-4 py-2.5 rounded-xl transition-colors ${
                pathname === '/' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`font-medium px-4 py-2.5 rounded-xl transition-colors ${
                pathname === '/about' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            {/* Mobile Projects Accordion */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                className={`font-medium px-4 py-2.5 rounded-xl transition-colors flex justify-between items-center text-left ${
                  pathname.startsWith('/projects') ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-orange-600'
                }`}
              >
                <span>Projects</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {mobileProjectsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-6 flex flex-col bg-slate-50 rounded-xl mt-1"
                  >
                    <Link
                      href="/projects?status=selling"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2.5 text-sm text-slate-600 hover:text-orange-600 font-medium"
                    >
                      Currently Selling
                    </Link>
                    <Link
                      href="/projects?status=sold"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2.5 text-sm text-slate-600 hover:text-orange-600 font-medium"
                    >
                      Sold Out
                    </Link>
                    <Link
                      href="/projects"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2.5 text-xs text-slate-400 hover:text-orange-600 font-medium"
                    >
                      View All Projects
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className={`font-medium px-4 py-2.5 rounded-xl transition-colors ${
                pathname === '/blog' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`font-medium px-4 py-2.5 rounded-xl transition-colors ${
                pathname === '/contact' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>

            <Link
              href="/faqs"
              onClick={() => setIsOpen(false)}
              className={`font-medium px-4 py-2.5 rounded-xl transition-colors ${
                pathname === '/faqs' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-50'
              }`}
            >
              FAQs
            </Link>

            <a
              href="https://chat.whatsapp.com/JWVirRoM0SeLbEmOZaY5Qy?s=sh&p=i&mlu=2"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="font-semibold px-4 py-2.5 rounded-xl transition-colors text-orange-600 hover:bg-orange-50"
            >
              Join DealRite Limited
            </a>

            <Link
              href="https://surveyheart.com/form/69e462b8001e39939dc2b237"
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="bg-orange-600 text-white text-center px-5 py-3 rounded-xl font-semibold hover:bg-orange-700 mt-2"
            >
              Book Inspection
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

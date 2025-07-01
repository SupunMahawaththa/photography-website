'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate page loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500) // Hide after completion
          return 100
        }
        return prev + Math.random() * 15 + 5 // Random progress increments
      })
    }, 100)

    // Cleanup on component unmount
    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'GALLERY', href: '/gallery' },
    { label: 'ABOUT ME', href: '/about-me' },
    { label: 'CONTACT ME', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/90 backdrop-blur-sm z-50">
      <div className="container-custom py-2">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="relative w-44 h-12">
            <Image
              src="/images/logo.png"
              alt="Photography Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 h-full">
            {menuItems.map((item) => (
              <li key={item.label} className="flex items-center h-full">
                <Link
                  href={item.href}
                  className="text-[#8c8b8b] hover:text-[#7498ca] transition-colors tracking-widest text-[15px] font-[200]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#8c8b8b] p-2 flex items-center justify-center h-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-sm">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-6 py-2 text-[#8c8b8b] hover:text-[#7498ca] transition-colors tracking-widest text-[15px] font-[200]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Progress Bar Background - Always Visible */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 md:w-[30rem] h-px overflow-hidden">
        {/* Background with fade effect */}
        <div className="w-full h-full bg-gradient-to-r from-transparent via-[#8c8b8b]/15 to-transparent"></div>
        
        {/* Progress Fill - Only During Loading */}
        {isLoading && (
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#8c8b8b]/45 to-transparent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        )}
      </div>
      
      <style jsx>{`
        .loading-bar {
          background: linear-gradient(90deg, 
            rgba(140, 139, 139, 0.4) 0%, 
            rgba(140, 139, 139, 0.8) 50%, 
            rgba(140, 139, 139, 0.4) 100%
          );
        }
      `}</style>
    </header>
  )
}

export default Header 
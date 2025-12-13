'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const links = ['About', 'Projects', 'Contact']
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // At top - no active section
      if (scrollTop < 100) {
        setActiveSection('')
        return
      }

      // Near bottom - Contact is active
      if (scrollTop + windowHeight >= documentHeight - 300) {
        setActiveSection('contact')
        return
      }

      // Check sections from bottom to top
      for (let i = links.length - 1; i >= 0; i--) {
        const section = document.getElementById(links[i].toLowerCase())
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(links[i].toLowerCase())
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-white hover:text-[#d4af37] transition">
          LT<span className="animate-blink text-[#d4af37]">_</span>
        </a>

        <div className="flex gap-8">
          {links.map((link) => (
              <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`relative text-sm transition-colors duration-300 ${
                activeSection === link.toLowerCase()
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {link}
              {activeSection === link.toLowerCase() && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#d4af37]" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

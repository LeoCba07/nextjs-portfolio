'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const links = ['About', 'Projects', 'Contact']
  const [activeSection, setActiveSection] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (scrollTop < 100) {
        setActiveSection('')
        return
      }

      if (scrollTop + windowHeight >= documentHeight - 300) {
        setActiveSection('contact')
        return
      }

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

  useEffect(() => {
    const handleScroll = () => setIsOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white hover:text-[#d4af37] transition font-mono">
          LT<span className="animate-blink text-[#d4af37]">_</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`relative font-medium transition-colors duration-300 ${
                activeSection === link.toLowerCase()
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {link}
              {activeSection === link.toLowerCase() && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]" />
              )}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 hover:text-[#d4af37] transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10">
          <div className="flex flex-col px-4 py-6 gap-6">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-medium transition-colors duration-300 ${
                  activeSection === link.toLowerCase()
                    ? 'text-[#d4af37]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

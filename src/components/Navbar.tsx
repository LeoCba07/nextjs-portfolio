'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const links = ['About', 'Projects', 'Contact']
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => document.getElementById(link.toLowerCase()))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(links[index].toLowerCase())
          }
        }
      })

      // If at top, no active section
      if (window.scrollY < 100) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/80 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-white hover:text-[#b8860b] transition">
          LT<span className="animate-blink text-[#b8860b]">_</span>
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
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#b8860b]" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const LINK_KEYS = ['about', 'projects', 'contact'] as const
export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  useEffect(() => {
    const handleScroll = () => {
      // Close the mobile menu when the user scrolls
      setIsOpen(false)

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

      for (let i = LINK_KEYS.length - 1; i >= 0; i--) {
        const section = document.getElementById(LINK_KEYS[i])
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(LINK_KEYS[i])
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
    <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-white hover:text-[#d4af37] transition font-mono"
        aria-label="Scroll to top">
          LT<span className="animate-blink text-[#d4af37]">_</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {LINK_KEYS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className={`relative font-medium transition-colors duration-300 ${
                activeSection === key
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t(`nav.${key}`) as string}
              {activeSection === key && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d4af37]" />
              )}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className="group flex items-center gap-1 px-1 py-1 rounded-full border border-white/20 hover:border-[#d4af37] bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Toggle language"
          >
            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-200 ${language === 'en' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-gray-400'}`}>
              <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-4 h-3 rounded-sm object-cover" />
              <span className="text-xs font-semibold">EN</span>
            </span>
            <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-200 ${language === 'es' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-gray-400'}`}>
              <img src="https://flagcdn.com/w40/ar.png" alt="ES" className="w-4 h-3 rounded-sm object-cover" />
              <span className="text-xs font-semibold">ES</span>
            </span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 hover:text-[#d4af37] transition"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10">
          <div className="flex flex-col px-4 py-6 gap-6">
            {LINK_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                aria-current={activeSection === key ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-medium transition-colors duration-300 ${
                  activeSection === key
                    ? 'text-[#d4af37]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t(`nav.${key}`) as string}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 w-fit px-1 py-1 rounded-full border border-white/20 hover:border-[#d4af37] bg-white/5 active:scale-95 transition-all duration-200"
              aria-label="Toggle language"
            >
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${language === 'en' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-gray-400'}`}>
                <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-5 h-3 rounded-sm object-cover" />
                <span className="text-sm font-semibold">EN</span>
              </span>
              <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${language === 'es' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-gray-400'}`}>
                <img src="https://flagcdn.com/w40/ar.png" alt="ES" className="w-5 h-3 rounded-sm object-cover" />
                <span className="text-sm font-semibold">ES</span>
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

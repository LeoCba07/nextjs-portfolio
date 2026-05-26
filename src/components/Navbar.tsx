'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const LINK_KEYS = ['about', 'projects', 'education', 'contact'] as const

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  useEffect(() => {
    const handleScroll = () => {
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
    <nav className="fixed top-0 left-0 right-0 bg-ink/90 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <a
          href="#home"
          className="text-2xl font-bold text-white hover:text-gold transition font-mono"
          aria-label="Scroll to top"
        >
          LT<span className="animate-blink text-gold">_</span>
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
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold" />
              )}
            </a>
          ))}
          <LanguageToggle language={language} onToggle={toggleLanguage} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 hover:text-gold transition"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-ink border-t border-white/10">
          <div className="flex flex-col px-4 py-6 gap-6">
            {LINK_KEYS.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                aria-current={activeSection === key ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-medium transition-colors duration-300 ${
                  activeSection === key
                    ? 'text-gold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t(`nav.${key}`) as string}
              </a>
            ))}
            <LanguageToggle language={language} onToggle={toggleLanguage} size="lg" />
          </div>
        </div>
      )}
    </nav>
  )
}

function LanguageToggle({
  language,
  onToggle,
  size = 'sm',
}: {
  language: 'en' | 'es'
  onToggle: () => void
  size?: 'sm' | 'lg'
}) {
  const flagW = size === 'lg' ? 20 : 16
  const flagH = 12
  const padX = size === 'lg' ? 'px-4 py-2.5' : 'px-3 py-2'
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs'
  const widthClass = size === 'lg' ? 'w-fit' : ''
  const nextLang = language === 'en' ? 'Spanish' : 'English'

  return (
    <button
      onClick={onToggle}
      className={`group flex items-center gap-1 ${widthClass} p-1 rounded-full border border-white/20 hover:border-gold bg-white/5 hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer`}
      aria-label={`Switch to ${nextLang}`}
    >
      <span
        aria-hidden="true"
        className={`flex items-center gap-1.5 ${padX} rounded-full transition-all duration-200 ${
          language === 'en' ? 'bg-gold/20 text-gold' : 'text-gray-400'
        }`}
      >
        <Image src="/icons/flags/us.svg" alt="" width={flagW} height={flagH} className="rounded-sm" />
        <span className={`${textSize} font-semibold`}>EN</span>
      </span>
      <span
        aria-hidden="true"
        className={`flex items-center gap-1.5 ${padX} rounded-full transition-all duration-200 ${
          language === 'es' ? 'bg-gold/20 text-gold' : 'text-gray-400'
        }`}
      >
        <Image src="/icons/flags/ar.svg" alt="" width={flagW} height={flagH} className="rounded-sm" />
        <span className={`${textSize} font-semibold`}>ES</span>
      </span>
    </button>
  )
}

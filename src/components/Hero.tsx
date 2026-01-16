'use client'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { language, t } = useLanguage()
  const [showRole, setShowRole] = useState(false)
  const [roleText, setRoleText] = useState('')
  const [showArrow, setShowArrow] = useState(false)

  const fullRole = `${t('hero.role') as string}: ${t('hero.roleValue') as string} | ${t('hero.location') as string}: ${t('hero.locationValue') as string}`

  // Reset animation when language changes
  useEffect(() => {
    setRoleText('')
    setShowArrow(false)
    setShowRole(false)
    const startDelay = setTimeout(() => {
      setShowRole(true)
    }, 100)

    return () => clearTimeout(startDelay)
  }, [language])

  useEffect(() => {
    if (showRole && roleText.length < fullRole.length) {
      const timeout = setTimeout(() => {
        setRoleText(fullRole.substring(0, roleText.length + 1))
      }, 30)
      return () => clearTimeout(timeout)
    }

    if (roleText.length === fullRole.length && roleText.length > 0) {
      const arrowDelay = setTimeout(() => {
        setShowArrow(true)
      }, 500)
      return () => clearTimeout(arrowDelay)
    }
  }, [showRole, roleText, fullRole])

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 relative z-10">

      <div className="font-mono animate-fade-in-up mb-2">
        <p className="text-gray-500 text-sm">
          {t('hero.whoami') as string}<span className="animate-blink text-[#d4af37]">_</span>
        </p>
      </div>

      <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in-up animation-delay-200">
        {t('hero.name') as string}
      </h1>

      <div className="font-mono h-8 animate-fade-in-up animation-delay-400">
        <p className="text-lg md:text-xl text-gray-400">
          {roleText.split('|').map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="text-gray-600 mx-3">|</span>}
              {part.includes(':') ? (
                <>
                  <span className="text-[#d4af37]">{part.split(':')[0]}:</span>
                  {part.split(':')[1]}
                </>
              ) : part}
            </span>
          ))}
          {roleText.length < fullRole.length && <span className="animate-blink text-[#d4af37]">|</span>}
        </p>
      </div>

      <div className="flex gap-4 justify-center mt-12 font-mono animate-fade-in-up animation-delay-600">
        <a
          href="#projects"
          className="text-white hover:text-[#d4af37] transition"
        >
          [<span className="mx-1">{t('hero.seeProjects') as string}</span>]
        </a>
        <a
          href="#contact"
          className="text-gray-500 hover:text-[#d4af37] transition"
        >
          [<span className="mx-1">{t('hero.contact') as string}</span>]
        </a>
      </div>

      {showArrow && (
        <a
          href="#about"
          className="absolute bottom-12 text-gray-600 hover:text-[#d4af37] transition animate-fade-in-up"
          aria-label="Scroll to About section"
        >
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      )}
    </section>
  )
}

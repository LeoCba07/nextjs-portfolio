'use client'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { language, t } = useLanguage()
  const [roleText, setRoleText] = useState('')
  const [locationText, setLocationText] = useState('')

  const fullRole = t('hero.roleValue') as string
  const fullLocation = t('hero.locationValue') as string

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setRoleText('')
    setLocationText('')
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [language])

  const roleComplete = roleText.length === fullRole.length
  const locationComplete = locationText.length === fullLocation.length

  useEffect(() => {
    if (!roleComplete) {
      const timeout = setTimeout(() => {
        setRoleText(fullRole.substring(0, roleText.length + 1))
      }, 45)
      return () => clearTimeout(timeout)
    }
    if (!locationComplete) {
      const timeout = setTimeout(() => {
        setLocationText(fullLocation.substring(0, locationText.length + 1))
      }, 45)
      return () => clearTimeout(timeout)
    }
  }, [roleText, locationText, fullRole, fullLocation, roleComplete, locationComplete])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-4 md:px-8 relative z-10 py-24"
    >
      <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
        <div className="bg-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Window chrome */}
          <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-gray-500 text-xs ml-2 font-mono">~/leo</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 sm:p-8 md:p-12 font-mono text-left">
            <p className="text-gray-500 text-sm mb-5">
              {t('hero.whoami') as string}
            </p>

            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-10 leading-[1.05] break-words">
              {t('hero.name') as string}
            </h1>

            <div className="space-y-2 mb-10 text-sm sm:text-base">
              <p>
                <span className="text-gray-600 select-none">&gt;</span>{' '}
                <span className="text-gold">{t('hero.role') as string}:</span>{' '}
                <span className="text-gray-300">{roleText}</span>
                {!roleComplete && <span className="animate-blink text-gold">|</span>}
              </p>
              <p>
                <span className="text-gray-600 select-none">&gt;</span>{' '}
                <span className="text-gold">{t('hero.location') as string}:</span>{' '}
                <span className="text-gray-300">{locationText}</span>
                {roleComplete && !locationComplete && <span className="animate-blink text-gold">|</span>}
              </p>
            </div>

            <p className="text-gray-500 text-sm mb-3">$ open</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10 text-base">
              <a
                href="#projects"
                className="text-white hover:text-gold transition"
              >
                [<span className="mx-1">{t('hero.seeProjects') as string}</span>]
              </a>
              <a
                href="#contact"
                className="text-gray-500 hover:text-gold transition"
              >
                [<span className="mx-1">{t('hero.contact') as string}</span>]
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              $ <span className="animate-blink text-gold">_</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

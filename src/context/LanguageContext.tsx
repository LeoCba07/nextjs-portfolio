'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

type Language = 'en' | 'es'

type Translations = typeof en

const translations: Record<Language, Translations> = { en, es }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | string[] | Record<string, string>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'portfolio-lang'

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, obj)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // SSR-safe hydration from external state (localStorage + navigator) requires setState in effect.
    /* eslint-disable react-hooks/set-state-in-effect */
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && (stored === 'en' || stored === 'es')) {
      setLanguageState(stored)
    } else {
      const browserLang = navigator.language.slice(0, 2)
      if (browserLang === 'es') {
        setLanguageState('es')
      }
    }
    setMounted(true)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  const t = (key: string): string | string[] | Record<string, string> => {
    const value = getNestedValue(translations[language], key)
    if (value === undefined) {
      console.warn(`Translation missing for key: ${key}`)
      return key
    }
    return value as string | string[] | Record<string, string>
  }

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

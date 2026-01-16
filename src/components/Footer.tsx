'use client'
import { Github, Linkedin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-4 md:px-8 border-t border-white/10 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-white mb-2 font-mono">LT_</p>
            <p className="text-gray-500 text-sm">{t('footer.copyright') as string}</p>
          </div>

          {/* Nav & Social */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <nav className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm font-medium">{t('nav.home') as string}</a>
              <a href="#about" className="text-gray-400 hover:text-white transition text-sm font-medium">{t('nav.about') as string}</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition text-sm font-medium">{t('nav.projects') as string}</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition text-sm font-medium">{t('nav.contact') as string}</a>
            </nav>

            <div className="flex gap-4">
              <a href="https://github.com/LeoCba07" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition"
              aria-label="GitHub profile">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/leandro-trabucco" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d4af37] transition"
              aria-label="LinkedIn profile">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

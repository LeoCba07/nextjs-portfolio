'use client'
import { Github, Linkedin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { GITHUB_URL, LINKEDIN_URL } from '@/lib/constants'

const FOOTER_LINKS = ['about', 'projects', 'education', 'contact'] as const

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-4 md:px-8 border-t border-white/10 bg-ink">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-white mb-2 font-mono">LT_</p>
            <p className="text-gray-500 text-sm">{t('footer.copyright') as string}</p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="text-gray-400 hover:text-white transition text-sm font-medium"
                >
                  {t(`nav.${key}`) as string}
                </a>
              ))}
            </nav>

            <div className="flex gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition"
                aria-label="GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

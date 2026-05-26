'use client'
import Image from 'next/image'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/context/LanguageContext'
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_PATH,
  CURRICULUM_PATH,
  RIREKISHO_PATH,
} from '@/lib/constants'

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation()
  const { t } = useLanguage()

  return (
    <section id="contact" className="min-h-[80vh] flex items-center px-4 md:px-8 relative z-10">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center w-full transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <span className="inline-flex items-center gap-2 text-gold text-sm mb-6">
          <span>✦</span> {t('contact.badge') as string}
        </span>

        <h2 className="text-5xl md:text-6xl font-bold text-white mb-3">
          {t('contact.title') as string}
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-gold mb-6">
          {t('contact.subtitle') as string}
        </h3>

        <p className="text-gray-400 text-lg mb-12 font-mono break-all">
          $ ping {EMAIL}
        </p>

        <div className="flex flex-col items-center gap-6">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-3 bg-white text-black font-medium px-8 py-4 rounded-lg hover:bg-gold transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            {t('contact.cta') as string}
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={RESUME_PATH}
              download
              className="inline-flex items-center gap-3 border border-white/10 hover:border-gold/50 bg-white/5 text-gray-300 hover:text-white px-5 py-3 rounded-lg transition-all duration-300"
            >
              {t('contact.resume') as string}
              <Image src="/icons/flags/us.svg" alt="" width={20} height={14} className="rounded-sm" />
            </a>

            <a
              href={CURRICULUM_PATH}
              download
              className="inline-flex items-center gap-3 border border-white/10 hover:border-gold/50 bg-white/5 text-gray-300 hover:text-white px-5 py-3 rounded-lg transition-all duration-300"
            >
              {t('contact.curriculum') as string}
              <Image src="/icons/flags/ar.svg" alt="" width={20} height={14} className="rounded-sm" />
            </a>

            <a
              href={RIREKISHO_PATH}
              download
              className="inline-flex items-center gap-3 border border-white/10 hover:border-gold/50 bg-white/5 text-gray-300 hover:text-white px-5 py-3 rounded-lg transition-all duration-300"
            >
              {t('contact.rirekisho') as string}
              <Image src="/icons/flags/jp.svg" alt="" width={20} height={14} className="rounded-sm" />
            </a>
          </div>

          <div className="flex gap-6 mt-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-gray-500 hover:text-gold transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-gray-500 hover:text-gold transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

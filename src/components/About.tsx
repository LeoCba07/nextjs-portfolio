'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/context/LanguageContext'

type Tech = { name: string; icon: string }

const techStackTop: Tech[] = [
  { name: 'React', icon: '/icons/devicons/react.svg' },
  { name: 'TypeScript', icon: '/icons/devicons/typescript.svg' },
  { name: 'Next.js', icon: '/icons/devicons/nextjs.svg' },
  { name: 'React Native', icon: '/icons/devicons/react.svg' },
  { name: 'Tailwind CSS', icon: '/icons/devicons/tailwindcss.svg' },
  { name: 'Supabase', icon: '/icons/devicons/supabase.svg' },
]

const techStackBottom: Tech[] = [
  { name: 'Ruby on Rails', icon: '/icons/devicons/rails.svg' },
  { name: 'JavaScript', icon: '/icons/devicons/javascript.svg' },
  { name: 'PostgreSQL', icon: '/icons/devicons/postgresql.svg' },
  { name: 'SCSS', icon: '/icons/devicons/sass.svg' },
  { name: 'Git', icon: '/icons/devicons/git.svg' },
  { name: 'Expo', icon: '/icons/brands/expo.svg' },
]

function TechMarquee({ items, direction = 'left' }: { items: Tech[]; direction?: 'left' | 'right' }) {
  const duplicated = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-3 hover:[animation-play-state:paused] ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}
      >
        {duplicated.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
          >
            <Image src={tech.icon} alt="" width={20} height={20} className="w-5 h-5" />
            <span className="text-gray-300 text-sm">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation()
  const { language, t } = useLanguage()
  const words = t('about.hobbies') as string[]
  const [currentWord, setCurrentWord] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Reset hobby typewriter when the language toggle fires (intentional state reset on external trigger).
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setCurrentWord(0)
    setDisplayText('')
    setIsDeleting(false)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [language])

  useEffect(() => {
    const word = words[currentWord]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.substring(0, displayText.length + 1))
        if (displayText === word) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setDisplayText(word.substring(0, displayText.length - 1))
        if (displayText === '') {
          setIsDeleting(false)
          setCurrentWord((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWord, words])

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 px-4 md:px-8 relative z-10">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          <div className="flex-1 min-w-0 w-full">
            <span className="inline-flex items-center gap-2 text-gold text-sm mb-2">
              <span>✦</span> {t('about.badge') as string}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              {t('about.title') as string}
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-8">
              {t('about.subtitle') as string}
            </h3>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10">
              {t('about.bio') as string}
            </p>

            <div className="space-y-3 mb-10 overflow-hidden">
              <TechMarquee items={techStackTop} direction="right" />
              <TechMarquee items={techStackBottom} direction="left" />
            </div>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-gold/50 text-white px-5 py-3 rounded-lg transition-all group"
            >
              {t('about.cta') as string}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="flex-shrink-0 relative lg:self-center w-full sm:w-auto">
            <div className="relative bg-panel border border-white/10 rounded-2xl overflow-hidden w-full sm:w-[380px] mx-auto">
              <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-gray-500 text-xs ml-2 font-mono">leo.json</span>
              </div>

              <div className="p-4 pb-2">
                <p className="text-gray-600 text-xs font-mono mb-2">{'// profile.jpeg'}</p>
                <Image
                  src="/images/profile.jpeg"
                  alt="Leandro Trabucco"
                  width={280}
                  height={280}
                  priority
                  className="rounded-lg w-full max-h-[280px] object-cover object-top"
                />
              </div>

              <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed">
                <div className="text-gray-500">{"{"}</div>
                <div className="pl-4">
                  <span className="text-gold">&quot;name&quot;</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">&quot;{(t('about.json') as Record<string, string>).name}&quot;</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-gold">&quot;location&quot;</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">&quot;{(t('about.json') as Record<string, string>).location}&quot;</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-gold">&quot;status&quot;</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">&quot;{(t('about.json') as Record<string, string>).status}&quot;</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-gold">&quot;languages&quot;</span>
                  <span className="text-gray-500">: [</span>
                  <span className="text-emerald-400">&quot;ES&quot;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-emerald-400">&quot;EN&quot;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-emerald-400">&quot;JP&quot;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-emerald-400">&quot;PT&quot;</span>
                  <span className="text-gray-500">],</span>
                </div>
                <div className="pl-4">
                  <span className="text-gold">&quot;hobby&quot;</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">
                    &quot;{displayText}
                    <span className="animate-blink text-gold">|</span>&quot;
                  </span>
                </div>
                <div className="text-gray-500">{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

const techStackTop = [
  { name: "Rails", icon: "rails/rails-plain" },
  { name: "JavaScript", icon: "javascript/javascript-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "React", icon: "react/react-original" },
  { name: "Next.js", icon: "nextjs/nextjs-original" },
]

const techStackBottom = [
  { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
  { name: "SCSS", icon: "sass/sass-original" },
  { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "Heroku", icon: "heroku/heroku-original" },
]

function TechMarquee({ items, direction = 'left' }: { items: typeof techStackTop; direction?: 'left' | 'right' }) {
  const duplicated = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-3 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}
      >
        {duplicated.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
          >
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}.svg`}
              alt={tech.name}
              className="w-5 h-5"
            />
            <span className="text-gray-300 text-sm">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation()
  const words = ['lifting heavy weights', 'gaming', 'exploring Tokyo cafés', 'traveling']
  const [currentWord, setCurrentWord] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

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
  }, [displayText, isDeleting, currentWord])

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 px-4 md:px-8 relative z-10">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left - Text Content */}
          <div className="flex-1 min-w-0 w-full">
            <span className="inline-flex items-center gap-2 text-[#d4af37] text-sm mb-2">
              <span>✦</span> About Me
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Full Stack Developer
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d4af37] mb-8">
              Based in Tokyo
            </h3>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10">
              Four years in hospitality taught me to obsess over user experience.
              Now I build software that makes life easier — for users and the people behind it.
            </p>

            <div className="space-y-3 mb-10 overflow-hidden">
              <TechMarquee items={techStackTop} direction="right" />
              <TechMarquee items={techStackBottom} direction="left" />
            </div>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-[#d4af37]/50 text-white px-5 py-3 rounded-lg transition-all group"
            >
              See my work
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Right - JSON Card */}
          <div className="flex-shrink-0 relative lg:self-center w-full sm:w-auto">
            <div className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden w-full sm:w-[380px] mx-auto">
              <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-gray-500 text-xs ml-2 font-mono">leo.json</span>
              </div>

              <div className="p-4 pb-2">
                <p className="text-gray-600 text-xs font-mono mb-2">// profile.jpeg</p>
                <Image
                  src="/images/profile.jpeg"
                  alt="Leo"
                  width={280}
                  height={280}
                  className="rounded-lg w-full max-h-[280px] object-cover object-top"
                />
              </div>

              <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed">
                <div className="text-gray-500">{"{"}</div>
                <div className="pl-4">
                  <span className="text-[#d4af37]">"name"</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">"Leandro Trabucco"</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#d4af37]">"location"</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">"Tokyo, Japan"</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#d4af37]">"status"</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">"Available for Work"</span>
                  <span className="text-gray-500">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#d4af37]">"languages"</span>
                  <span className="text-gray-500">: [</span>
                  <span className="text-emerald-400">"ES"</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-emerald-400">"EN"</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-emerald-400">"JP"</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-emerald-400">"PT"</span>
                  <span className="text-gray-500">],</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#d4af37]">"hobby"</span>
                  <span className="text-gray-500">: </span>
                  <span className="text-emerald-400">
                    "{displayText}
                    <span className="animate-blink text-[#d4af37]">|</span>"
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

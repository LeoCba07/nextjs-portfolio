'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const techStack = [
  { name: "Rails", icon: "rails/rails-plain" },
  { name: "JavaScript", icon: "javascript/javascript-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "React", icon: "react/react-original" },
  { name: "Next.js", icon: "nextjs/nextjs-original" },
  { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
  { name: "SCSS", icon: "sass/sass-original" },
  { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "Heroku", icon: "heroku/heroku-original" },
]

export default function About() {
  const words = ['lifting heavy', 'gaming', 'exploring Tokyo cafés']
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
    <section id="about" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 text-[#d4af37] text-sm mb-6">
          <span>✦</span> About Me
        </span>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left - Text Content */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Full Stack Developer
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#d4af37] mb-8">
              Based in Tokyo
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              I build web apps that people actually want to use.
              Le Wagon Tokyo bootcamp grad with a background in hospitality —
              I know how to work with people and ship products.
            </p>

            {/* Tech Stack */}
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-[#d4af37]/50 px-3 py-2 rounded-lg transition-all duration-300"
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

          {/* Right - Photo Card */}
          <div className="flex-shrink-0">
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
              <Image
                src="/images/profile.jpeg"
                alt="Leo"
                width={240}
                height={240}
                className="rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold text-white">Leandro Trabucco</h3>
              <p className="text-gray-400 text-sm mb-3">Full Stack Developer</p>
              <p className="text-emerald-400 text-sm flex items-center justify-center gap-2 mb-4">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                Available for Work
              </p>

              {/* Typewriter under photo */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-500 text-sm">
                  When I'm not coding, I'm{' '}
                  <span className="text-[#d4af37]">
                    {displayText}
                    <span className="animate-blink">|</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

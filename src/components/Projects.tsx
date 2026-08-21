'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/context/LanguageContext'
import { projectImages } from '@/lib/projectImages'

type Tech = { name: string; icon: string }

interface Project {
  title: string
  stack: Tech[]
  github: string | null
  live: string | null
  playStore: string | null
  images: string[]
  type: 'mobile' | 'desktop'
  /** Address shown in the mock browser chrome. Falls back to a slug of the title. */
  domain?: string
}

function GooglePlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.148l11.04 10.942zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
    </svg>
  )
}

function PhoneFrame({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-[100px] sm:w-[130px] md:w-[160px] flex-shrink-0 ${className}`}>
      <div className="bg-bezel rounded-[1.2rem] md:rounded-[1.5rem] p-1 shadow-2xl border border-white/10">
        <div className="rounded-[1rem] md:rounded-[1.25rem] overflow-hidden bg-black">
          <Image
            src={src}
            alt={alt}
            width={320}
            height={693}
            className="w-full h-auto"
            sizes="(min-width: 768px) 160px, (min-width: 640px) 130px, 100px"
          />
        </div>
      </div>
    </div>
  )
}

function BrowserCarousel({ images, alt, domain }: { images: string[]; alt: string; domain?: string }) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((current - 1 + images.length) % images.length)
  const next = () => setCurrent((current + 1) % images.length)

  return (
    <div className="relative">
      <div className="w-full">
        <div className="bg-white/5 rounded-t-lg px-4 py-2 flex items-center gap-2 border border-white/10 border-b-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 bg-white/5 rounded text-xs text-gray-500 px-3 py-1 ml-2 truncate font-mono">
            {domain ?? alt.toLowerCase().replace(/\s+/g, '-') + '.app'}
          </div>
        </div>
        <div className="relative border border-white/10 border-t-0 rounded-b-lg overflow-hidden shadow-2xl bg-panel aspect-video">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-contain transition-opacity duration-300 ${
                i === current ? 'opacity-100' : 'opacity-0'
              }`}
              priority={i === 0}
            />
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="group absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          </button>
          <button
            onClick={next}
            className="group absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          </button>

          <div className="flex justify-center mt-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className="p-3 group"
              >
                <span
                  className={`block w-2 h-2 rounded-full transition ${
                    i === current ? 'bg-gold' : 'bg-white/20 group-hover:bg-white/40'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function PhoneDeck({ images, alt }: { images: string[]; alt: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStyles = (index: number) => {
    const collapsed = [
      '-translate-x-12 sm:-translate-x-18 md:-translate-x-20 -rotate-6 translate-y-2',
      'translate-x-0 z-10 -translate-y-2',
      'translate-x-12 sm:translate-x-18 md:translate-x-20 rotate-6 translate-y-2',
    ]
    const expanded = [
      '-translate-x-28 sm:-translate-x-32 md:-translate-x-40 -rotate-6 translate-y-2',
      'translate-x-0 z-10 -translate-y-2',
      'translate-x-28 sm:translate-x-32 md:translate-x-40 rotate-6 translate-y-2',
    ]
    return isExpanded ? expanded[index] : collapsed[index]
  }

  return (
    <button
      type="button"
      onClick={() => setIsExpanded(!isExpanded)}
      aria-label={isExpanded ? 'Collapse phone deck' : 'Expand phone deck'}
      aria-expanded={isExpanded}
      className="relative h-[320px] md:h-[420px] w-full flex justify-center items-center cursor-pointer bg-transparent border-0 p-0"
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute transition-all duration-300 ease-out ${getStyles(i)}`}
        >
          <PhoneFrame src={img} alt={`${alt} ${i + 1}`} />
        </div>
      ))}
    </button>
  )
}

function TechIcon({ name, icon }: Tech) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
      <Image src={icon} alt="" width={16} height={16} className="w-4 h-4" />
      <span className="text-xs text-gray-400">{name}</span>
    </div>
  )
}

interface ProjectTranslation {
  title: string
  description: string
}

function ProjectCard({
  project,
  index,
  translation,
  codeLabel,
  liveDemoLabel,
  playStoreLabel,
}: {
  project: Project
  index: number
  translation: ProjectTranslation
  codeLabel: string
  liveDemoLabel: string
  playStoreLabel: string
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`bg-white/[0.02] p-6 md:p-10 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div
        className={`flex flex-col ${
          index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } gap-8 lg:gap-12`}
      >
        {project.images.length > 0 && (
          <div className="lg:w-1/2">
            {project.type === 'mobile' ? (
              <PhoneDeck images={project.images} alt={translation.title} />
            ) : (
              <BrowserCarousel images={project.images} alt={translation.title} domain={project.domain} />
            )}
          </div>
        )}

        <div
          className={`flex-1 flex flex-col justify-center ${
            project.images.length === 0 ? 'lg:max-w-3xl' : ''
          }`}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{translation.title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">{translation.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <TechIcon key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                aria-label="GitHub project link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-gold/50 bg-white/5 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition"
              >
                <Github className="w-4 h-4" />
                {codeLabel}
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                aria-label="Live demo link"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold/20 hover:bg-gold/30 text-gold px-4 py-2 rounded-lg transition"
              >
                <ExternalLink className="w-4 h-4" />
                {liveDemoLabel}
              </a>
            )}
            {project.playStore && (
              <a
                href={project.playStore}
                target="_blank"
                aria-label="Google Play Store link"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-gold/50 bg-white/5 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition"
              >
                <GooglePlayIcon className="w-4 h-4" />
                {playStoreLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const projects: Project[] = [
  {
    title: 'Jidou Navi',
    stack: [
      { name: 'React Native', icon: '/icons/devicons/react.svg' },
      { name: 'TypeScript', icon: '/icons/devicons/typescript.svg' },
      { name: 'Expo', icon: '/icons/brands/expo.svg' },
      { name: 'Supabase', icon: '/icons/devicons/supabase.svg' },
      { name: 'Mapbox', icon: '/icons/brands/mapbox.svg' },
    ],
    github: null,
    live: 'https://www.jidou-navi.app',
    playStore: 'https://play.google.com/store/apps/details?id=com.jidounavi.app',
    images: [...projectImages['jidou-navi']],
    type: 'mobile',
  },
  {
    title: 'El Alto',
    stack: [
      { name: 'Next.js', icon: '/icons/devicons/nextjs.svg' },
      { name: 'TypeScript', icon: '/icons/devicons/typescript.svg' },
      { name: 'Tailwind CSS', icon: '/icons/devicons/tailwindcss.svg' },
      { name: 'Sanity', icon: '/icons/devicons/sanity.svg' },
      { name: 'Google Analytics', icon: '/icons/devicons/google.svg' },
    ],
    github: 'https://github.com/LeoCba07/el-alto-website',
    live: 'https://www.complejoelalto.com.ar',
    playStore: null,
    images: [...projectImages['el-alto']],
    type: 'desktop',
    domain: 'complejoelalto.com.ar',
  },
  {
    title: 'Calibr.ar',
    stack: [
      { name: 'Next.js', icon: '/icons/devicons/nextjs.svg' },
      { name: 'TypeScript', icon: '/icons/devicons/typescript.svg' },
      { name: 'Tailwind CSS', icon: '/icons/devicons/tailwindcss.svg' },
      { name: 'Supabase', icon: '/icons/devicons/supabase.svg' },
      { name: 'PostgreSQL', icon: '/icons/devicons/postgresql.svg' },
    ],
    github: null,
    live: 'https://calibrar.vercel.app',
    playStore: null,
    images: [...projectImages.calibrar],
    type: 'desktop',
    domain: 'calibrar.vercel.app',
  },
  {
    title: 'Nihongo Hero',
    stack: [
      { name: 'Rails 7', icon: '/icons/devicons/rails.svg' },
      { name: 'Hotwire (Turbo + Stimulus)', icon: '/icons/brands/hotwire.svg' },
      { name: 'PostgreSQL', icon: '/icons/devicons/postgresql.svg' },
      { name: 'VoiceVox TTS API', icon: '/icons/brands/voicevox.svg' },
    ],
    github: 'https://github.com/LeoCba07/Nihongo-Hero',
    live: 'https://www.nihongohero.quest/',
    playStore: null,
    images: [...projectImages['nihongo-hero']],
    type: 'mobile',
  },
]

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation()
  const { t } = useLanguage()
  const projectTranslations = t('projects.items') as unknown as ProjectTranslation[]

  return (
    <section id="projects" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-gold text-sm mb-2">
            <span>✦</span> {t('projects.badge') as string}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            {t('projects.title') as string}
          </h2>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              translation={projectTranslations[index]}
              codeLabel={t('projects.code') as string}
              liveDemoLabel={t('projects.liveDemo') as string}
              playStoreLabel={t('projects.playStore') as string}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

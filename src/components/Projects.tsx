'use client'
import { useState } from 'react'
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-[100px] sm:w-[130px] md:w-[160px] flex-shrink-0 ${className}`}>
      <div className="bg-[#1a1a1a] rounded-[1.2rem] md:rounded-[1.5rem] p-1 shadow-2xl border border-white/10">
        <div className="rounded-[1rem] md:rounded-[1.25rem] overflow-hidden bg-black">
          <img src={src} alt={alt} className="w-full" />
        </div>
      </div>
    </div>
  )
}

function BrowserCarousel({ images, alt }: { images: string[]; alt: string }) {
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
            {alt.toLowerCase().replace(/\s+/g, '-') + '.app'}
          </div>
        </div>
        <div className="relative border border-white/10 border-t-0 rounded-b-lg overflow-hidden shadow-2xl bg-[#0d0d0d] aspect-video">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${alt} ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="group absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          </button>
          <button
            onClick={next}
            className="group absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-[#d4af37]' : 'bg-white/20'}`}
              />
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
      "-translate-x-12 sm:-translate-x-18 md:-translate-x-20 -rotate-6 translate-y-2",
      "translate-x-0 z-10 -translate-y-2",
      "translate-x-12 sm:translate-x-18 md:translate-x-20 rotate-6 translate-y-2"
    ]
    const expanded = [
      "-translate-x-28 sm:-translate-x-32 md:-translate-x-40 -rotate-6 translate-y-2",
      "translate-x-0 z-10 -translate-y-2",
      "translate-x-28 sm:translate-x-32 md:translate-x-40 rotate-6 translate-y-2"
    ]
    return isExpanded ? expanded[index] : collapsed[index]
  }

  return (
    <div
      className="relative h-[320px] md:h-[420px] w-full flex justify-center items-center cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute transition-all duration-300 ease-out ${getStyles(i)}`}
        >
          <PhoneFrame src={img} alt={`${alt} ${i + 1}`} />
        </div>
      ))}
    </div>
  )
}

function TechIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`}
        alt={name}
        className="w-4 h-4"
      />
      <span className="text-xs text-gray-400">{name}</span>
    </div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`bg-white/[0.02] p-6 md:p-10 rounded-2xl border border-white/10 hover:border-[#d4af37]/30 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12`}>
        {/* Images */}
        {project.images.length > 0 && (
          <div className="lg:w-1/2">
            {project.type === "mobile" ? (
              <PhoneDeck images={project.images} alt={project.title} />
            ) : (
              <BrowserCarousel images={project.images} alt={project.title} />
            )}
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 flex flex-col justify-center ${project.images.length === 0 ? 'lg:max-w-3xl' : ''}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech) => (
              <TechIcon key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-[#d4af37]/50 bg-white/5 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#d4af37] px-4 py-2 rounded-lg transition"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const projects = [
  {
    title: "Cabañas El Alto",
    description: "Website for a cabin rental complex in Tanti, Córdoba, Argentina. Built a chatbot-style contact form that collects dates and guest count before opening WhatsApp, solving the problem of empty 'Hola' messages. Integrated Sanity CMS for self-service price updates and Google Analytics for conversion tracking.",
    stack: [
      { name: "Next.js", icon: "nextjs/nextjs-original" },
      { name: "TypeScript", icon: "typescript/typescript-original" },
      { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
      { name: "Sanity", icon: "sanity/sanity-original" },
      { name: "Google Analytics", icon: "google/google-original" },
    ],
    github: "https://github.com/LeoCba07/el-alto-website",
    live: "https://el-alto-website.vercel.app",
    images: [
      "/images/projects/el-alto-1.png",
      "/images/projects/el-alto-2.png",
      "/images/projects/el-alto-3.png",
      "/images/projects/el-alto-4.png",
      "/images/projects/el-alto-5.png",
    ],
    type: "desktop",
  },
  {
    title: "Nihongo Hero",
    description: "A gamified Japanese language learning app with RPG-style turn-based combat. Led 4-person team development in 2 weeks, designing database architecture, integrating VoiceVox TTS API, and serving as top contributor. Deployed as mobile-first PWA.",
    stack: [
      { name: "Rails", icon: "rails/rails-plain" },
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "SCSS", icon: "sass/sass-original" },
      { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "Heroku", icon: "heroku/heroku-original" },
    ],
    github: "https://github.com/ShinOWfu/Nihongo-Hero",
    live: "https://www.nihongohero.quest/",
    images: [
      "/images/projects/nihongo-hero-1.png",
      "/images/projects/nihongo-hero-2.png",
      "/images/projects/nihongo-hero-3.png",
    ],
    type: "mobile",
  },
  {
    title: "Adventure Maker",
    description: "AI-powered interactive storytelling platform with branching narratives. Developed LLM prompt engineering for dynamic story generation, implemented Gemini API image generation, and built a psychological assessment analyzing user patterns.",
    stack: [
      { name: "Rails", icon: "rails/rails-plain" },
      { name: "Gemini API", icon: "google/google-original" },
      { name: "SCSS", icon: "sass/sass-original" },
      { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
    ],
    github: "https://github.com/ShinOWfu/AdventureMaker",
    live: null,
    images: [
      "/images/projects/adventure-maker-1.png",
      "/images/projects/adventure-maker-2.png",
      "/images/projects/adventure-maker-3.png",
    ],
    type: "desktop",
  },
]

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="projects" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header animates in */}
        <div
          ref={ref}
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-[#d4af37] text-sm mb-2">
            <span>✦</span> My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Projects</h2>
        </div>

        {/* Each project card animates individually */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

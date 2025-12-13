'use client'
import { useState } from 'react'
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

function PhoneFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-[100px] sm:w-[130px] md:w-[160px] flex-shrink-0 ${className}`}>
      <div className="bg-gray-900 rounded-[1.2rem] md:rounded-[1.5rem] p-1 shadow-2xl">
        <div className="rounded-[1rem] md:rounded-[1.25rem] overflow-hidden bg-black">
          <img src={src} alt={alt} className="w-full" />
        </div>
      </div>
    </div>
  )
}

function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full">
      <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 bg-gray-700 rounded text-xs text-gray-400 px-3 py-1 ml-2 truncate">
          {alt.toLowerCase().replace(/\s+/g, '-') + '.app'}
        </div>
      </div>
      <div className="border border-t-0 border-gray-700 rounded-b-lg overflow-hidden shadow-2xl">
        <img src={src} alt={alt} className="w-full aspect-video object-contain bg-gray-900" />
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
      <BrowserFrame src={images[current]} alt={alt} />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-[#1e3a5f]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function PhoneDeck({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="group relative h-[320px] md:h-[420px] w-full flex justify-center items-center">
      {images.map((img, i) => {
        const baseStyles = [
          "-translate-x-12 sm:-translate-x-18 md:-translate-x-20 -rotate-6 translate-y-2",
          "translate-x-0 z-10 -translate-y-2",
          "translate-x-12 sm:translate-x-18 md:translate-x-20 rotate-6 translate-y-2"
        ]
        const hoverStyles = [
          "group-hover:-translate-x-24 group-hover:sm:-translate-x-26 group-hover:md:-translate-x-34",
          "",
          "group-hover:translate-x-24 group-hover:sm:translate-x-26 group-hover:md:translate-x-34"
        ]
        return (
          <div
            key={i}
            className={`absolute ${baseStyles[i]} ${hoverStyles[i]} transition-all duration-300 ease-out`}
          >
            <PhoneFrame src={img} alt={`${alt} ${i + 1}`} />
          </div>
        )
      })}
    </div>
  )
}

function TechIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`}
        alt={name}
        className="w-4 h-4"
      />
      <span className="text-sm text-gray-700">{name}</span>
    </div>
  )
}

const projects = [
  {
    title: "Nihongo Hero",
    description: "A gamified Japanese language learning app with RPG-style turn-based combat. Led 4-person team development of the final Le Wagon project in two weeks, designing database architecture, integrating VoiceVox TTS API, and serving as top contributor. Deployed as mobile-first PWA.",
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
    description: "AI-powered interactive storytelling platform with branching narratives. Developed LLM prompt engineering for dynamic story generation, implemented Gemini API image generation, and built a psychological assessment system analyzing user decision patterns. Solved challenge of maintaining narrative consistency despite free-form user input.",
    stack: [
      { name: "Rails", icon: "rails/rails-plain" },
      { name: "SCSS", icon: "sass/sass-original" },
      { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "Gemini API", icon: "google/google-original" },
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
  {
    title: "Tenki App",
    description: "Weather app showing current conditions, 4-day forecast, and hourly breakdowns for any city. Features dark mode, geolocation detection, unit switching (°C/°F), and country flags. Built with OpenWeatherMap API.",
    stack: [
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "HTML5", icon: "html5/html5-original" },
      { name: "CSS3", icon: "css3/css3-original" },
    ],
    github: "https://github.com/LeoCba07/tenki-app",
    live: null,
    images: [
      "/images/projects/tenki-app-1.png",
      "/images/projects/tenki-app-2.png",
    ],
    type: "desktop",
  },
  {
    title: "Watch List",
    description: "A movie watchlist application to create custom lists, add movies, and write reviews. Built during Le Wagon bootcamp to practice Rails fundamentals, MVC architecture and Active Record associations.",
    stack: [
      { name: "Rails", icon: "rails/rails-plain" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
    ],
    github: "https://github.com/LeoCba07/rails-watch-list",
    live: null,
    images: [
      "/images/projects/watch-list-1.png",
      "/images/projects/watch-list-2.png",
    ],
    type: "desktop",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-12">Projects</h2>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
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
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">{project.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{project.description}</p>

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
                        className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white px-5 py-2.5 rounded-full hover:bg-[#2d4a6f] transition"
                      >
                        <Github className="w-5 h-5" />
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#b8860b] text-white px-5 py-2.5 rounded-full hover:bg-[#9a7209] transition"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const projects = [
  {
    title: "Nihongo Hero",
    description: "Gamified Japanese learning through RPG combat. Answer vocab questions to defeat enemies. Built as team lead with 3 other developers.",
    stack: ["Rails 7", "JavaScript", "PostgreSQL", "VoiceVox API"],
    github: "https://github.com/ShinOWfu/Nihongo-Hero",
    live: "https://nihongohero.quest",
  },
  {
    title: "AdventureMaker",
    description: "AI-powered interactive storytelling with psychological assessment based on your choices.",
    stack: ["Rails 7", "PostgreSQL", "Gemini API"],
    github: "https://github.com/ShinOWfu/AdventureMaker",
    live: null,
  },
  {
    title: "Tenki App",
    description: "My first personal project! A weather app with current conditions, 4-day forecast, hourly breakdown, dark mode, and geolocation.",
    stack: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    github: "https://github.com/LeoCba07/tenki-app",
    live: null,
  },
  {
    title: "Rails Watch List",
    description: "A movie watchlist app to create custom lists, add movies, and write reviews. Built during Le Wagon bootcamp.",
    stack: ["Rails 7", "PostgreSQL", "Bootstrap"],
    github: "https://github.com/LeoCba07/rails-watch-list",
    live: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-12">Projects</h2>

        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1e3a5f] mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech) => (
                  <span key={tech} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" className="text-[#1e3a5f] hover:underline">
                    GitHub →
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" className="text-[#b8860b] hover:underline">
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

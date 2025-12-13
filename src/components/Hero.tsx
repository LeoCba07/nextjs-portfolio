export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b8860b]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Leandro Trabucco</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">Full Stack Developer</p>

        <div className="flex gap-4 justify-center mb-16">
          <a
            href="#projects"
            className="bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-200 transition"
          >
            See Projects
          </a>
          <a
            href="#contact"
            className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-6 py-3 rounded-lg transition"
          >
            Contact
          </a>
        </div>

        <a href="#about" className="animate-bounce inline-block text-gray-500 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

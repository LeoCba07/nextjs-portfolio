export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-8">
      <h1 className="text-5xl font-bold mb-4">Leandro Trabucco</h1>
      <p className="text-xl text-gray-600 mb-8">Full Stack Developer</p>

      <div className="flex gap-4 mb-16">
        <a href="#projects" className="bg-[#1e3a5f] text-white px-6 py-3 rounded-full hover:bg-[#2d4a6f] transition">
          See Projects
        </a>
        <a href="#contact" className="border border-[#1e3a5f] text-[#1e3a5f] px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Contact
        </a>
      </div>

      <a href="#about" className="animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  )
}

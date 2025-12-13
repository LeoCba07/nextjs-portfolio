import { Mail } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="min-h-[80vh] flex items-center px-4 md:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center w-full">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 text-[#b8860b] text-sm mb-8">
          <span className="animate-pulse">✦</span> Let's Connect
        </span>

        <h2 className="text-5xl md:text-6xl font-bold text-white mb-3">
          Let's Build Something
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-[#b8860b] mb-8">
          Together
        </h3>

        <p className="text-gray-400 text-xl mb-12">
          Available for full-time roles in Japan — let's talk!
        </p>

        <div className="flex flex-col items-center gap-8">
          <a
            href="mailto:leandrotrabucco@gmail.com"
            className="group inline-flex items-center gap-3 bg-white text-black font-medium px-8 py-4 rounded-xl hover:bg-[#b8860b] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#b8860b]/20"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </a>

          <div className="flex gap-4">
            <a
              href="/Leandro_Trabucco_Resume.pdf"
              download
              className="inline-flex items-center gap-2 border border-white/10 hover:border-[#b8860b]/50 bg-white/[0.02] text-gray-300 hover:text-white px-5 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">🇺🇸</span>
              Resume
            </a>
            <a
              href="/Leandro_Trabucco_Rirekisho.pdf"
              download
              className="inline-flex items-center gap-2 border border-white/10 hover:border-[#b8860b]/50 bg-white/[0.02] text-gray-300 hover:text-white px-5 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <span className="text-lg">🇯🇵</span>
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

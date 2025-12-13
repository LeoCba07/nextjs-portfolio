'use client'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="contact" className="min-h-[80vh] flex items-center px-4 md:px-8 relative z-10">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto text-center w-full transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
        }`}
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 text-[#d4af37] text-sm mb-6">
          <span>✦</span> Let's Connect
        </span>

        <h2 className="text-5xl md:text-6xl font-bold text-white mb-3">
          Let's Build Something
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-6">
          Together
        </h3>

        <p className="text-gray-500 text-lg mb-12 font-mono">
          $ ping leandrotrabucco@gmail.com
        </p>

        <div className="flex flex-col items-center gap-6">
          <a
            href="mailto:leandrotrabucco@gmail.com"
            className="inline-flex items-center gap-3 bg-white text-black font-medium px-8 py-4 rounded-lg hover:bg-[#d4af37] transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </a>

          <div className="flex gap-4">
            <a
              href="/Leandro_Trabucco_Resume.pdf"
              download
              className="inline-flex items-center gap-3 border border-white/10 hover:border-[#d4af37]/50 bg-white/5 text-gray-300 hover:text-white px-5 py-3 rounded-lg transition-all duration-300"
            >
              Resume
              <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-5 h-3 rounded-sm object-cover" />
            </a>

            <a
              href="/Leandro_Trabucco_Rirekisho.pdf"
              download
              className="inline-flex items-center gap-3 border border-white/10 hover:border-[#d4af37]/50 bg-white/5 text-gray-300 hover:text-white px-5 py-3 rounded-lg transition-all duration-300"
            >
              Resume
              <img src="https://flagcdn.com/w40/jp.png" alt="JP" className="w-5 h-3 rounded-sm object-cover" />
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-6 mt-4">
            <a
              href="https://github.com/LeoCba07"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#d4af37] transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/leandro-trabucco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#d4af37] transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

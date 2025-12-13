import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-white mb-2">LT_</p>
            <p className="text-gray-500 text-sm">© 2025 Leandro Trabucco</p>
          </div>

          {/* Nav & Social */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <nav className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition text-sm">Home</a>
              <a href="#about" className="text-gray-400 hover:text-white transition text-sm">About</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition text-sm">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition text-sm">Contact</a>
            </nav>

            <div className="flex gap-4">
              <a href="https://github.com/LeoCba07" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/leandro-trabucco" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

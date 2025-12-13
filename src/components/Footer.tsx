export default function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© 2025 Leandro Trabucco</p>

        <div className="flex gap-6">
          <a href="https://github.com/LeoCba07" target="_blank" className="text-gray-500 hover:text-[#1e3a5f] transition">
            GitHub
          </a>
          <a href="https://linkedin.com/in/leandro-trabucco" target="_blank" className="text-gray-500 hover:text-[#1e3a5f] transition">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

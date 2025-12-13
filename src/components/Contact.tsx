export default function Contact() {
  return (
    <section id="contact" className="py-24 px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Let's Work Together</h2>
        <p className="text-gray-600 mb-8">
          I'm currently looking for my first developer role in Tokyo. Feel free to reach out!
        </p>

        <div className="flex flex-col items-center gap-4">
          <a href="mailto:leandrotrabucco@gmail.com" className="bg-[#1e3a5f] text-white px-6 py-3 rounded-full hover:bg-[#2d4a6f] transition">
            Email Me
          </a>

          <div className="flex gap-4">
            <a href="/Leandro_Trabucco_Resume.pdf" download className="border border-[#1e3a5f] text-[#1e3a5f] px-6 py-3 rounded-full hover:bg-gray-100 transition">
              Resume (EN)
            </a>
            <a href="/Leandro_Trabucco_Rirekisho.pdf" download className="border border-[#1e3a5f] text-[#1e3a5f] px-6 py-3 rounded-full hover:bg-gray-100 transition">
              履歴書 (JP)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

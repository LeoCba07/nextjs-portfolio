'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Hero() {
  const words = ['lifting heavy', 'gaming', 'exploring Tokyo cafés']
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-8">
      <Image
        src="/images/profile.jpeg"
        alt="Leo"
        width={150}
        height={150}
        className="rounded-full mb-6"
      />

      <h1 className="text-5xl font-bold mb-4">Leandro Trabucco</h1>
      <p className="text-xl text-gray-600 mb-2">Full Stack Developer in Tokyo</p>
      <p className="text-lg text-gray-500 mb-8">
        If I'm not coding, I'm <span className="font-medium">{words[currentWord]}</span>
      </p>

      <div className="flex gap-4">
        <a href="#projects" className="bg-[#1e3a5f] text-white px-6 py-3 rounded-full hover:bg-[#2d4a6f] transition">
          See Projects
        </a>
        <a href="#contact" className="border border-[#1e3a5f] text-[#1e3a5f] px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Contact
        </a>
      </div>
    </section>
  )
}

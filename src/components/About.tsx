'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function About() {
  const words = ['lifting heavy', 'gaming', 'exploring Tokyo cafés']
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="about" className="py-24 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-12">About</h2>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-shrink-0">
            <Image
              src="/images/profile.jpeg"
              alt="Leo"
              width={200}
              height={200}
              className="rounded-full"
            />
            <p className="text-center mt-4 text-gray-500">
              When I'm not coding, I'm <br/>
              <span className="font-medium text-[#1e3a5f]">{words[currentWord]}</span>
            </p>
          </div>

          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Back in Argentina I used to mess around with code for fun. Then life happened —
              I moved to Japan, spent 4 years in hospitality, and programming became a distant memory.
            </p>
            <p>
              But the itch never really went away. I wanted to build things people actually use.
              Be part of something and go "hey, I made that."
            </p>
            <p>
              So I quit my hotel job and went all-in on Le Wagon Tokyo's bootcamp. Now I'm building
              software that makes life easier — not just for users, but for the people behind it too.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'

export default function Navbar() {
  const links = ['About', 'Projects', 'Experience', 'Contact']

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-[#1e3a5f]">LT_</a>

        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-600 hover:text-[#1e3a5f] transition"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

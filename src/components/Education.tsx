'use client'
import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useLanguage } from '@/context/LanguageContext'

interface EducationItem {
  logo: string
  logoTheme?: 'light'
  degree: string
  school: string
  place: string
  period: string
  summary: string
}

// Renders a summary string with inline [label](#anchor) links as <a> nodes.
function renderSummary(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    nodes.push(
      <a
        key={match.index}
        href={match[2]}
        className="text-gold hover:underline underline-offset-2 decoration-gold/50"
      >
        {match[1]}
      </a>
    )
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}

function EducationCard({ item, index }: { item: EducationItem; index: number }) {
  const { ref, isVisible } = useScrollAnimation()
  const chipBg = item.logoTheme === 'light' ? 'bg-white' : 'bg-white/5'

  return (
    <div
      ref={ref}
      className={`bg-white/[0.02] border border-white/10 hover:border-gold/30 rounded-2xl p-6 md:p-8 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
        <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl ${chipBg} border border-white/20 flex items-center justify-center overflow-hidden`}>
          <Image
            src={item.logo}
            alt={`${item.school} logo`}
            width={80}
            height={80}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-gold text-xs font-mono uppercase tracking-wider mb-2">
            {item.period}
          </p>
          <h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.degree}</h3>
          <p className="text-gray-400 text-sm mb-3">
            {item.school} <span className="text-gray-600">·</span> {item.place}
          </p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">{renderSummary(item.summary)}</p>
        </div>
      </div>
    </div>
  )
}

export default function Education() {
  const { ref, isVisible } = useScrollAnimation()
  const { t } = useLanguage()

  const items = t('education.items') as unknown as EducationItem[]

  return (
    <section id="education" className="py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-gold text-sm mb-2">
            <span>✦</span> {t('education.badge') as string}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            {t('education.title') as string}
          </h2>
        </div>

        <div className="space-y-6">
          {items.map((item, i) => (
            <EducationCard key={`${item.school}-${item.period}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

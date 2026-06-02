import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projectImages, type PhoneDeckSlug } from '@/lib/projectImages'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const PHONE_WIDTH = 480
const PHONE_HEIGHT = Math.round((693 / 320) * PHONE_WIDTH)

const fanPositions = [
  { x: -PHONE_WIDTH, y: 24, rotate: -6 },
  { x: 0, y: -24, rotate: 0 },
  { x: PHONE_WIDTH, y: 24, rotate: 6 },
]

function ExportPhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{ width: PHONE_WIDTH }}
      className="bg-bezel rounded-[4.5rem] p-3 shadow-2xl border border-white/10"
    >
      <div className="rounded-[3.75rem] overflow-hidden bg-black">
        <Image
          src={src}
          alt={alt}
          width={320}
          height={693}
          className="w-full h-auto"
          priority
          unoptimized
        />
      </div>
    </div>
  )
}

export default async function PhoneDeckExportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!(slug in projectImages)) notFound()
  const images = projectImages[slug as PhoneDeckSlug]

  const deckWidth = PHONE_WIDTH * 3 + 200
  const deckHeight = PHONE_HEIGHT + 200

  return (
    <>
      <style>{`html, body { background: transparent !important; margin: 0; padding: 0; }`}</style>
      <div
        data-export-root
        style={{ width: deckWidth, height: deckHeight }}
        className="relative flex items-center justify-center"
      >
        {images.map((img, i) => {
          const pos = fanPositions[i]
          return (
            <div
              key={img}
              style={{
                position: 'absolute',
                transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotate}deg)`,
                zIndex: i === 1 ? 10 : 1,
              }}
            >
              <ExportPhoneFrame src={img} alt={`${slug} ${i + 1}`} />
            </div>
          )
        })}
      </div>
    </>
  )
}

import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projectImages, type BrowserSlug } from '@/lib/projectImages'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const FRAME_WIDTH = 1600

const browserMeta: Record<BrowserSlug, { url: string; intrinsicWidth: number; intrinsicHeight: number }> = {
  'el-alto': { url: 'complejoelalto.com.ar', intrinsicWidth: 2522, intrinsicHeight: 1286 },
  calibrar: { url: 'calibrar.vercel.app', intrinsicWidth: 2880, intrinsicHeight: 1620 },
}

export default async function BrowserExportPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!(slug in browserMeta)) notFound()
  const typedSlug = slug as BrowserSlug
  const meta = browserMeta[typedSlug]
  const firstImage = projectImages[typedSlug][0]
  const imageHeight = Math.round((meta.intrinsicHeight / meta.intrinsicWidth) * FRAME_WIDTH)

  return (
    <>
      <style>{`html, body { background: transparent !important; margin: 0; padding: 0; }`}</style>
      <div
        data-export-root
        style={{ width: FRAME_WIDTH }}
        className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="bg-[#1a1a1a] px-8 py-5 flex items-center gap-4 border-b border-white/10">
          <div className="flex gap-3">
            <span className="w-5 h-5 rounded-full bg-red-500/90" />
            <span className="w-5 h-5 rounded-full bg-yellow-500/90" />
            <span className="w-5 h-5 rounded-full bg-green-500/90" />
          </div>
          <div className="flex-1 bg-white/5 rounded-md text-base text-gray-400 px-5 py-2 ml-4 truncate font-mono">
            {meta.url}
          </div>
        </div>
        <div
          style={{ width: FRAME_WIDTH, height: imageHeight }}
          className="relative bg-[#0d0d0d]"
        >
          <Image
            src={firstImage}
            alt={typedSlug}
            width={meta.intrinsicWidth}
            height={meta.intrinsicHeight}
            priority
            unoptimized
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
    </>
  )
}

export const projectImages = {
  'jidou-navi': [
    '/images/projects/jidou-navi-1.webp',
    '/images/projects/jidou-navi-2.webp',
    '/images/projects/jidou-navi-3.webp',
  ],
  'el-alto': [
    '/images/projects/el-alto-1.jpg',
    '/images/projects/el-alto-2.jpg',
    '/images/projects/el-alto-3.jpg',
    '/images/projects/el-alto-4.jpg',
  ],
  calibrar: [
    '/images/projects/calibrar-1.webp',
    '/images/projects/calibrar-2.webp',
    '/images/projects/calibrar-3.webp',
    '/images/projects/calibrar-4.webp',
    '/images/projects/calibrar-5.webp',
  ],
  agile: [
    '/images/projects/agile-1.webp',
    '/images/projects/agile-2.webp',
    '/images/projects/agile-3.webp',
    '/images/projects/agile-4.webp',
    '/images/projects/agile-5.webp',
  ],
} as const

export type ProjectSlug = keyof typeof projectImages
export type PhoneDeckSlug = 'jidou-navi'
export type BrowserSlug = 'el-alto' | 'calibrar' | 'agile'

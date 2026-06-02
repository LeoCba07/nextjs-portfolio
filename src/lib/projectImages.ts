export const projectImages = {
  'jidou-navi': [
    '/images/projects/jidou-navi-1.webp',
    '/images/projects/jidou-navi-2.webp',
    '/images/projects/jidou-navi-3.webp',
  ],
  'nihongo-hero': [
    '/images/projects/nihongo-hero-1.png',
    '/images/projects/nihongo-hero-2.png',
    '/images/projects/nihongo-hero-3.png',
  ],
  'el-alto': [
    '/images/projects/el-alto-1.png',
    '/images/projects/el-alto-2.png',
    '/images/projects/el-alto-3.png',
    '/images/projects/el-alto-4.png',
    '/images/projects/el-alto-5.png',
  ],
  'adventure-maker': [
    '/images/projects/adventure-maker-1.png',
    '/images/projects/adventure-maker-2.png',
    '/images/projects/adventure-maker-3.png',
  ],
} as const

export type ProjectSlug = keyof typeof projectImages
export type PhoneDeckSlug = 'jidou-navi' | 'nihongo-hero'
export type BrowserSlug = 'el-alto' | 'adventure-maker'

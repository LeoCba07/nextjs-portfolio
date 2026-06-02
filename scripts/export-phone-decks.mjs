import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import puppeteer from 'puppeteer'

const PORT = 3210
const BASE_URL = `http://localhost:${PORT}`
const TARGETS = [
  { slug: 'jidou-navi', route: 'phone-deck' },
  { slug: 'nihongo-hero', route: 'phone-deck' },
  { slug: 'el-alto', route: 'browser' },
  { slug: 'adventure-maker', route: 'browser' },
]

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outDir = path.join(projectRoot, 'screenshots')

function startDevServer() {
  const child = spawn('npx', ['next', 'dev', '-p', String(PORT)], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'development' },
  })
  child.stdout.on('data', (b) => process.stdout.write(`[next] ${b}`))
  child.stderr.on('data', (b) => process.stderr.write(`[next] ${b}`))
  return child
}

async function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok || res.status === 404) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`)
}

async function main() {
  await mkdir(outDir, { recursive: true })

  const server = startDevServer()
  let browser
  try {
    await waitForServer(BASE_URL)

    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 1800, height: 1500, deviceScaleFactor: 3 },
    })

    for (const { slug, route } of TARGETS) {
      const page = await browser.newPage()
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])
      const url = `${BASE_URL}/export/${route}/${slug}`
      console.log(`Capturing ${url}`)
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 })
      const handle = await page.waitForSelector('[data-export-root]', { timeout: 30_000 })
      if (!handle) throw new Error(`No [data-export-root] on ${slug}`)
      const suffix = route === 'phone-deck' ? '-deck' : '-browser'
      const outPath = path.join(outDir, `${slug}${suffix}.png`)
      await handle.screenshot({ path: outPath, omitBackground: true })
      console.log(`  wrote ${path.relative(projectRoot, outPath)}`)
      await page.close()
    }
  } finally {
    if (browser) await browser.close()
    server.kill('SIGTERM')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

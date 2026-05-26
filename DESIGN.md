# DESIGN.md

## Palette

Dark-only. Single accent. No theme toggle.

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-ink` | `#0a0a0a` | Page background. Near-black, not pure black, to soften eye fatigue. |
| `--color-panel` | `#0d0d0d` | Card/inset background — barely lifted from `ink` for layered surfaces (leo.json card, browser-frame mockups). |
| `--color-gold` | `#d4af37` | The single accent. Used for: active nav underline, headings second-line, link hovers, CTA fills, ✦ badge chips, blinking terminal cursor, JSON keys in leo.json. |
| `--color-gold-dim` | `#b8860b` | Atmospheric gold for the background orbs in `Background.tsx`. Tinted at /5–/30 opacity. Never used for text or interactive surfaces. |

Gray ramp comes from Tailwind defaults (`text-gray-300`, `text-gray-400`, `text-gray-500`, `text-gray-600`). Body copy at `gray-300` or `gray-400` depending on weight needed; meta lines at `gray-400` (meaningful) or `gray-500` (atmospheric); subtle separators at `gray-600`. Never use pure white for body text. Use `text-white` only on h1/h2/h3 and CTA primary fill.

**Intentional sub-AA decorative ramp.** `text-gray-600` on `bg-panel` falls below the 4.5:1 WCAG AA threshold and is used exclusively for decorative "code chrome": the `// profile.jpeg` comment in the leo.json card, JSON braces/punctuation inside the same card, the faux URL bar text in `BrowserCarousel`, and the leading `>` glyph in the hero terminal. These convey no information that isn't redundantly visible elsewhere. Body copy never uses this ramp.

**Restraint is the rule.** One accent color, used sparingly. Don't add a second hue. Don't introduce gradients beyond the existing atmospheric blur orbs.

## Type

- **Geist Sans** (`--font-geist-sans`) — body, headings, UI. Loaded via `next/font` Google.
- **Geist Mono** (`--font-geist-mono`) — terminal prompts, `leo.json` key/value rows, period labels, the `LT_` wordmark, JSON-style code accents.

Scale per Tailwind defaults. Display sizes for the hero (`text-6xl md:text-8xl`), section h2s at `text-4xl md:text-5xl`, project/education titles at `text-2xl md:text-3xl`, body at `text-base sm:text-lg`. Mono drops smaller (`text-xs` / `text-sm`).

Hierarchy convention: every section opens with a small gold "✦ badge" chip → bold `text-white` h2 → optional `text-gold` h3 subtitle for emphasis (used in About and Contact).

## Spacing

Tailwind scale. Sections breathe with vertical padding `py-24` (most) up to `py-40` (About on large screens). Horizontal `px-4 md:px-8` everywhere. Content max-width `max-w-6xl mx-auto` for most sections, `max-w-4xl` for Contact (it's centered and benefits from a narrower column).

Card padding `p-6 md:p-10` for project cards (need room for screenshots + copy), `p-6 md:p-8` for education cards (denser, more text-only).

## Motion

Three motion patterns, all `ease-out`, all reduced-motion-aware.

1. **Scroll-triggered fade-in-up** via `useScrollAnimation` hook (IntersectionObserver, threshold 0.15). Components fade from `opacity-0 translate-y-16` → `opacity-100 translate-y-0` over `duration-1000`. Each section uses one observer; project cards and education cards stagger by setting a per-index `transitionDelay`. Slow and confident, not flashy.
2. **Marquee tech strips** via CSS keyframe `marquee-left` / `marquee-right` at 20s linear infinite. Two rows in About, scrolling in opposite directions.
3. **Typewriter + blink** for the `leo.json` hobby line and the hero role line. Built in JS (setTimeout), not CSS, because both need to track language changes and pause on word completion.

`@media (prefers-reduced-motion: reduce)` disables all four animation patterns and the smooth-scroll.

## Component patterns

- **✦ badge chip** — `inline-flex items-center gap-2 text-gold text-sm` with a leading `<span>✦</span>`. Sits above every section h2. Do not replace with a rounded-square icon tile.
- **Browser frame** — `BrowserCarousel` in Projects: traffic-light dots + a faux URL bar that auto-derives from the project title (`alt.toLowerCase().replace(/\s+/g, '-') + '.app'`). Wraps desktop screenshots in 16:9.
- **Phone frame + deck** — `PhoneFrame` (single phone, ~160px wide on desktop) and `PhoneDeck` (three phones fanned out, click to expand). Always exactly three screens per mobile project for visual parity across cards; if more raw assets exist, pick three for the deck and leave the rest unreferenced.
- **leo.json card** — identity block in About, styled as a code-editor file: title bar with traffic-light dots and `leo.json` filename, profile photo below as `// profile.jpeg`, then a JSON object with `name`, `location`, `status`, `languages`, `hobby` — gold keys, emerald string values, gray punctuation.
- **Education card** — period as gold uppercase mono label on the left (or above on mobile), degree + school + summary on the right. Flat — no nested cards.
- **Tech chip** — small `bg-white/5 border border-white/10 rounded-lg` chip with icon + label. Used in both the About marquee rows and the per-project stack list.

## Voice conventions in UI

- Wordmark `LT_` with blinking underscore — used in navbar and footer. The underscore is gold.
- Terminal prompts `$ whoami` (Hero), `$ ping <email>` (Contact). Lowercase, present-tense, no period.
- JSON-style keys in `leo.json`. Real-looking object syntax.
- Section names in the ✦ chip are conversational labels ("About Me", "My Work", "Where I Learned", "Connect with me"), not utility nouns.

## Anti-patterns to avoid

Pulled from the surface tells that mark generic AI-generated portfolios — don't drift back into these:

- Rounded-square icon tile above each h2 (we use the ✦ chip — keep it).
- Cards nested inside cards (project content sits directly in one outer card; no inner panels).
- Purple-to-blue gradient anywhere (gold-only accent — keep it).
- Inter for every text role (Geist sans + mono is the type voice — keep it).
- Gray text on colored backgrounds (we have neither — keep it that way).
- A "Hi, I'm X" hero greeting (we use a `$ whoami` prompt — more specific to the voice).
- A skills section that lists every framework as a 5-star bar (the tech marquee is the lightweight equivalent; don't replace it with a self-rated grid).

## i18n constraints

EN and ES are co-equal. Strings live in `src/locales/{en,es}.json` and are pulled via `useLanguage().t('path.to.key')`. Spanish typically runs 15–25% longer than English; layouts that flex without overflow are required. Buttons, badges, and h2s must accept the Spanish string without truncation at every breakpoint from 375px upward.

Date period labels (e.g., `May 2026 ~`, `Oct 2025 — Dec 2025`) and brand names (Le Wagon, UTN, Sanity, Mapbox) stay un-translated.

## What's deliberately omitted

- A blog or MDX content collection — would need a different IA.
- A contact form — `mailto:` is intentional.
- A theme toggle — dark-only is a brand choice.
- Animation libraries (Framer Motion, GSAP) — the IntersectionObserver + CSS combo is enough; no bundle cost added for one-off uses.

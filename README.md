# feroldi.cloud

Portfolio site for Matteo Feroldi — Senior Full Stack Developer. Astro 6 + TypeScript, deployed on Cloudflare Pages.

## Stack

- **Astro 6** (SSG, multi-page, content collections)
- **TypeScript strict**
- **Three.js** for the WebGL background (dynamically imported, gated by reduced-motion + saveData + viewport)
- **React** (only for the dev-mode Tweaks Panel)
- **MDX** content collections for project case studies
- **Cloudflare Pages** deploy + **Cloudflare Web Analytics**
- Self-hosted variable fonts (Space Grotesk, JetBrains Mono via `@fontsource-variable`)

## Local development

```sh
npm install
npm run dev
```

Open <http://localhost:4321>.

In dev a small **Tweaks Panel** appears bottom-right: tune accent hue, 3D intensity, project layout — values persist to `localStorage` and are applied live (CSS variables + Three.js).
The panel is tree-shaken out of production builds (no React runtime is shipped to visitors).

## Commands

| Command            | Purpose                                            |
| :----------------- | :------------------------------------------------- |
| `npm run dev`      | Local dev server with hot reload + Tweaks Panel    |
| `npm run build`    | Production build to `dist/`                        |
| `npm run preview`  | Serve `dist/` for a final smoke test               |
| `npx astro check`  | Type-check `.astro` + `.ts` files                  |
| `npx astro sync`   | Re-generate types for content collections          |

## Project layout

```
src/
├── content/
│   ├── projects/        # 12 MDX files (6 slugs × 2 langs)
│   └── ...
├── content.config.ts    # Zod schema for the projects collection
├── data/                # services + skills (typed TS data)
├── i18n/                # ui.ts dictionary + helpers (t, localizedUrl)
├── layouts/             # Base + CaseStudy
├── pages/
│   ├── index.astro      # home IT
│   ├── work/[slug].astro
│   ├── en/index.astro
│   ├── en/work/[slug].astro
│   └── 404.astro
├── components/
│   ├── layout/          # Nav, Footer, LangSwitcher, SkipLink
│   ├── ui/              # Button, SectionHead, Ticker, ArrowIcon
│   ├── sections/        # Hero, About, Skills, Services, Projects, Contact
│   ├── interactive/     # BgCanvas mounting point + TweaksPanel (React)
│   └── seo/             # Meta, JsonLd
├── scripts/
│   ├── three-scene.ts   # WebGL scene (dynamic-imported)
│   └── interactions/    # cursor, magnetic, scramble, reveal, project-stack, nav-active, contact-time, index
├── styles/              # tokens, base, utilities, per-section modules + global.css
└── lib/
    ├── seo.ts
    └── content.ts       # getProjects, getProject, getAdjacentProjects
```

## i18n

Italian is the default locale and lives at the root (`/`).
English is at `/en/`. Each project case study has two MDX files (`atlas.it.mdx`, `atlas.en.mdx`).

`<link rel="alternate" hreflang>` tags are emitted by `Base.astro`. The `LangSwitcher` component preserves the current path when switching language (falling back to the localized home if the translation is missing).

## Content collections

Edit `src/content/projects/{slug}.{lang}.mdx` to update case studies. The frontmatter schema (validated by Zod) is defined in `src/content.config.ts`.

## Deploy — Cloudflare Pages

1. Push the repository to GitHub.
2. Cloudflare Pages → Create project → connect the GitHub repo.
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: `22`
4. Environment variables (Production + Preview):
   - `PUBLIC_CF_BEACON_TOKEN` — get it from Cloudflare → Web Analytics → Add site → JS Snippet token.
5. Add the custom domain `feroldi.cloud` (and a 301 redirect from `www.feroldi.cloud` to apex).
6. `public/_headers` and `public/_redirects` are picked up automatically by Cloudflare Pages.

## Accessibility / performance gates applied

- `prefers-reduced-motion: reduce` disables Three.js, magnetic buttons, text scramble, and the translate-on-reveal animation (fade-only).
- `prefers-color-scheme` — site is dark-only by design, `color-scheme: dark` for native widgets.
- Skip-to-content link, visible on focus, jumps to `#main`.
- `aria-current="page"` on the active nav link, synced with the scrolled section.
- Three.js skipped on portrait-narrow phones and on `saveData` / 2g connections.
- Custom cursor disabled on touch devices.
- Project 3D stack collapses to a list on mobile and on reduced-motion.

## Open TODOs (handed to the owner)

These are placeholders or values that need confirmation before launch:

- **Real projects** — the 6 case studies under `src/content/projects/` are realistic-but-fictional placeholders. Replace title, body, metrics, screenshots, and live/github links with real work.
- **Social links** — `src/i18n/ui.ts` `SITE.social` defaults to `https://github.com/`, `https://linkedin.com/in/`, `https://x.com/`. Fill in the actual usernames.
- **Hero stats** — `08 anni`, `60+`, `12 stack`, `100%` in `About.astro` are placeholders. Verify with real numbers.
- **OG image** — add `public/og/og-default.png` (1200×630). See `public/og/README.md`.
- **Email** — `hello@feroldi.cloud` is set in `SITE.email`. Confirm it routes correctly.
- **Cloudflare Web Analytics token** — set `PUBLIC_CF_BEACON_TOKEN` after creating the property.
- **Availability badge** — toggle `AVAILABILITY` in `src/i18n/ui.ts` (`available` | `limited` | `closed`).

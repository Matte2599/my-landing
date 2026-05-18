# Open Graph images

This folder serves the social-preview images referenced by `<meta property="og:image">`.

## Required files

- `og-default.png` — 1200×630, used by the home pages (IT + EN) and any case study without its own `ogImage` set.

## Per-case-study images (optional)

Add `og-{slug}.png` (1200×630) and reference it from the project's MDX frontmatter:

```yaml
ogImage: /og/og-atlas.png
```

## Generation hint

Until you ship custom OG images, the home pages render with a placeholder OG meta tag pointing here.
A quick way to generate one-off PNGs is to screenshot the live hero section at 1200×630, or use Satori / @vercel/og at build time.

> TODO: add `og-default.png` (1200×630) before launch.

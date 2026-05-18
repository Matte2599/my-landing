import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    lang: z.enum(['it', 'en']),
    year: z.number().int().min(2000).max(2100),
    status: z.enum(['in-production', 'open-source', 'enterprise', 'archived', 'in-development']),
    yearLabel: z.string(),
    summary: z.string().max(180),
    description: z.string(),
    tech: z.array(z.string()).min(1).max(10),
    role: z.string().optional(),
    client: z.string().optional(),
    nda: z.boolean().default(false),
    num: z.string(),
    glyph: z.enum(['hex', 'circle', 'square', 'dodeca', 'vault', 'shield']),
    /** Optional path (under /public) to a cover image rendered in card + case study */
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    /** How to fit the cover image inside the card visual.
     *  `contain` (default) keeps the whole image (best for landscape screenshots).
     *  `cover-top` fills the frame and keeps the top of the image (best for tall mobile screenshots). */
    coverFit: z.enum(['contain', 'cover-top']).default('contain'),
    linkType: z.enum(['visit', 'github', 'nda']),
    links: z
      .object({
        live: z.string().url().optional(),
        github: z.string().url().optional(),
        caseStudy: z.string().optional(),
      })
      .default({}),
    order: z.number().int(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };

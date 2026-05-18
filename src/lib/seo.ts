import { SITE, ui, type Locale } from '../i18n/ui';

export interface SeoOptions {
  title?: string;
  description?: string;
  locale: Locale;
  pathname: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  locale: string;
  noindex: boolean;
}

export function buildSeo(opts: SeoOptions): SeoData {
  const localeDict = ui[opts.locale];
  const baseTitle = localeDict['site.title'];
  const title = opts.title ? `${opts.title} — ${SITE.name}` : baseTitle;
  const description = opts.description ?? localeDict['site.description'];
  const canonical = new URL(opts.pathname, SITE.url).toString();
  const ogImage = opts.ogImage ?? new URL('/og/og-default.png', SITE.url).toString();
  return {
    title,
    description,
    canonical,
    ogImage,
    locale: opts.locale === 'it' ? 'it_IT' : 'en_US',
    noindex: opts.noindex ?? false,
  };
}

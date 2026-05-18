import { ui, type Locale, type UIKey, DEFAULT_LOCALE, LOCALES } from './ui';

/**
 * Type-safe translation lookup with fallback to default locale.
 */
export function t(key: UIKey, locale: Locale = DEFAULT_LOCALE): string {
  const dict = ui[locale] ?? ui[DEFAULT_LOCALE];
  const value = dict[key];
  if (value !== undefined) return value;
  return ui[DEFAULT_LOCALE][key] ?? key;
}

/**
 * Build a locale-aware URL. IT (default) has no prefix; EN is prefixed with `/en`.
 */
export function localizedUrl(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

/**
 * Extract locale from a URL path. Returns DEFAULT_LOCALE if no prefix found.
 */
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && (LOCALES as string[]).includes(first)) {
    return first as Locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * Strip the locale prefix from a path. `/en/work/atlas` → `/work/atlas`.
 */
export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && (LOCALES as string[]).includes(first)) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

/**
 * Switch the locale of a given path. Used by LangSwitcher.
 */
export function switchLocaleUrl(pathname: string, targetLocale: Locale): string {
  const stripped = stripLocaleFromPath(pathname);
  return localizedUrl(stripped, targetLocale);
}

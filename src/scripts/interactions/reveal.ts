import { scrambleOn } from './scramble';

/**
 * Reveal-on-scroll: adds `.in` class to `.reveal` elements once visible.
 * Also triggers scramble on `[data-scramble]` and `[data-scramble-trigger]` siblings.
 */
export function initReveal(opts: { allowScramble: boolean }): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('in');

        if (opts.allowScramble) {
          if (el.hasAttribute('data-scramble-trigger')) {
            el.querySelectorAll<HTMLElement>('[data-scramble]').forEach(scrambleOn);
          }
          if (el.matches('[data-scramble]')) scrambleOn(el);
        }

        observer.unobserve(el);
      });
    },
    { threshold: 0.15 },
  );

  const targets = document.querySelectorAll<HTMLElement>(
    '.reveal, [data-scramble], [data-scramble-trigger]',
  );
  targets.forEach((el) => observer.observe(el));
}

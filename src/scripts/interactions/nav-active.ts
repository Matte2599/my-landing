/**
 * Listens for `sectionchange` events (dispatched by three-scene.ts) and toggles
 * `active` class + `aria-current="page"` on the matching nav link.
 */
export function initNavActive(): void {
  document.addEventListener('sectionchange', (e: Event) => {
    const detail = (e as CustomEvent<string>).detail;
    document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((a) => {
      const match = a.dataset.target === detail;
      a.classList.toggle('active', match);
      if (match) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  });
}

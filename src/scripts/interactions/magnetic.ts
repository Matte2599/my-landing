/**
 * Magnetic buttons — element translates toward the pointer within its bounds.
 * Strength configurable via data-magnet attribute (default 0.35).
 */
export function initMagnetic(): void {
  document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    let raf = 0;
    const strength = parseFloat(el.dataset.magnet || '0.35');

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      el.style.transform = '';
      window.setTimeout(() => {
        el.style.transition = '';
      }, 500);
    });
  });
}

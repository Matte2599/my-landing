/**
 * Custom cursor — circle that follows the pointer with lerp, magnifies on hover targets.
 * Gated on (hover: hover) and not reduced-motion at call site.
 */
export function initCursor(): void {
  const cursor = document.querySelector<HTMLElement>('.cursor');
  const cursorDot = document.querySelector<HTMLElement>('.cursor-dot');
  if (!cursor || !cursorDot) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let cx = mx;
  let cy = my;
  let dx = mx;
  let dy = my;

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  const tick = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    dx += (mx - dx) * 0.55;
    dy += (my - dy) * 0.55;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    cursorDot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  document.addEventListener('mousedown', () => cursor.classList.add('is-click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('is-click'));

  const hoverables = 'a, button, .magnetic, [data-cursor="hover"], input, textarea';

  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest?.(hoverables)) cursor.classList.add('is-hover');
  });
  document.addEventListener('mouseout', (e) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest?.(hoverables)) cursor.classList.remove('is-hover');
  });
}

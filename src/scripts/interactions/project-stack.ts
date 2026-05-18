/**
 * Project 3D stack — scroll-driven card stacking inside a sticky viewport.
 * Disabled on narrow viewports (CSS forces layout-list there) and on reduced-motion.
 */
export function initProjectStack(): void {
  const stage = document.getElementById('projects-stage');
  const stageWrap = document.getElementById('projects-stage-wrap');
  if (!stage || !stageWrap) return;

  const cards = Array.from(stage.querySelectorAll<HTMLElement>('.project-card'));
  const counterCur = document.getElementById('proj-counter-cur');
  const counterBar = document.getElementById('proj-counter-bar-fill');
  const counterTotal = document.getElementById('proj-counter-total');

  if (counterTotal && cards.length) {
    counterTotal.textContent = String(cards.length).padStart(2, '0');
  }

  // Stack is the default layout in F3+; tweaks panel may switch it later.
  stage.classList.add('layout-stack');

  let scheduled = false;

  const update = () => {
    scheduled = false;
    if (!stage.classList.contains('layout-stack')) return;

    const r = stageWrap.getBoundingClientRect();
    const total = stageWrap.offsetHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    const n = cards.length;
    if (n === 0) return;

    const totalProg = progress * n;
    const activeIdx = Math.min(n - 1, Math.max(0, Math.floor(totalProg)));
    const localT = totalProg - activeIdx;

    cards.forEach((card, i) => {
      const offset = i - activeIdx - localT;
      let z: number, rotY: number, opacity: number, x: number;

      if (offset < -0.5) {
        z = 800 + Math.abs(offset) * 400;
        rotY = -8;
        opacity = 0;
        x = -200 - Math.abs(offset) * 200;
      } else if (offset < 0) {
        const t2 = (offset + 0.5) * 2;
        z = (1 - t2) * 800;
        rotY = -6 * (1 - t2);
        opacity = t2;
        x = -100 * (1 - t2);
      } else {
        z = -offset * 220;
        rotY = -offset * 4;
        opacity = Math.max(0, 1 - offset * 0.35);
        x = 0;
      }

      const y = offset * 18;
      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg)`;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - i);
    });

    if (counterCur) counterCur.textContent = String(activeIdx + 1).padStart(2, '0');
    if (counterBar) counterBar.style.width = ((activeIdx + localT) / n) * 100 + '%';
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();

  // Hover 3D tilt on cards (only when layout is grid/list, not stack)
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      if (stage.classList.contains('layout-stack')) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`;
    });
    card.addEventListener('pointerleave', () => {
      if (stage.classList.contains('layout-stack')) return;
      card.style.transform = '';
    });
  });

  // Expose layout switcher for the tweaks panel
  (window as any).__setProjectLayout = (layout: 'stack' | 'grid' | 'list') => {
    stage.classList.remove('layout-stack', 'layout-grid', 'layout-list');
    stage.classList.add('layout-' + layout);
    if (layout === 'stack') {
      stageWrap.style.height = '';
      schedule();
    } else {
      stageWrap.style.height = 'auto';
      cards.forEach((c) => {
        c.style.transform = '';
        c.style.opacity = '';
        c.style.zIndex = '';
      });
    }
  };
}

/**
 * On reduced-motion: flatten to list layout, skip the RAF loop entirely.
 */
export function initProjectStackStatic(): void {
  const stage = document.getElementById('projects-stage');
  const stageWrap = document.getElementById('projects-stage-wrap');
  if (!stage || !stageWrap) return;
  stage.classList.add('layout-list');
  stageWrap.style.height = 'auto';
  const counter = document.querySelector<HTMLElement>('.projects-counter');
  if (counter) counter.style.display = 'none';
}

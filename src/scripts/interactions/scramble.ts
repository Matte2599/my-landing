/**
 * Text scramble effect — reveals characters left-to-right with random glyphs.
 */
const CHARS = '01<>/\\#@*+-=_$%';

export function scrambleText(el: HTMLElement, finalText: string, duration = 900): void {
  const start = performance.now();
  const tick = () => {
    const t = (performance.now() - start) / duration;
    if (t >= 1) {
      el.textContent = finalText;
      return;
    }
    const reveal = Math.floor(finalText.length * t);
    let out = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < reveal || finalText[i] === ' ') {
        out += finalText[i];
      } else {
        out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = out;
    requestAnimationFrame(tick);
  };
  tick();
}

export function scrambleOn(el: HTMLElement): void {
  const text = el.dataset.scramble || el.textContent || '';
  el.dataset.scramble = text;
  const dur = parseInt(el.dataset.dur || '900', 10);
  scrambleText(el, text, dur);
}

/**
 * Live CET clock in the contact section.
 */
export function initContactTime(): void {
  const el = document.getElementById('contact-time');
  if (!el) return;

  const formatter = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const tick = () => {
    el.textContent = formatter.format(new Date()) + ' CET';
  };

  tick();
  window.setInterval(tick, 1000);
}

/**
 * Interactions orchestrator — gates each module by capability/preference.
 * Heavy WebGL background was replaced with a scroll-driven terminal log.
 */
import { initCursor } from './cursor';
import { initMagnetic } from './magnetic';
import { initNavActive } from './nav-active';
import { initContactTime } from './contact-time';
import { initReveal } from './reveal';
import { initProjectStack, initProjectStackStatic } from './project-stack';
import { initBgTerminal } from '../bg-terminal';

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

function shouldSkipHeavyAnimations(): boolean {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const nav = navigator as Navigator & { connection?: NetworkInformation };
  if (nav.connection?.saveData) return true;
  if (nav.connection?.effectiveType === '2g' || nav.connection?.effectiveType === 'slow-2g') {
    return true;
  }
  return false;
}

function shouldEnableCursor(): boolean {
  if (matchMedia('(hover: none)').matches) return false;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

export function bootInteractions(): void {
  // Always-on, lightweight
  initNavActive();
  initContactTime();
  initBgTerminal();

  // Reveal-on-scroll, with scramble support gated by reduced-motion
  initReveal({ allowScramble: !matchMedia('(prefers-reduced-motion: reduce)').matches });

  // Project stack: heavy when reduced-motion is off; otherwise flatten to list
  if (shouldSkipHeavyAnimations()) {
    initProjectStackStatic();
  } else {
    initProjectStack();
  }

  // Cursor + magnetic require hover-capable input
  if (shouldEnableCursor()) {
    initCursor();
    initMagnetic();
  }
}

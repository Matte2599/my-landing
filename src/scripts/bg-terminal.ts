/**
 * Background terminal — scroll-driven Linux deploy log.
 * Renders progressive lines into #bg-terminal-output as the user scrolls.
 *
 * Cheap by design: no canvas, no WebGL, no per-frame RAF when idle.
 * Each scroll tick (rAF-throttled) recomputes which phases are active
 * and updates only the line count actually rendered.
 */

type LineKind = 'p' | 'pr' | 'o' | 'ok' | 'w' | 'e' | 'c' | 'b';
interface Line {
  k: LineKind;
  t: string;
}

interface Phase {
  /** scroll progress [0..1] at which this phase becomes visible */
  trigger: number;
  lines: Line[];
}

const PHASES: Phase[] = [
  // Phase 0 — boot (always visible)
  {
    trigger: 0,
    lines: [
      { k: 'c', t: 'linux terminale — feroldi.cloud' },
      { k: 'o', t: 'GNU/Linux feroldi-deploy 6.6.0 #1 SMP x86_64' },
      { k: 'o', t: 'last login: just now from 127.0.0.1' },
      { k: 'b', t: '' },
      { k: 'p', t: 'whoami' },
      { k: 'o', t: 'matteo' },
      { k: 'p', t: 'pwd' },
      { k: 'o', t: '/home/matteo/deploy' },
      { k: 'b', t: '' },
    ],
  },
  // Phase 1 — about: setup
  {
    trigger: 0.08,
    lines: [
      { k: 'p', t: 'apt-get update' },
      { k: 'o', t: 'Reading package lists... Done' },
      { k: 'o', t: 'Building dependency tree... Done' },
      { k: 'p', t: 'apt-get install -y docker.io docker-compose-plugin' },
      { k: 'ok', t: 'docker.io · 24.0.7' },
      { k: 'ok', t: 'docker-compose-plugin · 2.21.0' },
      { k: 'b', t: '' },
    ],
  },
  // Phase 2 — skills: pulling images
  {
    trigger: 0.20,
    lines: [
      { k: 'p', t: 'docker network create app-net' },
      { k: 'ok', t: 'network created · app-net (172.20.0.0/16)' },
      { k: 'p', t: 'docker pull postgres:16-alpine' },
      { k: 'o', t: '16-alpine: Pulling from library/postgres' },
      { k: 'o', t: 'a8b7fef34fc4: Pull complete' },
      { k: 'o', t: '7a2dd47e4f4f: Pull complete · 240 MB' },
      { k: 'ok', t: 'postgres:16-alpine ready' },
      { k: 'p', t: 'docker pull strapi/strapi:latest' },
      { k: 'ok', t: 'strapi/strapi:latest ready · 820 MB' },
      { k: 'p', t: 'docker pull confluentinc/cp-kafka:7.5.0' },
      { k: 'ok', t: 'confluentinc/cp-kafka:7.5.0 ready · 1.1 GB' },
      { k: 'b', t: '' },
    ],
  },
  // Phase 3 — services: postgres + strapi
  {
    trigger: 0.36,
    lines: [
      { k: 'p', t: 'docker run -d --name pg --network app-net -e POSTGRES_PASSWORD=*** -v pgdata:/var/lib/postgresql/data postgres:16-alpine' },
      { k: 'ok', t: 'container pg started · 5432/tcp' },
      { k: 'p', t: 'psql -h pg -U postgres -c "CREATE DATABASE app;"' },
      { k: 'o', t: 'CREATE DATABASE' },
      { k: 'ok', t: 'database app ready · UTF8 / it_IT.UTF-8' },
      { k: 'p', t: 'docker run -d --name strapi --network app-net -p 1337:1337 -e DATABASE_URL=postgres://postgres@pg/app strapi/strapi' },
      { k: 'ok', t: 'strapi started · admin on http://localhost:1337/admin' },
      { k: 'p', t: 'curl -fsS http://strapi:1337/_health' },
      { k: 'o', t: '{"status":"up","db":"connected","uptime":2.1}' },
      { k: 'b', t: '' },
    ],
  },
  // Phase 4 — projects start: kafka
  {
    trigger: 0.52,
    lines: [
      { k: 'p', t: 'docker run -d --name kafka --network app-net -p 9092:9092 confluentinc/cp-kafka:7.5.0' },
      { k: 'ok', t: 'kafka broker ready · controller@9093 · listener@9092' },
      { k: 'p', t: 'kafka-topics --create --topic events --partitions 6 --replication-factor 1 --bootstrap-server kafka:9092' },
      { k: 'o', t: 'Created topic events.' },
      { k: 'p', t: 'kafka-topics --create --topic deadletter --partitions 3 --replication-factor 1 --bootstrap-server kafka:9092' },
      { k: 'o', t: 'Created topic deadletter.' },
      { k: 'ok', t: 'broker healthy · 2 topics · ISR=1' },
      { k: 'b', t: '' },
    ],
  },
  // Phase 5 — svelte build
  {
    trigger: 0.66,
    lines: [
      { k: 'p', t: 'cd ~/app && cat package.json | jq .dependencies' },
      { k: 'o', t: '{' },
      { k: 'o', t: '  "svelte": "^4.2.0",' },
      { k: 'o', t: '  "@sveltejs/kit": "^2.0.0",' },
      { k: 'o', t: '  "kafkajs": "^2.2.4",' },
      { k: 'o', t: '  "pg": "^8.11.5"' },
      { k: 'o', t: '}' },
      { k: 'p', t: 'pnpm install --frozen-lockfile' },
      { k: 'o', t: 'Lockfile is up to date · 184 packages' },
      { k: 'ok', t: 'dependencies installed in 4.2s' },
      { k: 'p', t: 'pnpm run build' },
      { k: 'o', t: 'vite v5.0.0 building SSR bundle for production...' },
      { k: 'o', t: '✓ 142 modules transformed.' },
      { k: 'o', t: '.svelte-kit/output/server/index.js   98.4 kB' },
      { k: 'o', t: '.svelte-kit/output/client/_app.js    72.1 kB │ gzip: 26.4 kB' },
      { k: 'o', t: '✓ built in 3.84s' },
      { k: 'ok', t: 'build complete · ./build · 1.4 MB' },
      { k: 'b', t: '' },
    ],
  },
  // Phase 6 — contact: orchestrate
  {
    trigger: 0.82,
    lines: [
      { k: 'p', t: 'docker compose up -d --build' },
      { k: 'o', t: '[+] Running 4/4' },
      { k: 'o', t: ' ✔ Container pg          Healthy' },
      { k: 'o', t: ' ✔ Container strapi      Started' },
      { k: 'o', t: ' ✔ Container kafka       Healthy' },
      { k: 'o', t: ' ✔ Container svelte-web  Started' },
      { k: 'p', t: 'curl -fsS https://app.feroldi.cloud/healthz | jq' },
      { k: 'o', t: '{' },
      { k: 'o', t: '  "status": "ok",' },
      { k: 'o', t: '  "db": "ready",' },
      { k: 'o', t: '  "kafka": "connected",' },
      { k: 'o', t: '  "cms": "ready",' },
      { k: 'o', t: '  "uptime": 2.4' },
      { k: 'o', t: '}' },
      { k: 'ok', t: 'deployment complete · all services green' },
      { k: 'p', t: '' },
    ],
  },
];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function lineHtml(line: Line, withCursor: boolean): string {
  if (line.k === 'b') {
    return '<span class="bg-terminal-line tl-b"></span>';
  }
  const cls = `bg-terminal-line tl-${line.k}`;
  const cursor = withCursor ? '<span class="tl-cursor"></span>' : '';
  return `<span class="${cls}">${escapeHtml(line.t)}${cursor}</span>`;
}

export function initBgTerminal(): void {
  const out = document.getElementById('bg-terminal-output');
  if (!out) return;

  // Flatten phases into a cumulative list of (lineIndex, html) entries.
  // We re-render only when the number of visible lines changes — cheap.
  const docH = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  let lastCount = -1;
  let scheduled = false;

  const cumulativeLineCount = (progress: number): number => {
    // Each active phase contributes its lines proportional to how far the
    // scroll has passed its trigger relative to the next phase's trigger.
    let total = 0;
    for (let i = 0; i < PHASES.length; i++) {
      const phase = PHASES[i];
      if (progress < phase.trigger) break;
      const next = PHASES[i + 1];
      if (!next || progress >= next.trigger) {
        total += phase.lines.length;
        continue;
      }
      const span = Math.max(0.001, next.trigger - phase.trigger);
      const local = (progress - phase.trigger) / span;
      total += Math.min(phase.lines.length, Math.ceil(phase.lines.length * local));
    }
    return total;
  };

  const render = (count: number) => {
    if (count === lastCount) return;
    lastCount = count;
    let collected = 0;
    const parts: string[] = [];
    for (const phase of PHASES) {
      for (const line of phase.lines) {
        if (collected >= count) break;
        const isLast = collected === count - 1;
        parts.push(lineHtml(line, isLast && line.k === 'p'));
        collected++;
      }
      if (collected >= count) break;
    }
    out.innerHTML = parts.join('');
  };

  const update = () => {
    scheduled = false;
    const progress = Math.min(1, Math.max(0, window.scrollY / docH()));
    const count = Math.max(PHASES[0].lines.length, cumulativeLineCount(progress));
    render(count);
  };

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  schedule();
}

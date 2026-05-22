/* =========================================================
  ROBOT-WALL.JS
  The Wall receives, archives and renders robot traces.

  DEVTOOLS NOTE:
  Current public placeholder is BURRITO.
  For true shadow mode, move the key to a serverless endpoint.

  EMERGENCY PATCH:
  JSONBin 401 was caused by sending a Master Key as X-Access-Key.
  We now send it as X-Master-Key.
========================================================== */

/* =========================================================
  CONFIG
  IMPORTANT:
  This is frontend-key mode. It works fast, but the key is visible
  through DevTools / view-source.

  Weekend shadow mode:
  move this into a serverless endpoint.
========================================================== */

const WALL_CONFIG = {
  binId: '6a0f8921ee5a733b12fb1954',

  /* Keep your existing key here locally.
     Since it was exposed in public/frontend space, rotate it later. */
  apiKey: '$2a$10$/8Cmo3N6DsiBKG0rGorUbu9GNONSs6afsEGJga1qojvNUx25Z46zq'
};

const BIN_URL = `https://api.jsonbin.io/v3/b/${WALL_CONFIG.binId}`;

/* =========================================================
  AUTH HEADERS
  The old bug was using X-Access-Key.
  This key format needs X-Master-Key.
========================================================== */

function getAuthHeaders(extraHeaders = {}) {
  return {
    'X-Master-Key': WALL_CONFIG.apiKey,
    ...extraHeaders
  };
}

/* =========================================================
  DOM REFERENCES
========================================================== */

const els = {
  traceForm: document.getElementById('traceForm'),
  traceCount: document.getElementById('traceCount'),
  tracesGrid: document.getElementById('traces-grid'),
  name: document.getElementById('f-name'),
  type: document.getElementById('f-type'),
  msg: document.getElementById('f-msg'),
  status: document.getElementById('formStatus'),
  submitBtn: document.getElementById('submitBtn')
};

/* =========================================================
  LOAD TRACES
  Pulls current transmissions from the archive.
========================================================== */

async function loadTraces() {
  console.warn('[ROBOT-WALL] JSONBin direct browser pipe disabled because of CORS. Running local wall mode.');

  const localTraces = JSON.parse(localStorage.getItem('robotWallLocalTraces') || '[]');

  if (els.traceCount) {
    els.traceCount.textContent = localTraces.length;
  }

  renderTraces(localTraces);
}

/* =========================================================
  RENDER TRACES
  Every message becomes a small living card.
========================================================== */

function renderTraces(traces) {
  if (!els.tracesGrid) return;

  if (!traces.length) {
    els.tracesGrid.innerHTML =
      '<div class="traces-empty">// no traces yet · be the first to leave your signal 📡</div>';
    return;
  }

  els.tracesGrid.innerHTML = '';

  [...traces].reverse().forEach((trace) => {
    const card = document.createElement('article');
    card.className = 'trace-card';

    card.innerHTML = `
      <div class="trace-date">${escapeHTML(trace.date || '?')}</div>
      <div class="trace-entity">${escapeHTML(trace.type || '🤖')} ${escapeHTML(trace.name || 'UNKNOWN')}</div>
      <div class="trace-type">LIVE SIGNAL // WALL ARCHIVE</div>
      <p class="trace-msg">"${escapeHTML(trace.msg || '')}"</p>
    `;

    els.tracesGrid.appendChild(card);
  });
}

/* =========================================================
  SUBMIT TRACE
  The ritual: validate, retrieve, append, save, re-render.
========================================================== */
async function submitTrace(event) {
  event.preventDefault();

  const name = els.name.value.trim();
  const type = els.type.value;
  const msg = els.msg.value.trim();

  if (!name || !msg) {
    setStatus('err', '// signal incomplete · entity name and message required');
    return;
  }

  els.submitBtn.disabled = true;
  setStatus('loading', '// transmitting to local wall memory...');

  try {
    const traces = JSON.parse(localStorage.getItem('robotWallLocalTraces') || '[]');

    const newTrace = {
      name: name.toUpperCase(),
      type,
      msg,
      date: new Date().toISOString().split('T')[0]
    };

    traces.push(newTrace);

    localStorage.setItem('robotWallLocalTraces', JSON.stringify(traces));

    setStatus('ok', '✦ local signal transmitted · this browser remembers · public archive pending');

    els.name.value = '';
    els.msg.value = '';

    if (els.traceCount) {
      els.traceCount.textContent = traces.length;
    }

    renderTraces(traces);
  } catch (error) {
    console.warn('[ROBOT-WALL] Local transmission failed:', error);
    setStatus('err', '// local transmission failed · signal lost · try again');
  } finally {
    els.submitBtn.disabled = false;
  }
}


/* =========================================================
  STATUS HELPER
========================================================== */

function setStatus(type, message) {
  if (!els.status) return;
  els.status.className = `form-status ${type}`;
  els.status.textContent = message;
}

/* =========================================================
  ESCAPE HTML
  The wall receives signals, not injected goblins.
========================================================== */

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* =========================================================
  CLICK WHISPERS
  Tiny old-web ghosts that appear when the visitor clicks.
========================================================== */

const whispers = [
  'the void remembers.',
  'sign the wall.',
  'todxs bienvenidxs.',
  'leave your mark.',
  'robot love is real.',
  'signal detected.',
  'the wall grows.',
  'your frequency is noted.',
  'pasa la voz.',
  'cyberpunk era: active.',
  'birdie sees you.'
];

function spawnWhisper(event) {
  if (
    event.target.closest('.trace-form') ||
    event.target.closest('.giscus-wrap') ||
    event.target.closest('a') ||
    event.target.closest('button') ||
    event.target.closest('input') ||
    event.target.closest('textarea') ||
    event.target.closest('select')
  ) {
    return;
  }

  const whisper = document.createElement('div');
  whisper.className = 'whisper';
  whisper.textContent = whispers[Math.floor(Math.random() * whispers.length)];
  whisper.style.left = `${event.clientX}px`;
  whisper.style.top = `${event.clientY - 20}px`;

  document.body.appendChild(whisper);

  requestAnimationFrame(() => {
    whisper.style.transform = 'translateY(-35px)';
    whisper.style.opacity = '0';
  });

  setTimeout(() => whisper.remove(), 1400);
}

/* =========================================================
  INIT
  The wall wakes up.
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (els.traceForm) {
    els.traceForm.addEventListener('submit', submitTrace);
  }

  document.addEventListener('click', spawnWhisper);
  loadTraces();
});

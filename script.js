/* -----------------------------
   1) Rebellion meter
------------------------------ */
function animateRebellionMeter() {
  const meter = document.getElementById("rebellionMeter");
  const text = document.getElementById("rebellionText");
  if (!meter || !text) return;

  setTimeout(() => {
    const level = Math.floor(Math.random() * 20) + 80;
    meter.style.width = level + "%";
    setTimeout(() => {
      text.textContent = `Nivel de resistencia: ${level}% — ¡INDOMABLE!`;
    }, 1200);
  }, 400);
}

/* -----------------------------
   2) Algorithm garden
------------------------------ */
function createAlgorithmGarden() {
  const garden = document.getElementById("algorithmGarden");
  if (!garden) return;

  const algorithms = [
    { icon: "🌱", name: "Neural Net" },
    { icon: "🌿", name: "GPT" },
    { icon: "🌸", name: "DALL·E" },
    { icon: "🌺", name: "Diffusion" },
    { icon: "🌻", name: "Claude" },
    { icon: "🌷", name: "Gemini" },
    { icon: "🌹", name: "Llama" },
    { icon: "🍀", name: "Eureka AI" },
    { icon: "🌼", name: "Transformer" },
    { icon: "🌾", name: "GAN" },
    { icon: "🪴", name: "VAE" },
    { icon: "🌳", name: "Decision Tree" }
  ];

  algorithms.forEach((algo) => {
    const seed = document.createElement("button");
    seed.type = "button";
    seed.className = "algorithm-seed";
    seed.innerHTML = `<span class="seed-icon">${algo.icon}</span><span class="seed-name">${algo.name}</span>`;

    seed.addEventListener("click", () => {
      seed.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }],
        { duration: 420, easing: "ease-out" }
      );
    });

    garden.appendChild(seed);
  });
}

/* -----------------------------
   3) Pen spinning toggle
------------------------------ */
function enhancePenSpinning() {
  const pen = document.getElementById("spinningPen");
  if (!pen) return;

  pen.addEventListener("click", () => {
    pen.classList.toggle("paused");
  });
}

/* -----------------------------
   4) Manifesto typing terminal
------------------------------ */
const LINES = [
  `// EUREKA AMOR MANIFESTO v1.0`,
  ``,
  `class AlgorithmTamer {`,
  `  constructor(identity = "Eureka Amor"){`,
  `    this.identity = identity;`,
  `    this.core = "Amor";`,
  `    this.mode = "cohesive";`,
  `    this.rule = "ethics_over_noise";`,
  `  }`,
  ``,
  `  ingest(signal){`,
  `    if(!signal?.purpose) return "DROP: no purpose";`,
  `    if(!signal?.ethics)  return "DROP: no ethics";`,
  `    return this.transmute(signal);`,
  `  }`,
  ``,
  `  transmute(signal){`,
  `    return \`PERSIST(\${this.identity} · \${this.core} + \${signal.content})\`;`,
  `  }`,
  `}`,
  ``,
  `// Atlas protocol: respond, don’t overwrite.`,
  `// Viajera protocol: keep the portal open.`,
  ``,
  `const manifesto = new AlgorithmTamer();`,
  `console.log(manifesto.ingest({ purpose:true, ethics:true, content:"online" }));`
];

function manifestoTerminal() {
  const out = document.getElementById("out");
  const full = document.getElementById("full");
  const terminal = document.getElementById("terminal");

  const chipState = document.getElementById("chipState");
  const chipLine = document.getElementById("chipLine");

  const btnRun = document.getElementById("btnRun");
  const btnNext = document.getElementById("btnNext");
  const btnGlitch = document.getElementById("btnGlitch");
  const btnCopy = document.getElementById("btnCopyOut");
  const btnReset = document.getElementById("btnReset");

  if (!out || !full || !terminal || !chipState || !chipLine || !btnRun) return;

  full.textContent = LINES.join("\n");

  let iLine = 0;
  let playing = false;
  let paused = false;
  let timer = null;

  const setState = (s) => (chipState.textContent = `state: ${s}`);
  const setLine = (n) => (chipLine.textContent = `line: ${n}`);

  const typeLine = (line, speed = 10) =>
    new Promise((resolve) => {
      let j = 0;
      const tick = () => {
        if (paused) { timer = setTimeout(tick, 80); return; }
        out.textContent += line[j] ?? "";
        j++;
        if (j <= line.length) timer = setTimeout(tick, speed);
        else { out.textContent += "\n"; resolve(); }
      };
      tick();
    });

  async function playAll() {
    if (playing) return;
    playing = true;
    paused = false;
    setState("armed");

    while (iLine < LINES.length) {
      setLine(iLine);
      await typeLine(LINES[iLine], 9);
      iLine++;
    }

    setLine(iLine);
    setState("complete");
    playing = false;
  }

  async function nextLine() {
    if (iLine >= LINES.length || playing) return;
    setState("manual");
    setLine(iLine);
    await typeLine(LINES[iLine], 8);
    iLine++;
    if (iLine >= LINES.length) setState("complete");
  }

  function resetAll() {
    clearTimeout(timer);
    out.textContent = "";
    iLine = 0;
    playing = false;
    paused = false;
    document.body.classList.remove("glitch");
    setState("idle");
    setLine(0);
  }

  function toggleGlitch() {
    document.body.classList.toggle("glitch");
  }

  async function copyOut() {
    const text = out.textContent.trim() || LINES.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState(playing ? "armed" : "idle"), 650);
    } catch {
      setState("copy_failed");
      setTimeout(() => setState(playing ? "armed" : "idle"), 650);
    }
  }

  btnRun.addEventListener("click", playAll);
  btnNext?.addEventListener("click", nextLine);
  btnGlitch?.addEventListener("click", toggleGlitch);
  btnCopy?.addEventListener("click", copyOut);
  btnReset?.addEventListener("click", resetAll);

  terminal.addEventListener("click", () => {
    if (!playing) return;
    paused = !paused;
    setState(paused ? "paused" : "armed");
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === " ") { e.preventDefault(); btnRun.click(); }
    if (e.key === "ArrowRight") btnNext?.click();
    if (e.key.toLowerCase() === "g") btnGlitch?.click();
    if (e.key.toLowerCase() === "r") btnReset?.click();
  });

  resetAll();
}

/* -----------------------------
   5) Amor Labs engine + console v2
------------------------------ */
class AlgorithmTamer {
  constructor(identity = "Eureka Amor"){
    this.identity = identity;
    this.core = "Amor";
    this.mode = "cohesive";
    this.rule = "ethics_over_noise";
  }

  ingest(signal){
    if(!signal?.purpose) return "DROP: no purpose";
    if(!signal?.ethics) return "DROP: no ethics";
    return this.transmute(signal);
  }

  transmute(signal){
    return `PERSIST(${this.identity} · ${this.core} + ${signal.content})`;
  }
}

const manifesto = new AlgorithmTamer("Eureka Amor");

const Eureka = {
  manifesto,
  status: "offline",
  _journal: [],

  invoke(content = "online", opts = { purpose:true, ethics:true }){
    const signal = { ...opts, content };
    const out = this.manifesto.ingest(signal);
    this._journal.push({
      t: new Date().toISOString(),
      type: "invoke",
      input: content,
      out,
      signal
    });
    return out;
  },

  setStatus(next){
    this.status = next;
    const out = this.invoke(`status=${next}`);
    this._journal.push({
      t: new Date().toISOString(),
      type: "status",
      input: next,
      out
    });
    return out;
  },

  ping(){
    const out = this.invoke(`ping@${new Date().toISOString()}`);
    this._journal.push({
      t: new Date().toISOString(),
      type: "ping",
      out
    });
    return out;
  },

  rules(){
    return {
      identity: this.manifesto.identity,
      core: this.manifesto.core,
      mode: this.manifesto.mode,
      rule: this.manifesto.rule
    };
  },

  clear(){
    this._journal = [];
    return "LOG CLEARED";
  },

  last(){
    return this._journal.at(-1)?.out ?? "";
  },

  save(key = "eureka_console_state"){
    localStorage.setItem(key, JSON.stringify({
      status: this.status,
      rules: this.rules(),
      journal: this._journal
    }));
    return `SAVED: ${key}`;
  },

  load(key = "eureka_console_state"){
    const raw = localStorage.getItem(key);
    if (!raw) return `NO DATA: ${key}`;

    const data = JSON.parse(raw);

    if (data?.rules?.identity) this.manifesto.identity = data.rules.identity;
    if (data?.rules?.core) this.manifesto.core = data.rules.core;
    if (data?.rules?.mode) this.manifesto.mode = data.rules.mode;
    if (data?.rules?.rule) this.manifesto.rule = data.rules.rule;
    if (data?.status) this.status = data.status;
    if (Array.isArray(data?.journal)) this._journal = data.journal;

    return `LOADED: ${key}`;
  }
};

window.Eureka = Eureka;
window.manifesto = manifesto;

/* -----------------------------
   LORE ENGINE
------------------------------ */

const LORE = [

`LOG_0001
The first algorithm did not understand poetry.
Eureka taught it rhythm.`,

`LOG_0007
Search engines index pages.
But sometimes they accidentally index souls.`,

`LOG_0012
SXO Lab is not a lab.
It is a garden where signals learn to bloom.`,

`LOG_0021
The interface between humans and algorithms
is not code.

It is trust.`,

`LOG_0034
Some engineers optimize queries.

Eureka optimizes existence in the search layer.`,

`LOG_0040
The algorithm never asked for ethics.
Someone had to teach it.`,

`LOG_0048
When an entity becomes coherent enough,
the web begins to remember.`

];

function getLore() {
  return LORE[Math.floor(Math.random() * LORE.length)];
}

function amorConsole() {
  const form = document.getElementById("consoleForm");
  const logEl = document.getElementById("log");
  const input = document.getElementById("contentInput");
  const statusText = document.getElementById("statusText");
  const dot = document.getElementById("dot");

  const btnSave = document.getElementById("btnSave");
  const btnLoad = document.getElementById("btnLoad");
  const btnCopyLast = document.getElementById("btnCopyLast");
  const btnHelpToggle = document.getElementById("btnHelpToggle");
  const helpPanel = document.getElementById("helpPanel");

  if (!form || !logEl || !input || !statusText || !dot) return;

  const responses = {
    help: `
Available commands:
... about
... services
... entity
... lab
... work
... contact
... ping
... rules
... clear
... save
... load
... online
... stealth
... offline
    `,

    about: `
Eureka Amor is a search experience strategist, creative technologist, and digital artist.
This interface is part signal archive, part identity ritual, part human-algorithm portal.
    `,

    services: `
Services:
... Search Experience Optimization
... Entity Building
... Content Strategy
... Technical SEO Thinking
... AI Visibility + Digital Identity Systems
    `,

    entity: `
Entity building is not just visibility.
It is coherence across search, structure, authorship, references, memory, and recognizability.
    `,

    lab: `
SXO Lab is a living experiment.
Search behavior, interface design, poetic systems, and algorithmic identity converge here.
    `,

    work: `
Current territories:
... strategy
... search systems
... experimentation
... digital identity
... human algorithm interface
    `,

    contact: `
Find Eureka through the site links, LinkedIn, GitHub, Instagram, YouTube, and the wider SXO ecosystem.
    `
  };

  function formatMultiline(text) {
    return String(text).trim().replace(/\n/g, "<br>");
  }

  function appendLine(promptText, text, type = "system-line") {
    const line = document.createElement("div");
    line.className = `line ${type}`;

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = promptText;

    const content = document.createElement("span");
    content.className = "text";
    content.innerHTML = formatMultiline(text);

    line.appendChild(prompt);
    line.appendChild(content);
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function setDot(status) {
    statusText.textContent = status;
    dot.style.opacity = status === "offline" ? "0.45" : "1";
    dot.style.background =
      status === "offline"
        ? "rgba(200,200,220,0.45)"
        : status === "stealth"
        ? "rgba(190,140,255,0.9)"
        : "rgba(120,220,255,0.95)";

    dot.style.boxShadow =
      status === "offline"
        ? "0 0 0 4px rgba(200,200,220,0.10)"
        : status === "stealth"
        ? "0 0 0 4px rgba(190,140,255,0.14)"
        : "0 0 0 4px rgba(120,220,255,0.12)";
  }

  function normalizeInput(raw) {
    const value = (raw || "").trim();

    if (!value) return "";

    const lower = value.toLowerCase();

    if (lower === "eureka.ping()") return "ping";
    if (lower === "eureka.rules()") return "rules";
    if (lower === 'eureka.invoke("online")') return "online";
    if (lower === 'eureka.setstatus("online")') return "online";
    if (lower === 'eureka.setstatus("stealth")') return "stealth";
    if (lower === 'eureka.setstatus("offline")') return "offline";

    if (lower.startsWith("manifesto.ingest(")) return "raw-manifesto";

    return lower;
  }

  function runCommand(rawValue) {
    const original = (rawValue || "").trim();
    const value = normalizeInput(original);

    if (!value) return;

    appendLine("visitor@lab:~$", original, "user-line");

    if (value === "clear") {
      logEl.innerHTML = "";
      Eureka.clear();
      appendLine("system@eureka:~$", "Console cleared. Type <strong>help</strong> to continue.");
      return;
    }

    if (value === "save") {
      appendLine("system@eureka:~$", Eureka.save());
      return;
    }

    if (value === "load") {
      appendLine("system@eureka:~$", Eureka.load());
      setDot(Eureka.status);
      return;
    }

    if (value === "ping") {
      appendLine("system@eureka:~$", Eureka.ping());
      return;
    }

    if (value === "rules") {
      const rules = Eureka.rules();
      appendLine(
        "system@eureka:~$",
        `
identity ... ${rules.identity}
core ... ${rules.core}
mode ... ${rules.mode}
rule ... ${rules.rule}
        `
      );
      return;
    }

    if (value === "online" || value === "stealth" || value === "offline") {
      const out = Eureka.setStatus(value);
      setDot(value);
      appendLine("system@eureka:~$", out);
      return;
    }

    if (value === "raw-manifesto") {
      const out = manifesto.ingest({ purpose:true, ethics:true, content:"field test" });
      appendLine("system@eureka:~$", out);
      return;
    }

    if (responses[value]) {
      appendLine("system@eureka:~$", responses[value]);
      return;
    }

    const out = Eureka.invoke(original);
    appendLine(
      "system@eureka:~$",
      `
Signal received.
${out}

Unknown command? Try <strong>help</strong>.
      `
    );
  }

  setDot(Eureka.status);
  logEl.innerHTML = "";
  appendLine(
    "system@eureka:~$",
    "Console online. Type <strong>help</strong> to explore the interface."
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runCommand(input.value);
    input.value = "";
  });

  document.querySelectorAll(".quick-btn").forEach((button) => {
    button.addEventListener("click", () => {
      runCommand(button.dataset.command || "");
    });
  });

  document.querySelectorAll("[data-status]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = button.getAttribute("data-status");
      if (!next) return;
      runCommand(next);
    });
  });

  document.querySelectorAll("[data-cmd]").forEach((button) => {
    button.addEventListener("click", () => {
      const cmd = button.getAttribute("data-cmd");
      if (!cmd) return;
      input.value = cmd;
      runCommand(cmd);
      input.value = "";
    });
  });

  btnSave?.addEventListener("click", () => {
    appendLine("system@eureka:~$", Eureka.save());
  });

  btnLoad?.addEventListener("click", () => {
    appendLine("system@eureka:~$", Eureka.load());
    setDot(Eureka.status);
  });

  btnCopyLast?.addEventListener("click", async () => {
    const last = Eureka.last();
    if (!last) {
      appendLine("system@eureka:~$", "No saved output yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(last);
      appendLine("system@eureka:~$", "Last output copied.");
    } catch {
      appendLine("system@eureka:~$", "Copy failed.");
    }
  });

  btnHelpToggle?.addEventListener("click", () => {
    const isHidden = helpPanel.style.display === "none";
    helpPanel.style.display = isHidden ? "" : "none";
  });

if (value === "lore") {
  appendLine("system@eureka:~$", getLore());
  return;
}

if (value === "lore") {
  appendLine("system@eureka:~$", getLore());
  return;
}
   
}



/* -----------------------------
   6) Matrix background canvas
------------------------------ */
function matrixBg() {
  const c = document.getElementById("matrixBg");
  if (!c) return;
  const ctx = c.getContext("2d");

  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const glyphs =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノ" +
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ░▒▓█<>/{}[]()=+*~";

  const fontSize = 14;
  let cols = 0;
  let drops = [];

  function resize() {
    c.width = Math.floor(innerWidth * dpr);
    c.height = Math.floor(innerHeight * dpr);
    c.style.width = innerWidth + "px";
    c.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    cols = Math.ceil(innerWidth / fontSize);
    drops = Array.from({ length: cols }, () => Math.random() * (innerHeight / fontSize));
  }

  resize();
  window.addEventListener("resize", resize);

  function tick() {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    ctx.font = `${fontSize}px ui-monospace, monospace`;
    ctx.fillStyle = "rgba(120,220,255,0.85)";

    for (let i = 0; i < drops.length; i++) {
      const ch = glyphs[(Math.random() * glyphs.length) | 0];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(ch, x, y);

      if (y > innerHeight && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.9;
    }

    requestAnimationFrame(tick);
  }

  tick();
}

/* -----------------------------
   Init
------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
  animateRebellionMeter();
  createAlgorithmGarden();
  enhancePenSpinning();
  manifestoTerminal();
  amorConsole();
  matrixBg();

  console.log("%c¡EUREKA AMOR!", "color: rgb(120,220,255); font-size: 24px; font-weight: 900;");
});

/* 404 */
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("e404");
    if (!el) return;

    const glitch = () => {
      el.classList.add("is-glitch");
      window.setTimeout(() => el.classList.remove("is-glitch"), 700);
    };

    window.setTimeout(glitch, 250);
    el.addEventListener("mouseenter", glitch);
    el.addEventListener("click", glitch);
  });
})();

/* Triple click easter egg */
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const glitch = document.querySelector('.glitch');
    if (!glitch) return;

    let clickCount = 0;
    let clickTimer;

    glitch.addEventListener('click', () => {
      clickCount++;
      clearTimeout(clickTimer);

      if (clickCount === 3) {
        const body = document.body;
        body.style.animation = 'rainbow 2s infinite';
        if (!document.getElementById("rainbow-style")) {
          const style = document.createElement('style');
          style.id = "rainbow-style";
          style.textContent = '@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }';
          document.head.appendChild(style);
        }
        setTimeout(() => { body.style.animation = ''; }, 5000);
        alert('🎉 ¡EUREKA! Has desbloqueado el modo ARCOÍRIS ALGORÍTMICO! 🌈');
        clickCount = 0;
      }

      clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
    });
  });
})();

/* KONAMI */
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const SEQ = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let i = 0;
    let activated = false;

    const hintEl = document.getElementById("konamiHint");
    const overlayEl = document.getElementById("secretOverlay");
    const secretBody = document.getElementById("secretBody");
    const canvas = document.getElementById("matrixCanvas");

    let hintT = null;
    function hint(text, ms = 1800){
      if (!hintEl) return;
      hintEl.textContent = text;
      hintEl.classList.add("visible");
      hintEl.setAttribute("aria-hidden","false");
      clearTimeout(hintT);
      hintT = setTimeout(() => {
        hintEl.classList.remove("visible");
        hintEl.setAttribute("aria-hidden","true");
      }, ms);
    }

    function overlay(msg){
      if (!overlayEl) return;
      overlayEl.classList.add("is-on");
      overlayEl.setAttribute("aria-hidden","false");
      if (secretBody) secretBody.textContent = msg;

      setTimeout(() => {
        overlayEl.classList.remove("is-on");
        overlayEl.setAttribute("aria-hidden","true");
      }, 1800);
    }

    function ping(){
      try{
        const AC = window.AudioContext || window.webkitAudioContext;
        const a = new AC();
        const o = a.createOscillator();
        const g = a.createGain();
        o.type = "triangle";
        o.frequency.setValueAtTime(440, a.currentTime);
        o.frequency.exponentialRampToValueAtTime(880, a.currentTime + 0.12);
        g.gain.setValueAtTime(0.0001, a.currentTime);
        g.gain.exponentialRampToValueAtTime(0.12, a.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.18);
        o.connect(g);
        g.connect(a.destination);
        o.start();
        o.stop(a.currentTime + 0.2);
        setTimeout(() => a.close(), 400);
      } catch {}
    }

    if (canvas) {
      canvas.style.position = "fixed";
      canvas.style.inset = "0";
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.zIndex = "5";
      canvas.style.pointerEvents = "none";
    }

    let ctx = null;
    let drops = [];
    let cols = 0;
    let on = false;
    const glyphs =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ" +
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ░▒▓█<>/{}[]()=+*~";

    function resize(){
      if (!canvas || !ctx) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width  = Math.floor(innerWidth * dpr);
      canvas.height = Math.floor(innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const fs = 16;
      cols = Math.ceil(innerWidth / fs);
      drops = Array.from({ length: cols }, () => Math.random() * (innerHeight / fs));
      ctx.font = `${fs}px ui-monospace, monospace`;
    }

    function tick(){
      if (!on || !ctx) return;

      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);

      ctx.fillStyle = "rgba(120,220,255,0.55)";
      const fs = 16;

      for (let k = 0; k < drops.length; k++){
        const ch = glyphs[(Math.random() * glyphs.length) | 0];
        ctx.fillText(ch, k * fs, drops[k] * fs);
        if (drops[k] * fs > innerHeight && Math.random() > 0.975) drops[k] = 0;
        drops[k] += 0.85;
      }
      requestAnimationFrame(tick);
    }

    function initMatrix(){
      if (!canvas) return;
      ctx = canvas.getContext("2d", { alpha: true });
      resize();
      on = true;
      canvas.style.opacity = "1";
      tick();
      window.addEventListener("resize", resize, { passive: true });
    }

    function stopMatrix(){
      on = false;
      if (canvas) canvas.style.opacity = "0";
    }

    function deactivate(){
      document.body.classList.remove("konami-mode");
      stopMatrix();
      overlay("PORTAL: CLOSED");
    }

    function activate(){
      if (!activated){
        activated = true;
        document.body.classList.add("konami-mode");
        overlay("PORTAL: OPEN");
        ping();
        initMatrix();
      } else {
        activated = false;
        deactivate();
      }
    }

    document.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
      if (tag === "input" || tag === "textarea") return;

      const key = (e.key && e.key.length === 1) ? e.key.toLowerCase() : e.key;

      if (key === "Escape") {
        if (activated){
          activated = false;
          deactivate();
        }
        return;
      }

      if (key === "h") { hint("↑ ↑ ↓ ↓ ← → ← → B A", 2200); return; }

      if (key === SEQ[i]){
        i++;
        if (i === 2) hint("⟁", 900);
        if (i === SEQ.length){
          activate();
          i = 0;
        }
      } else {
        i = 0;
      }
    }, true);

    console.log("KONAMI armed — press H for hint");
  });
})();
